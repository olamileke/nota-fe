import React from 'react';
import { getVersions, deleteVersion } from '../../services/version';
import { getFormattedDate } from '../../services/date';
import { notifySuccess } from '../../services/notify';

class Versions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { versions:[], totalVersions:0, versionPage:1 };
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.get(1);
    }

    get(page) {
        getVersions(this.props.noteID, page)
        .then(response => {
            const versions = response.data.data.versions;
            const totalVersions = response.data.data.totalVersions;
            this.setState({ versions:versions, totalVersions:totalVersions, versionPage:page });
        })
    }

    delete(hash) {
        const proceed = window.confirm('are you sure you want to delete ?');

        if(!proceed) {
            return;
        }

        deleteVersion(this.props.noteID, hash)
        .then(response => {
            const versions = [...this.state.versions];
            const idx = versions.findIndex(version => version.hash == hash);
            versions.splice(idx, 1);
            this.setState(state => ({
                versions:versions,
                totalVersions:state.totalVersions - 1
            }));
            notifySuccess(`${hash} deleted successfully`);
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    renderVersions() {
        const versions = [...this.state.versions];
        return versions.map((version, index) => {
            return (
                <div key={index} className='quicksand col-span-6 flex flex-col mb-5 bg-white shadow-lg p-8'>
                    <div className='mb-5 overflow-y-auto' dangerouslySetInnerHTML={{ __html:version.content }} style={{ height:'30vh' }}>
                    </div> 
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <div className='w-16 h-16 bg-cloudred flex flex-row justify-center items-center text-white font-semibold'>
                            {version.hash.slice(0,4)}
                        </div>
                        <div className='flex flex-row'>
                            <button className='focus:outline-none m-0 mr-3'>revert</button>
                            <button className='focus:outline-none m-0 mr-3'>download</button>
                            {this.state.versions.length > 1 && <button onClick={() => {this.delete(version.hash)}} className='focus:outline-none m-0'>delete</button>}
                        </div>
                    </div>
                    <div className='quicksand mb-2'>
                        {version.hash}
                    </div>
                    <div className='quicksand mb-2'>
                        note - #{version.note}
                    </div>
                    <div className='quicksand mb-2'>
                        created {getFormattedDate(version.created_at)}
                    </div>        
                </div>
            )
        })
    }

    renderPages() {
        if(this.state.versions.length > 0) {
            const numPages = Math.ceil(this.state.totalVersions/6);

            if(numPages == 1) {
                return '';
            }

            const pages = Array(numPages).fill(null).map((page, index) => {
                let classes = 'flex flex-row mr-5 mb-5 justify-center cursor-pointer items-center text-lg rounded w-12 h-12 text-white quicksand ';
                index + 1 == this.state.versionPage ? classes = classes + 'bg-cloudred font-semibold' : classes = classes.replace(/text-white/, 'text-black');
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
        const versions = this.renderVersions();
        const pages = this.renderPages();

        return (
            <div>
                <div className='grid grid-cols-12 col-gap-5'>
                    {versions}
                </div>
                <div className='mt-10'>
                    {pages}
                </div>
            </div>
        )
    }
}

export default Versions;