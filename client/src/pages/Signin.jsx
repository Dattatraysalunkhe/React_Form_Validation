import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
function Signin() {

    const currrentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    console.log(formData)

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json()

        dispatch(signInSuccess(data))
        navigate('/profile')
    }


    return (
        <div className='max-w-7xl  mx-auto'>

            <nav className='w-full  sm:mx-10'>

                <div className='flex justify-between p-4  '>
                    <div>

                        <Link to={'/'} className=' p-3 rounded-xl hover:bg-slate-800 hover:text-white'>Home</Link>

                    </div>
                    <div>

                        <Link to={'/signin'} className=' p-3 rounded-xl hover:bg-slate-800 hover:text-white'  >Signup</Link>

                    </div>
                </div>

            </nav>

            <div className='shadow-2xl text-center mx-28 p-40 rounded-2xl mt-40'>
                <div className='mb-11'>
                    <h1 className='text-3xl'>Login</h1>
                </div>
                <div className='flex flex-col gap-3'>
                    <form onSubmit={HandleSubmit} action="" className='flex flex-col items-center gap-7' >

                        <input type="text" placeholder='USername' className='border rounded-lg p-2 w-80' id='username' onChange={HandleChange} />
                        <input type="password" placeholder='password' className='border rounded-lg p-2 w-80' id='password' onChange={HandleChange} />

                        <button className='p-2 w-80 rounded-xl bg-black text-white hover:bg-opacity-70 uppercase '>signin</button>

                    </form>
                    <span className='mt-9'>
                        <h1 >Dont Have an account...! <Link to='/signup' className='' >Signup</Link></h1>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Signin
