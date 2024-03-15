import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signoutUser} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
function Profile() {

  const { currentUser } = useSelector((state) => state.user)
  const [drop,setDrop] =useState(false)
  const dispatch = useDispatch()
console.log(drop)
  const navigate= useNavigate()

const handlesignout = async() => {

 
           
  const res = await fetch('/api/auth/signout')

  const data = await res.json()

  dispatch(signoutUser())
  navigate('/')

}

  return (
    <div className='max-w-7xl mx-auto '>

      <nav className='w-full  sm:mx-10 relative'>

        <div className='flex p-4 justify-between '>
          <div>
            <Link  to={'/'} className=' p-3 rounded-xl hover:bg-slate-800 hover:text-white' >Home</Link>
           
          </div>
          <div className='ml-[1150px] mt-20 absolute'>
            {
                (drop === true) ? (
                  <div className=' '>
                    
                    <ul className=' flex flex-col gap-1 border to-black px-2 p-2'>
                       
                       {/* <Link to={'/admin'} className='px-10 rounded-lg capitalize  py-3 hover:bg-gray-700 hover:text-white ' >Admin</Link> */}
                       {
                        (currentUser.data.admin === true) ? (
                          <Link to={'/admin'} className='text-center px-10 rounded-lg capitalize  py-3 hover:bg-gray-700 hover:text-white ' >Admin</Link>
                        ) : ("")
                       }
                       
                       <Link to={'/profileupdate'} className='text-center px-1 rounded-lg capitalize  py-4 hover:bg-gray-700 hover:text-white ' >Profile Update</Link>
                       {
                        (currentUser) ? (
                          <button className='text-center px-1 rounded-lg capitalize  py-3 hover:bg-gray-700 hover:text-white ' onClick={handlesignout} >Sign out</button>
                        ) : ('')
                       }
                    </ul>
              </div>
                ) : ("")
            }
          </div>
         {

          

            
         }
         <button className='' onClick={(e) => {setDrop(!drop)}} >{currentUser.data.username}</button>

         {/* (currentUser.data) ? (<h1>{currentUser.data.username}</h1>) : (<Navigate to={'/signin'}/>) */}
          
        </div>

      </nav>


     

      <div className='max-w-3xl mx-auto  text-center mt-16'>

        <h1 className='text-3xl capitalize p-4 font-medium'>{`Welcome Back @${currentUser.data.username}`}</h1>

      </div>

      <div className='max-w-3xl text-center  p-10  mx-auto mt-20 flex flex-col gap-10 shadow-2xl'>
        <div>
          <h1 className='text-6xl font-bold uppercase'>Profile Page</h1>
        </div >
        <div className='flex gap-3 mx-10 text-2xl justify-center'>
          <h1>FirstName :</h1>
          <h1>{currentUser.data.firstname}</h1>
        </div>
        <div className='flex gap-3 mx-10 text-2xl justify-center '>
          <h1>LastName :</h1>
          <h1>{currentUser.data.lastname}</h1>
        </div>
      </div>

    </div>
  )
}

export default Profile
