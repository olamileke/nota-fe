import React from 'react';
import Header from '../Header/header';
import Create from '../Create/create';

class AuthHome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='w-screen min-h-screen bg-offwhite'>
                <div>
                    <Header />
                </div>
                <div className='relative mx-16' style={{ top:'-5rem' }}>
                    <Create />
                </div>
            </div>
        )
    }
}

export default AuthHome;