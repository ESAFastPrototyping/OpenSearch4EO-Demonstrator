import WorldWind from 'webworldwind-esa';
import PlacemarkEditorFragment from './PlacemarkEditorFragment';
import ShapeEditorConstants from './ShapeEditorConstants';
import SurfaceEllipseEditorFragment from './SurfaceEllipseEditorFragment';
import SurfaceCircleEditorFragment from './SurfaceCircleEditorFragment';
import SurfacePolygonEditorFragment from './SurfacePolygonEditorFragment';
import SurfacePolylineEditorFragment from './SurfacePolylineEditorFragment';
import SurfaceRectangleEditorFragment from './SurfaceRectangleEditorFragment';
import SurfaceSectorEditorFragment from './SurfaceSectorEditorFragment';

const Annotation = WorldWind.Annotation,
    AnnotationAttributes = WorldWind.AnnotationAttributes,
    ArgumentError = WorldWind.ArgumentError,
    Color = WorldWind.Color,
    Font = WorldWind.Font,
    Insets = WorldWind.Insets,
    Location = WorldWind.Location,
    Logger = WorldWind.Logger,
    Placemark = WorldWind.Placemark,
    PlacemarkAttributes = WorldWind.PlacemarkAttributes,
    Position = WorldWind.Position,
    RenderableLayer = WorldWind.RenderableLayer,
    ShapeAttributes = WorldWind.ShapeAttributes,
    SurfacePolygon = WorldWind.SurfacePolygon,
    Vec2 = WorldWind.Vec2,
    Vec3 = WorldWind.Vec3;

/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @exports ShapeEditor
 */

"use strict";

/**
 * Constructs a new shape editor attached to the specified World Window.
 * @alias ShapeEditor
 * @classdesc Provides a controller for editing shapes. Depending on the type of shape, the following actions
 * are available:
 * <ul>
 *     <li>Edit the location and size of its vertexes using control points;</li>
 *     <li>Rotate the shape using a handle;</li>
 *     <li>Drag the shape on the surface of the globe.</li>
 * </ul>
 * <p>
 * To start editing a shape, pass it to the {@link ShapeEditor#edit} method. To end the edition, call the
 * {@link ShapeEditor#stop} method.
 * <p>
 * Dragging the body of the shape moves the whole shape. Dragging a control point performs the action associated
 * with that control point. The editor provides vertex insertion and removal for SurfacePolygon and
 * SurfacePolyline. Shift-clicking when the cursor is over the shape inserts a control point near the position
 * of the cursor. Ctrl-clicking when the cursor is over a control point removes that particular control point.
 * <p>
 * This editor currently supports all surface shapes except SurfaceImage.
 * @param {WorldWindow} worldWindow The World Window to associate this shape editor controller with.
 * @throws {ArgumentError} If the specified World Window is <code>null</code> or <code>undefined</code>.
 * @constructor
 */
