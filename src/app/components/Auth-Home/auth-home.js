import React from 'react';
import Header from '../Header/header';
import Overview from '../Overview/overview';
import Create from '../Create/create';
import Notes from '../Notes/notes';

class AuthHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tabs:{ overview:true, create:false, notes:false, versions:false, update:false }, data:{ viewedNote:null, viewedVersion:null } };
        this.switchTab = this.switchTab.bind(this);
        this.switchToUpdate = this.switchToUpdate.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    switchToUpdate(note) {
        this.setState({ data:{ viewedNote:note } });
        this.switchTab('update');
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

        view == 'create' ? this.setState({ tabs:tabs, data:{ viewedNote:null } }) : this.setState({ tabs:tabs });
    }

    render() {
        let viewedTab;

        if(this.state.tabs.overview) {
            viewedTab = <Overview viewNote={this.switchToUpdate} />
        }

        if(this.state.tabs.create) {
            viewedTab = <Create note={this.state.data.viewedNote}/>
        }

        if(this.state.tabs.notes) {
            viewedTab = <Notes update={this.switchToUpdate} />
        }

        if(this.state.tabs.update) {
            viewedTab = <Create note={this.state.data.viewedNote} />
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