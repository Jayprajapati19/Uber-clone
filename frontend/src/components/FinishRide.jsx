import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {

  const navigate = useNavigate();

  async function endRide(){
    const rideId = props.ride._id;
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {rideId},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if(response.status === 200){
      navigate("/captain-home");
    }
  }

  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="text-center font-bold absolute p-1 top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold">Finish this ride</h3>
      <div className="flex items-center border-yellow-400 border-2 justify-between p-4 rounded-lg mt-6">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>

      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-2xl ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-fill text-2xl"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600 ">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-2xl ri-currency-fill"></i>
            <div>
              <h3 className="text-xl font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600 ">Cash, Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full ">
              <button
                onClick={endRide}
                className=" bg-green-600 text-lg w-full text-white font-semibold py-4 px-3 rounded-lg"
              >
                Finish
              </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
