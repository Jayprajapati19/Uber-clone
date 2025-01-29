const LocationSearchPanel = (props) => {
  const { suggestions, handleSuggestionClick, setSuggestions } = props;

  return (
    <div className="mt-10">
      {suggestions.map((suggestion, index) => {
        return (
          <div
            onClick={() => {
              handleSuggestionClick(suggestion.description);
              if (props.inputType === "destination") {
                props.setVehiclePanel(true);
                props.setPanelOpen(false);
                props.findTrip();
              } else{
                props.setVehiclePanel(false);
                props.setPanelOpen(true);
                setSuggestions([]);
              }
            }}
            key={index}
            className="flex items-center border-2 border-transparent active:border-black p-2 rounded-xl mb-1 justify-start gap-4"
          >
            <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill text-lg"></i>
            </h2>
            <h4 className="font-semibold w-full">{suggestion.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
