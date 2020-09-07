import React from 'react';
import Signup from '../Signup/signup';
import Login from '../Login/login';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { viewSignup:false, viewLogin:false };
        this.toggleSignup = this.toggleSignup.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
    }

    toggleSignup() {
     
        this.setState(state => ({
            viewSignup:!state.viewSignup,
            viewLogin:false
        }))
    }

    toggleLogin() {
     
        this.setState(state => ({
            viewLogin:!state.viewLogin,
            viewSignup:false
        }))
    }
    
    render() {

        return (
            <div>
                <div className='relative w-screen grid grid-cols-12 bg-burgundyred' style={{ height:"80vh" }}>
                    <div className='col-start-2 col-end-6 flex flex-col justify-center text-white h-full quicksand'>
                        <p className='m-0 text-3xl font-semibold'>note taking on steroids. a much better, much improved way to take notes</p>
                        <div className='flex flex-row mt-4'>
                            <p className='p-4 mr-3 cursor-pointer' onClick={this.toggleSignup} style={{ width:"max-content", borderRadius:"0px 10px 10px 10px", boxShadow:"0px 3px 3px 2px rgba(0,0,0,0.1)" }}>Sign Up</p>
                            <p className='p-4 cursor-pointer' onClick={this.toggleLogin} style={{ width:"max-content", borderRadius:"10px 0px 10px 10px",  boxShadow:"0px 3px 3px 2px rgba(0,0,0,0.1)" }}>Sign In</p>
                        </div>
                    </div>
                    <div className='col-start-7 col-end-11 h-full py-12'>
                        <div className='relative h-full'>
                            <img src="/images/home/notes.jpg" className='w-full h-full' alt="papers" />
                            <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor:"rgba(0,0,0,0.3)" }}></div>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-screen p-6 text-white quicksand'>
                        <p className='m-0'>nota</p>
                    </div>
                </div>
                <div className='bg-offwhite py-32 grid grid-cols-12 quicksand'>
                    <div className='col-start-2 col-end-12 grid grid-cols-12 gap-3'>
                        <div className="mb-3 text-lg font-semibold col-span-12">what nota offers</div>
                        <div className='col-span-7 grid grid-cols-12 h-12 gap-3'>
                            <div className='relative col-span-6 bg-white shadow-lg flex flex-col p-6'>
                                <div className='relative mb-5 h-48'>
                                    <img src="/images/home/phone.jpg" className='w-full h-full object-cover' alt="WYSIWYG" />
                                    <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor:"rgba(0,0,0,0.3)" }}></div>
                                </div>
                                
                                <p className='m-0 mb-1 text-lg font-semibold'>WYSIWYG</p>
                                <p className='m-0'>leverage the wysiwyg mechanisms provided by nota to create and format notes to your
                                liking.
                                </p>

                                <div className='absolute left-0 w-24 h-10 bg-burgundyred shadow-lg' style={{ bottom:"-65px" }}></div>
                            </div>
                            <div className='col-span-6 bg-white shadow-lg flex flex-col p-6'>
                                <div className='relative mb-5 h-48'>
                                    <img src="/images/home/secure.jpg" className='w-full h-full object-cover' alt="WYSIWYG" />
                                    <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor:"rgba(0,0,0,0.3)" }}></div>
                                </div>

                                <p className='m-0 mb-3 text-xl font-semibold'>security</p>
                                <p className='m-0'>
                                    Nota makes use of industry best practices to provide auto escaping of content to prevent attacks like
                                    script injections.
                                </p>
                            </div>
                        </div>
                        <div className='relative col-span-5 shadow-lg bg-white flex flex-col p-6' style={{ height:"80vh"}}>
                            <div className='relative mb-5 h-48'>
                                <img src="/images/home/integrity.jpg" className='w-full h-full object-cover' alt="data integrity" />
                                <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor:"rgba(0,0,0,0.3)" }}></div>
                            </div>
                            <div className='flex flex-col mb-4'>
                                <p className='m-0 font-semibold text-md mb-2 lowercase'>Data Integrity</p>
                                <p className='m-0'>this is a core feature and priority of nota. create, read, update and delete your notes seamlessly.
                                you never have to bother about missing data anymore </p>
                            </div>
                            <div className='m-0 lowercase'>
                                How about you create your first note with Nota today. <p className='m-0 underline'>signup</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-16 bg-burgundyred grid grid-cols-12 quicksand text-white'>
                    <div className='col-start-2 col-end-5 flex flex-col'>
                        <p className='m-0 font-semibold text-xl mb-4'>NOTA</p>
                        <p className='m-0'>note taking redefined. take advantage of the latest technology to create your notes and jot down your thoughts.
                        never have to be apart from your thoughts. reliable, fast and secure.</p>
                    </div>
                    <div className='flex flex-col col-start-6 col-end-9 pl-4'>
                        <p className='m-0 font-semibold text-xl mb-4'>CONTACT</p>
                        <div className='flex flex-row items-center mb-3'>
                            <i className='fas fa-map-marker-alt mr-3'></i>
                            <p className='m-0'>3, Bisi Awosika Street, Ologolo, Lekki</p>
                        </div>
                        <div className='flex flex-row items-center mb-3'>
                            <i className='fas fa-phone-alt mr-3'></i>
                            <p className='m-0'>+2348179868840</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <i className='fas fa-envelope mr-3'></i>
                            <p className='m-0'><a href='mailto:olamileke.dev@gmail.com'>support@nota.in</a></p>
                        </div>
                    </div>
                    <div className='flex flex-col col-start-10 col-end-12'>
                        <p className='m-0 font-semibold text-xl mb-4'>SOCIAL MEDIA</p>
                        <div className='flex flex-row items-center mb-3'>
                            <i className='fab fa-facebook mr-3'></i>
                            <a href='https://www.facebook.com/fambegbe.olamileke' target="_blank"> Facebook</a>
                        </div>
                        <div className='flex flex-row items-center mb-3'>
                            <i className='fab fa-twitter mr-3'></i>
                            <a href='https://twitter.com/f_olamileke' target='_blank'>Twitter</a>
                        </div>
                        <div className='flex flex-row items-center'>
                            <i className='fab fa-instagram mr-4'></i>
                            <a href='https://instagram.com/f_olamileke' target='_blank'>Instagram</a>
                        </div>
                    </div>
                </div>
                <div className={this.state.viewSignup || this.state.viewLogin ? 'fixed top-0 left-0 transition-colors opacity-100 z-20 duration-300 ease-in w-screen h-screen' :
                'fixed top-0 left-0 transition-colors opacity-0 duration-300 z--9999 ease-in w-screen h-screen'} style={{ backgroundColor:"rgba(0,0,0,0.85)" }}></div>
                <Signup display={ this.state.viewSignup } login={ this.toggleLogin } close={ this.toggleSignup } />
                <Login display={ this.state.viewLogin } signup={ this.toggleSignup } close={ this.toggleLogin } />
            </div>
        )
    }
}

export default Home;