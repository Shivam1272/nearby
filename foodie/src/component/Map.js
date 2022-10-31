import L from "leaflet";
import ShopDetail from "./ShopDetail";
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Map({ latitude, longitude, city, vendorData }) {
  let [vendors, setVendors] = useState();
  const setVendorData = () => {
    setVendors(vendorData);
  };

  let redMarkerIcon = new L.Icon({
    iconUrl: require("../image/redmarker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });
  let greenMarkerIcon = new L.Icon({
    iconUrl: require("../image/greenmarker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  useEffect(() => {
    setVendorData();
  }, [vendorData, latitude, longitude]);

  if (latitude && longitude) {
    return (
      <div className="m-2 flex justify-center">
        <MapContainer
          className="leaflet-container -z-0"
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={true}
          style={{
            height: window.innerHeight * 0.9,
            width: window.innerWidth,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[latitude, longitude]}
            // icon={<i className="fa fa-location" />}
          >
            <Popup>Your Location : {city}</Popup>
          </Marker>
          {vendors &&
            vendors.map((vendor) => {
              return (
                <Marker
                  key={vendor.vendorName}
                  position={[
                    vendor.addressCoords.lat,
                    vendor.addressCoords.long,
                  ]}
                  icon={
                    vendor.openOrClosedstatus ? greenMarkerIcon : redMarkerIcon
                  }
                >
                  <Popup>
                    <div className="bg-slate-600 rounded-md shadow-xl p-2 ">
                      <ShopDetail vendor={vendor} />
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
