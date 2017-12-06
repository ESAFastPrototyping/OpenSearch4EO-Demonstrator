import React from 'react';

const InputSelector = (props) => {
    function handleChange(event) {
        props.change(props.parameter, event.target.value);
    }

    let options = props.options.map(option => <option value={option.value} key = {option.value}/>);

    return (
        <div className="eoos-property-input select">
            <input type="text" value = {props.text} onChange = {handleChange} list = {props.parameter}/>
            <datalist id={props.parameter}>
                {options}
            </datalist>
        </div>
    );
}

export default InputSelector;
