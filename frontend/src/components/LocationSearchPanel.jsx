import React from 'react'

const LocationSearchPanel = ({
    suggestions,
    setPickup,
    setDestination,
    activeField,
    setPanelOpen,
    setVehiclePanel,
    loading
}) => {
    const handleSuggestionClick = (suggestion) => {
        const locationText = suggestion.description || suggestion.structured_formatting.main_text

        if (activeField === 'pickup') {
            setPickup(locationText)
        } else {
            setDestination(locationText)
        }
        // setPanelOpen(false)
        // setVehiclePanel(true)
    }

    return (
        <div className="p-2">
            {loading ? (
                <div className="p-4 text-center text-gray-600">
                    Loading suggestions...
                </div>
            ) : !suggestions.length ? (
                <div className="p-4 text-center text-gray-600">
                    Type to search locations...
                </div>
            ) : (
                suggestions.map((suggestion, idx) => (
                    <div
                        key={suggestion.place_id || idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className='flex gap-4 border-2 p-3 border-gray-500 hover:border-black rounded-xl items-center my-2 cursor-pointer'
                    >
                        <div className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='font-medium'>
                                {suggestion.structured_formatting?.main_text || suggestion.description}
                            </h4>
                            {suggestion.structured_formatting?.secondary_text && (
                                <p className='text-sm text-gray-500'>
                                    {suggestion.structured_formatting.secondary_text}
                                </p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default LocationSearchPanel


