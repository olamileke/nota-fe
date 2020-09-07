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
                            <p className='p-4 mr-3 cursor-pointer bg-white text-white shadow-lg' onClick={this.toggleSignup} style={{ width:"max-content", background:"#8C2F39" }}>Sign Up</p>
                            <p className='p-4 cursor-pointer' onClick={this.toggleLogin} style={{ width:"max-content", boxShadow:"0px 3px 3px 2px rgba(0,0,0,0.1)" }}>Sign In</p>
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
                <div className='grid grid-cols-12 pt-32 pb-24 bg-offwhite quicksand'>
                    <div className='col-start-2 col-end-11 grid grid-cols-12'>
                        <div className='col-span-5 pl-6 font-semibold'>
                            <img src='/images/home/downloading.svg' />
                        </div>
                        <div className='col-start-7 pl-5 col-span-6 flex flex-col justify-center'>
                             <p className='m-0 text-2xl font-semibold mb-6'>track your note evolution with nota's note versioning feature</p>
                             <p className='m-0 text-lg mb-2'>
                                nota has been especially crafted with usability in mind. new versions of your notes are generated every time you save it. 
                             </p>
                             <p className='m-0 mb-2 text-lg'>
                                 take advantage of this to go down memory lane and view the very change and evolution of your note from inception to completion.
                             </p>
                             <p className='m-0 text-lg'>
                                this also makes it remarkably easy to revert to previous versions of your notes. 
                             </p>
                        </div>
                    </div>
                </div>
                <div className='py-16 grid grid-cols-12 quicksand'>
                    <div className='col-start-2 col-end-12  grid grid-cols-12 col-gap-3'>
                        <div className='col-span-4 relative'>
                            <img src='/images/home/phone.jpg' className='object-cover w-full' style={{ height:"65vh" }}/>
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.6)" }}>
                                <p className='m-0 mb-5 text-xl'>WYSIWYG</p>
                                <p className='m-0'>
                                nota comes powered with a wysiwyg editor enabling you to create nicely formatted text. 
                                leverage these mechanisms to create and format notes to your liking.
                                </p>
                            </div>
                        </div>
                        <div className='col-span-4 relative'>
                            <img src='/images/home/secure.jpg' className='object-cover w-full' style={{ height:"65vh" }}/>
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.6)" }}>
                                <p className='m-0 mb-5 text-xl'>security</p>
                                <p className='m-0'>
                                    nota makes use of industry best practices to provide auto escaping of content to prevent attacks like
                                    script injections. files and images are also securely stored in the cloud.
                                </p>
                            </div>
                        </div>
                        <div className='col-span-4 relative'>
                            <img src='/images/home/integrity.jpg' className='object-cover w-full' style={{ height:"65vh" }}/>
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.6)" }}>
                                <p className='m-0 mb-5 text-xl'>note downloads</p>
                                <p className='m-0'>
                                    nota makes use of industry best practices to provide auto escaping of content to prevent attacks like
                                    script injections. files and images are also securely stored in the cloud.
                                </p>
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