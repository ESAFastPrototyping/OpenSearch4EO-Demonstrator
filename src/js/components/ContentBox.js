import React from 'react';

const ContentBox = ({ title, children }) => {
    return (
        <div className="eoos-property">
            <div className="eoos-property-content">
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default ContentBox;
