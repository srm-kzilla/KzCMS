import React from 'react'

const colors = {
    primary: "#060606",
    background: "E0E0E0",
    disabled: "#D9D9D9"
}

const login = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col lg:flex-row   bg-black from-black">
        <div className="relative w-1/2 h-full flex flex-col">
            <div className= 'absolute top-[20%] left-[10%] flex flex-col'>
         
               
            </div>
            <img src='http://mpr.swalekha.in/assets/images/login.png' className='w-full mx-auto h-full md:w-38 lg:w-full  bg-cover object-cover
            '/>
        </div>
     

        <div className='w-full lg:w-1/2 h-full md:w-full  bg-gradient-to-r from-slate-900 to-slate-700 flex flex-col p-20 text-sm md:text-xl justify-between'>
            

            <div className='w-full flex flex-col max-w-[300px]'>
                <h3 className='text-4xl  font-semibold bg-gradient-to-br from-orange-300  to-blue-300 mb-4 text-transparent bg-clip-text '>Welcome to Kzilla cockpit</h3>
                <p className='text-sm text-transparent bg-clip-text text-white mb-2'>Welcome Back! Please enter your details</p>
            </div>


            <div className='w-full flex flex-col'>
                <input 
                    type="email"
                    placeholder='Email'
                    className='w-full text-white py-2 my-4 bg-transparent border-b border-white outline-none focus:outline-none' />


                <input 
                type ="password"
                placeholder='Password'
                className='w-full text- py-2 my-4 bg-transparent border-b border-white outline-none focus:outline-none'/>
            </div>

            <div className='w-full flex flex-col my-4'>
                <div className='relative group'>
                    <div className='absolute -inset-0 bg-gradient-to-r from-orange-500 via-green-300 to-blue-600 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-800 '></div>
                <button type="button" className=' relative w-full  my-2 font-semibold  bg-gray-950  rounded-md p-4 text-center flex items-center justify-center'>
                    Log in
                </button>
                </div>
            </div>

            <div className='w-full flex items-center justify-center'>
                <p className='text-sm font-normal text-[#E0E0E0]'>Don't have an account? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up for free</span></p>
            </div>


    </div>

   

    </div>
  )
}

export default login
