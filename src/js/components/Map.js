import React, { Component } from 'react';
import WorldWind from '../WorldWind/WorldWind';

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            wwd: null
        }
    }
    componentDidMount(){
        let wwd = new WorldWind.WorldWindow("wwd-results");
        let bingLayer = new WorldWind.BingAerialLayer(null);
		bingLayer.detailControl = 1.0;
		bingLayer.enabled = true;

		wwd.addLayer(bingLayer);
        wwd.addLayer(new WorldWind.CompassLayer());
        wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

        wwd.redraw();

        this.setState({wwd: wwd});
    }
    componentDidUpdate(){
        let myLayer = new WorldWind.RenderableLayer();
        if(!isEmpty(this.props.productsResult)){
            let geoJSON = new WorldWind.GeoJSONParser(JSON.stringify(this.props.productsResult));
            geoJSON.load(null, null, myLayer);
            this.state.wwd.addLayer(myLayer);
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
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
