import React from 'react';
import Particles from 'react-particles-js';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('nota_user'));
        this.state = { displayOptions:false };
        this.toggleOptions = this.toggleOptions.bind(this);
    }

    toggleOptions() {
        this.setState(state => ({
            displayOptions:!state.displayOptions
        }));
    }

    render() {
        let optionsClasses = 'transition-all duration-300 ease-in absolute right-0 mr-2 mt-8 z--9999 opacity-0 w-48 text-black bg-white rounded-md shadow-xl';
        if(this.state.displayOptions) {
            optionsClasses = optionsClasses.replace(/mt-8 z--9999 opacity-0/, 'mt-2 z-10 opacity-100')
        };

        return (
            <div className='relative w-screen py-12 px-24 text-white quicksand bg-reddishbrown'>
                <div className='absolute top-0 left-0 w-full h-full'>
                    <Particles height='100%' params={{
                        particles: {
                            number: {
                                value: 50,
                                density: {
                                enable: true,
                                value_area: 800
                                }
                            }
                    }}} />
                </div>
                <div className='flex flex-row justify-between z-10'>
                    <div className='flex flex-row items-center mb-12'>
                        <img src={this.user.avatar} className='z-10 w-12 h-12 rounded-full object-cover mr-5' />
                        <p className='m-0'>{this.user.name}</p>
                    </div>
                    <div className='relative'>
                        <div onClick={this.toggleOptions} className='cursor-pointer border-2 border-white flex flex-row justify-center items-center rounded-full w-12 h-12'>
                            N
                        </div>
                        <div className={optionsClasses} style={{ top:"60%", borderRadius:"7px 0px 7px 7px" }}>
                            <button className='outline-none py-4 bg-gray-300 font-semibold text-sm text-center w-full'>
                                { this.user.email }
                            </button>
                            <button className='outline-none py-4 text-sm text-center w-full'>
                                Change Avatar
                            </button>
                            <button className='outline-none py-4 text-center text-sm text-black w-full'>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center mb-20'>
                    <p onClick={() => { this.props.view('overview') }} className='transition-colors duration-300 ease-in m-0 mr-5 text-white cursor-pointer z-10'>overview</p>
                    <p onClick={() => { this.props.view('create') }} className='transition-colors duration-300 ease-in m-0 mr-5 cursor-pointer z-10'>create</p>
                    <p onClick={() => { this.props.view('notes') }} className='transition-colors duration-300 ease-in m-0 mr-5 cursor-pointer z-10'>notes</p>
                </div>
            </div>
        )
    }
}

export default Header;