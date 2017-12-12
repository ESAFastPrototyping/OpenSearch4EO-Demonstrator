import React, {Component} from 'react';
import WorldWind from '../../WorldWind/worldwind';
import LayerManager from '../../WorldWind/worldwind';

export default class InputArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            drawing: false
        }

        // Create a layer to hold the surface shapes.
        this.shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
        this.props.wwd.addLayer(this.shapesLayer);

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount(){
        if(this.shapeEditorController){
            this.shapeEditorController.destroy();
            this.shapeEditorController = null;
        }
        if(this.shapesLayer){
            this.shapesLayer.removeAllRenderables();
            this.props.wwd.redraw();
        }
    }

    handleClick(){
        if(this.state.drawing) {
            this.finishDrawing();
        }
        else {
            this.startDrawing();
        }
        this.setState({drawing: !this.state.drawing});
    }

    finishDrawing(){
        //update bbox corresponding to current shape and hide shape editor
        let sector = this.shapesLayer.renderables[0]._sector;
        let bbox = [sector.minLongitude, sector.minLatitude, sector.maxLongitude, sector.maxLatitude];
        this.props.changeBBox(bbox);
        this.shapeEditorController.destroy();
        this.shapeEditorController = null;
        this.shapesLayer.removeAllRenderables();
        this.props.wwd.redraw();
    }

    startDrawing(){
        let wwd = this.props.wwd;

        //setup a simple rectangle polygon in the lookAt location with a size corresponding to zoom
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

        //create the polygon
        var shape = new WorldWind.SurfacePolygon(boundary, attributes);
        shape.highlightAttributes = highlightAttributes;
        this.shapesLayer.addRenderable(shape);

        // Now set up shape editor for controlling the polygon
        this.shapeEditorController = new WorldWind.ShapeEditorController(wwd);

        wwd.redraw();
    }

    render(){
        let displayBBox = this.props.bbox.map(location => Number(location).toFixed(6));
        return (
            <div>
                <div className="eoos-property-input">
                    <input type="text" id="collection-location-find" value = {displayBBox} readOnly/>
                </div>
                <button id="collection-location-draw-in-map" onClick = {this.handleClick}>
                    {this.state.drawing ? "Confirm area" : "Draw in map"}
                </button>
                {/* TODO: check if this is required
                    <button id="collection-location-load-file">Load from file</button>
                 */
                }

            </div>
        );
    }
}
