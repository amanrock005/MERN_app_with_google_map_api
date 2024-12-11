// import { useState } from "react";
// import axios from "axios";

// export default function ManualAddressForm({ apiKey, setMapCenter, setOpen }) {
//   const [inputAddress, setInputAddress] = useState("");
//   const [addressSuggestions, setAddressSuggestions] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   const handleAddressChange = async (e) => {
//     const value = e.target.value;
//     setInputAddress(value);

//     if (value.length > 3) {
//       try {
//         const response = await axios.get(
//           "https://maps.googleapis.com/maps/api/place/autocomplete/json",
//           {
//             params: {
//               input: value,
//               key: apiKey,
//             },
//           }
//         );

//         if (response.data.status === "OK") {
//           setAddressSuggestions(response.data.predictions);
//         } else {
//           console.error("API Error: ", response.data.status);
//           setAddressSuggestions([]);
//         }
//       } catch (err) {
//         console.error("Error fetching address suggestions: ", err.message);
//       }
//     } else {
//       setAddressSuggestions([]); // Clear suggestions if input is too short
//     }
//   };

//   const handleSelectAddress = (address) => {
//     setInputAddress(address.description);
//     setSelectedAddress(address);
//     setAddressSuggestions([]);
//   };

//   const handleFindLocation = async () => {
//     if (selectedAddress) {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json`,
//         {
//           params: {
//             address: selectedAddress.description,
//             key: apiKey,
//           },
//         }
//       );

//       if (response.data.status === "OK") {
//         const location = response.data.result[0].geometry.location;
//         setMapCenter(location);
//         setOpen(true);
//       } else {
//         console.error("unable to find location");
//       }
//     }
//   };

//   return (
//     <div className="w-1/2 mt-4">
//       <input
//         type="text"
//         value={inputAddress}
//         onChange={handleAddressChange}
//         placeholder="house, street, city, state, country, pincode"
//         className="input input-bordered w-full"
//       />
//       <div className="mt-2">
//         {addressSuggestions.map((suggestion, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 p-2 cursor-pointer"
//             onClick={() => handleSelectAddress(suggestion)}
//           >
//             {suggestion.description}
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleFindLocation}
//         className="bg-blue-500 text-white px-4 py-2 rounded-mt-4"
//       >
//         Find
//       </button>
//     </div>
//   );
// }

// import { useState, useMemo, useRef } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import { useComboBoxState } from "react-stately";
// import {
//   useComboBox,
//   useListBox,
//   useOption,
//   useButton,
//   useFocusRing,
// } from "react-aria";

// export default function Places() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY1,
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <GoogleMap
//         zoom={10}
//         center={selected || center}
//         mapContainerClassName="map-container"
//       >
//         {selected && <Marker position={selected} />}
//       </GoogleMap>
//     </>
//   );
// }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const state = useComboBoxState({
//     defaultFilter: (item, input) =>
//       item.description.toLowerCase().includes(input.toLowerCase()),
//     items: status === "OK" ? data : [],
//     selectedKey: null,
//   });

//   const inputRef = useRef();
//   const listBoxRef = useRef();

//   const { inputProps, listBoxProps } = useComboBox(
//     {
//       label: "Search an address",
//       inputRef,
//       listBoxRef,
//       onInputChange: (value) => setValue(value),
//       onSelectionChange: (key) =>
//         handleSelect(data.find((item) => item.place_id === key)),
//     },
//     state
//   );

//   const { focusProps, isFocusVisible } = useFocusRing();

//   const handleSelect = async (address) => {
//     clearSuggestions();

//     const results = await getGeocode({ address: address.description });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <div>
//       <label className="block mb-2 font-bold">Search an address</label>
//       <input
//         {...inputProps}
//         {...focusProps}
//         ref={inputRef}
//         disabled={!ready}
//         className={`w-full p-2 border ${
//           isFocusVisible ? "border-blue-500" : "border-gray-300"
//         } rounded`}
//         placeholder="Search an address"
//       />
//       {state.isOpen && (
//         <ul
//           {...listBoxProps}
//           ref={listBoxRef}
//           className="border mt-1 rounded shadow-lg max-h-48 overflow-auto"
//         >
//           {state.collection.map((item) => (
//             <Option key={item.key} item={item} state={state} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// function Option({ item, state }) {
//   const ref = useRef();
//   const { optionProps, isSelected } = useOption(
//     {
//       key: item.key,
//       shouldSelectOnPressUp: true,
//       shouldFocusOnHover: false,
//     },
//     state,
//     ref
//   );

//   return (
//     <li
//       {...optionProps}
//       ref={ref}
//       className={`cursor-pointer p-2 ${
//         isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//       }`}
//     >
//       {item.rendered.description}
//     </li>
//   );
// }

