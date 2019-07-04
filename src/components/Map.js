import React, {Component} from 'react';
import WorldWind from 'webworldwind-esa';
import ShapeEditor from '../WebWorldWind/util/editor/ShapeEditor';
import MapControls from './MapControls';
import GeoJSONParserWithTexture from '../WebWorldWind/formats/geojson/GeoJSONParserWithTexture';
import HighlightController from '../WebWorldWind/util/HighlightController';

const WorldWindow = WorldWind.WorldWindow,
    Location = WorldWind.Location,
    RenderableLayer = WorldWind.RenderableLayer,
    Sector = WorldWind.Sector,
    WmsLayer = WorldWind.WmsLayer;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wwdCreated: false
        };
    }

    componentDidMount() {
        const wwd = new WorldWindow("wwd-results");
        this.setState({wwdCreated: true});
        this.props.setWorldWindow(wwd);

        this.productLayer = new RenderableLayer();

        wwd.addLayer(new WmsLayer({
            service: "https://tiles.maps.eox.at/wms",
            layerNames: "s2cloudless",
            sector: new Sector(-90, 90, -180, 180),
            levelZeroDelta: new Location(45, 45),
            numLevels: 19,
            format: "image/jpg",
            opacity: 1,
            size: 256,
            version: "1.3.0"
        }));
        wwd.addLayer(this.productLayer);
        wwd.deepPicking = true;
        wwd.navigator.lookAtLocation.latitude = 45;
        wwd.navigator.lookAtLocation.longitude = 20;

        const shapeEditor = new ShapeEditor(wwd);
        this.editor = shapeEditor;

        var config = {
            move: true,
            reshape: true,
            rotate: true,
            manageControlPoint: true
        };

        var shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
        wwd.addLayer(shapesLayer);

        var handlePick = (o) => {
            if(!this.props.createCircle || shapeEditor._shape) {
                if(shapeEditor._shape && o.shiftKey) {
                    const shape = shapeEditor._shape;
                    shapeEditor.stop();
                    shape.attributes.drawInterior = false;
                    shape.highlightAttributes.drawInterior = false;
                    this.props.circle(shape);
                }
                return;
            }
            if(!shapeEditor._shape && o.shiftKey) {
                shapesLayer.removeAllRenderables();
            }
            if(shapesLayer.renderables.length > 0) {
                return;
            }


            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            const shapeAttributes = new WorldWind.ShapeAttributes();
            shapeAttributes.drawInterior = false;
            var properties = {
                center: null,
                radius: 200e3,
                attributes: new WorldWind.ShapeAttributes()
            };

            shapeEditor.create(function SurfaceCircle(){}, properties).then(
                function (shape) {
                    if (shape !== null) {
                        shape.highlightAttributes = new WorldWind.ShapeAttributes();
                        shape.highlightAttributes.interiorColor = new WorldWind.Color(1,1,1,0.5);
                        shapesLayer.addRenderable(shape);
                        shapeEditor.edit(shape, config);
                    } else {
                        console.log("No shape created - null shape returned.");
                    }

                },
                function (error) {
                    if (error) {
                        console.log("Error in shape creation: " + error);
                    } else {
                        console.log("No shape created.");
                    }
                }
            );
        };

        wwd.addEventListener("click", handlePick);

        new HighlightController(wwd, this.props.selectProduct);
        wwd.redraw();

        this.wwd = wwd;
        this.changeOnlySelection = false;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.productsResult !== this.props.productsResult) {
            this.changeOnlySelection = false;
        } else if (nextProps.selectedProduct !== this.props.selectedProduct) {
            this.changeOnlySelection = true;
        }

        return (nextProps.productsResult !== this.props.productsResult) ||
            (nextProps.selectedProduct !== this.props.selectedProduct);
    }

    componentDidUpdate() {
        if (this.changeOnlySelection) {
            let products = this.productLayer.renderables;
            let selectedIdentifier = this.props.selectedProduct.identifier;
            let currentlyHighlighted = null;
            products.forEach(product => {
                product.highlighted = product.customProperties.identifier === selectedIdentifier;
                if (product.highlighted) {
                    currentlyHighlighted = product;
                }
            });

            if (currentlyHighlighted) {
                var relevantLayer = currentlyHighlighted.layer;
                relevantLayer.removeRenderable(currentlyHighlighted);
                relevantLayer.addRenderable(currentlyHighlighted);
            }
            this.wwd.redraw();
        } else {
            this.productLayer.removeAllRenderables();

            if (this.productsHaveGeometry()) {
                if (this.props.productsResult && this.props.productsResult.features) {
                    this.props.productsResult.features.forEach(product => {
                        if (!product.properties) {
                            product.properties = {};
                        }
                        if (product.links) {
                            product.properties.links = product.links;
                        }
                    });
                }
                let geoJSON = new GeoJSONParserWithTexture(JSON.stringify(this.props.productsResult));
                geoJSON.load(null, null, this.productLayer);
            }

            this.wwd.redraw();
        }
    }

    productsHaveGeometry() {
        if (!this.props.productsResult.features || this.props.productsResult.features.length === 0) {
            return false;
        }
        let geometryExists = true;
        this.props.productsResult.features.forEach(feature => {
            if (!feature.geometry) {
                geometryExists = false;
            }
        });
        return geometryExists;
    }

    render() {
        return (
            <div id="map">
                <canvas id="wwd-results"></canvas>
                {this.state.wwdCreated && <MapControls wwd={this.wwd}/>}
            </div>
        )
    }
}
