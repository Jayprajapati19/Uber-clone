import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

function UserSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    // Get context value safely
    const userContext = useContext(UserDataContext);
    const setUser = userContext?.setUser;

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                newUser
            );

            if (response.status === 201) {
                const data = response.data;
                setUser?.(data.user); // Safely call setUser if it's defined
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        } catch (error) {
            console.error('Error creating user:', error.response?.data || error.message);
        }

        // Clear form fields
        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-16 mb-10'
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="logo"
                />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's Your Name</h3>

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

                    <h3 className='text-lg font-medium mb-2'>What's Your Email</h3>

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
                        Create account
                    </button>
                    <p className='text-center'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-blue-600'>
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
    );
}

export default UserSignUp;
