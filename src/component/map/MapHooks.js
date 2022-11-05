// import { useState, useEffect, useRef } from "react";
// import {
//   GoogleMapProvider,
//   useGoogleMap,
// } from "@ubilabs/google-maps-react-hooks";

// const mapOptions = {
//   zoom: 12,
//   center: {
//     lat: 1.352,
//     lng: 103.82,
//   },
// };

// export default function GMapsHooks() {
//   const [mapContainer, setMapContainer] = useState(null);

//   return (
//     <GoogleMapProvider
//       googleMapsAPIKey={process.env.REACT_APP_GKEY}
//       options={mapOptions}
//       mapContainer={mapContainer}
//     >
//       <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
//       <Location />
//     </GoogleMapProvider>
//   );
// }

// function Location() {
//   const [lat, setLat] = useState(mapOptions.center.lat);
//   const [lng, setLng] = useState(mapOptions.center.lng);
//   const { map } = useGoogleMap();
//   const markerRef = useRef();

//   useEffect(() => {
//     if (!map || markerRef.current) return;
//     markerRef.current = new google.maps.Marker({ map });
//   }, [map]);

//   useEffect(() => {
//     if (!markerRef.current) return;
//     if (isNaN(lat) || isNaN(lng)) return;
//     markerRef.current.setPosition({ lat, lng });
//     map.panTo({ lat, lng });
//   }, [lat, lng, map]);

//   return (
//     <div className="lat-lng">
//       <input
//         type="number"
//         value={lat}
//         onChange={(event) => setLat(parseFloat(event.target.value))}
//         step={0.01}
//       />
//       <input
//         type="number"
//         value={lng}
//         onChange={(event) => setLng(parseFloat(event.target.value))}
//         step={0.01}
//       />
//     </div>
//   );
// }