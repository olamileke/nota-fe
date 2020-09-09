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
            <div className='flex flex-row items-center'> 
                <div className='bg-white shadow-lg w-3/4' style={{ borderRadius:"10px" }}>
                    <ReactQuill value={this.state.content} onChange={this.change} />
                </div>
                <div className='flex flex-row w-1/4 h-full items-center justify-center'>
                    <div className='flex flex-col'>
                        <div className='w-full relative mb-3'>
                            <button onClick={this.submit} className='focus:outline-none hover:bg-cloudred w-full bg-reddishbrown p-3 quicksand text-white' style={{ width:"max-content", borderRadius:"4px" }}>save note</button>
                            <Loader display={this.state.requestActive} />
                        </div>
                        <button className='focus:outline-none w-full bg-white text-reddishbrown font-semibold p-3 quicksand text-black shadow-lg' style={{ borderRadius:"5px 5px 5px 0"  }}>clear</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);