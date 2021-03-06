import React from 'react';
import { withRouter } from 'react-router-dom';
import { getVersions, deleteVersion, revertToVersion } from '../../services/version';
import { getFormattedDate } from '../../services/date';
import { notifySuccess, notifyError } from '../../services/notify';
import { createPdf } from '../../services/pdf';

class Versions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { versions:[], totalVersions:0, versionPage:1 };
        this.get = this.get.bind(this);
        this.revert = this.revert.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.get(1);
    }

    async get(page) {

        this.props.toggleLoading();

        try {
            const response = await getVersions(this.props.noteID, page);
            const versions = response.data.data.versions;
            const totalVersions = response.data.data.totalVersions;
            this.setState({ versions:versions, totalVersions:totalVersions, versionPage:page });
        }
        catch(error) {
            if(error.response && error.response.status == 401) {
                this.props.history.push('/');
                localStorage.clear();
                notifyError('you are not logged in');
            }
        }
        finally {
            this.props.toggleLoading();
        }
    }

    async revert(hash) {

        const idx = this.state.versions.findIndex(version => version.hash == hash);
        const versionsAhead = ((this.state.versionPage - 1) * 6) + idx;
        if(versionsAhead == 0) {
            window.alert('already current version!');
            return;
        }

        const proceed = window.confirm(`this would delete the ${versionsAhead} versions ahead. proceed ?`);
         
        if(!proceed) {
            return;
        }

        this.props.toggleLoading();

        try {
            await revertToVersion(this.props.noteID, hash.replace(/#/, ''));
            this.get(1);
            notifySuccess(`#${this.state.versions[0].note} reverted to version ${hash}`);
        }
        catch(error) {
            if(error.response && error.response.status == 401) {
                this.props.history.push('/');
                localStorage.clear();
                notifyError('you are not logged in');
            }
        }
        finally {
            this.props.toggleLoading();
        }
    }

    async delete(hash) {
        const proceed = window.confirm('are you sure you want to delete ?');

        if(!proceed) {
            return;
        }

        this.props.toggleLoading();

        try {
            await deleteVersion(this.props.noteID, hash.replace(/#/, ''));
            const versions = [...this.state.versions];
            const idx = versions.findIndex(version => version.hash == hash);
            versions.splice(idx, 1);
            this.setState(state => ({
                versions:versions,
                totalVersions:state.totalVersions - 1
            }));
            notifySuccess(`${hash} deleted successfully`);
        }
        catch(error) {
            if(error.response && error.response.status == 401) {
                this.props.history.push('/');
                localStorage.clear();
                notifyError('you are not logged in');
            }
        }
        finally {
            this.props.toggleLoading();
        }
    }

    renderVersions() {
        const versions = [...this.state.versions];

        return versions.map((version, index) => {
            return (                
                <div key={version.hash} className='quicksand col-span-12 lg:col-span-6 flex flex-col mb-5 bg-white shadow-lg p-5 bsm:p-8'>
                    <div className='note mb-5 overflow-y-auto' dangerouslySetInnerHTML={{ __html:version.content }} style={{ height:'30vh' }}>
                    </div> 
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <div className='w-16 h-16 bg-cloudred flex flex-row justify-center items-center text-white font-semibold firefox__font'>
                            {version.hash.slice(0,4)}
                        </div>
                        <div className='flex flex-row'>
                            <button onClick={() => {this.revert(version.hash)}} className='underline sm:no-underline focus:outline-none m-0 mr-3'>revert</button>
                            <button onClick={() => {createPdf(version.note, version.hash, version.content)}} className='hidden sm:inline focus:outline-none m-0 mr-3'>download</button>
                            {this.state.versions.length > 1 && <button onClick={() => {this.delete(version.hash)}} className='hidden sm:inline focus:outline-none m-0'>delete</button>}
                        </div>
                    </div>
                    <div className='quicksand mb-2'>
                        {version.hash}
                    </div>
                    <div className='quicksand mb-2'>
                        {version.note}
                    </div>
                    <div className='quicksand mb-2'>
                        created {getFormattedDate(version.created_at)}
                    </div>  
                    <div className='flex flex-row sm:hidden'>
                        <button onClick={() => {createPdf(version.note, version.hash, version.content)}} className='underline focus:outline-none m-0 mr-3'>download</button>
                        {this.state.versions.length > 1 && <button onClick={() => {this.delete(version.hash)}} className='underline focus:outline-none m-0'>delete</button>}
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
                <div className='flex flex-row mt-6'>
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
                <div className='grid grid-cols-12 pb-3 col-gap-5'>
                    {versions}
                </div>
                <div>
                    {pages}
                </div>
            </div>
        )
    }
}

export default withRouter(Versions);