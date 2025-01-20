import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';




function CaptainHome() {

    const [ridePopupPanel, setRidePopupPanel] = useState(true);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)


    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });



    }, [])




    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [ridePopupPanel])


    useGSAP(function () {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0%)'

            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'

            })
        }
    }, [confirmRidePopUpPanel])




    return (
        <div className='h-screen '>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen '>
                <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full '>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>

                </Link>
            </div>

            <div className='h-3/5 '>
                <img className='h-full w-full object-cover ' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="map" />
            </div>

            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>

            <div ref={ridePopupPanelRef} className=' fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12' >
                <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
            </div>

            <div ref={confirmRidePopupPanelRef} className=' fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12' >
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
};

export default CaptainHome;
