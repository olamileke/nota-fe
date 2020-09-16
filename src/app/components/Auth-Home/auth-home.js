import React from 'react';
import Header from '../Header/header';
import Overview from '../Overview/overview';
import Create from '../Create/create';
import Notes from '../Notes/notes';
import Versions from '../Versions/versions';

class AuthHome extends React.Component {

    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('nota_user'));
        // viewednote refers to a note in its entirety
        // viewednoteid is the id of the note whose versions we want to view. injected into the
        // versions component

        this.state = { tabs:{ overview:true, create:false, notes:false, versions:false, update:false },
        data:{ viewedNote:null, viewedNoteID:null }, avatar:user.avatar };
        
        this.switchTab = this.switchTab.bind(this);
        this.switchToUpdate = this.switchToUpdate.bind(this);
        this.switchToVersions = this.switchToVersions.bind(this);
        this.setAvatar = this.setAvatar.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    switchToUpdate(note) {
        this.setState({ data:{ viewedNote:note } });
        this.switchTab('update');
    }

    switchToVersions(noteID) {
        this.setState({ data:{ viewedNoteID:noteID } });
        this.switchTab('versions');
    }

    setAvatar(avatar) {
        this.setState({ avatar:avatar })
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
            viewedTab = <Overview avatar={this.state.avatar} viewNote={this.switchToUpdate} />
        }

        if(this.state.tabs.create) {
            viewedTab = <Create note={this.state.data.viewedNote} />
        }

        if(this.state.tabs.notes) {
            viewedTab = <Notes update={this.switchToUpdate} viewVersions={this.switchToVersions} />
        }
        
        if(this.state.tabs.versions) {
            viewedTab = <Versions noteID={this.state.data.viewedNoteID} />
        }

        if(this.state.tabs.update) {
            viewedTab = <Create note={this.state.data.viewedNote} />
        }

        return (
            <div className='w-screen min-h-screen bg-offwhite'>
                <div>
                    <Header view={this.switchTab} setAvatar={this.setAvatar} />
                </div>
                <div className='relative mx-8 sm:mx-12 lg:mx-24' style={{ top:'-5rem' }}>
                    { viewedTab }
                </div>
            </div>
        )
    }
}

export default AuthHome;