import React, {Component} from 'react';
import WorldWind from '@nasaworldwind/worldwind';
import MapControls from './MapControls';
import GeoJSONParserWithTexture from '../WebWorldWind/formats/geojson/GeoJSONParserWithTexture';
import HighlightController from '../WebWorldWind/util/HighlightController';

const WorldWindow = WorldWind.WorldWindow,
    BMNGLandsatLayer = WorldWind.BMNGLandsatLayer,
    RenderableLayer = WorldWind.RenderableLayer;

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

        let mapLayer = new BMNGLandsatLayer();
        this.productLayer = new RenderableLayer();

        wwd.addLayer(mapLayer);
        wwd.addLayer(this.productLayer);
        wwd.deepPicking = true;
        wwd.navigator.lookAtLocation.latitude = 45;
        wwd.navigator.lookAtLocation.longitude = 20;

        new HighlightController(wwd, this.props.selectProduct);
        wwd.redraw();

        this.wwd = wwd;
    }

    componentDidUpdate() {
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