// import { useState, useMemo, useRef } from "react";
// import {
//   Map,
//   AdvancedMarker,
//   APIProvider,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import { useComboBoxState } from "react-stately";
// import { useComboBox, useListBox, useOption, useFocusRing } from "react-aria";

// export default function Places() {
//   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY1;

//   return <MapComponent apiKey={apiKey} />;
// }

// function MapComponent({ apiKey }) {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);
//   const [open, setOpen] = useState(false);

//   return (
//     <APIProvider apiKey={apiKey}>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>

//       <Map
//         zoom={10}
//         center={selected || center}
//         mapId={import.meta.env.VITE_MAP_ID}
//         style={{ height: "400px", width: "100%" }}
//       >
//         {selected && (
//           <>
//             <AdvancedMarker
//               position={selected}
//               draggable
//               onClick={() => setOpen(true)}
//             />
//             {open && (
//               <InfoWindow
//                 position={selected}
//                 onCloseClick={() => setOpen(false)}
//               >
//                 <div>
//                   <p>
//                     <b>Coordinates:</b> {selected.lat}, {selected.lng}
//                   </p>
//                 </div>
//               </InfoWindow>
//             )}
//           </>
//         )}
//       </Map>
//     </APIProvider>
//   );
// }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   // Convert the Places data into a format compatible with react-stately
//   const items =
//     status === "OK"
//       ? data.map((item) => ({
//           id: item.place_id,
//           description: item.description,
//         }))
//       : [];

//   const state = useComboBoxState({
//     items,
//     inputValue: value,
//     onInputChange: setValue,
//     onSelectionChange: (key) =>
//       handleSelect(items.find((item) => item.id === key)),
//   });

//   const inputRef = useRef();
//   const listBoxRef = useRef();

//   const { inputProps, listBoxProps } = useComboBox(
//     {
//       inputRef,
//       listBoxRef,
//     },
//     state
//   );

//   const { focusProps, isFocusVisible } = useFocusRing();

//   const handleSelect = async (item) => {
//     clearSuggestions();
//     const results = await getGeocode({ address: item.description });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <div>
//       <label className="block mb-2 font-bold">Search an address</label>
//       <input
//         aria-label="Search an address"
//         {...inputProps}
//         {...focusProps}
//         ref={inputRef}
//         disabled={!ready}
//         className={`w-full p-2 border ${
//           isFocusVisible ? "border-blue-500" : "border-gray-300"
//         } rounded`}
//       />
//       {state.isOpen && (
//         <ul
//           {...listBoxProps}
//           ref={listBoxRef}
//           className="border mt-1 rounded shadow-lg max-h-48 overflow-auto"
//         >
//           {state.collection.map((item) => (
//             <Option key={item.id} item={item} state={state} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// function Option({ item, state }) {
//   const ref = useRef();
//   const { optionProps, isSelected } = useOption(
//     {
//       key: item.id,
//     },
//     state,
//     ref
//   );

//   return (
//     <li
//       {...optionProps}
//       ref={ref}
//       className={`cursor-pointer p-2 ${
//         isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//       }`}
//     >
//       {item.description}
//     </li>
//   );
// }

////             disabled search field code ...............................................
// Import the default hook correctly
// import usePlacesAutocomplete from "use-places-autocomplete";
// import { useState, useMemo, useRef } from "react";
// import {
//   Map,
//   AdvancedMarker,
//   APIProvider,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
// import { useComboBoxState } from "react-stately";
// import { useComboBox, useListBox, useOption, useFocusRing } from "react-aria";

// export default function Places() {
//   const apiKey = import.meta.env.VITE_GOOGLE_API_KEY1;

//   return <MapComponent apiKey={apiKey} />;
// }

// function MapComponent({ apiKey }) {
//   const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);
//   const [open, setOpen] = useState(false);

//   return (
//     <APIProvider apiKey={apiKey} libraries={["places"]}>
//       <div className="places-container">
//         <PlacesSearch setSelected={setSelected} />{" "}
//         {/* Use PlacesSearch component */}
//       </div>

//       <Map
//         zoom={10}
//         center={selected || center}
//         mapId={import.meta.env.VITE_MAP_ID}
//         style={{ height: "400px", width: "100%" }}
//       >
//         {selected && (
//           <>
//             <AdvancedMarker
//               position={selected}
//               draggable
//               onClick={() => setOpen(true)}
//             />
//             {open && (
//               <InfoWindow
//                 position={selected}
//                 onCloseClick={() => setOpen(false)}
//               >
//                 <div>
//                   <p>
//                     <b>Coordinates:</b> {selected.lat}, {selected.lng}
//                   </p>
//                 </div>
//               </InfoWindow>
//             )}
//           </>
//         )}
//       </Map>
//     </APIProvider>
//   );
// }

