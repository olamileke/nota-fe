import React from 'react';
import Loader from '../Loader/loader';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { createNote, updateNote } from '../../services/note';
import { notifySuccess, notifyError } from '../../services/notify';
import { getFormattedDate } from '../../services/date';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = { content:'', title:'', requestActive:false };
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
        this.submit = this.submit.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        if(this.props.note) {
            this.setState({ content:this.props.note.content });
        }
    }

    // componentDidUpdate(oldProps, newProps) {
    //     if(!newProps.note) {
    //         this.setState({ content:'' });
    //     }
    // }

    change(value) {
        let title = '';

        if(value.length >= 10) {
            let [ wordOne, wordTwo, wordThree, ...rest ] = value.split(' ');
            const splits = wordOne.split('>');
            wordOne = splits[splits.length - 1];

            if(!wordTwo && !wordThree) {
                title = value.slice(0,3);
            }
            else if(!wordTwo || !wordThree) {
                title = wordOne.slice(0, 3);
            }
            else {
                title = wordOne.charAt(0) + wordTwo.charAt(0) + wordThree.charAt(0);
            }
        }

        this.setState({ content:value, title:title.toLowerCase() });
    }

    clear() {
        this.setState({ content:'' });
    }

    submit() {
        if(this.state.content.length < 17) {
            notifyError('note must contain minimum 10 characters');
            return;
        }
        
        this.setState({ requestActive:true });
        
        const note = { content:this.state.content };

        createNote(note)
        .then(response => {
            notifySuccess('note saved successfully!');
            this.setState({ content:'', requestActive:false });
        })
        .catch(error => {
            this.setState({ requestActive:false });
            notifyError('an error occured');
        })
    } 
    
    update() {
        if(this.state.content.length < 17) {
            notifyError('note must contain minimum 10 characters');
            return;
        }

        this.setState({ requestActive:true });
        
        const note = { content:this.state.content };

        updateNote(this.props.note._id, note)
        .then(response => {
            notifySuccess('note updated successfully!');
            this.setState({ requestActive:false });
        })
        .catch(error => {
            this.setState({ requestActive:false });
            notifyError('an error occured');
        })
    }

    render() {
        let titleClass = 'm-0 mb-5 quicksand text-xl font-semibold';
        if(this.props.note) {
            titleClass = titleClass.replace(/mb-5/, 'mb-2');
        }

        return (
            <div className='grid grid-cols-12'> 
                <div className='relative bg-white shadow-lg col-span-6'>
                    <ReactQuill value={this.state.content} onChange={this.change} />
                </div>
                <div className='quicksand col-start-8 col-span-4 bg-white shadow-lg flex flex-col p-8' style={{ height:"fit-content" }}>
                    {this.state.title != '' && <p className={titleClass}>#{this.state.title}</p>}
                    {this.state.title == '' && <p className={titleClass}>#new</p>}
                    {this.props.note && <p className='m-0 mb-5'>created {getFormattedDate(this.props.note.created_at)}</p>}

                    <div className='flex flex-row'>
                        {!this.props.note && <div className='relative mr-3'>
                            <button onClick={this.submit} className='focus:outline-none hover:bg-reddishbrown bg-cloudred w-full p-3 rounded text-white' style={{ width:"max-content" }}>create</button>
                            <Loader display={this.state.requestActive} />
                        </div>}
                        {this.props.note && <div className='relative mr-3'>
                            <button onClick={this.update} className='focus:outline-none hover:bg-reddishbrown bg-cloudred w-full p-3 rounded text-white' style={{ width:"max-content" }}>update</button>
                            <Loader display={this.state.requestActive} />
                        </div>}
                        <button onClick={this.clear} className='focus:outline-none bg-gray-100 hover:bg-gray-200 text-gray-800 p-3 rounded text-black' style={{ width:"max-content" }}>clear</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);