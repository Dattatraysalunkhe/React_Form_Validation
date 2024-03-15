import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Home() {

  const { currentUser } = useSelector((state) => state.user)


  return (
    <div className='max-w-7xl mx-auto'>

      {
        (!currentUser) ? (
          <div className=' mx-auto bg-black text-center flex justify-center gap-4 mt-72 p-4 rounded-lg hover:shadow-2xl text-white'>
            <Link to={'/signin'} className='-950 px-6 py-2 hover:shadow-xl rounded-lg hover:bg-gray-700 hover:text-white border' > <h1>Signin</h1></Link>
            <Link to={'/signup'} className='-950 px-6 py-2 hover:shadow-xl rounded-lg hover:bg-gray-700 hover:text-white border' > <h1>Signup</h1></Link>
          </div>)
          : (
            <div className='max-w-xl mx-auto text-center flex justify-center  mt-72 p-4  flex-col gap-4' >
              <h1 className='text-6xl capitalize'>{`Welcome ${currentUser.data.username} ....`}</h1>
              <Link to={'/profile'}  className='-950 px-6 py-2 hover:shadow-xl rounded-lg hover:bg-gray-700 hover:text-white border bg-black text-white' >Profile</Link>
            </div>
          )
      }



    </div>
  )
}

export default Home
