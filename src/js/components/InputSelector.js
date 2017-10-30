import React, { Component } from 'react';

export default class  extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="eoos-property">
                <div className="eoos-property-content">
                    <h2>{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h2>
                    <div className="eoos-property-input select">
                        <input type="text" id={"collection-" + this.props.category}/>
                    </div>
                </div>
                <div className="eoos-property-indicator"></div>
            </div>
        )
    }

}
