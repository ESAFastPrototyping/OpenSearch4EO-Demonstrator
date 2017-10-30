import React, { Component } from 'react';

export default class InputText extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.props.changeText(event.target.value);
    }
    render(){
        return (
            <div className="eoos-property">
                <div className="eoos-property-content">
                    <h2>Text</h2>
                    <div className="eoos-property-input">
                        <input type="text" id="collection-fulltext" onChange = {this.handleChange} value = {this.props.text}/>
                    </div>
                </div>
                <div className="eoos-property-indicator"></div>
            </div>
        )
    }

}
