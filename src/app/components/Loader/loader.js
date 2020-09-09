import React from 'react';

function Loader (props) {
    
    let classes = 'transition-colors ease-in rounded-lg duration-300 absolute top-0 left-0 w-full h-full z--9999 opacity-0 bg-reddishbrown w-full h-full flex flex-row items-center justify-center';

    if(props.display) {
        classes = classes.replace(/z--9999 opacity-0/, 'z-10 opacity-100');
    }

    return (
        <div className={classes}>
            <div className='loader'></div>
        </div>
    )
}

export default Loader;