var ShapeEditor = function (worldWindow) {
    if (!worldWindow) {
        throw new ArgumentError(Logger.logMessage(Logger.LEVEL_SEVERE, "ShapeEditor", "constructor",
            "missingWorldWindow"));
    }

    // Documented in defineProperties below.
    this._worldWindow = worldWindow;

    // Documented in defineProperties below.
    this._shape = null;

    // Internal use only.
    // Flags indicating whether the specific action is allowed or not.
    this._allowMove = true;
    this._allowReshape = true;
    this._allowRotate = true;
    this._allowManageControlPoint = true;

    // Internal use only
    // List of highlighted control points - on mouse over
    this._highlightedItems = [];

    // Documented in defineProperties below (blue dot image).
    this._moveControlPointAttributes = new PlacemarkAttributes(null);
    this._moveControlPointAttributes.imageSource = "data:image/png;base64,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";
    this._moveControlPointAttributes.imageScale = 0.15;

    // Documented in defineProperties below (grey dot image).
    this._shadowControlPointAttributes = new PlacemarkAttributes(null);
    this._shadowControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACx1BMVEUAAAD////////////////////////6+vr////////////y8vL////////////////////////9/f309PT////////////////////////9/f3////////////////09PT////////y8vL////////9/f3+/v7////////8/Pz+/v7y8vL+/v7////////////+/v7////8/Pz////////////39/f39/f////8/Pz////y8vL////////////09PT////19fX////8/Pz////7+/v+/v7////z8/P////09PT7+/v////8/Pz////////////+/v7x8fH////29vbz8/P39/f6+vr////y8vL////////8/Pz8/Pz09PT29vb////////19fX7+/v5+fn8/Pz////8/Pz////6+vr8/Pz8/Pz+/v7y8vL4+Pj5+fnz8/P7+/v////6+vr////////7+/v////////29vb+/v729vb39/f4+Pj////////////////8/Pz+/v7////////////19fX7+/v7+/v39/f9/f34+Pj////////6+vr////////5+fn9/f37+/v+/v74+Pj6+vr9/f3////5+fn////////9/f3+/v76+vr8/Pz+/v77+/v6+vr7+/v+/v7////9/f3+/v7+/v75+fn+/v77+/v+/v7////8/Pz9/f38/Pz8/Pz+/v78/Pz+/v79/f3+/v78/Pz9/f3+/v78/Pz9/f3+/v7////+/v7T09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///+ggSSQAAAAwHRSTlMAAQIDBAcICQoLDQ4PEBITFBgZGhscHSElJigoKS0uLzAyMzY3ODo6PkJERkZGSElMTE1TVVZYX19gYGFhY2RlZmdnbXBxcXJzdnt8foCDhIWGjo+Ql5iYmJ+foaKjpKamp6ioqausrbGysrS0tra2ubm5u7zAwcPExcXHx8fHyMnKzs7O0dTY2Nrb297e4OHh4uPk5efo6enp6urr7Ozu7u7v8PDw8PHx8vT09fb29/f4+fn6+vv7/Pz8/f39/f6yTS27AAADH0lEQVR4AZ3X93dUVRTF8f0SgoqKXVEUe++99yj2XhTB3nsRe++KvXfF3kUQLBpy3nspMYEkJCEJkBJkhplkvn+EZEgwQzLl3c/vZ6/7w1n7rqNsinc+5uzrnni37M9Pn79nyokTihRJyd6TvybDLw+fsJ4Kte2NMxjUl2LQ3/fvrkJsfhNpsfb6fyp9s7C6rrH1X9LePthTHptMKQdSXfWhZQgbOnoBXthauXjH/wYk2yptBH5TAii/ZW1lteY1QF+Lb2nZIr7bTlmMmwZ0VlgOfnMK/jpcI9r3R0jOszxqlkPqfE/D7VEGyyotr7AbuF3DbD8LOgMrxELgYq1my2+h3QrUApyiDJu+BR1WsMWQOkhDFD0APb4VzO+BXzfS/46DWGARBDF4Vqts/D2pGoukqg+O1QDvemi1iNrg57FaaX+I+xZRkIQLlOY9CXUWWRPMXEP9doCYRefH4Rz1uwQazUEDfO5JWn8WCd8cBH2wq6SToc2cdMFlku6D+eakEd6XRv0EoTkJU7ChJkDcHPXASToSlpijhXCpLoIF5qgRHtSjUGOO6uB1PQWhOaqCH/Q4VJijAGbqEdwDrJffdS9Umqskf2gquAekmKO7ococBfCF7sQ9oBJe1LVQb45q4SGVwiJz1AJXaiuImaMuOFree+6rmISx0hXOhVID70g6CtrNySK4WtJmro0S9MJOWuElaHBsg088rXAaxH2LLgbnqd+YD2CB0wPKNlBaKQ5fS5CAC7XS6Feh2SJqhRnrasARkKywSGpTcKoGjXoGlgUWQZiAN0u0yvivoNMi6IY5W2iIveZCa6Qd5FBlmAg0R5mfrEzeJGCxX/D8DcVaTclUYGloeQWdwK1FGqZkErC81vKojgNXFWkEXulcoCP3wdHUB+WnF2lke36Z++SxeTHgsx2V1binARJtVTaSum6A28Yoh+JDXgNgaWNomWraEwDP7aY8Rk+cTlq8o7m2IgzM/Or5LUviALyyn6f81jnrQ4ZIMWD2Xft4KkzxLue+TKbZdxywlqLwtjnsjMsf+/ib6R+9Me3mMw8cP0pZ/AewF57BEV8rHgAAAABJRU5ErkJggg==";
    this._shadowControlPointAttributes.imageScale = 0.15;

    // Documented in defineProperties below (yellow dot image).
    this._resizeControlPointAttributes = new PlacemarkAttributes(null);
    this._resizeControlPointAttributes.imageSource = "data:image/png;base64,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";
    this._resizeControlPointAttributes.imageScale = 0.15;

    // Documented in defineProperties below (green dot image).
    this._rotateControlPointAttributes = new PlacemarkAttributes(null);
    this._rotateControlPointAttributes.imageColor = WorldWind.Color.GREEN;
    this._rotateControlPointAttributes.imageSource = "data:image/png;base64,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";
    this._rotateControlPointAttributes.imageScale = 0.15;

    // Documented in defineProperties below.
    this._annotationAttributes = new AnnotationAttributes(null);
    this._annotationAttributes.altitudeMode = WorldWind.CLAMP_TO_GROUND;
    this._annotationAttributes.cornerRadius = 5;
    this._annotationAttributes.backgroundColor = new Color(0.67, 0.67, 0.67, 0.8);
    this._annotationAttributes.leaderGapHeight = 0;
    this._annotationAttributes.drawLeader = false;
    this._annotationAttributes.scale = 1;
    this._annotationAttributes.textAttributes.color = Color.BLACK;
    this._annotationAttributes.textAttributes.font = new Font(10);
    this._annotationAttributes.insets = new Insets(5, 5, 5, 5);

    // Internal use only.
    // The annotation that displays hints during the actions on the shape.
    this.annotation = new WorldWind.Annotation(new WorldWind.Position(0, 0, 0), this._annotationAttributes);

    //Internal use only. Intentionally not documented.
    this.editorFragments = [
        new PlacemarkEditorFragment(),
        new SurfaceCircleEditorFragment(),
        new SurfaceEllipseEditorFragment(),
        new SurfacePolygonEditorFragment(),
        new SurfacePolylineEditorFragment(),
        new SurfaceRectangleEditorFragment(),
        new SurfaceSectorEditorFragment()
    ];

    // Internal use only.
    // The layer that holds the control points created by the editor fragment.
    this.controlPointsLayer = new RenderableLayer("Shape Editor Control Points");

    // Internal use only.
    // The layer that holds the shadow control points created by the editor fragment.
    this.shadowControlPointsLayer = new RenderableLayer("Shape Editor Shadow Control Points");

    // Internal use only.
    // The layers that holds the additional accessories created by the editor fragment.
    this.accessoriesLayer = new RenderableLayer("Shape Editor Accessories");
    this.accessoriesLayer.pickEnabled = false;

    // Internal use only.
    // The layer that holds the above-mentioned annotation.
    this.annotationLayer = new RenderableLayer("Shape Editor Annotation");
    this.annotationLayer.pickEnabled = false;
    this.annotationLayer.enabled = false;
    this.annotationLayer.addRenderable(this.annotation);

    // Internal use only.
    // The layer that holds the shadow of the shape during the actions.
    this.shadowShapeLayer = new RenderableLayer("Shape Editor Shadow Shape");
    this.shadowShapeLayer.pickEnabled = false;

    // Internal use only.
    // The editor fragment selected for the shape being edited or null.
    this.activeEditorFragment = null;

    // Internal use only.
    // The type of action being conducted or null.
    this.actionType = null;

    // Internal use only.
    // The control point that triggered the current action or null.
    this.actionControlPoint = null;

    // Internal use only.
    // The lat/lon/alt position that is currently involved with the action or null.
    this.actionControlPosition = null;

    // Internal use only.
    // Flag indicating whether the action should trigger the secondary behavior in the editor fragment.
    this.actionSecondaryBehavior = false;

    // Internal use only.
    // The current client X position for the action.
    this.actionCurrentX = null;

    // Internal use only.
    // The current client Y position for the action.
    this.actionCurrentY = null;

    // Internal use only.
    // The original highlight attributes of the shape in order to restore them after the action.
    this.originalHighlightAttributes = new ShapeAttributes(null);
    this.originalPlacemarkHighlightAttributes = new PlacemarkAttributes(null);

    // Internal use only.
    // counters used to detect double click (time measured in ms)
    this._clicked0X = null;
    this._clicked0Y = null;
    this._clicked1X = null;
    this._clicked1Y = null;
    this._click0Time = 0;
    this._click1Time = 0;
    this._dbclickTimeout = 0;
    this._clickDelay = 500;

    // Internal use only.
    // Used for shape creation
    this.creatorEnabled = false;
    this.creatorShapeProperties = null;
    this.promisedShape = null;

    this._worldWindow.worldWindowController.addGestureListener(this);
};

