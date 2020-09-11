import React from 'react';
import { getNotes } from '../../services/note';
import { getTimeFrom, getFormattedDate } from '../../services/date';

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = { notes:[], totaNotes:0, notePage:1 };
        this.get = this.get.bind(this);
    }

    componentDidMount() {
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

    renderNotes() {
        const notes = [...this.state.notes];
        return notes.map(note => {
            return (
                <div key={note._id} className='quicksand col-span-6 flex flex-col mb-5 bg-white shadow-lg p-8'>
                    <div className='mb-5' dangerouslySetInnerHTML={{ __html:note.content }} style={{ height:'30vh' }}>
                    </div> 
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <div className='w-16 h-16 bg-cloudred flex flex-row justify-center items-center text-white font-semibold'>
                            {note.title}
                        </div>
                        <div className='underline mr-8'>
                            view
                        </div>
                    </div>
                    <div className='quicksand mb-2'>
                        {note.versions} version(s)
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