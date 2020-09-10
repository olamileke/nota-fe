import React from 'react';
import Header from '../Header/header';
import Overview from '../Overview/overview';
import Create from '../Create/create';

class AuthHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tabs:{ overview:true, create:false, notes:false, versions:false } };
        this.switchTab = this.switchTab.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    switchTab(view) {
        const tabs = {};
        const stateTabs = Object.keys(this.state.tabs);

        stateTabs.forEach(tab => {
            let value = false;
            if(view == tab) {
                value = true;
            }

            tabs[tab] = value;
        })

        this.setState({ tabs:tabs });
    }

    render() {
        let viewedTab;

        if(this.state.tabs.overview) {
            viewedTab = <Overview />
        }

        if(this.state.tabs.create) {
            viewedTab = <Create />
        }

        return (
            <div className='w-screen min-h-screen bg-offwhite'>
                <div>
                    <Header view={this.switchTab} />
                </div>
                <div className='relative mx-24' style={{ top:'-5rem' }}>
                    { viewedTab }
                </div>
            </div>
        )
    }
}

export default AuthHome;