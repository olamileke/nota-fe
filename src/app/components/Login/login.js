import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email:'', password:'', errorEmail:false, errorPassword:false };
        this.change = this.change.bind(this);
    }

    change(event) {
        const [name, error] = event.target.name.split('|');
        const value = event.target.value;
        let validate;
        name == 'email' ? validate = this.validateEmail(value) : validate = this.validatePassword(value);

        this.setState({ [name]:value, [error]:validate });
    }

    // all validation methods return true if validation failed
    // false otherwise

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return !re.test(email);
    }

    validatePassword(password) {
        if(password.length < 8) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div className={this.props.display ? 'transition-all duration-300 ease-in z-50 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center' :
            'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center'} >
                <div className='relative flex flex-col bg-white w-2/6 quicksand pt-5 pb-8' style={{ borderRadius:"13px", top:"0px", fontFamily:"Kumbh Sans, sans-serif" }}>
                    <p className='text-center m-0 mb-2 text-2xl'>welcome back</p>
                    <p className='text-center m-0 mb-5 text-base text-gray-700'>continue making notes.</p>

                    <form className='px-8 mb-3 quicksand'>
                        <div className='flex flex-col mb-3 relative'>
                            <input id='email' type='email' name='email|errorEmail' value={ this.state.email } onChange={ this.change } className='lowercase text-gray-700 duration-300 ease-in transition-colors border focus:bg-offwhite focus:outline-none p-3 pl-10' style={{ borderRadius:"4px" }} placeholder='Email' autoFocus />
                            {this.state.errorEmail && <p class='m-0 mt-2 text-xs font-semibold text-red-500'>enter a valid email address</p>}
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-envelope text-gray-600' style={{ top:"2px" }}></i>
                        </div>
                        <div className='flex flex-col mb-5 relative'>
                            <input id='password' type='password' name='password|errorPassword' value={ this.state.password } onChange={ this.change } className='text-gray-700 duration-300 ease-in transition-colors border focus:bg-offwhite focus:outline-none p-3 pl-10' style={{ borderRadius:"4px" }} placeholder='password' />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                            {this.state.errorPassword && <p class='m-0 mt-2 text-xs font-semibold text-red-500'>must be at least 8 characters</p>}
                        </div>
                        <div className='mb-3'>
                            <button className='w-full p-3 text-white bg-reddishbrown' style={{ borderRadius:"10px 10px 10px 0" }}>Sign In</button>
                        </div>
                    </form>
                    <hr/>
                    <div className='text-center flex flex-col pt-8 text-gray-700'>
                        <p className='m-0 mb-2'>Forgot your password? <a className='underline'>reset</a></p>
                        <p className='m-0'>Don't have an account? <a className='underline cursor-pointer' onClick={ this.props.signup }>sign up</a> </p>
                    </div>
                    <i className='absolute top-0 left-0 mt-5 ml-5 fa fa-times text-2xl cursor-pointer' onClick={this.props.close}></i>
                </div>
            </div>
        )
    }
}

export default Login;