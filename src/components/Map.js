import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
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

        new HighlightController(wwd, this.props.selectProduct);
        wwd.redraw();

        this.wwd = wwd;
        this.changeOnlySelection = false;
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.productsResult !== this.props.productsResult) {
            this.changeOnlySelection = false;
        } else if(nextProps.selectedProduct !== this.props.selectedProduct) {
            this.changeOnlySelection = true;
        }

        return (nextProps.productsResult !== this.props.productsResult) ||
            (nextProps.selectedProduct !== this.props.selectedProduct);
    }

    componentDidUpdate() {
        if(this.changeOnlySelection) {
            let products = this.productLayer.renderables;
            let selectedIdentifier = this.props.selectedProduct.identifier;
            let currentlyHighlighted = null;
            products.forEach(product => {
                product.highlighted = product.customProperties.identifier == selectedIdentifier;
                if(product.highlighted) {
                    currentlyHighlighted = product;
                }
            });

            if(currentlyHighlighted) {
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
