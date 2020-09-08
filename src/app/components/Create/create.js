import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

class Create extends React.Component {

    render() {
        return (
            <div className='bg-white shadow-lg'>
                <ReactQuill />
            </div>
        )
    }
}

export default Create;