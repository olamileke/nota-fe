import React from 'react';
import './alt-loader.css';

function AltLoader(props) {
    let loaderClass = 'z--9999 opacity-0 transition-all ease-in duration-300 lds-ring';
    props.display ? loaderClass =  loaderClass.replace(/z--9999 opacity-0/, 'z-10 opacity-100') : loaderClass = loaderClass;

    return (
        <div className={loaderClass}><div></div><div></div><div></div><div></div></div>
    )
}

export default AltLoader;