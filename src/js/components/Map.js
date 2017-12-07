import React, { Component } from 'react';
import WorldWind from '../WorldWind/worldwind';

export default class Map extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.wwd = new WorldWind.WorldWindow("wwd-results");
        let bingLayer = new WorldWind.BingAerialLayer(null);
		bingLayer.enabled = true;

        this.productLayer = new WorldWind.RenderableLayer();

		this.wwd.addLayer(bingLayer);
        this.wwd.addLayer(this.productLayer);
        this.wwd.redraw();
    }

    componentDidUpdate(){
        this.productLayer.removeAllRenderables();

        if (this.productsHaveGeometry()){
            let geoJSON = new WorldWind.GeoJSONParser(JSON.stringify(this.props.productsResult));
            geoJSON.load(null, null, this.productLayer);
        }

        this.wwd.redraw();
    }

    productsHaveGeometry(){
        if (!this.props.productsResult.features || this.props.productsResult.features.length === 0) {
            return false;
        }
        let geometryExists = true;
        this.props.productsResult.features.forEach(feature => {
            if (!feature.geometry){
                geometryExists = false;
            }
        });
        return geometryExists;
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
