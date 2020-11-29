import React from 'react';
import { withRouter } from 'react-router-dom';
import { checkActivationToken, checkPasswordResetToken } from '../../services/user';
import { notifyError, notifySuccess } from '../../services/notify';
import Signup from '../Signup/signup';
import Login from '../Login/login';
import ChangePassword from '../Change-Password/change-password';
import './home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { viewSignup:false, viewLogin:false, viewChangePassword:false, resetToken:null };
        this.toggleSignup = this.toggleSignup.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.verifyResetToken = this.verifyResetToken.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const token = localStorage.getItem('nota_token');

        if(token) {
            this.props.history.push('/dashboard');
            return;
        }

        const path = window.location.pathname;

        if(path.startsWith('/email/confirm/')) {
            this.verifyEmail();
            return;
        }

        if(path.startsWith('/password/change/')) {
            this.verifyResetToken();
        }
    }

    async verifyEmail() {
        const token = this.props.match.params.token;
        const data = {token};

        try {
            await checkActivationToken(data);
            notifySuccess('email confirmed successfully!');
        }
        catch(error) {
            if(error.response && error.response.status == 404) {
                notifyError('invalid activation token!');
            }
        }
    }

    async verifyResetToken() {
        const token = this.props.match.params.token;

        try {
            await checkPasswordResetToken(token);
            this.setState({ viewChangePassword:true, resetToken:token });
        }
        catch(error) {
            if(error.response && error.response.status == 400) {
                notifyError('invalid reset token');
            }
        }
    }

    toggleSignup() {
     
        this.setState(state => ({
            viewSignup:!state.viewSignup,
            viewLogin:false,
            viewChangePassword:false,
        }))
    }

    toggleLogin() {
     
        this.setState(state => ({
            viewLogin:!state.viewLogin,
            viewSignup:false,
            viewChangePassword:false,
        }))
    }
    
    render() {

        return (
            <div>
                <div className='relative w-screen grid grid-cols-12 bg-cloudred landing__page'>
                    <div className='col-start-2 col-end-11 sm:col-end-10 bsm:col-end-8 md:col-end-7 lg:col-end-6 flex flex-col justify-center text-white quicksand landing__page'>
                        <p className='m-0 text-2xl sm:text-3xl mb-5 sm:font-semibold'>note taking on steroids. a much better, much improved way to take notes</p>
                        <div className='flex flex-row'>
                            <p className='p-4 mr-3 cursor-pointer text-white shadow-lg' onClick={this.toggleSignup} style={{ width:"max-content" }}>Sign Up</p>
                            <p className='p-4 cursor-pointer' onClick={this.toggleLogin} style={{ width:"max-content", boxShadow:"0px 3px 3px 2px rgba(0,0,0,0.1)" }}>Sign In</p>
                        </div>
                    </div>
                    <div className='col-start-7 col-end-11 hidden lg:block landijng__page'>
                        <div className='relative h-full flex flex-row items-center'>
                            <img src="/images/home/notes.jpg" className='w-full object-cover h-4/5' alt="papers" />
                            <div className='absolute top-0 left-0 w-full h-4/5' style={{ backgroundColor:"rgba(0,0,0,0.3)", top:'10%' }}></div>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-screen p-6 text-white quicksand'>
                        <p className='m-0'>nota</p>
                    </div>
                </div>
                <div className='grid grid-cols-12 pt-24 pb-16 md:py-32 bg-offwhite quicksand'>
                    <div className='col-start-2 col-end-12 lg:pr-12 grid grid-cols-12'>
                        <div className='hidden md:block col-span-5 relative versioning'>
                            <img src='/images/home/evolution.jpg' className='w-full h-full'/>
                            <div className='absolute top-0 left-0 w-full h-full' style={{ backgroundColor:"rgba(0,0,0,0.23)" }}></div>
                        </div>
                        <div className='col-span-12 md:col-start-6 md:col-span-7 md:pl-16 lg:col-start-7 lg:pl-5 text-justify lg:pr-10 lg:col-span-6 flex flex-col justify-center'>
                             <p className='m-0 text-xl text-center md:text-left font-semibold mb-6'>track your note evolution with nota</p>
                             <p className='m-0 hidden md:inline text-lg mb-2'>
                                nota has been especially crafted with usability in mind. new versions of your notes are generated every time you save it. 
                             </p>
                             <p className='m-0 hidden md:inline mb-2 text-lg'>
                                 take advantage of this to go down memory lane and view the very change and evolution of your note from inception to completion.
                             </p>
                             <p className='m-0 hidden md:inline text-lg'>
                                this also makes it remarkably easy to revert to previous versions of your notes. 
                             </p>
                             <p className='m-0 text-center text-lg leading-8 md:hidden'>
                                nota has been especially crafted with usability in mind. new versions of your notes are generated every time you save it. 
                                take advantage of this to go down memory lane and view the very change and evolution of your note from inception to completion.
                                this also makes it remarkably easy to revert to previous versions of your notes. 
                             </p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 bg-offwhite quicksand'>
                    <div className='col-start-2 col-end-12  grid grid-cols-12 col-gap-3'>
                        <div className='col-span-12 lg:col-span-4 relative mb-3 lg:mb-0'>
                            <img src='/images/home/phone.jpg' className='object-cover w-full features__image' />
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.55)" }}>
                                <p className='m-0 mb-5 text-xl'>WYSIWYG</p>
                                <p className='m-0'>
                                nota comes powered with a wysiwyg editor enabling you to create nicely formatted text. 
                                leverage these mechanisms to create and format notes to your liking.
                                </p>
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-4 relative mb-3 lg:mb-0'>
                            <img src='/images/home/secure.jpg' className='object-cover w-full features__image' />
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.6)" }}>
                                <p className='m-0 mb-5 text-xl'>security</p>
                                <p className='m-0'>
                                    nota makes use of industry best practices to provide auto escaping of content to prevent attacks like
                                    script injections. 
                                </p>
                            </div>
                        </div>
                        <div className='col-span-12 lg:col-span-4 relative mb-3 lg:mb-0'>
                            <img src='/images/home/integrity.jpg' className='object-cover w-full features__image' />
                            <div className='absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center text-white font-semibold' style={{ background:"rgba(0,0,0,0.6)" }}>
                                <p className='m-0 mb-5 text-xl'>note downloads</p>
                                <p className='m-0'>
                                    generate your notes as downloadable pdfs with nota. with this, easily have your notes for use on other devices
                                    and platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-20 pb-24 lg:py-32 flex flex-col justify-center items-center bg-offwhite quicksand'>
                    <div className='flex flex-col items-center col-start-4 col-end-9'>
                        <img src='/images/home/hand.png' alt='Get writing today' className='footer_img w-64 mb-5' />
                        <p className='m-0 text-lg text-center md:text-left px-8 md:px-0'>Get writing today. water does not flow until the faucet gets turned on</p>
                    </div>
                </div>
                <div className='py-16 bg-reddishbrown grid grid-cols-12 quicksand text-white'>
                    <div className='mb-6 bsm:mb-0 col-start-2 col-end-12 bsm:col-end-5 flex flex-col'>
                        <p className='m-0 font-semibold text-xl mb-4'>NOTA</p>
                        <p className='m-0'>note taking redefined. take advantage of the latest technology to create your notes and jot down your thoughts.
                        <div className='hidden lg:block'>never have to be apart from your thoughts.</div></p>
                    </div>
                    <div className='flex flex-col col-start-2 col-end-12 mb-6 bsm:mb-0 bsm:col-start-6 bsm:col-end-9 lg:pl-4'>
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
                    <div className='flex flex-col col-start-2 col-end-12 bsm:col-start-10 bsm:col-end-13 md:col-end-12'>
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
                <div className={this.state.viewSignup || this.state.viewLogin || this.state.viewChangePassword ? 'fixed top-0 left-0 transition-colors opacity-100 z-10 duration-300 ease-in w-screen h-screen' :
                'fixed top-0 left-0 transition-colors opacity-0 duration-300 z--9999 ease-in w-screen h-screen'} style={{ backgroundColor:"rgba(0,0,0,0.85)" }}></div>
                <Signup display={ this.state.viewSignup } login={ this.toggleLogin } close={ this.toggleSignup } />
                <Login display={ this.state.viewLogin } signup={ this.toggleSignup } close={ this.toggleLogin } />
                <ChangePassword display={this.state.viewChangePassword} token={this.state.resetToken} switchToLogin={this.toggleLogin} />
            </div>
        )
    }
}

export default withRouter(Home);