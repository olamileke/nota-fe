import React from 'react';
import { getNotes, deleteNote } from '../../services/note';
import { getFormattedDate } from '../../services/date';
import { notifySuccess } from '../../services/notify';

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = { notes:[], totalNotes:0, notePage:1 };
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.get(1);
    }

    get(page) {
        getNotes(null, page)
        .then(response => {
            const notes = response.data.data.notes;
            const totalNotes = response.data.data.totalNotes;
            this.setState({ notes:notes, totalNotes:totalNotes, notePage:page });
            console.log(response);
        })
    }

    delete(id) {
        const proceed = window.confirm('are you sure you want to delete ?');

        if(!proceed) {
            return;
        }

        deleteNote(id)
        .then(response => {
            const notes = [...this.state.notes];
            const idx = notes.findIndex(note => note._id.toString() == id.toString());
            notes.splice(idx, 1);
            this.setState(state => ({
                notes:notes,
                totalNotes:state.totalNotes - 1
            }));
            notifySuccess('note deleted successfully');
            console.log(response);
        })
    }

    renderNotes() {
        const notes = [...this.state.notes];
        return notes.map(note => {
            return (
                <div key={note._id} className='quicksand col-span-12 lg:col-span-6 flex flex-col mb-5 bg-white shadow-lg p-5 bsm:p-8'>
                    <div className='note mb-5 overflow-y-auto' dangerouslySetInnerHTML={{ __html:note.content }}>
                    </div> 
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <div className='w-16 h-16 bg-cloudred flex flex-row justify-center items-center text-white font-semibold'>
                            #{note.title}
                        </div>
                        <div className='flex flex-row'>
                            <button onClick={() => {this.props.update(note)}}  className='cursor-pointer focus:outline-none m-0 mr-3'>update</button>
                            <button className='cursor-pointer focus:outline-none m-0 mr-3'>download</button>
                            <button onClick={() => {this.delete(note._id)}} className='cursor-pointer focus:outline-none m-0'>delete</button>
                        </div>
                    </div>
                    <div className='quicksand mb-2'>
                        {note.versions} version(s). <button onClick={() => {this.props.viewVersions(note._id)}} className='focus:outline-none ml-2 cursor-pointer'>view</button>
                    </div>
                    <div className='quicksand mb-2'>
                        created {getFormattedDate(note.created_at)}
                    </div>
                    <div className='quicksand mb-2'>
                        last updated {getFormattedDate(note.updated_at)}
                    </div>              
                </div>
            )
        })
    }

    renderPages() {
        if(this.state.notes.length > 0) {
            const numPages = Math.ceil(this.state.totalNotes/6);

            if(numPages == 1) {
                return '';
            }

            const pages = Array(numPages).fill(null).map((page, index) => {
                let classes = 'flex flex-row mr-5 mb-5 justify-center cursor-pointer items-center text-lg rounded w-12 h-12 text-white quicksand ';
                index + 1 == this.state.notePage ? classes = classes + 'bg-cloudred font-semibold' : classes = classes.replace(/text-white/, 'text-black');
                return (
                    <div key={index} onClick={() => {this.get(index + 1)}} className={classes}>
                        {index + 1}
                    </div>
                )
            });

            return (
                <div className='flex flex-row'>
                    {pages}
                </div>
            )
        }

        return '';
    }

    render() {
        const notes = this.renderNotes();
        const pages = this.renderPages();

        return (
            <div>
                <div className='grid grid-cols-12 col-gap-5'>
                    {notes}
                </div>
                <div className='mt-10'>
                    {pages}
                </div>
            </div>
        )
    }
}

export default Notes;