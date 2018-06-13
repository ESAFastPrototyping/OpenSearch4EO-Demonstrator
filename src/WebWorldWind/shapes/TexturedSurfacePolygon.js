import WorldWind from '@nasaworldwind/worldwind';
import TexturedSurfaceShape from './TexturedSurfaceShape';

const SurfacePolygon = WorldWind.SurfacePolygon;

var TexturedSurfacePolygon = function (boundaries, attributes) {
    TexturedSurfaceShape.call(this, attributes);

    if (!Array.isArray(boundaries)) {
        throw new Error('TexturedSurfacePolygon - constructor - The specified boundary is not an array.');
    }

    this._boundaries = boundaries;
    this._stateId = SurfacePolygon.stateId++;
};

TexturedSurfacePolygon.prototype = Object.create(TexturedSurfaceShape.prototype);

Object.defineProperties(TexturedSurfacePolygon.prototype, {
    boundaries: {
        get: function () {
            return this._boundaries;
        },
        set: function (boundaries) {
            if (!Array.isArray(boundaries)) {
                throw new Error('TexturedSurfacePolygon - set boundaries - The specified boundary is not an array.');
            }
            this.resetBoundaries();
            this._boundaries = boundaries;
            this._stateId = SurfacePolygon.stateId++;
            this.stateKeyInvalid = true;
        }
    }
});

TexturedSurfacePolygon.prototype.computeStateKey = function () {
    return TexturedSurfacePolygon.staticStateKey(this);
};

TexturedSurfacePolygon.prototype.computeBoundaries = function (dc) {
};

TexturedSurfacePolygon.staticStateKey = function (shape) {
    return WorldWind.SurfacePolygon.staticStateKey(shape) + " pg " + shape._stateId;
};

export default TexturedSurfacePolygon;