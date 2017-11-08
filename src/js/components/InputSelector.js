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
        return (
            <div className="eoos-property-input select">
                <input type="text" value = {this.props.text} onChange = {this.handleChange}/>
            </div>
        )
    }

}
