import React, { Component } from 'react';

export default class ContentBox extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="eoos-property">
                <div className="eoos-property-content">
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </div>
        )
    }

}
