import React from 'react';
import Loader from '../Loader/loader';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { createNote } from '../../services/note';
import { notifySuccess, notifyError } from '../../services/notify';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = { content:'', requestActive:false };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(value) {
        this.setState({ content:value });
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
            console.log(error.response);

            if(error.response.status == 401) {
                this.props.history.push('/');
                notifyError('you are not logged in!');
            }

            this.setState({ requestActive:false });
            notifyError('an error occured');
        })
    }   

    render() {
        return (
            <div> 
                <div className='relative bg-white shadow-lg w-full'>
                    <ReactQuill value={this.state.content} onChange={this.change} />
                    <div className='absolute right-0 top-0 flex flex-row items-center mt-4 mr-4'>
                        <div className='relative mr-5'>
                            <button onClick={this.submit} className='quicksand text-sm focus:outline-none hover:bg-reddishbrown bg-cloudred w-full p-3 rounded-md text-white' style={{ width:"max-content" }}>add note</button>
                            <Loader display={this.state.requestActive} />
                        </div>
                        <div className='cursor-pointer font-semibold rounded-md w-10 h-8 flex flex-row justify-center' style={{ background:"rgba(0,0,0,0.05)" }}>
                            <p className='m-0 text-black'>...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);