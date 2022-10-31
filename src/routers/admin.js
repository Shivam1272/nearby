const express = require("express");
const { upload, multipleUploads } = require("../middleware/upload");
const { isAuthenticatedUser } = require("../middleware/auth");
const Vendor = require("../models/vendors");
const sharp = require("sharp");
const router = new express.Router();

router.post("/admin/vendors/all", async (req, res) => {
  const vendors = await Vendor.find();
  const allVendor = vendors.filter((vendor) => {
    return vendor.shopLocation.city == req.body.shopLocation.city;
  });
  if (!allVendor) {
    res.send([]);
  }
  res.status(200).send(allVendor);
});

// Update Profile -> Admin
router.patch("/admin/vendor-update", isAuthenticatedUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["takeAwayOrderstatus", "menuItems"];
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send("Invalid Update !");
  }
  try {
    updates.forEach((update) => {
      if (update === "menuItems") {
        req.vendor[update] = req.vendor[update].concat(req.body[update]);
      } else {
        req.vendor[update] = req.body[update];
      }
    });
    await req.vendor.save();
    res.send(req.vendor);
  } catch (e) {
    res.status(500).send("fail");
  }
});

router.post(
  "/vendor/upload/documents",
  isAuthenticatedUser,
  multipleUploads,
  async (req, res) => {
    try {
      const buffer1 = await sharp(req.files.fssaiLicense[0].buffer)
        .resize({ height: 250, width: 250 })
        .png()
        .toBuffer();
      req.vendor.documents.fssaiLicense = buffer1;
      await req.vendor.save();

      const buffer2 = await sharp(req.files.hawkerLicense[0].buffer)
        .resize({ height: 250, width: 250 })
        .png()
        .toBuffer();
      req.vendor.documents.hawkerLicense = buffer2;
      await req.vendor.save();

      const buffer3 = await sharp(req.files.addressProof[0].buffer)
        .resize({ height: 250, width: 250 })
        .png()
        .toBuffer();
      req.vendor.documents.addressProof = buffer3;
      await req.vendor.save();

      const buffer4 = await sharp(req.files.menuImage[0].buffer)
        .resize({ height: 250, width: 250 })
        .png()
        .toBuffer();
      req.vendor.menuImage = buffer4;
      await req.vendor.save();

      res.status(200).json({
        success: true,
        message: "upload successfull",
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "Failed to upload",
      });
    }
  }
);

// view documents
router.get("/vendors/documents/:id/get/:docType", async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  try {
    res.set("Content-Type", "image/jpg");
    if (req.params.docType === "menuImage") {
      res.send(vendor.menuImage);
    } else if (req.params.docType === "hawkerLicense") {
      res.send(vendor.documents.hawkerLicense);
    } else if (req.params.docType === "fssaiLicense") {
      res.send(vendor.documents.fssaiLicense);
    } else if (req.params.docType === "addressProof") {
      res.send(vendor.documents.addressProof);
    } else {
      res.status(404).send("Please send valid param");
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: "Unable to fetch documents",
    });
  }
});

// get menuItems of vendor
router.get("/vendors/:id/get/menuItem", async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  try {
    res.status(200).send(vendor.menuItems);
  } catch (e) {
    res.status(500).send("Unable to fetch menu");
  }
});

// delete vendor -> Admin
router.delete("/admin/vendors/me", isAuthenticatedUser, async (req, res) => {
  try {
    await req.vendor.remove();
    res.send(req.vendor);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
