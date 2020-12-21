import React from 'react';
import { withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import { logout } from '../../services/user';
import { updateAvatar } from '../../services/user';
import { notifySuccess, notifyError } from '../../services/notify';

class Header extends React.Component {

    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('nota_user'));
        this.state = { user:user, displayOptions:false, avatarToUpload:null, activeView:'overview' };
        this.toggleView = this.toggleView.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.clickFileInput = this.clickFileInput.bind(this);
        this.previewAvatar = this.previewAvatar.bind(this);
        this.validateAvatar = this.validateAvatar.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    toggleView(view) {
        this.props.view(view);
        this.setState({ activeView:view });
    }

    toggleOptions() {
        this.setState(state => ({
            displayOptions:!state.displayOptions
        }));
    }

    clickFileInput() {
        document.getElementById('file__input').click();
    }

    previewAvatar(event) {
        const file = event.target.files[0];

        if(this.validateAvatar(file)) {
            const reader = new FileReader();
            reader.onload = e => {
                this.setState({ avatarToUpload:file });
                document.getElementById('user__avatar').setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

   async uploadAvatar() {
       
        const formData = new FormData();
        formData.append('image', this.state.avatarToUpload);

        this.props.toggleLoading();

        try {
            const response = await updateAvatar(formData);
            const user = response.data.data.user;
            localStorage.setItem('nota_user', JSON.stringify(user));
            this.setState({ displayOptions:false, user:user, avatarToUpload:null });
            this.props.setAvatar(user.avatar);
            notifySuccess('avatar changed successfully!');
        }
        catch(error) {
            if(error.response && error.response.status == 401) {
                this.props.history.push('/');
                localStorage.clear();
                notifyError('you are not logged in');
            }
        }
        finally {
            this.props.toggleLoading();
        }
    }

    validateAvatar(file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const type = file.type.toLowerCase();

        if(!allowedTypes.includes(type)) {
            notifyError('file format not supported!');
            document.getElementById('user__avatar').setAttribute('src', this.state.user.avatar);
            return false;
        }

        if(file.size > 2500000) {
            notifyError('image too large!');
            document.getElementById('user__avatar').setAttribute('src', this.state.user.avatar);
            return false;
        }

        return true;
    }

    signOut() {
        logout();
        this.props.history.push('/');
    }

    render() {
        let optionsClasses = 'transition-all duration-300 ease-in absolute right-0 mr-2 mt-8 z--9999 opacity-0 w-48 text-black bg-white rounded-md shadow-xl';
        if(this.state.displayOptions) {
            optionsClasses = optionsClasses.replace(/mt-8 z--9999 opacity-0/, 'mt-2 z-20 opacity-100')
        };

        let viewClasses = 'transition-all duration-300 ease-in px-3 py-5 m-0 focus:outline-none mr-2 cursor-pointer z-10';

        return (
            <div className='relative w-screen py-12 px-8 sm:px-12 lg:px-24 text-white quicksand bg-reddishbrown'>
                <div className='absolute top-0 left-0 w-full h-full'>
                    <Particles height='100%' params={{
                        particles: {
                            number: {
                                value: 65,
                                density: {
                                enable: true,
                                value_area: 800
                                }
                            },
                            opacity:{
                                value:0
                            },
                            size:{
                                value:1
                            },
                            move:{
                                bounce:true
                            }
                    }}} />
                </div>
                <div className='flex flex-row justify-between z-10'>
                    <div className='flex flex-row items-center mb-8'>
                        <div className='relative w-12 h-12 mr-2'>
                            <img src={this.state.user.avatar} className='w-full h-full rounded-full object-cover' id='user__avatar' />
                            <div className='absolute top-0 left-0 w-full z-10 h-full rounded-full' style={{ background:"rgba(0,0,0,0.1)" }}></div>
                        </div>
                        <p className='m-0'>{this.state.user.name}</p>
                    </div>
                    <div className='relative'>
                        <div onClick={this.toggleOptions} className='cursor-pointer border-2 border-white flex flex-row justify-center items-center rounded-full w-12 h-12'>
                            N
                        </div>
                        <div className={optionsClasses} style={{ top:"60%", borderRadius:"3px" }}>
                            <button className='outline-none py-4 hover:bg-gray-200 focus:outline-none font-semibold text-sm text-center w-full firefox__font'>
                                { this.state.user.email }
                            </button>
                            {!this.state.avatarToUpload && <button onClick={this.clickFileInput} className='outline-none hover:bg-gray-200 focus:outline-none py-4 text-sm font-semibold text-center w-full firefox__font'>
                                change avatar
                            </button>}
                            {this.state.avatarToUpload && <button onClick={this.uploadAvatar} className='outline-none hover:bg-gray-200 focus:outline-none py-4 text-sm font-semibold text-center w-full firefox__font'>
                                upload avatar
                            </button>}
                            <button onClick={this.signOut} className='outline-none hover:bg-gray-200 focus:outline-none py-4 text-center text-sm font-semibold text-black w-full firefox__font'>
                                sign out
                            </button>
                        </div>
                        <input type='file' onChange={this.previewAvatar} className='hidden' id='file__input' />
                    </div>
                </div>
                <div className='flex flex-row items-center mb-20'>
                    <button onClick={() => { this.toggleView('overview') }} className={this.state.activeView == 'overview' ? viewClasses.replace(/mr-2/, 'shadow-md mr-5') : viewClasses}>overview</button>
                    <button onClick={() => { this.toggleView('create') }} className={this.state.activeView == 'create' ? viewClasses.replace(/mr-2/, 'shadow-md mr-5') : viewClasses}>create</button>
                    <button onClick={() => { this.toggleView('notes') }} className={this.state.activeView == 'notes' ? viewClasses.replace(/mr-2/, 'shadow-md mr-5') : viewClasses}>notes</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);