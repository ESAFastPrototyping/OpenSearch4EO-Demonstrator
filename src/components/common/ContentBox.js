import React from 'react';

const ContentBox = ({title, info, required, minimum, maximum, pattern, children}) => {
    return (
        <div className="eoos-property">
            <div className="eoos-property-content">
                <h2>{title}{required && ' - Required'}</h2>
                {info && (<p>{info}</p>)}
                {minimum !== null && typeof minimum !== 'undefined' && (<p>Minimum Value: {minimum}</p>)}
                {maximum !== null && typeof maximum !== 'undefined' && (<p>Maximum Value: {maximum}</p>)}
                {pattern && (<p>Valid pattern: {pattern}</p>)}
                {children}
            </div>
        </div>
    );
};

export default ContentBox;
