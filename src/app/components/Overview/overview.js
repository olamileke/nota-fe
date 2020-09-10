import React from 'react';
import Loader from '../Loader/loader';
import { getNotes } from '../../services/note';
import { getActivities } from '../../services/activity';

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.fetchNotes = this.fetchNotes.bind(this);
        this.fetchActivities = this.fetchActivities.bind(this);
        this.state = { notes:[], activities:[], activityPage:1, totalActivities:0, requestActive:false };
    }

    componentDidMount() {
        this.fetchNotes();
        this.fetchActivities(1);
        this.user = JSON.parse(localStorage.getItem('nota_user'));
    }

    fetchNotes() {
        getNotes(3, null)
        .then(response => {
            this.setState({ notes:response.data.data.notes });
            alert('done');
        })
    }

    fetchActivities(page) {
        this.setState({ requestActive:true });
        getActivities(page)
        .then(response => {
            let activities = [...this.state.activities];
            activities = activities.concat(response.data.data.activities);
            const totalActivities = response.data.data.totalActivities;
            this.setState({ activities:activities, activityPage:page, totalActivities:totalActivities, requestActive:false });
            console.log(response);
        })
    }

    renderNotes() {
        const notes = this.state.notes;

        return notes.map(note => {
            return <div key={note._id} className='bg-white shadow-md w-full flex flex-col mb-5 p-6'>
                <div className='flex flex-row justify-between items-center mb-5'>
                    <div className='w-16 h-16 bg-cloudred flex flex-row justify-center items-center text-white font-semibold'>
                        {note.title}
                    </div>
                    <div className='quicksand underline mr-8'>
                        view
                    </div>
                </div>
                <div className='quicksand mb-2'>
                    {note.versions} version(s)
                </div>
                <div className='quicksand mb-2'>
                    created {note.created_at}
                </div>
                <div className='quicksand mb-2'>
                    last updated {note.updated_at}
                </div>
            </div>
        })
    }

    renderActivities() {
        const activities = this.state.activities.map((activity, index) => {
            const classes = index == this.state.activities.length - 1 ? 'flex flex-row items-center' :
            'flex flex-row items-center mb-8'
            
            return (
                <div key={activity._id} className={classes}>
                    <div className='relative mr-5'>
                        <img src="https://thetrimbucket.s3.us-east-2.amazonaws.com/users/1598570148.3808098leke.JPG" className='w-10 h-10 rounded-full object-cover' />
                        <div className='absolute top-0 left-0 w-full h-full rounded-full' style={{ background:"rgba(0,0,0,0.0.07)" }}></div>
                    </div>
                    <div className='mr-auto'>
                        {activity.action == 1 && <p className='m-0'>you created a new note {activity.note_tite} 7d ago</p>}
                    </div>
                    <div>
                        view
                    </div>
                 </div>
            )
        })

        if(activities.length > 0) {
        return (<div className='flex flex-col quicksand p-8'>
                <p className='m-0 mb-8'>recent activity</p>
                <div className='flex flex-col'>
                    {activities}
                </div>
                { this.state.activities.length < this.state.totalActivities && <div className='relative'>
                    <button onClick={() => {this.fetchActivities(this.state.activityPage + 1)}} className='bg-cloudred focus:outline-none hover:bg-reddishbrown outline-none rounded-md text-white p-3 w-full'>Load More</button>
                    <Loader display={this.state.requestActive} />
                </div> }
            </div>)
        }
        
        return ''        
    }

    render() {
        const notes = this.renderNotes();
        const activities = this.renderActivities();

        return (
            <div className='grid grid-cols-12'>
                <div className='col-span-5'>
                    {notes}
                </div>
                <div className='col-start-7 col-span-5 bg-white shadow-md' style={{ height:"fit-content" }}>
                    {activities}
                </div>
            </div>
        )
    }
}

export default Overview;