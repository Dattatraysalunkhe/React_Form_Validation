import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    admin: false
  })

  const HandleChange = (e) => {
    if (e.target.id === 'admin') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if (e.target.type === 'text' || e.target.type === 'password') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })                                                                    // here we compare all valueinput 
    }

  }
  console.log(formData)

  const HandleSubmit = async (e) => {

    e.preventDefault()
    const res = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const data = await res.json();
    navigate('/signin')
  }

  return (
    <div className='max-w-7xl  mx-auto'>

      <nav className='w-full  sm:mx-10'>

        <div className='flex justify-between p-4  '>
          <div>

            <Link to={'/'} className=' p-3 rounded-xl hover:bg-slate-800 hover:text-white'>Home</Link>

          </div>
          <div>

            <Link to={'/signin'} className=' p-3 rounded-xl hover:bg-slate-800 hover:text-white'  >Signin</Link>

          </div>
        </div>

      </nav>

      <div className='shadow-2xl text-center mx-28 p-40 rounded-2xl mt-40'>
        <div className='mb-11'>
          <h1 className='text-3xl'>Sign up</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <form onSubmit={HandleSubmit} action="" className='flex flex-col items-center gap-7' >

            <input type="text" placeholder='FirstName' className='border rounded-lg p-2 w-80' id='firstname' value={formData.firstname} onChange={HandleChange} />
            <input type="text" placeholder='LastName' className='border rounded-lg p-2 w-80' id='lastname' value={formData.lastname} onChange={HandleChange} />
            <input type="text" placeholder='Username' className='border rounded-lg p-2 w-80' id='username' value={formData.username} onChange={HandleChange} />
            <input type="password" placeholder='password' className='border rounded-lg p-2 w-80' id='password' value={formData.password} onChange={HandleChange} />
            <div className='flex gap-4 items-center '>

              <span className='text-xl font-light capitalize'>admin </span>
              <input type="checkbox" className='' id='admin' checked={formData.admin} onChange={HandleChange} />
            </div>

            <button className='p-2 w-80 rounded-xl bg-black text-white hover:bg-opacity-70 uppercase '>signup</button>

          </form>
          <span className='mt-9'>
            <h1 >Dont Have an account...! <Link to='/signup' className='' >Signup</Link></h1>
          </span>
        </div>
      </div>

    </div>
  )
}

export default Signup
