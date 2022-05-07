import React from 'react';

import "./LoadingTasksList.scss"

const LoadingTasksList = () => {
    return (
        <div className="loading">
            <div className="loading__animation">
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingTasksList;
