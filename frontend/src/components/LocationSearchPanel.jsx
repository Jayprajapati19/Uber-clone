import React from 'react'

const LocationSearchPanel = (props) => {

    console.log(props);


    // smaple array for lacation

    const locations = [
        "19B, Near Kapoor's cafe, Ahemdabad, Gujarat",
        "35B, Near Ajays's cafe, Mehsana, Bhopal",
        "44A, Near Malhotra cafe, Mehsana, MP",
        "22D, Near JP's cafe, Mehsana, Pune",
        "39J, Science City, Ahemdabad, Gujarat",
    ]



    return (
        <div>
            {/* this is a just sample data */}

            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true);
                        props.setPanelOpen(false);
                    }} className='flex gap-4  border-2 p-3 border-gray-100 active:border-black rounded-xl  items-center my-2 justify-start '>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center  w-12  rounded-full'>
                            <i className="ri-map-pin-fill "></i>
                        </h2>
                        <h4 className='font-medium '>{elem}</h4>
                    </div>


                })
            }



        </div>
    )
}

export default LocationSearchPanel