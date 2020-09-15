import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/loader';
import { authenticate } from '../../services/user';
import { notifySuccess, notifyError } from '../../services/notify';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email:'', password:'', emailIsValid:true, passwordIsValid:true, requestActive:false };
        this.change = this.change.bind(this);
        this.login = this.login.bind(this);
    }

    change(event) {
        const [name, error] = event.target.name.split('|');
        const value = event.target.value;
        let validate;
        name == 'email' ? validate = this.validateEmail(value) : validate = this.validatePassword(value);

        this.setState({ [name]:value, [error]:validate });
    }

    login(event) {
        event.preventDefault();

        if(!this.validateEmail(this.state.email) || !this.validatePassword(this.state.password)) {
            return;
        }

        this.setState({ requestActive:true });
        const user = { email:this.state.email, password:this.state.password };

        authenticate(user)
        .then(response => {
            console.log(response);
            const user = response.data.data.user;
            const token = response.data.data.token;

            localStorage.setItem('nota_user', JSON.stringify(user));
            localStorage.setItem('nota_token', token);
            notifySuccess('Logged in successfully');
            this.props.history.push('/dashboard');
        })
        .catch(error => {
            this.setState({ requestActive:false });
            console.log(error.response);
            
            if(error.response.status == 404) {
                notifyError('Incorrect username or password');
                return;
            }

            notifyError('An error occured');
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(email);
    }

    validatePassword(password) {
        if(password.length < 8) {
            return false;
        }

        return true;
    }

    render() {

        return (
            <div onClick={this.props.close} className={this.props.display ? 'transition-all duration-300 ease-in z-10 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center' :
            'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center'} >
                <div onClick={(e) => {e.stopPropagation()}} className='relative flex flex-col z-20 bg-white w-full sm:w-5/6 md:w-4/6 lg:w-2/6 quicksand pt-5 pb-8 form__border' style={{ top:"0px" }}>
                    <p className='text-center m-0 mb-2 text-2xl'>welcome back</p>
                    <p className='text-center m-0 mb-5 text-base text-gray-700'>continue making notes.</p>

                    <form className='px-8 mb-3 quicksand'>
                        <div className='flex flex-col mb-3 relative'>
                            <input id='email' type='email' name='email|emailIsValid' value={ this.state.email } onChange={ this.change } className='lowercase text-gray-700 duration-300 ease-in transition-colors border focus:outline-none p-3 pl-10' style={{ borderRadius:"4px" }} placeholder='Email' autoFocus />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-envelope text-gray-600' style={{ top:"2px" }}></i>
                            {!this.state.emailIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>enter a valid email address</p>}
                        </div>
                        <div className='flex flex-col mb-5 relative'>
                            <input id='password' type='password' name='password|passwordIsValid' value={ this.state.password } onChange={ this.change } className='text-gray-700 duration-300 ease-in transition-colors border focus:outline-none p-3 pl-10' style={{ borderRadius:"4px" }} placeholder='password' />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                            {!this.state.passwordIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>must be at least 8 characters</p>}
                        </div>
                        <div className='mb-3 relative'>
                            <button onClick={this.login} className='focus:outline-none w-full p-3 text-white bg-reddishbrown rounded-lg'>Sign In</button>
                            <Loader display={this.state.requestActive} />
                        </div>
                    </form>
                    <hr/>
                    <div className='text-center flex flex-col pt-8 text-gray-900 sm:text-gray-700'>
                        <p className='m-0 mb-2'>forgot your password? <a className='lg:underline'>reset</a></p>
                        <p className='m-0'>don't have an account? <a className='lg:underline cursor-pointer' onClick={ this.props.signup }>sign up</a> </p>
                    </div>
                    <i className='absolute top-0 left-0 mt-5 ml-5 fa fa-times text-2xl cursor-pointer' onClick={this.props.close}></i>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);