Object.defineProperties(ShapeEditor.prototype, {
    /**
     * The World Window associated with this shape editor.
     * @memberof ShapeEditor.prototype
     * @type {WorldWindow}
     * @readonly
     */
    worldWindow: {
        get: function () {
            return this._worldWindow;
        }
    },

    /**
     * The shape currently being edited.
     * @memberof ShapeEditor.prototype
     * @type {Object}
     * @readonly
     */
    shape: {
        get: function () {
            return this._shape;
        }
    },

    /**
     * Attributes used for the control points that move the boundaries of the shape.
     * @memberof ShapeEditor.prototype
     * @type {PlacemarkAttributes}
     */
    moveControlPointAttributes: {
        get: function () {
            return this._moveControlPointAttributes;
        },
        set: function (value) {
            this._moveControlPointAttributes = value;
        }
    },

    /**
     * Attributes used for the shadow control points used to mask the middle of a segment.
     * @memberof ShapeEditor.prototype
     * @type {PlacemarkAttributes}
     */
    shadowControlPointAttributes: {
        get: function () {
            return this._shadowControlPointAttributes;
        },
        set: function (value) {
            this._shadowControlPointAttributes = value;
        }
    },

    /**
     * Attributes used for the control points that resize the shape.
     * @memberof ShapeEditor.prototype
     * @type {PlacemarkAttributes}
     */
    resizeControlPointAttributes: {
        get: function () {
            return this._resizeControlPointAttributes;
        },
        set: function (value) {
            this._resizeControlPointAttributes = value;
        }
    },

    /**
     * Attributes used for the control points that rotate the shape.
     * @memberof ShapeEditor.prototype
     * @type {PlacemarkAttributes}
     */
    rotateControlPointAttributes: {
        get: function () {
            return this._rotateControlPointAttributes;
        },
        set: function (value) {
            this._rotateControlPointAttributes = value;
        }
    },

    /**
     * Attributes used for the annotation that displays hints during the actions on the shape.
     * @memberof ShapeEditor.prototype
     * @type {AnnotationAttributes}
     */
    annotationAttributes: {
        get: function () {
            return this._annotationAttributes;
        },
        set: function (value) {
            this._annotationAttributes = value;
            this.annotation.attributes = value;
        }
    }
});

