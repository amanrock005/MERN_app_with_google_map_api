// import React, { useState } from "react";
// import SearchLocationInput from "../components/GooglePlaces";
// import MapComponent from "../components/Map";

// function Man() {
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: 28.7041,
//     lng: 77.1025,
//   });
//   return (
//     // <div style={{ height: "100vh", width: "100%" }}>
//     <div
//       style={{
//         height: "70%",
//         width: "70%",
//       }}
//     >
//       <SearchLocationInput setSelectedLocation={setSelectedLocation} />
//       <MapComponent selectedLocation={selectedLocation} />
//     </div>
//   );
// }

// export default Man;

// import React, { useState } from "react";
// import SearchLocationInput from "../components/GooglePlaces";
// import MapComponent from "../components/Map";
// import NewMap from "../components/NewMap";

// function Man() {
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: 28.7041, // Default coordinates (New Delhi)
//     lng: 77.1025,
//   });

//   return (
//     <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
//       {/* Centered Map Container */}
//       <div className="w-full md:w-3/4 lg:w-1/2 h-3/4 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
//         <h2 className="text-lg font-semibold mb-4 text-center">
//           Enter Location or Drag Marker on the Map
//         </h2>
//         {/* Input field */}
//         <div className="w-full mb-4">
//           <SearchLocationInput setSelectedLocation={setSelectedLocation} />
//         </div>
//         {/* Map Component */}
//         <div className="w-full h-full flex-grow rounded overflow-hidden">
//           <MapComponent selectedLocation={selectedLocation} />
//           {/* <NewMap selectedLocation={selectedLocation} /> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Man;

import React, { useState } from "react";
import SearchLocationInput from "../components/GooglePlaces";
import MapComponent from "../components/Map";
import { Home, Briefcase, Users } from "lucide-react"; // Lucide-react icons

function Man() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041, // Default coordinates (New Delhi)
    lng: 77.1025,
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Main Content Container */}
      <div className="w-full md:w-3/4 lg:w-1/2 h-3/4 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Enter Location or Drag Marker on the Map
        </h2>
        {/* Input field */}
        <div className="w-full mb-4">
          <SearchLocationInput setSelectedLocation={setSelectedLocation} />
        </div>
        {/* Map Component */}
        <div className="w-full h-full flex-grow rounded overflow-hidden">
          <MapComponent selectedLocation={selectedLocation} />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Home Icon */}
        <div className="flex flex-col items-center">
          <Home size={28} color="#4F46E5" />
          <span className="text-sm mt-2 text-gray-600">Home</span>
        </div>

        {/* Office Icon */}
        <div className="flex flex-col items-center">
          <Briefcase size={28} color="#4F46E5" />
          <span className="text-sm mt-2 text-gray-600">Office</span>
        </div>

        {/* Friends & Family Icon */}
        <div className="flex flex-col items-center">
          <Users size={28} color="#4F46E5" />
          <span className="text-sm mt-2 text-gray-600">Friend & Family</span>
        </div>
      </div>
    </div>
  );
}

export default Man;
