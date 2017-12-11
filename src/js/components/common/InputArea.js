import React, {Component} from 'react';
import WorldWind from '../../WorldWind/worldwind';
import LayerManager from '../../WorldWind/worldwind';

export default class InputArea extends Component {
    constructor(props) {
        super(props);
        this.createShape = this.createShape.bind(this);
    }

    createShape() {
        if(this.shapeEditorController){
            this.shapeEditorController.destroy();
        }
        if(this.shapesLayer){
            this.shapesLayer.removeAllRenderables();
        }

        let wwd = this.props.wwd;

        // Create a layer to hold the surface shapes.
        this.shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
        wwd.addLayer(this.shapesLayer);

        //create a simple rectangle polygon in the lookAt location with a size corresponding to zoom
        let latitudeOffset = 10*wwd.navigator.range/10000000;
        let longitudeOffset = 10*wwd.navigator.range/10000000;
        var boundary = [];
        boundary.push(new WorldWind.Location(wwd.navigator.lookAtLocation.latitude - latitudeOffset, wwd.navigator.lookAtLocation.longitude - longitudeOffset));
        boundary.push(new WorldWind.Location(wwd.navigator.lookAtLocation.latitude - latitudeOffset, wwd.navigator.lookAtLocation.longitude + longitudeOffset));
        boundary.push(new WorldWind.Location(wwd.navigator.lookAtLocation.latitude + latitudeOffset, wwd.navigator.lookAtLocation.longitude + longitudeOffset));
        boundary.push(new WorldWind.Location(wwd.navigator.lookAtLocation.latitude + latitudeOffset, wwd.navigator.lookAtLocation.longitude - longitudeOffset));

        //create attributes
        var attributes = new WorldWind.ShapeAttributes(null);
        attributes.outlineColor = WorldWind.Color.BLACK;
        attributes.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);

        var highlightAttributes = new WorldWind.ShapeAttributes(attributes);
        highlightAttributes.outlineColor = WorldWind.Color.RED;

        var shape = new WorldWind.SurfacePolygon(boundary, attributes);
        shape.highlightAttributes = highlightAttributes;
        this.shapesLayer.addRenderable(shape);

        // Now set up to handle shape editor
        this.shapeEditorController = new WorldWind.ShapeEditorController(wwd);

        wwd.redraw();
    }

    render(){
        return (
            <div>
                <div className="eoos-property-input">
                    <input type="text" id="collection-location-find" />
                </div>
                <button id="collection-location-draw-in-map" onClick = {this.createShape}>Draw in map</button>
                <button id="collection-location-load-file">Load from file</button>
            </div>
        );
    }
}
