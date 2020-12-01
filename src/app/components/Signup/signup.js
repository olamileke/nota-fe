import React from 'react';
import Loader from '../Loader/loader';
import { createUser } from '../../services/user'; 
import { notifySuccess, notifyError } from '../../services/notify';

class Signup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { name:'', email:'', password:'', togglePassword:false, nameIsValid:true,
        emailIsValid:true, passwordIsValid:true, requestActive:false };

        this.change = this.change.bind(this);
        this.signup = this.signup.bind(this);
        this.toggleViewPassword = this.toggleViewPassword.bind(this);
    }

    change(event) {
        const [name, error] = event.target.name.split('|');
        const value = event.target.value;
        let validate;

        switch(name) {
            case 'name':
                validate = this.validateName(value);
                break;
            case 'email':
                validate = this.validateEmail(value);
                break;
            case 'password':
                validate = this.validatePassword(value);
        }

        if(name == 'password') {
            value.length > 0 ? this.setState({ togglePassword:true }) : this.setState({ togglePassword:false });
        }

        this.setState({ [name]:value, [error]:validate });
    }

    signup(event) {
        event.preventDefault();
        this.setState({ requestActive:true });
        
        if(!this.validateName(this.state.name) || !this.validateEmail(this.state.email) || !this.validatePassword(this.state.password)) {
            return;
        }

        const { name, email, password } = this.state;
        const user = { name, email, password };

        createUser(user)
        .then(response => {
            notifySuccess('complete the process at your email!');
            this.setState({ name:'', email:'', password:'', requestActive:false });
        })
        .catch(error => {
            this.setState({ requestActive:false });

            if(error.response && error.response.status == 400) {
                notifyError('user with email exists!');
                return;
            }
        })
    }

    toggleViewPassword() {
        const toggle = document.getElementById('toggle');

        if(toggle.classList.contains('fa-eye')) {
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash');
            document.getElementById('passwordField').setAttribute('type', 'text');
        }
        else {
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye');
            document.getElementById('passwordField').setAttribute('type', 'password');
        }
    }

    validateName(name) {
        const [fname, lname] = name.split(' ');

        if(!fname || !lname) {
            return false;
        }

        return true;
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

        let toggleClass = 'duration-300 ease-in transition-colors absolute cursor-pointer opacity-0 z--9999 top-0 right-0 mt-4 mr-3 fa fa-eye text-gray-600';
        this.state.togglePassword ? toggleClass = toggleClass.replace(/opacity-0 z--9999/, 'opacity-100 z-10') : toggleClass = toggleClass;

        return (
            <div onClick={this.props.close} className={this.props.display ? 'transition-all duration-300 ease-in z-10 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center' :
            'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center'}>
                <div onClick={(e) => {e.stopPropagation()}} className='relative flex flex-col z-20 bg-white w-full sm:w-5/6 md:w-4/6 lg:w-2/6 quicksand pt-5 pb-8 quicksand form__border' style={{ top:"0px" }}>
                    <p className='text-center m-0 mb-2 text-2xl'>Hello</p>
                    <p className='text-center m-0 mb-5 text-base text-gray-700'>create your new nota account.</p>

                    <form className='px-8 mb-3'>
                        <div className='flex flex-col mb-3 relative'>
                            <input id='name' type='text' name='name|nameIsValid' value={this.state.name} onChange={this.change} className='quicksand text-gray-600 duration-300 ease-in transition-colors border hover:border-grey-700 focus:outline-none p-3 pl-10' placeholder='full name' autoFocus />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-user-circle text-gray-600' style={{ top:"2px" }}></i>
                            {!this.state.nameIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>enter valid first and last names</p>}
                        </div>
                        <div className='flex flex-col mb-3 relative'>
                            <input id='email' type='email' name='email|emailIsValid' value={this.state.email} onChange={ this.change} className='quicksand lowercase text-gray-600 duration-300 ease-in transition-colors border hover:border-grey-700 focus:outline-none p-3 pl-10' placeholder='Email' autoFocus/>
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-envelope text-gray-600' style={{ top:"2px" }}></i>
                            {!this.state.emailIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>enter a valid email address</p>}
                        </div>
                        <div className='flex flex-col mb-5 relative'>
                            <input id='passwordField' type='password' name='password|passwordIsValid' value={this.state.password} onChange={ this.change} className='quicksand text-gray-600 duration-300 ease-in transition-colors border hover:border-grey-700 border focus:outline-none p-3 pl-10' placeholder='password' />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                            <i className={toggleClass} id='toggle' onClick={this.toggleViewPassword} style={{ top:"2px" }}></i>
                            {!this.state.passwordIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>must be at least 8 characters</p>}
                        </div>
                        <div className='mb-3 relative'>
                            <button onClick={this.signup} className='w-full p-3 text-white focus:bg-burgundyred focus:outline-none bg-reddishbrown quicksand rounded-lg'>Signup to Nota</button>
                            <Loader display={this.state.requestActive} />
                        </div>
                    </form>
                    <hr/>
                    <div className='text-center pt-8 text-gray-900 sm:text-gray-700'>
                        already have an account ? <a className='m-0 cursor-pointer lg:underline' onClick={this.props.login}>login</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;