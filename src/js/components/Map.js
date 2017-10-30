import React, { Component } from 'react';
import WorldWind from '../worldwind/worldwind';

export default class Map extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(WorldWind);
        var worldwind = new WorldWind.WorldWindow("wwd-results");
        var bingLayer = new WorldWind.BingAerialLayer(null);
		bingLayer.detailControl = 1.0;
		bingLayer.enabled = true;

		worldwind.addLayer(bingLayer);
    }
    componentWillUpdate(){
        if (!isEmpty(this.props.currentResult)){
            var geo = new WorldWind.GeoJSONParser(this.props.currentResult);
            console.log(geo);
        }
    }
    render(){
        return (
            <div id="map">
                <canvas id="wwd-results"></canvas>
            </div>
        )
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
