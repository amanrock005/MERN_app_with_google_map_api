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