/**
 * Creates the specified shape. Currently, only surface shapes are supported.
 * @param {SurfaceShape} shape The shape to edit.
 * @param {{}} properties Configuration properties for the shape:
 * <ul>
 *     <li>TODO: describe properties fro each shape</li>
 *     <li>attributes: {ShapeAttributes} attributes of the shape.</li>
 * <ul>
 * @return {Promise} <code>shape</code> if the creator can create the specified shape; otherwise
 * <code>null</code>.
 */
ShapeEditor.prototype.create = function (shape, properties) {
    var res, rej;

    this.stop();
    this.setCreatorEnabled(true);

    for (var i = 0, len = this.editorFragments.length; i < len; i++) {
        var editorFragment = this.editorFragments[i];
        if (editorFragment.canHandle(shape)) {
            this.activeEditorFragment = editorFragment;
            this.creatorShapeProperties = properties;
        }
    }

    if (this.activeEditorFragment != null) {
        var promise = new Promise(function (resolve, reject) {
            res = resolve;
            rej = reject;
        });

        promise.resolve = res;
        promise.reject = rej;

        this.promisedShape = promise;

        return promise;
    } else {
        return null;
    }
};

/**
 * Identifies whether the shape editor create mode is armed.
 * @return true if armed, false if not armed.
 */
ShapeEditor.prototype.isCreatorEnabled = function () {
    return this.creatorEnabled;
};

/**
 * Arms and disarms the shape editor create mode. When armed, editor monitors user input and builds the
 * shape in response to user actions. When disarmed, the shape editor ignores all user input for creation of a
 * new shape.
 *
 * @param armed true to arm the shape editor create mode, false to disarm it.
 */
ShapeEditor.prototype.setCreatorEnabled = function (creatorEnabled) {
    if (this.creatorEnabled != creatorEnabled) {
        this.creatorEnabled = creatorEnabled;
    }
};

/**
 * Edits the specified shape. Currently, only surface shapes are supported.
 * @param {SurfaceShape} shape The shape to edit.
 * @param {{}} config Configuration properties for the ShapeEditor:
 * <ul>
 *     <li>move: {Boolean} move true to enable move action on shape, false to disable move action on shape.</li>
 *     <li>reshape: {Boolean} reshape true to enable reshape action on shape, false to disable reshape action on shape.</li>
 *     <li>rotate: {Boolean} rotate true to enable rotate action on shape, false to disable rotate action on shape.</li>
 *     <li>manageControlPoint: {Boolean} manageControlPoint true to enable the action to manage the control points of the shape, false to disable it.</li>
 * <ul>
 * @return {Boolean} <code>true</code> if the editor could start the edition of the specified shape; otherwise
 * <code>false</code>.
 */
ShapeEditor.prototype.edit = function (shape, config) {
    this.stop();

    this._allowMove = Object.prototype.hasOwnProperty.call(config, 'move') ? config.move : this._allowMove;
    this._allowReshape = Object.prototype.hasOwnProperty.call(config, 'reshape') ? config.reshape : this._allowReshape;
    this._allowRotate = Object.prototype.hasOwnProperty.call(config, 'rotate') ? config.rotate : this._allowRotate;
    this._allowManageControlPoint = Object.prototype.hasOwnProperty.call(config, 'manageControlPoint') ? config.manageControlPoint : this._allowManageControlPoint;

    if (!this._allowReshape) {
        this._allowManageControlPoint = false;
    }

    // Look for a fragment that can handle the specified shape
    for (var i = 0, len = this.editorFragments.length; i < len; i++) {
        var editorFragment = this.editorFragments[i];
        if (editorFragment.canHandle(shape)) {
            this.activeEditorFragment = editorFragment;
        }
    }

    // If we have a fragment for this shape, accept the shape and start the edition
    if (this.activeEditorFragment != null) {
        this._shape = shape;
        this._shape.highlighted = true;
        this.initializeControlElements();
        return true;
    }

    return false;
};

