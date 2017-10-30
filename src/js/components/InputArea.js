import React, { Component } from 'react';

export default class InputArea extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="eoos-property">
                <div className="eoos-property-content">
                    <h2>Search area</h2>
                    <div className="eoos-property-input">
                        <input type="text" id="collection-location-find" />
                    </div>
                    <button id="collection-location-draw-in-map">Draw in map</button>
                    <button id="collection-location-load-file">Load from file</button>
                </div>
                <div className="eoos-property-indicator"></div>
            </div>
        )
    }

}
