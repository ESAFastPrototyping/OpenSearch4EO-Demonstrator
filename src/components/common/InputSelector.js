import React from 'react';

const InputSelector = (props) => {
    function handleChange(event) {
        if(props.pattern && event.target.value) {
            var regexp = RegExp(props.pattern);
            if(!regexp.test(event.target.value.toString())) {
                alert('The provided text is invalid. The text must follow this pattern: ' + props.pattern);
                return;
            }
        }   
        
        props.change(props.parameter, event.target.value);
    }

    let options = props.options.map(option => <option value={option.value} key={option.value}/>);

    return (
        <div className="eoos-property-input select">
            <input type="text" value={props.text || ''} pattern={props.pattern || ''} onChange={handleChange} list={props.parameter}/>
            <datalist id={props.parameter}>
                {options}
            </datalist>
        </div>
    );
};

export default InputSelector;
