import React from 'react';
import { createUser } from '../../services/user'; 
import { notifySuccess, notifyError } from '../../services/notify';

class Signup extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { name:'', email:'', password:'', nameIsValid:true,
        emailIsValid:true, passwordIsValid:true, requestActive:false };

        this.change = this.change.bind(this);
        this.signup = this.signup.bind(this);
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
            notifySuccess('Signed up successfully');
            this.setState({ name:'', email:'', password:'', requestActive:false });
        })
        .catch(error => {
            notifyError('An error occured');
            this.setState({ requestActive:false });
        })
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
        let loaderClasses = 'transition-colors ease-in duration-300 z--9999 opacity-0 bg-reddishbrown absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center';
        if(this.state.requestActive) {
            loaderClasses = loaderClasses.replace(/z--9999 opacity-0/, 'z-10 opacity-100')
        }

        return (
            <div className={this.props.display ? 'transition-all duration-300 ease-in z-50 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center' :
            'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center'}>
                <div className='relative flex flex-col bg-white w-2/6 quicksand pt-5 pb-8 quicksand' style={{ borderRadius:"13px", top:"0px" }}>
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
                            <input id='password' type='password' name='password|passwordIsValid' value={this.state.password} onChange={ this.change} className='quicksand text-gray-600 duration-300 ease-in transition-colors border hover:border-grey-700 border focus:outline-none p-3 pl-10' placeholder='password' />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                            {!this.state.passwordIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>must be at least 8 characters</p>}
                        </div>
                        <div className='mb-3 relative'>
                            <button onClick={this.signup} className='w-full p-3 text-white focus:bg-burgundyred focus:outline-none bg-reddishbrown quicksand rounded-lg'>Signup to Nota</button>
                            <div className={loaderClasses}>
                                <div className='loader'></div>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    <div className='text-center pt-8 text-gray-700'>
                        already have an account ? <a className='m-0 cursor-pointer underline' onClick={this.props.login}>login</a>
                    </div>
                    <i class='absolute top-0 left-0 mt-5 ml-5 fa fa-times text-2xl cursor-pointer' onClick={this.props.close}></i>
                </div>
            </div>
        )
    }
}

export default Signup;