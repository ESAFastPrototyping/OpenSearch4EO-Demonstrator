import React from 'react';

const Info = ({text, close}) => {
    return (
        <div onClick={close}>
            <div className="info-overlay" onClick={close} />
            <div className="info">
                <div className="info-content" >
                    <span className="info-close" onClick={close}><i className="fa fa-times"></i></span>
                    <span dangerouslySetInnerHTML={{__html: text}} />
                </div>
            </div>
        </div>
    )
};

export default Info;