/**
 * Stops the current edition activity if any.
 * @return {SurfaceShape} The shape being edited if any; otherwise <code>null</code>.
 */
ShapeEditor.prototype.stop = function () {
    this.removeControlElements();

    this.activeEditorFragment = null;

    this._allowMove = true;
    this._allowReshape = true;
    this._allowRotate = true;
    this._allowManageControlPoint = true;

    var currentShape = this._shape;
    this._shape = null;

    if (currentShape !== null) {
        currentShape.highlighted = false;
    }

    return currentShape;
};

// Internal use only.
// Called by {@link ShapeEditor#edit} to initialize the control elements used for editing.
ShapeEditor.prototype.initializeControlElements = function () {
    var moveControlAttributes = this._moveControlPointAttributes;
    var resizeControlAttributes = this._resizeControlPointAttributes;
    var rotateControlAttributes = this._rotateControlPointAttributes;
    var shadowControlAttributes = this._shadowControlPointAttributes;

    if (!this._allowMove) {
        moveControlAttributes = null;
    }

    if (!this._allowReshape) {
        resizeControlAttributes = null;
    }

    if (!this._allowRotate) {
        rotateControlAttributes = null;
    }

    if (!this._allowManageControlPoint) {
        shadowControlAttributes = null;
    }

    if (this._worldWindow.indexOfLayer(this.shadowShapeLayer) == -1) {
        this._worldWindow.insertLayer(0, this.shadowShapeLayer);
    }

    if (this._worldWindow.indexOfLayer(this.controlPointsLayer) == -1) {
        this._worldWindow.addLayer(this.controlPointsLayer);
    }

    if (this._worldWindow.indexOfLayer(this.shadowControlPointsLayer) == -1) {
        this._worldWindow.addLayer(this.shadowControlPointsLayer);
    }


    if (this._worldWindow.indexOfLayer(this.accessoriesLayer) == -1) {
        this._worldWindow.addLayer(this.accessoriesLayer);
    }

    if (this._worldWindow.indexOfLayer(this.annotationLayer) == -1) {
        this._worldWindow.addLayer(this.annotationLayer);
    }

    this.activeEditorFragment.initializeControlElements(
        this._shape,
        this.controlPointsLayer.renderables,
        this.shadowControlPointsLayer.renderables,
        this.accessoriesLayer.renderables,
        resizeControlAttributes,
        rotateControlAttributes,
        moveControlAttributes,
        shadowControlAttributes
    );

    this.updateControlElements();
};

// Internal use only.
// Called by {@link ShapeEditor#stop} to remove the control elements used for editing.
ShapeEditor.prototype.removeControlElements = function () {
    this._worldWindow.removeLayer(this.controlPointsLayer);
    this.controlPointsLayer.removeAllRenderables();

    this._worldWindow.removeLayer(this.shadowControlPointsLayer);
    this.shadowControlPointsLayer.removeAllRenderables();

    this._worldWindow.removeLayer(this.accessoriesLayer);
    this.accessoriesLayer.removeAllRenderables();

    this._worldWindow.removeLayer(this.shadowShapeLayer);
    this.shadowShapeLayer.removeAllRenderables();

    this._worldWindow.removeLayer(this.annotationLayer);
};

// Internal use only.
// Updates the position of the control elements.
ShapeEditor.prototype.updateControlElements = function () {
    this.activeEditorFragment.updateControlElements(
        this._shape,
        this._worldWindow.globe,
        this.controlPointsLayer.renderables,
        this.shadowControlPointsLayer.renderables,
        this.accessoriesLayer.renderables
    );
};

// Internal use only.
// Dispatches the events relevant to the shape editor.
ShapeEditor.prototype.onGestureEvent = function (event) {
    if (this._shape === null && !this.isCreatorEnabled()) {
        return;
    }

    // TODO Add support for touch devices

    if (event.type === "pointerup" || event.type === "mouseup") {
        this.handleMouseUp(event);
    } else if (event.type === "pointerdown" || event.type === "mousedown") {
        this.handleMouseDown(event);
    } else if (event.type === "pointermove" || event.type === "mousemove") {
        this.handleMouseMove(event);
    }
};

// Internal use only.
// Triggers an action if the shape below the mouse is the shape being edited or a control point.
ShapeEditor.prototype.handleMouseDown = function (event) {
    var x = event.clientX,
        y = event.clientY;

    this.actionCurrentX = x;
    this.actionCurrentY = y;

    var mousePoint = this._worldWindow.canvasCoordinates(x, y);
    var tmpOutlineWidth = 0;

    if (this._shape !== null) {
        tmpOutlineWidth = this._shape.highlightAttributes.outlineWidth;
        this._shape.highlightAttributes.outlineWidth = 5;
    }

    var pickList = this._worldWindow.pick(mousePoint);

    if (tmpOutlineWidth !== 0) {
        this._shape.highlightAttributes.outlineWidth = tmpOutlineWidth;
    }

    var terrainObject = pickList.terrainObject();

    if (this._click0Time && !this._click1Time) {
        this._clicked1X = x;
        this._clicked1Y = y;
        this._click1Time = Date.now() - this._click0Time;
    } else {
        this._clicked0X = x;
        this._clicked0Y = y;
        this._click0Time = Date.now();
        this._click1Time = 0;
        clearTimeout(this._dbclickTimeout);
        this._dbclickTimeout = setTimeout(function () {
                this._click0Time = 0;
            }, this._clickDelay
        );
    }

    for (var p = 0, len = pickList.objects.length; p < len; p++) {
        var object = pickList.objects[p];

        if (!object.isTerrain) {
            var userObject = object.userObject;

            if (userObject === this._shape) {
                this.beginAction(terrainObject.position, this._allowManageControlPoint);
                event.preventDefault();
                break;

            } else if (this.controlPointsLayer.renderables.indexOf(userObject) !== -1) {
                this.beginAction(terrainObject.position, this._allowManageControlPoint, userObject);
                event.preventDefault();
                break;
            } else if (this.shadowControlPointsLayer.renderables.indexOf(userObject) !== -1) {
                this.beginAction(terrainObject.position, this._allowManageControlPoint, userObject);

                if (this.actionType == 'shadow' && this._allowManageControlPoint) {
                    this.activeEditorFragment.convertShadowControlPoint(
                        this._shape,
                        this._worldWindow.globe,
                        userObject.userProperties.index,
                        terrainObject.position
                    );
                    this.updateControlElements();
                }

                event.preventDefault();
                break;
            }
        } else if (this.isCreatorEnabled() && this.activeEditorFragment !== null && this._shape === null) {
            if (this.activeEditorFragment.isRegularShape()) {
                if (this.activeEditorFragment instanceof PlacemarkEditorFragment) {
                    this.creatorShapeProperties.position = terrainObject.position;
                } else {
                    this.creatorShapeProperties.center = terrainObject.position;
                }

                this.creatorShapeProperties.radius = 3;
                this.creatorShapeProperties._boundaries = [
                    {
                        latitude: terrainObject.position.latitude - 0.5,
                        longitude: terrainObject.position.longitude - 0.5
                    },
                    {
                        latitude: terrainObject.position.latitude + 0.5,
                        longitude: terrainObject.position.longitude - 0.5
                    },
                    {
                        latitude: terrainObject.position.latitude + 0.5,
                        longitude: terrainObject.position.longitude + 0.5
                    }
                ];
            } else {
                // TODO: create other shapes
            }

            this._shape = this.activeEditorFragment.createShadowShape(this.creatorShapeProperties);
            this._shape.highlighted = true;
            this.initializeControlElements();
            this.beginAction(terrainObject.position, this._allowManageControlPoint, this.controlPointsLayer.renderables[0]);

            event.preventDefault();
        }
    }
};

// Internal use only.
// Updates the current action if any.
ShapeEditor.prototype.handleMouseMove = function (event) {

    if (this._click0Time && !this._click1Time) {
        this._clicked1X = event.clientX;
        this._clicked1Y = event.clientY;
    }

    if (!(this._clicked0X === this._clicked1X
        && this._clicked0Y === this._clicked1Y)) {
        clearTimeout(this._dbclickTimeout);
        this._click0Time = 0;
        this._click1Time = 0;
    }

    var redrawRequired = this._highlightedItems.length > 0; // must redraw if we de-highlight previous shapes

    // De-highlight any previously highlighted shapes.
    for (var h = 0; h < this._highlightedItems.length; h++) {
        this._highlightedItems[h].highlighted = false;
    }
    this._highlightedItems = [];

    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    var pickList = this._worldWindow.pick(this._worldWindow.canvasCoordinates(event.clientX, event.clientY));
    if (pickList.objects.length > 0) {
        redrawRequired = true;
    }

    // Highlight the items picked by simply setting their highlight flag to true.
    if (pickList.objects.length > 0) {
        for (var p = 0; p < pickList.objects.length; p++) {
            if (!pickList.objects[p].isTerrain && pickList.objects[p].userObject.userProperties.purpose) {
                pickList.objects[p].userObject.highlighted = true;

                // Keep track of highlighted items in order to de-highlight them later.
                this._highlightedItems.push(pickList.objects[p].userObject);
            }
        }
    }

    // Update the window if we changed anything.
    if (redrawRequired) {
        this._worldWindow.redraw(); // redraw to make the highlighting changes take effect on the screen
    }

    if (this.actionType) {

        var mousePoint = this._worldWindow.canvasCoordinates(event.clientX, event.clientY);
        var terrainObject = this._worldWindow.pickTerrain(mousePoint).terrainObject();

        if (terrainObject) {
            if (this.actionType === ShapeEditorConstants.DRAG) {
                if (this._allowMove) {
                    this.drag(event.clientX, event.clientY);
                } else {
                    Logger.logMessage(Logger.LEVEL_INFO, "ShapeEditor", "handleMouseMove",
                        "Disabled action for selected shape.");
                }
            } else {
                if (this._allowReshape || this._allowRotate) {
                    this.actionSecondaryBehavior = false;
                    this.actionControlPoint.highlighted = true;
                    this.reshape(terrainObject.position);
                } else {
                    Logger.logMessage(Logger.LEVEL_INFO, "ShapeEditor", "handleMouseMove",
                        "Disabled action for selected shape.");
                }
            }

            event.preventDefault();
        }
    }
};

// Internal use only.
// Terminates the current action if any; otherwise handles other click responses.
ShapeEditor.prototype.handleMouseUp = function (event) {
    var mousePoint = this._worldWindow.canvasCoordinates(event.clientX, event.clientY);
    var terrainObject = this._worldWindow.pickTerrain(mousePoint).terrainObject();

    if (this.isCreatorEnabled()) {
        this.setCreatorEnabled(false);
        this.promisedShape.resolve(this._shape);
    }

    // The editor provides vertex insertion and removal for SurfacePolygon and SurfacePolyline.
    // Double click when the cursor is over a control point will remove it.
    // Single click when the cursor is over a shadow control point will add it.
    if (this.actionType) {
        if (this._click0Time && this._click1Time) {
            if (this._click1Time <= this._clickDelay) {
                if (this.actionControlPoint
                    && this.actionType == 'location'
                    && terrainObject
                    && this._allowManageControlPoint) {
                    this.actionSecondaryBehavior = true;
                    this.reshape(terrainObject.position);
                }
            }
            clearTimeout(this._dbclickTimeout);
            this._click0Time = 0;
            this._click1Time = 0;

        }

        this.endAction();
    }
};

// Internal use only.
ShapeEditor.prototype.beginAction = function (initialPosition, alternateAction, controlPoint) {
    // Define the active transformation
    if (controlPoint) {
        this.actionType = controlPoint.userProperties.purpose;
    } else {
        this.actionType = ShapeEditorConstants.DRAG;
    }

    this.actionControlPoint = controlPoint;
    this.actionControlPosition = initialPosition;
    this.actionSecondaryBehavior = alternateAction;

    var editingAttributes = null;

    // Place a shadow shape at the original location of the shape
    if (this.activeEditorFragment instanceof PlacemarkEditorFragment) {
        this.originalHighlightAttributes = null;
        this.originalPlacemarkHighlightAttributes = this._shape.highlightAttributes;

        editingAttributes = new PlacemarkAttributes(this.originalPlacemarkHighlightAttributes);
        editingAttributes.imageColor.alpha = editingAttributes.imageColor.alpha * 0.7;
    } else {
        this.originalHighlightAttributes = this._shape.highlightAttributes;
        this.originalPlacemarkHighlightAttributes = null;

        editingAttributes = new ShapeAttributes(this.originalHighlightAttributes);
        editingAttributes.interiorColor.alpha = editingAttributes.interiorColor.alpha * 0.7;
        editingAttributes.outlineColor.alpha = editingAttributes.outlineColor.alpha * 0.7;
    }

    this._shape.highlightAttributes = editingAttributes;

    var shadowShape = this.activeEditorFragment.createShadowShape(this._shape);

    if (this.activeEditorFragment instanceof PlacemarkEditorFragment) {
        shadowShape.altitudeMode = WorldWind.CLAMP_TO_GROUND;
        shadowShape.highlightAttributes = new PlacemarkAttributes(this.originalPlacemarkHighlightAttributes);
    } else {
        shadowShape.highlightAttributes = new ShapeAttributes(this.originalHighlightAttributes);
    }

    shadowShape.highlighted = true;

    this.shadowShapeLayer.addRenderable(shadowShape);

    this._worldWindow.redraw();
};

// Internal use only.
ShapeEditor.prototype.endAction = function () {
    this.shadowShapeLayer.removeAllRenderables();

    if (this.activeEditorFragment instanceof PlacemarkEditorFragment) {
        this._shape.highlightAttributes = this.originalPlacemarkHighlightAttributes;
    } else {
        this._shape.highlightAttributes = this.originalHighlightAttributes;
    }

    this.hideAnnotation();

    if (this.actionControlPoint) {
        this.actionControlPoint.highlighted = false;
    }

    this.actionControlPoint = null;
    this.actionType = null;
    this.actionControlPosition = null;

    this._worldWindow.redraw();
};

// Internal use only.
ShapeEditor.prototype.reshape = function (newPosition) {
    var purpose = this.actionControlPoint.userProperties.purpose;

    if ((purpose === ShapeEditorConstants.ROTATION && this._allowRotate) ||
        (purpose !== ShapeEditorConstants.ROTATION && this._allowReshape) ||
        (purpose === ShapeEditorConstants.LOCATION && this._allowManageControlPoint && this.actionSecondaryBehavior) ||
        (purpose === ShapeEditorConstants.SHADOW && this._allowManageControlPoint && this.actionSecondaryBehavior)) {
        this.activeEditorFragment.reshape(
            this._shape,
            this._worldWindow.globe,
            this.actionControlPoint,
            newPosition,
            this.actionControlPosition,
            this.actionSecondaryBehavior
        );

        this.actionControlPosition = newPosition;

        this.updateControlElements();
        this.updateAnnotation(this.actionControlPoint);

        this._worldWindow.redraw();
    }
};

// Internal use only.
ShapeEditor.prototype.drag = function (clientX, clientY) {
    // Get reference position for the shape that is dragged
    var refPos = this._shape.getReferencePosition();

    // Get point for referenced position
    var refPoint = this._worldWindow.globe.computePointFromPosition(
        refPos.latitude,
        refPos.longitude,
        0,
        new Vec3(0, 0, 0)
    );

    var screenRefPoint = new Vec3(0, 0, 0);
    this._worldWindow.drawContext.project(refPoint, screenRefPoint);

    // Check drag distance
    var dx = clientX - this.actionCurrentX;
    var dy = clientY - this.actionCurrentY;

    // Get the latest position of mouse to calculate drag distance
    this.actionCurrentX = clientX;
    this.actionCurrentY = clientY;

    // Find intersection of the screen coordinates ref-point with globe
    var x = screenRefPoint[0] + dx;
    var y = this._worldWindow.canvas.height - screenRefPoint[1] + dy;

    var ray = this._worldWindow.rayThroughScreenPoint(new Vec2(x, y));

    // Check if the mouse is over the globe and move shape
    var intersection = new Vec3(0, 0, 0);
    if (this._worldWindow.globe.intersectsLine(ray, intersection)) {
        var p = new Position(0, 0, 0);
        this._worldWindow.globe.computePositionFromPoint(intersection[0], intersection[1], intersection[2], p);
        this._shape.moveTo(this._worldWindow.globe, new Location(p.latitude, p.longitude));
    }

    // Update control points and shape annotation
    this.updateControlElements();
    this.updateShapeAnnotation();

    this._worldWindow.redraw();
};

// Internal use only.
ShapeEditor.prototype.updateAnnotation = function (controlPoint) {
    this.annotationLayer.enabled = true;

    this.annotation.position = new Position(
        controlPoint.position.latitude,
        controlPoint.position.longitude,
        0
    );

    var annotationText;
    if (controlPoint.userProperties.size !== undefined) {
        annotationText = this.formatLength(controlPoint.userProperties.size);
    } else if (controlPoint.userProperties.rotation !== undefined) {
        annotationText = this.formatRotation(controlPoint.userProperties.rotation);
    } else {
        annotationText = this.formatLatitude(controlPoint.position.latitude)
            + " "
            + this.formatLongitude(controlPoint.position.longitude);
    }
    this.annotation.text = annotationText;
};

// Internal use only.
ShapeEditor.prototype.hideAnnotation = function (controlPoint) {
    this.annotationLayer.enabled = false;
};

// Internal use only.
ShapeEditor.prototype.updateShapeAnnotation = function () {
    var center = this.activeEditorFragment.getShapeCenter(this._shape, this._worldWindow.globe);

    var temporaryMarker = new Placemark(
        new Position(center.latitude, center.longitude, 0),
        null
    );

    this.updateAnnotation(temporaryMarker);
};

// Internal use only.
ShapeEditor.prototype.formatLatitude = function (number) {
    var suffix = number < 0 ? "\u00b0S" : "\u00b0N";
    return Math.abs(number).toFixed(4) + suffix;
};

// Internal use only.
ShapeEditor.prototype.formatLongitude = function (number) {
    var suffix = number < 0 ? "\u00b0W" : "\u00b0E";
    return Math.abs(number).toFixed(4) + suffix;
};

// Internal use only.
ShapeEditor.prototype.formatLength = function (number) {
    var suffix = " km";
    return Math.abs(number / 1000.0).toFixed(3) + suffix;
};

// Internal use only.
ShapeEditor.prototype.formatRotation = function (rotation) {
    return rotation.toFixed(4) + "°";
};

export default ShapeEditor;