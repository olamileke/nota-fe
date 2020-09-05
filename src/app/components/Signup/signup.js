import React from 'react';

function Signup(props) {
    return (
        <div className={props.display ? 'transition-all duration-300 ease-in z-50 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center' :
        'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center'} style={{ backgroundColor:"rgba(0,0,0,0.3)" }}>
            <div className='relative flex flex-col bg-white w-2/6 quicksand py-5' style={{ borderRadius:"13px", top:"0px", fontFamily:"Kumbh Sans, sans-serif" }}>
                <p className='text-center m-0 mb-2 font-semibold text-2xl'>Hello</p>
                <p className='text-center m-0 mb-5 text-base text-gray-700'>Create your new Nota account.</p>

                <form className='px-8 mb-3 quicksand'>
                    <div className='flex flex-col mb-3 relative'>
                        <input id='name' type='text' className='duration-300 ease-in transition-colors border focus:outline-none p-3 pl-10 border border-grey-100' style={{ borderRadius:"9px" }} placeholder='Full Name' autoFocus />
                        <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-user-circle text-gray-600' style={{ top:"2px" }}></i>
                    </div>
                    <div className='flex flex-col mb-3 relative'>
                        <input id='email' type='email' className='duration-300 ease-in transition-colors border focus:outline-none p-3 pl-10 border border-grey-100' style={{ borderRadius:"9px" }} placeholder='Email' />
                        <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-envelope text-gray-600' style={{ top:"2px" }}></i>
                    </div>
                    <div className='flex flex-col mb-5 relative'>
                        <input id='password' type='password' className='duration-300 ease-in transition-colors border focus:outline-none p-3 pl-10 border border-grey-100' style={{ borderRadius:"9px" }} placeholder='Password' />
                        <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                    </div>
                    <div className='mb-3'>
                        <button className='w-full p-3 text-white' style={{ borderRadius:"10px 10px 10px 0", background:"#a9564b" }}>Signup to Nota</button>
                    </div>
                </form>
                <hr/>
                <div className='text-center pt-5 text-gray-700'>
                    Already have an account ? <a className='m-0 cursor-pointer' onClick={ props.login }>login</a>
                </div>
                <i class='absolute top-0 left-0 mt-5 ml-5 fa fa-times text-2xl cursor-pointer' onClick={props.close}></i>
            </div>
        </div>
    )
}

export default Signup;