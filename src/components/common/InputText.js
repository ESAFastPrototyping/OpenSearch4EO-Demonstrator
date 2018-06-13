import React from 'react';

const InputText = ({ text, changeText }) => {
    function handleChange(event) {
        changeText(event.target.value);
    }

    return (
        <div className="eoos-property-input">
            <input type="text" id="collection-fulltext" onChange = {handleChange} value = {text}/>
        </div>
    );
};

export default InputText;
