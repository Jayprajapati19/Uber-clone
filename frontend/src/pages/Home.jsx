import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <div className='bg-cover  bg-center bg-[url(https://cdn.cars24.com/prod/auto-news24-cms/CARS24-Blog-Images/2024/09/26/dde48427-4b52-46d0-81c2-91df594db64c-RED-LIGHT.jpg)] h-screen pt-8 flex justify-between flex-col w-full '>
                <img className='w-16 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-3xl font-bold '>Get Started with Uber</h2>
                    <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>

                </div>
            </div>
        </div>
    )
}

export default Home