// function PlacesSearch({ setSelected }) {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   // Convert the Places data into a format compatible with react-stately
//   const items =
//     status === "OK"
//       ? data.map((item) => ({
//           id: item.place_id,
//           description: item.description,
//         }))
//       : [];

//   const state = useComboBoxState({
//     items,
//     inputValue: value,
//     onInputChange: setValue,
//     onSelectionChange: (key) =>
//       handleSelect(items.find((item) => item.id === key)),
//   });

//   const inputRef = useRef();
//   const listBoxRef = useRef();

//   const { inputProps, listBoxProps } = useComboBox(
//     {
//       inputRef,
//       listBoxRef,
//     },
//     state
//   );

//   const { focusProps, isFocusVisible } = useFocusRing();

//   const handleSelect = async (item) => {
//     clearSuggestions();
//     const results = await getGeocode({ address: item.description });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <div>
//       <label className="block mb-2 font-bold">Search an address</label>
//       <input
//         aria-label="Search an address"
//         {...inputProps}
//         {...focusProps}
//         ref={inputRef}
//         disabled={!ready}
//         className={`w-full p-2 border ${
//           isFocusVisible ? "border-blue-500" : "border-gray-300"
//         } rounded`}
//       />
//       {state.isOpen && (
//         <ul
//           {...listBoxProps}
//           ref={listBoxRef}
//           className="border mt-1 rounded shadow-lg max-h-48 overflow-auto"
//         >
//           {state.collection.map((item) => (
//             <Option key={item.id} item={item} state={state} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// function Option({ item, state }) {
//   const ref = useRef();
//   const { optionProps, isSelected } = useOption(
//     {
//       key: item.id,
//     },
//     state,
//     ref
//   );

//   return (
//     <li
//       {...optionProps}
//       ref={ref}
//       className={`cursor-pointer p-2 ${
//         isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"
//       }`}
//     >
//       {item.description}
//     </li>
//   );
// }

import usePlacesAutocomplete from "use-places-autocomplete";
import { useState, useMemo, useRef } from "react";
import {
  Map,
  AdvancedMarker,
  APIProvider,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useComboBoxState } from "react-stately";
import { useComboBox, useFocusRing } from "react-aria";

export default function Places() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY1;

  return <MapComponent apiKey={apiKey} />;
}

function MapComponent({ apiKey }) {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div className="places-container">
        <PlacesSearch setSelected={setSelected} />{" "}
        {/* Use PlacesSearch component */}
      </div>

      <Map
        zoom={10}
        center={selected || center}
        mapId={import.meta.env.VITE_MAP_ID}
        style={{ height: "400px", width: "100%" }}
      >
        {selected && (
          <>
            <AdvancedMarker
              position={selected}
              draggable
              onClick={() => setOpen(true)}
            />
            {open && (
              <InfoWindow
                position={selected}
                onCloseClick={() => setOpen(false)}
              >
                <div>
                  <p>
                    <b>Coordinates:</b> {selected.lat}, {selected.lng}
                  </p>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </Map>
    </APIProvider>
  );
}

function PlacesSearch({ setSelected }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // Convert the Places data into a format compatible with react-stately
  const items =
    status === "OK"
      ? data.map((item) => ({
          id: item.place_id,
          description: item.description,
        }))
      : [];

  const state = useComboBoxState({
    items,
    inputValue: value,
    onInputChange: setValue,
    onSelectionChange: (key) =>
      handleSelect(items.find((item) => item.id === key)),
  });

  const inputRef = useRef();
  const listBoxRef = useRef();

  const { inputProps, listBoxProps } = useComboBox(
    {
      inputRef,
      listBoxRef,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  const handleSelect = async (item) => {
    clearSuggestions();
    const results = await getGeocode({ address: item.description });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <div>
      <label className="block mb-2 font-bold">Search an address</label>
      <input
        aria-label="Search an address"
        {...inputProps}
        {...focusProps} // Ensure focus is managed correctly
        ref={inputRef}
        disabled={!ready}
        className={`w-full p-2 border ${
          isFocusVisible ? "border-blue-500" : "border-gray-300"
        } rounded`}
      />
      {state.isOpen && (
        <ul
          {...listBoxProps}
          ref={listBoxRef}
          className="border mt-1 rounded shadow-lg max-h-48 overflow-auto"
        >
          {state.collection.map((item) => (
            <Option key={item.id} item={item} state={state} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Option({ item, state }) {
  const ref = useRef();
  const { optionProps, isSelected } = useOption(
    {
      key: item.id,
    },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`cursor-pointer p-2 ${
        isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"
      }`}
    >
      {item.description}
    </li>
  );
}
