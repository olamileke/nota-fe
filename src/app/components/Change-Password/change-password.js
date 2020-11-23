import React from 'react';
import Loader from '../Loader/loader';
import { changePassword } from '../../services/user';
import { notifyError, notifySuccess } from '../../services/notify';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = { password:'', passwordIsValid:true, togglePassword:false, requestActive:false }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.toggleViewPassword = this.toggleViewPassword.bind(this);
    }

    change(event) {
        const value = event.target.value;

        if(value.length == 0) {
            this.setState({ password:value, passwordIsValid:false, togglePassword:false });
            return;
        }

        if(value.length < 8) {
            this.setState({ password:value, passwordIsValid:false, togglePassword:true });
            return;
        }

        this.setState({ password:value, passwordIsValid:true, togglePassword:true });
    }

   async submit(e) {
        e.preventDefault();

        if(this.state.password.length >= 8) {
            this.setState({ requestActive:true });
            const data = {password:this.state.password};

            try {
                await changePassword(this.props.token, data);
                notifySuccess('password changed successfully');
                this.props.switchToLogin();
            }
            catch(error) {
                if(error.response.status == 400) {
                    notifyError('invalid reset token');
                }
            }
            finally {
                this.setState({ requestActive:false });
            }
        }
    }

    toggleViewPassword() {
        const togglePassword = document.getElementById('togglePassword');
        const passwordField = document.getElementById('changePasswordField');

        if(togglePassword.classList.contains('fa-eye')) {
            passwordField.setAttribute('type', 'text');
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        }
        else {
            passwordField.setAttribute('type', 'password');
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    }

    render() {
        let toggleClass = 'duration-300 ease-in transition-colors absolute cursor-pointer opacity-0 z--9999 top-0 right-0 mt-4 mr-3 fa fa-eye text-gray-600';
        this.state.togglePassword ? toggleClass = toggleClass.replace(/opacity-0 z--9999/, 'opacity-100 z-10') : toggleClass = toggleClass;

        return (
            <div className={this.props.display ? 'transition-all duration-300 ease-in z-10 opacity-100 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center' :
            'transition-all duration-300 ease-in z--9999 opacity-0 fixed top-0 left-0 w-screen h-screen flex flex-row items-end sm:items-center justify-center'} >
                <div onClick={(e) => {e.stopPropagation()}} className='relative flex flex-col z-20 bg-white w-full sm:w-5/6 md:w-4/6 lg:w-2/6 quicksand pt-5 pb-8 quicksand form__border' style={{ top:"0px" }}>
                    <p className='text-center m-0 mb-2 text-2xl'>Hello</p>
                    <p className='text-center m-0 mb-5 text-base text-gray-700'>change your nota password.</p>

                    <form className='px-8 mb-3'>
                        <div className='flex flex-col mb-5 relative'>
                            <input id='changePasswordField' type='password' value={this.state.password} onChange={ this.change} className='quicksand text-gray-600 duration-300 ease-in transition-colors border hover:border-grey-700 border focus:outline-none p-3 pl-10' placeholder='password' />
                            <i className='duration-300 ease-in transition-colors absolute top-0 left-0 mt-4 ml-3 fa fa-key text-gray-600' style={{ top:"2px" }}></i>
                            <i className={toggleClass} id='togglePassword' onClick={this.toggleViewPassword} style={{ top:"2px" }}></i>
                            {!this.state.passwordIsValid && <p class='m-0 mt-2 text-xs text-red-500' style={{ fontFamily:"Kumbh Sans, sans-serif" }}>must be at least 8 characters</p>}
                        </div>
                        <div className='mb-3 relative'>
                            <button onClick={this.submit} className='w-full p-3 text-white focus:bg-burgundyred focus:outline-none bg-reddishbrown quicksand rounded-lg'>Update Password</button>
                            <Loader display={this.state.requestActive} />
                        </div>
                    </form>
                    <hr/>
                    <div className='text-center pt-8 text-gray-900 sm:text-gray-700'>
                        changed your password ? <a className='m-0 cursor-pointer lg:underline'>login</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword;