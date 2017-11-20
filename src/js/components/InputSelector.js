import React, { Component } from 'react';

export default class InputSelector extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.change(event.target.value);
    }
    render(){
        let options = this.props.options.map(option => <option value={option.value} key = {option.value}/>);
        return (
            <div className="eoos-property-input select">
                <input type="text" value = {this.props.text} onChange = {this.handleChange} list = {this.props.listName}/>
                <datalist id={this.props.listName}>
                    {options}
                </datalist>
            </div>
        )
    }

}
