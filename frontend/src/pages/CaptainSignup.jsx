import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CaptainSignup() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password
        }


        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
    };

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between '>
            <div>
                <img className='w-20 mb-3 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg w-full font-medium mb-2'>What's Your Captain's  Name</h3>

                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm'
                            type="text"
                            placeholder='First Name'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-sm'
                            type="text"
                            placeholder='Last Name'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's Your Captain's Email</h3>

                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        type="password"
                        placeholder='password'
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                    >
                        Login
                    </button>
                    <p className='text-center'>
                        Already have an account?{' '}
                        <Link to='/captain-login' className='text-blue-600'>
                            Login here
                        </Link>
                    </p>
                </form>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>
                    This site is protected by reCAPTCHA and the{' '}
                    <span className='underline'>Google Privacy Policy</span> and{' '}
                    <span className='underline'>Terms of Service apply</span>.
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup