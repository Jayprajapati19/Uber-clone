import React from 'react'
import { Link } from 'react-router-dom'


const CaptainRiding = () => {
    return (
        <div className='h-screen '>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen '>
                <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-riding' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full '>

                    <i className="text-lg font-medium ri-logout-box-r-line"></i>

                </Link>
            </div>

            <div className='h-3/5 '>
                <img className='h-full w-full object-cover ' src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="map" />
            </div>

            <div className='h-2/5 p-6'>

            </div>


        </div>
    )
}

export default CaptainRiding