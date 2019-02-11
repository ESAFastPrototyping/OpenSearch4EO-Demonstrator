import React from 'react';

const InputPassword = ({text, changeText}) => {
    function handleChange(event) {
        changeText(event.target.value);
    }

    return (
        <div className="eoos-property-input">
            <input type="password" id="collection-fulltext" onChange={handleChange} value={text || ''}/>
        </div>
    );
};

export default InputPassword;
