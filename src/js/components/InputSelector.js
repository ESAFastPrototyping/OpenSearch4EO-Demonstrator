import React, { Component } from 'react';

export default class InputSelector extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.change(this.props.parameter, event.target.value);
    }
    render(){
        let options = this.props.options.map(option => <option value={option.value} key = {option.value}/>);
        return (
            <div className="eoos-property-input select">
                <input type="text" value = {this.props.text} onChange = {this.handleChange} list = {this.props.parameter}/>
                <datalist id={this.props.parameter}>
                    {options}
                </datalist>
            </div>
        )
    }

}
