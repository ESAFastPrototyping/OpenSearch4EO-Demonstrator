import WorldWind from 'webworldwind-esa';
import ShapeEditorConstants from './ShapeEditorConstants';

const Angle = WorldWind.Angle,
    Line = WorldWind.Line,
    Location = WorldWind.Location,
    Logger = WorldWind.Logger,
    Path = WorldWind.Path,
    Placemark = WorldWind.Placemark,
    PlacemarkAttributes = WorldWind.PlacemarkAttributes,
    Position = WorldWind.Position,
    ShapeAttributes = WorldWind.ShapeAttributes,
    UnsupportedOperationError = WorldWind.UnsupportedOperationError,
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
 * @exports BaseSurfaceEditorFragment
 */
"use strict";

// Internal use only.
var BaseSurfaceEditorFragment = function () {
};

/**
 * Returns a value indicating whether this fragment can handle the specified shape.
 *
 * @param {SurfaceShape} shape The shape to test.
 * @return {Boolean} <code>true</code> if this fragment can handle the specified shape; otherwise
 * <code>false</code>.
 */
BaseSurfaceEditorFragment.prototype.canHandle = function (shape) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "canHandle",
        "abstractInvocation")
    );
};

/**
 * Creates and return a shadow shape from the specified shape.
 *
 * The shadow shape must be a deep copy, i.e. acting on the properties of the specified shape afterwards must
 * not alter the appearance of the shadow shape.
 *
 * @param {SurfaceShape} shape The base shape to create a shadow from.
 * @return {SurfaceShape} The shadow shape created from the specified base shape.
 */
BaseSurfaceEditorFragment.prototype.createShadowShape = function (shape) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "createShadowShape",
        "abstractInvocation")
    );
};

/**
 * Returns the location at the center of the specified shape.
 *
 * @param {SurfaceShape} shape The shape to get the center from.
 * @param {Globe} globe The globe on which the shape is edited.
 * @return {Location} The location at the center of the specified shape.
 */
BaseSurfaceEditorFragment.prototype.getShapeCenter = function (shape, globe) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "getShapeCenter",
        "abstractInvocation")
    );
};

/**
 * Initializes the control elements required to edit the specified shape.
 *
 * This method must create the elements, but not position them. Their positioning is handled by
 * {@link BaseSurfaceEditorFragment#updateControlElements}.
 *
 * @param {SurfaceShape} shape The shape being edited.
 * @param {Renderable[]} controlPoints The array to store control points in.
 * @param {Renderable[]} accessories The array to store additional accessories in.
 * @param {PlacemarkAttributes} resizeControlPointAttributes The attributes to use for control points that
 * resize the shape.
 * @param {PlacemarkAttributes} rotateControlPointAttributes The attributes to use for control points that
 * rotate the shape.
 * @param {PlacemarkAttributes} moveControlPointAttributes The attributes to use for control points that move
 * the boundaries of the shape.
 * @param {PlacemarkAttributes} shadowControlPointAttributes The attributes to use for control points that will
 * mark the middle of one segment.
 */
BaseSurfaceEditorFragment.prototype.initializeControlElements = function (shape,
                                                                          controlPoints,
                                                                          shadowControlPoints,
                                                                          accessories,
                                                                          resizeControlPointAttributes,
                                                                          rotateControlPointAttributes,
                                                                          moveControlPointAttributes,
                                                                          shadowControlPointAttributes) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "initializeControlElements",
        "abstractInvocation")
    );
};

/**
 * Updates the control elements required to edit the specified shape.
 *
 * @param {SurfaceShape} shape The shape being edited.
 * @param {Globe} globe The globe on which the shape is edited.
 * @param {Renderable[]} controlPoints The array that stores the control points.
 * @param {Renderable[]} accessories The array that stores the additional accessories.
 */
BaseSurfaceEditorFragment.prototype.updateControlElements = function (shape,
                                                                      globe,
                                                                      controlPoints,
                                                                      shadowControlPoints,
                                                                      accessories) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "updateControlElements",
        "abstractInvocation")
    );
};

/**
 * Reshapes the specified shape by applying the appropriate effect when the given control point is moved from
 * the previous location to the current location.
 *
 * @param {SurfaceShape} shape The shape being edited.
 * @param {Globe} globe The globe on which the shape is edited.
 * @param {Renderable} controlPoint The control point being acted on.
 * @param {Position} currentPosition The current position for this action.
 * @param {Position} previousPosition The previous position for this action.
 * @param {Boolean} secondaryBehavior A value indicating whether the secondary behavior of this action should be
 * performed or not.
 */
BaseSurfaceEditorFragment.prototype.reshape = function (shape,
                                                        globe,
                                                        controlPoint,
                                                        currentPosition,
                                                        previousPosition,
                                                        secondaryBehavior) {
    throw new UnsupportedOperationError(Logger.logMessage(
        Logger.LEVEL_SEVERE,
        "BaseSurfaceEditorFragment",
        "reshape",
        "abstractInvocation")
    );
};

/**
 * Adds a new vertex to the specified shape at the closest point to the given position.
 *
 * This is an optional action for the editor fragments.
 *
 * @param {SurfaceShape} shape The shape being edited.
 * @param {Globe} globe The globe on which the shape is edited.
 * @param {Position} position The position for this action.
 */
BaseSurfaceEditorFragment.prototype.addNewVertex = function (shape, globe, position) {
    // Not supported by default.
};

// Creates a control point and adds it to the array of control points.
BaseSurfaceEditorFragment.prototype.createControlPoint = function (controlPoints, attributes, purpose, index) {
    var controlPoint = new Placemark(new Location(0, 0), false, attributes);
    var highlightedControlPointAttributes = new PlacemarkAttributes(null);
    highlightedControlPointAttributes.imageScale = 0.15;

    controlPoint.altitudeMode = WorldWind.CLAMP_TO_GROUND

    controlPoint.userProperties.purpose = purpose;

    switch (controlPoint.userProperties.purpose) {

        case ShapeEditorConstants.ROTATION:
            // light green dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFcklEQVR4AeXbS2xVVRvG8c0l4buE7zPqwIsOHGBwIBpN1DBwYAzRBEdG4wyIF0YmiIkTjTHxsnqRtkqFBhVCIQUU0VaEVC4iUCtgqphKGgqlBaS00MNp5ZzSy96P/8HaycpJofee7uXzyxsIdNB37b32WXvtfYLJjqRZ1ELqlVDhB73q/SqrbEOf+joiRSE1eE3XUvzbyYwyP/L/mwY1+JqkBdTMIImRNId6miYrBzTQrTGGgbmWUqqewWFAdEsSGn+IX7aGI9g7wgY1iJGEnwvb1V53SqcWTcfG7+XU3anr5CKOYAc2Yg2KYaxSrEMVqnEQ5xBhqHSp62KnOpdImpHvxu/iNN8UKYrkJEITdqAUZozKUI1GZJEbBqH5rM4+kI/GZ9D4q6HCATnJoA7lMBOsCLvRjZypETEtdlH/m6rm/8Pc/VJO+rAPRTA5pmog0kpfbVHLw5Pd/Lx+9TfLyR9YDTPFirAHA3AuquFpnV42Wc0v5nTLyuYqtsDk2XpcQZwIrWpdO6EXSOb6IiqUTTvKYaaJUpyEmzM6UztRR/4Rjnyfe8oXw0wzBfgBbpgOG8bb/H003yObozDT3D64aVPbm2Nt/m6ab5dNIwpgEqABcUJ0qOOF0TY/k+brnFNJhTAJUYjTiMMqtZ+V5R2jGYDlsunAKpiEKUEn4jAATSNt/k5Om6siIdbDJNQaDCDOeZ1fPuwSl6qWzWGYhKuDMxV6Jd18owF4VjaXUASTcCXIwJnSFdc9+pGiBtlUwXiiFs5Z0Md9xL+HGoBH3ft345FCdCEOq8aSoQZgo2xqYDzzNeJwBqTl3itIupXTv0+kB4UwnilGP5yp8IQ7AG/I5icYTzXBmeZV7gAcls02GE/VwJkGnXHzs6msbEphPFWKEHGYErcHkhbI5jKM51oQh42T1wNJL8rmOIznDsC5Vd4cSKqQzW4Yz30LZ2erPpD0s2w+g/FcFeKwl3gukNQgmzIYz1UgTlbZTCDpqGw+gvFcMdz7gkBSvWxWw/hPWdjnCIOBpEOyKYfxn/6CXQcwANIB2XwC4z8NgIg/BwJJe2WzBv+kawBPt9KBpFrZVMB4rhxxUkq1BJK2y2YHjOc2wdkeYyEkrZDNMRjP7UecC7qwNZB0f+5WmM9OwnlW8HK8Fd7h/e2wlYETtsiJpC2y+QLGU+sRh7VAh7sj9JJs6mE89QucG6Ft7gDc426KFMDHz/9eOC9XLczdFm+RzTcwnqmGc/qnJM3IHYC3ZdMFn7bGC3ARzqddWZAbSXOpTtl8B+OJnXBfuZV0WzBU3EVRN3x4OPoheuCc/hU3ejr8L6pNNt/DJNwhONvgvZJuGu4dgWWyySDJmySVCOHc/b0VDBf7oKRRNhdQDJMwZeiG0/yfkuaM9DWZ+VRaNieQtKv+KRDFGx9c/OaP9k2xp6hQNgeRxBWf3ftbOtZ3BVfKyV6Yae4Y3LD6qxzX9wKoDXLyK6brIuko3PDxVyNp1kR8AeqAnLRiOt02r8IJuEkptWvCvnVmB2GDnKSwESbPPkUX3GSU2TpRzedOhxVUKCe/42Pk40q/G/1w3guOmPPv2OYnJ5IWRYrSctKH/ZiqpfMWdCDnqF9hMB4LpiKS5lHHlZMe1GEtJuOIb0YzcpNWmvmuucFUxn4ldgl1VkOkFTUogRmHz1GPbuSGo97Eaf9kkM/YG6iVTIuUrpMuNGIPKrEapShGAQyKsA7bsR+/4RKcuHd0bSxunnE2NfIfSf+n3qcuaZQZRIRhfqafKbaHI744/40PPzUep0qpVo0jNNufVbZW0nPUf4OkxX50Pkgtpd6lqqgjHO3LVDdHNcWV+zJ1nr830/BOSe9Rz9sbstnBJOdvB05s7/twc1gAAAAASUVORK5CYII=";
            break;
        case ShapeEditorConstants.LOCATION:
            // light blue dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,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";
            break;
        case ShapeEditorConstants.SHADOW:
            // light gray dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACBFBMVEUAAAD////////////////////////+/v7////////////9/f3////////////////////////+/v79/f3////////////////////////+/v7////////////////9/f3////////9/f3////////+/v7+/v7////////+/v7+/v79/f3+/v7////////////+/v7////+/v7////////////+/v7+/v7////+/v7////9/f3////////////9/f3////9/f3////+/v7////+/v7////9/f3////9/f3+/v7////+/v7////////////+/v79/f3////+/v79/f3+/v7////9/f3////////+/v7+/v79/f3+/v7////////9/f3+/v7+/v7+/v7////+/v7////+/v7+/v79/f3+/v79/f3+/v7////+/v7////////+/v7////////+/v7+/v7////////////////+/v7////////////9/f3+/v7+/v7+/v7+/v7////////+/v7////////+/v7+/v7+/v7+/v7+/v7+/v7////+/v7////////+/v7+/v7+/v7+/v7////+/v7+/v7+/v7+/v7+/v7////+/v7+/v7+/v7+/v7+/v7+/v7+/v7////+/v76+vr7+/v8/Pz9/f3+/v7///+XJ/0FAAAApnRSTlMAAQIDBAcICQoLDQ4PEBITFBgZGhscHSElJigoKS0uLzAyMzY3ODo6PkJERkZGSElMTE1TVVZYX19gYGFhY2RlZmdnbXBxcnN2e3x+gIOEhYaOj5CXmJifn6Gio6SmpqeoqKmrrK2xsrS2trm5ubu8wMHDxMXHx8jJys7O0dTY2Nrb3t7g4eHi4+Tl5+jp6erq6+zu7/Dw8fL09fb29/j5+vv8/f3+K7BQkAAAApBJREFUeAGl1/df01AUBfCTlqKi4lYUxb333htw7w3uIYhDVHDgUNxDHFREVCxQSF7e+Sdt36efQkdo8vL9/dzce18zCifB2VsOXmloinaFX9ypLCsJwJPQ4opWpvhXXzYMbk2tamcW0br5cGN8NRVpC8syYyxLCEnl82oDOYyp7GGMLcw0wmZc42T0x9jeqeKWmY3qo+faYDgaeIkxiYs7lmibBgdFjcmrOxIko+uR1dI/JC0zB0uS8qiBTAuipFT5HGyS15FheoS0TVcEyRNIM/GXyruvsAspxn7ykFdTyFXoI1BHStMDSXaMQq9tKu+xwjMkjW5T5+eFRXIrEoyryQV4WkN7IRQs9zqAQvIYFKPB6wCKICMDEDdDqwG1x0OIO6VuQK0WWgwAwyMaDSgk5wLYqY5Ah02eAXBPrVBzhq9A3l/S1ERyJEr0zkCR5A5s1F6BmuE0jpPCR4F6PNDboWKR7/GYNH0U+I1HpKmNjOC+vwJduKu5A0WyC7V+CpCduO2vQAtu+jvGl7hMCh8F6lHq76d8HpN83Ew2uRnGF1+3cyFwjrS0V9AEYJOfR9pFAOPo46E6CzGv9B/rYQMxe/RfLEcQV/CNFFoNREdAKdVqQSZfrsh/Swqd1/tQJGwg6f03wN1AQt5TnU+cjyEkFf8kbY/5zgnoY1E3KTwtgGuRopyk8JKvQCrjJEnbfb4qiDShWpLSbb4mgAyheA/S1ec+LwSQhVHanXsMQbJnbwDZLWxhjMhx+R8z4ajoCWOkbTnHWVOAfgTXvKOqITLStoo/n4cc8svDvX88E1khVJp8s8xAbkMOfGc2HbeWGHAnOOfw6/T0jRWD4IUxZd2+sw+bW8PNHxqr968szoOD/0KVHzHYRB3yAAAAAElFTkSuQmCC";
            break;
        case ShapeEditorConstants.WIDTH:
            // light yellow dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFl0lEQVR4AeWbS2xV1RrHN4+E+wj33tx7B/ehAwcYHIhGEzUMHBhDNMGR0TgD4oORCWLiRGNMfAylUIQqYkN5a4nysLVCsIhQqqGKYmis0FJooA9Lex57n/1Y309OYGd92TmWlvb09Gx+yX9I6P9/9vrWt769tlNugDnAYuAFxLyDeHuuqgMJ+hExiESIP4xxf8HkjyCFrYh5CVgEzHaqEWAe8DjiNyDhKDeL+AXMlTbEKwbyr2owfh/i7UMib5wGgYhxIZEhunyMsHvJTDR+J1I4wB8R9YN/Etz9kNsJ2c0wWntVa64pswGyWyDfCG4zFI5D1AcIJTFXLhMNLQNmVdr4bYi/FREBjUDQBfn9kNlojU5UxX/rNkFwBsQrEexQF+HFeyphfBbiv4iYEI3kodAO2U3WxJRpHXiHwGSSS0MIu5uu6m/TZf4viP8JGgnAO1L8I8c2Uc4gzGiOsOf+cptfgARdaIJOyHxQfuMlg/gKCCFGCoawe0W5zC9FIhf9uOf3VMB4QrntYEZUCAJh78YpLZCIWYIYo6u6XecVld1FwrOgCc+3TI15eACJfPXI2y1sRqkGCkcTIfTUT9b8XUhkq41/cgYaT8g7kgjhwqs3a/52xFwiJjhTTHkmm7fyT0GMGIgGnpmo+dlIdMym2A2ja2e8cau1EHarELyAsO9/EwlgJTHRIGTWV4t5q8x7YAbVUujrHK/5/yMmBwAGctuqzbxVdjMQ6hBW3rjFhb3EFE5Uq3mrQrtulDzgn2MF8CQxZqhUa1udS0Fc1JKuG+OAIx3E5Bur3byVd1gXRB+T+XOpAB5UnV5azNtdwQxDTHD23VIBbCHGbU6LeSv3c2IwmRH0WQH4NyI+AJK1e36qVAsS6oL4iA7gFVv529Nm3kqf5KOBHTqAb2zx+zS9AbjNehkMxObnAi4xmQ3pDaDoDaMnWf91gEU2ld/Sat4q7CGGsPdlB3iWmOB0+gMoHNNH5W0OUEeMdzD9AbhfoPqdNgc4QUy2If0B5BuJwYxccADb/mbq0h9Atl63xXkH+NYG8H5qjVvV6mbId4A2Yux8P90SLw4gcoCjNoBNt0gAubgPKAZAqy2CH94KAdgpkYShAxyyAWy+tWqAyY84QIsNoD79AWQ26XsG5xzAboz5/ekPILdbnwiLjRCriPE70h+A97UK4NIuB7g7OQpLtcJf9Zj8+XgU3p/y47CVnhDHI3Jgp60Dn6V4/W8nBpPt1xOh54jxv0tvAP4P+iC0WwdwB+ihSE1Kh6IF/dZ4saMBzhHjNqV8HpgbBmYlA3idGDOcstF4DUT9ev+vcZIA84EBYtwvU/Trt6Cv3AL/cUqhmyJMJiUvR9eDZHX1rxvr7fCfgPPEeIdTMARt02NwD/iHMxbACn0XsKqHJLldgNGnv9fGNK9elJxW/XIlr8VN7qK1yWjzfcA8ZzwAC4ERdTew+qp+aHd1JAyRaKEzEYDH9PND4XgVdXzfo0H85c7NAKxG47VWgfmOhPlCw+S+C4B6NP6PxSapOsyb7D5gzlR8ANWKJuwtFpmZdREq6Ex+VtM0NV+d2RDqE/9BcZupvPlsg73/Yyv+rikzn1gOqwCDJvi5Qr1CDXiHEtdejCCFN6z5MgAsQWQkUWWLs7bpa53zjRANgsa4V5DwIWc6ABYAp0histc/mvqoPL947mO7v2vMaBMw35lOgDnAMqAXjS6UbvPkZ4y5rcUple7q9FrvRMyjTsWwB6jViAyTRM8XgjPgtRYLZ7FmXA+mVk2f1l3/eHLvteUU/ARmiJKY3HnEf0IPNSoO8HfgbWCQCRMBwphIFGCyBxGztPLGb7w0HgbWAD1MBjEB4rUATwF/daoKu3XeCywH3gR2AO2IDCEyikTDSDCEhBeRqAsxB4C3gKeBhcBcp8z8DjRUCbmVu2RWAAAAAElFTkSuQmCC";
            break;
        case ShapeEditorConstants.HEIGHT:
            // light yellow dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFl0lEQVR4AeWbS2xV1RrHN4+E+wj33tx7B/ehAwcYHIhGEzUMHBhDNMGR0TgD4oORCWLiRGNMfAylUIQqYkN5a4nysLVCsIhQqqGKYmis0FJooA9Lex57n/1Y309OYGd92TmWlvb09Gx+yX9I6P9/9vrWt769tlNugDnAYuAFxLyDeHuuqgMJ+hExiESIP4xxf8HkjyCFrYh5CVgEzHaqEWAe8DjiNyDhKDeL+AXMlTbEKwbyr2owfh/i7UMib5wGgYhxIZEhunyMsHvJTDR+J1I4wB8R9YN/Etz9kNsJ2c0wWntVa64pswGyWyDfCG4zFI5D1AcIJTFXLhMNLQNmVdr4bYi/FREBjUDQBfn9kNlojU5UxX/rNkFwBsQrEexQF+HFeyphfBbiv4iYEI3kodAO2U3WxJRpHXiHwGSSS0MIu5uu6m/TZf4viP8JGgnAO1L8I8c2Uc4gzGiOsOf+cptfgARdaIJOyHxQfuMlg/gKCCFGCoawe0W5zC9FIhf9uOf3VMB4QrntYEZUCAJh78YpLZCIWYIYo6u6XecVld1FwrOgCc+3TI15eACJfPXI2y1sRqkGCkcTIfTUT9b8XUhkq41/cgYaT8g7kgjhwqs3a/52xFwiJjhTTHkmm7fyT0GMGIgGnpmo+dlIdMym2A2ja2e8cau1EHarELyAsO9/EwlgJTHRIGTWV4t5q8x7YAbVUujrHK/5/yMmBwAGctuqzbxVdjMQ6hBW3rjFhb3EFE5Uq3mrQrtulDzgn2MF8CQxZqhUa1udS0Fc1JKuG+OAIx3E5Bur3byVd1gXRB+T+XOpAB5UnV5azNtdwQxDTHD23VIBbCHGbU6LeSv3c2IwmRH0WQH4NyI+AJK1e36qVAsS6oL4iA7gFVv529Nm3kqf5KOBHTqAb2zx+zS9AbjNehkMxObnAi4xmQ3pDaDoDaMnWf91gEU2ld/Sat4q7CGGsPdlB3iWmOB0+gMoHNNH5W0OUEeMdzD9AbhfoPqdNgc4QUy2If0B5BuJwYxccADb/mbq0h9Atl63xXkH+NYG8H5qjVvV6mbId4A2Yux8P90SLw4gcoCjNoBNt0gAubgPKAZAqy2CH94KAdgpkYShAxyyAWy+tWqAyY84QIsNoD79AWQ26XsG5xzAboz5/ekPILdbnwiLjRCriPE70h+A97UK4NIuB7g7OQpLtcJf9Zj8+XgU3p/y47CVnhDHI3Jgp60Dn6V4/W8nBpPt1xOh54jxv0tvAP4P+iC0WwdwB+ihSE1Kh6IF/dZ4saMBzhHjNqV8HpgbBmYlA3idGDOcstF4DUT9ev+vcZIA84EBYtwvU/Trt6Cv3AL/cUqhmyJMJiUvR9eDZHX1rxvr7fCfgPPEeIdTMARt02NwD/iHMxbACn0XsKqHJLldgNGnv9fGNK9elJxW/XIlr8VN7qK1yWjzfcA8ZzwAC4ERdTew+qp+aHd1JAyRaKEzEYDH9PND4XgVdXzfo0H85c7NAKxG47VWgfmOhPlCw+S+C4B6NP6PxSapOsyb7D5gzlR8ANWKJuwtFpmZdREq6Ex+VtM0NV+d2RDqE/9BcZupvPlsg73/Yyv+rikzn1gOqwCDJvi5Qr1CDXiHEtdejCCFN6z5MgAsQWQkUWWLs7bpa53zjRANgsa4V5DwIWc6ABYAp0histc/mvqoPL947mO7v2vMaBMw35lOgDnAMqAXjS6UbvPkZ4y5rcUple7q9FrvRMyjTsWwB6jViAyTRM8XgjPgtRYLZ7FmXA+mVk2f1l3/eHLvteUU/ARmiJKY3HnEf0IPNSoO8HfgbWCQCRMBwphIFGCyBxGztPLGb7w0HgbWAD1MBjEB4rUATwF/daoKu3XeCywH3gR2AO2IDCEyikTDSDCEhBeRqAsxB4C3gKeBhcBcp8z8DjRUCbmVu2RWAAAAAElFTkSuQmCC";
            break;
        case ShapeEditorConstants.RADIUS:
            // light yellow dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFl0lEQVR4AeWbS2xV1RrHN4+E+wj33tx7B/ehAwcYHIhGEzUMHBhDNMGR0TgD4oORCWLiRGNMfAylUIQqYkN5a4nysLVCsIhQqqGKYmis0FJooA9Lex57n/1Y309OYGd92TmWlvb09Gx+yX9I6P9/9vrWt769tlNugDnAYuAFxLyDeHuuqgMJ+hExiESIP4xxf8HkjyCFrYh5CVgEzHaqEWAe8DjiNyDhKDeL+AXMlTbEKwbyr2owfh/i7UMib5wGgYhxIZEhunyMsHvJTDR+J1I4wB8R9YN/Etz9kNsJ2c0wWntVa64pswGyWyDfCG4zFI5D1AcIJTFXLhMNLQNmVdr4bYi/FREBjUDQBfn9kNlojU5UxX/rNkFwBsQrEexQF+HFeyphfBbiv4iYEI3kodAO2U3WxJRpHXiHwGSSS0MIu5uu6m/TZf4viP8JGgnAO1L8I8c2Uc4gzGiOsOf+cptfgARdaIJOyHxQfuMlg/gKCCFGCoawe0W5zC9FIhf9uOf3VMB4QrntYEZUCAJh78YpLZCIWYIYo6u6XecVld1FwrOgCc+3TI15eACJfPXI2y1sRqkGCkcTIfTUT9b8XUhkq41/cgYaT8g7kgjhwqs3a/52xFwiJjhTTHkmm7fyT0GMGIgGnpmo+dlIdMym2A2ja2e8cau1EHarELyAsO9/EwlgJTHRIGTWV4t5q8x7YAbVUujrHK/5/yMmBwAGctuqzbxVdjMQ6hBW3rjFhb3EFE5Uq3mrQrtulDzgn2MF8CQxZqhUa1udS0Fc1JKuG+OAIx3E5Bur3byVd1gXRB+T+XOpAB5UnV5azNtdwQxDTHD23VIBbCHGbU6LeSv3c2IwmRH0WQH4NyI+AJK1e36qVAsS6oL4iA7gFVv529Nm3kqf5KOBHTqAb2zx+zS9AbjNehkMxObnAi4xmQ3pDaDoDaMnWf91gEU2ld/Sat4q7CGGsPdlB3iWmOB0+gMoHNNH5W0OUEeMdzD9AbhfoPqdNgc4QUy2If0B5BuJwYxccADb/mbq0h9Atl63xXkH+NYG8H5qjVvV6mbId4A2Yux8P90SLw4gcoCjNoBNt0gAubgPKAZAqy2CH94KAdgpkYShAxyyAWy+tWqAyY84QIsNoD79AWQ26XsG5xzAboz5/ekPILdbnwiLjRCriPE70h+A97UK4NIuB7g7OQpLtcJf9Zj8+XgU3p/y47CVnhDHI3Jgp60Dn6V4/W8nBpPt1xOh54jxv0tvAP4P+iC0WwdwB+ihSE1Kh6IF/dZ4saMBzhHjNqV8HpgbBmYlA3idGDOcstF4DUT9ev+vcZIA84EBYtwvU/Trt6Cv3AL/cUqhmyJMJiUvR9eDZHX1rxvr7fCfgPPEeIdTMARt02NwD/iHMxbACn0XsKqHJLldgNGnv9fGNK9elJxW/XIlr8VN7qK1yWjzfcA8ZzwAC4ERdTew+qp+aHd1JAyRaKEzEYDH9PND4XgVdXzfo0H85c7NAKxG47VWgfmOhPlCw+S+C4B6NP6PxSapOsyb7D5gzlR8ANWKJuwtFpmZdREq6Ex+VtM0NV+d2RDqE/9BcZupvPlsg73/Yyv+rikzn1gOqwCDJvi5Qr1CDXiHEtdejCCFN6z5MgAsQWQkUWWLs7bpa53zjRANgsa4V5DwIWc6ABYAp0histc/mvqoPL947mO7v2vMaBMw35lOgDnAMqAXjS6UbvPkZ4y5rcUple7q9FrvRMyjTsWwB6jViAyTRM8XgjPgtRYLZ7FmXA+mVk2f1l3/eHLvteUU/ARmiJKY3HnEf0IPNSoO8HfgbWCQCRMBwphIFGCyBxGztPLGb7w0HgbWAD1MBjEB4rUATwF/daoKu3XeCywH3gR2AO2IDCEyikTDSDCEhBeRqAsxB4C3gKeBhcBcp8z8DjRUCbmVu2RWAAAAAElFTkSuQmCC";
            break;
        case ShapeEditorConstants.MIN_CORNER:
            // light yellow dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFl0lEQVR4AeWbS2xV1RrHN4+E+wj33tx7B/ehAwcYHIhGEzUMHBhDNMGR0TgD4oORCWLiRGNMfAylUIQqYkN5a4nysLVCsIhQqqGKYmis0FJooA9Lex57n/1Y309OYGd92TmWlvb09Gx+yX9I6P9/9vrWt769tlNugDnAYuAFxLyDeHuuqgMJ+hExiESIP4xxf8HkjyCFrYh5CVgEzHaqEWAe8DjiNyDhKDeL+AXMlTbEKwbyr2owfh/i7UMib5wGgYhxIZEhunyMsHvJTDR+J1I4wB8R9YN/Etz9kNsJ2c0wWntVa64pswGyWyDfCG4zFI5D1AcIJTFXLhMNLQNmVdr4bYi/FREBjUDQBfn9kNlojU5UxX/rNkFwBsQrEexQF+HFeyphfBbiv4iYEI3kodAO2U3WxJRpHXiHwGSSS0MIu5uu6m/TZf4viP8JGgnAO1L8I8c2Uc4gzGiOsOf+cptfgARdaIJOyHxQfuMlg/gKCCFGCoawe0W5zC9FIhf9uOf3VMB4QrntYEZUCAJh78YpLZCIWYIYo6u6XecVld1FwrOgCc+3TI15eACJfPXI2y1sRqkGCkcTIfTUT9b8XUhkq41/cgYaT8g7kgjhwqs3a/52xFwiJjhTTHkmm7fyT0GMGIgGnpmo+dlIdMym2A2ja2e8cau1EHarELyAsO9/EwlgJTHRIGTWV4t5q8x7YAbVUujrHK/5/yMmBwAGctuqzbxVdjMQ6hBW3rjFhb3EFE5Uq3mrQrtulDzgn2MF8CQxZqhUa1udS0Fc1JKuG+OAIx3E5Bur3byVd1gXRB+T+XOpAB5UnV5azNtdwQxDTHD23VIBbCHGbU6LeSv3c2IwmRH0WQH4NyI+AJK1e36qVAsS6oL4iA7gFVv529Nm3kqf5KOBHTqAb2zx+zS9AbjNehkMxObnAi4xmQ3pDaDoDaMnWf91gEU2ld/Sat4q7CGGsPdlB3iWmOB0+gMoHNNH5W0OUEeMdzD9AbhfoPqdNgc4QUy2If0B5BuJwYxccADb/mbq0h9Atl63xXkH+NYG8H5qjVvV6mbId4A2Yux8P90SLw4gcoCjNoBNt0gAubgPKAZAqy2CH94KAdgpkYShAxyyAWy+tWqAyY84QIsNoD79AWQ26XsG5xzAboz5/ekPILdbnwiLjRCriPE70h+A97UK4NIuB7g7OQpLtcJf9Zj8+XgU3p/y47CVnhDHI3Jgp60Dn6V4/W8nBpPt1xOh54jxv0tvAP4P+iC0WwdwB+ihSE1Kh6IF/dZ4saMBzhHjNqV8HpgbBmYlA3idGDOcstF4DUT9ev+vcZIA84EBYtwvU/Trt6Cv3AL/cUqhmyJMJiUvR9eDZHX1rxvr7fCfgPPEeIdTMARt02NwD/iHMxbACn0XsKqHJLldgNGnv9fGNK9elJxW/XIlr8VN7qK1yWjzfcA8ZzwAC4ERdTew+qp+aHd1JAyRaKEzEYDH9PND4XgVdXzfo0H85c7NAKxG47VWgfmOhPlCw+S+C4B6NP6PxSapOsyb7D5gzlR8ANWKJuwtFpmZdREq6Ex+VtM0NV+d2RDqE/9BcZupvPlsg73/Yyv+rikzn1gOqwCDJvi5Qr1CDXiHEtdejCCFN6z5MgAsQWQkUWWLs7bpa53zjRANgsa4V5DwIWc6ABYAp0histc/mvqoPL947mO7v2vMaBMw35lOgDnAMqAXjS6UbvPkZ4y5rcUple7q9FrvRMyjTsWwB6jViAyTRM8XgjPgtRYLZ7FmXA+mVk2f1l3/eHLvteUU/ARmiJKY3HnEf0IPNSoO8HfgbWCQCRMBwphIFGCyBxGztPLGb7w0HgbWAD1MBjEB4rUATwF/daoKu3XeCywH3gR2AO2IDCEyikTDSDCEhBeRqAsxB4C3gKeBhcBcp8z8DjRUCbmVu2RWAAAAAElFTkSuQmCC";
            break;
        case ShapeEditorConstants.MAX_CORNER:
            // light yellow dot image
            highlightedControlPointAttributes.imageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFl0lEQVR4AeWbS2xV1RrHN4+E+wj33tx7B/ehAwcYHIhGEzUMHBhDNMGR0TgD4oORCWLiRGNMfAylUIQqYkN5a4nysLVCsIhQqqGKYmis0FJooA9Lex57n/1Y309OYGd92TmWlvb09Gx+yX9I6P9/9vrWt769tlNugDnAYuAFxLyDeHuuqgMJ+hExiESIP4xxf8HkjyCFrYh5CVgEzHaqEWAe8DjiNyDhKDeL+AXMlTbEKwbyr2owfh/i7UMib5wGgYhxIZEhunyMsHvJTDR+J1I4wB8R9YN/Etz9kNsJ2c0wWntVa64pswGyWyDfCG4zFI5D1AcIJTFXLhMNLQNmVdr4bYi/FREBjUDQBfn9kNlojU5UxX/rNkFwBsQrEexQF+HFeyphfBbiv4iYEI3kodAO2U3WxJRpHXiHwGSSS0MIu5uu6m/TZf4viP8JGgnAO1L8I8c2Uc4gzGiOsOf+cptfgARdaIJOyHxQfuMlg/gKCCFGCoawe0W5zC9FIhf9uOf3VMB4QrntYEZUCAJh78YpLZCIWYIYo6u6XecVld1FwrOgCc+3TI15eACJfPXI2y1sRqkGCkcTIfTUT9b8XUhkq41/cgYaT8g7kgjhwqs3a/52xFwiJjhTTHkmm7fyT0GMGIgGnpmo+dlIdMym2A2ja2e8cau1EHarELyAsO9/EwlgJTHRIGTWV4t5q8x7YAbVUujrHK/5/yMmBwAGctuqzbxVdjMQ6hBW3rjFhb3EFE5Uq3mrQrtulDzgn2MF8CQxZqhUa1udS0Fc1JKuG+OAIx3E5Bur3byVd1gXRB+T+XOpAB5UnV5azNtdwQxDTHD23VIBbCHGbU6LeSv3c2IwmRH0WQH4NyI+AJK1e36qVAsS6oL4iA7gFVv529Nm3kqf5KOBHTqAb2zx+zS9AbjNehkMxObnAi4xmQ3pDaDoDaMnWf91gEU2ld/Sat4q7CGGsPdlB3iWmOB0+gMoHNNH5W0OUEeMdzD9AbhfoPqdNgc4QUy2If0B5BuJwYxccADb/mbq0h9Atl63xXkH+NYG8H5qjVvV6mbId4A2Yux8P90SLw4gcoCjNoBNt0gAubgPKAZAqy2CH94KAdgpkYShAxyyAWy+tWqAyY84QIsNoD79AWQ26XsG5xzAboz5/ekPILdbnwiLjRCriPE70h+A97UK4NIuB7g7OQpLtcJf9Zj8+XgU3p/y47CVnhDHI3Jgp60Dn6V4/W8nBpPt1xOh54jxv0tvAP4P+iC0WwdwB+ihSE1Kh6IF/dZ4saMBzhHjNqV8HpgbBmYlA3idGDOcstF4DUT9ev+vcZIA84EBYtwvU/Trt6Cv3AL/cUqhmyJMJiUvR9eDZHX1rxvr7fCfgPPEeIdTMARt02NwD/iHMxbACn0XsKqHJLldgNGnv9fGNK9elJxW/XIlr8VN7qK1yWjzfcA8ZzwAC4ERdTew+qp+aHd1JAyRaKEzEYDH9PND4XgVdXzfo0H85c7NAKxG47VWgfmOhPlCw+S+C4B6NP6PxSapOsyb7D5gzlR8ANWKJuwtFpmZdREq6Ex+VtM0NV+d2RDqE/9BcZupvPlsg73/Yyv+rikzn1gOqwCDJvi5Qr1CDXiHEtdejCCFN6z5MgAsQWQkUWWLs7bpa53zjRANgsa4V5DwIWc6ABYAp0histc/mvqoPL947mO7v2vMaBMw35lOgDnAMqAXjS6UbvPkZ4y5rcUple7q9FrvRMyjTsWwB6jViAyTRM8XgjPgtRYLZ7FmXA+mVk2f1l3/eHLvteUU/ARmiJKY3HnEf0IPNSoO8HfgbWCQCRMBwphIFGCyBxGztPLGb7w0HgbWAD1MBjEB4rUATwF/daoKu3XeCywH3gR2AO2IDCEyikTDSDCEhBeRqAsxB4C3gKeBhcBcp8z8DjRUCbmVu2RWAAAAAElFTkSuQmCC";
            break;
        default:
            break;
    }

    controlPoint.highlightAttributes = highlightedControlPointAttributes;

    if (typeof index !== "undefined") {
        controlPoint.userProperties.index = index;
    }

    controlPoints.push(controlPoint);
};

// Computes the cartesian difference between two positions such as control points.
BaseSurfaceEditorFragment.prototype.computeControlPointDelta = function (globe, positionA, positionB) {
    var pointA = globe.computePointFromPosition(
        positionA.latitude,
        positionA.longitude,
        0,
        new Vec3(0, 0, 0)
    );

    var pointB = globe.computePointFromPosition(
        positionB.latitude,
        positionB.longitude,
        0,
        new Vec3(0, 0, 0)
    );

    return pointA.subtract(pointB);
};

// Creates an accessory showing the rotation of a shape and adds it to the array of accessories.
BaseSurfaceEditorFragment.prototype.createRotationAccessory = function (accessories, attributes) {
    var shapeAttributes = new ShapeAttributes(null);
    shapeAttributes.outlineColor = attributes.imageColor;
    shapeAttributes.outlineWidth = 2;

    var rotationLine = new Path([], shapeAttributes);
    rotationLine.altitudeMode = WorldWind.CLAMP_TO_GROUND;
    rotationLine.followTerrain = true;

    accessories.push(rotationLine);
};

// Updates the heading of the accessory showing the rotation of the shape.
BaseSurfaceEditorFragment.prototype.updateRotationAccessory = function (centerPosition, controlPointPosition, accessories) {
    accessories[0].positions = [centerPosition, controlPointPosition];
};

// Applies a delta to a heading and normalizes it.
BaseSurfaceEditorFragment.prototype.normalizedHeading = function (currentHeading, deltaHeading) {
    var newHeading = currentHeading * Angle.DEGREES_TO_RADIANS + deltaHeading * Angle.DEGREES_TO_RADIANS;

    if (Math.abs(newHeading) > Angle.TWO_PI) {
        newHeading = newHeading % Angle.TWO_PI;
    }

    return Angle.RADIANS_TO_DEGREES * (newHeading >= 0 ? newHeading : newHeading + Angle.TWO_PI);
};

// Creates and returns a deep copy of a set of locations, which can include multiple rings.
BaseSurfaceEditorFragment.prototype.deepCopyLocations = function (locations) {
    var newLocations = [];

    if (locations.length > 0 && Array.isArray(locations[0])) {
        for (var i = 0, ilen = locations.length; i < ilen; i++) {
            var ring = [];
            for (var j = 0, jlen = locations[i].length; j < jlen; j++) {
                ring.push(new Location(locations[i][j].latitude, locations[i][j].longitude));
            }
            newLocations.push(ring);
        }
    } else {
        for (var i = 0, len = locations.length; i < len; i++) {
            newLocations.push(new Location(locations[i].latitude, locations[i].longitude));
        }
    }

    return newLocations;
};

// Returns the center of a set of locations, which can include multiple rings.
BaseSurfaceEditorFragment.prototype.getCenterFromLocations = function (globe, locations) {
    var count = 0;
    var center = new Vec3(0, 0, 0);
    var tmpVector = new Vec3(0, 0, 0);

    if (locations.length > 0 && Array.isArray(locations[0])) {
        for (var i = 0, ilen = locations.length; i < ilen; i++) {
            for (var j = 0, jlen = locations[i].length; j < jlen; j++) {
                center.add(
                    globe.computePointFromPosition(
                        locations[i][j].latitude,
                        locations[i][j].longitude,
                        0,
                        tmpVector
                    )
                );
                count++;
            }
        }
    } else {
        for (var i = 0, len = locations.length; i < len; i++) {
            center.add(
                globe.computePointFromPosition(
                    locations[i].latitude,
                    locations[i].longitude,
                    0,
                    tmpVector
                )
            );
            count++;
        }
    }

    center.divide(count);

    return globe.computePositionFromPoint(center[0], center[1], center[2], new Position(0, 0, 0));
};

// Computes the average distance between the specified center point and the locations in the specified list.
BaseSurfaceEditorFragment.prototype.getAverageDistance = function (globe, center, locations) {
    var centerPoint = globe.computePointFromLocation(
        center.latitude,
        center.longitude,
        new Vec3(0, 0, 0)
    );

    var count = locations.length;
    var totalDistance = 0;
    var tmpVector = new Vec3(0, 0, 0);
    for (var i = 0; i < count; i++) {
        var distance = globe.computePointFromLocation(
            locations[i].latitude,
            locations[i].longitude,
            tmpVector
        ).distanceTo(centerPoint);
        totalDistance += distance / count;
    }

    return totalDistance / globe.equatorialRadius;
};

// Moves the location of a control point.
BaseSurfaceEditorFragment.prototype.moveLocation = function (globe,
                                                             controlPoint,
                                                             currentPosition,
                                                             previousPosition,
                                                             result) {

    var controlPointPoint = globe.computePointFromPosition(
        currentPosition.latitude,
        currentPosition.longitude,
        0,
        new Vec3(0, 0, 0)
    );

    return globe.computePositionFromPoint(
        controlPointPoint[0],
        controlPointPoint[1],
        controlPointPoint[2],
        result
    );
};

// Rotates a set of locations, which can include multiple rings, around their center and returns the delta in
// heading that was applied.
BaseSurfaceEditorFragment.prototype.rotateLocations = function (globe, newPosition, previousPosition, locations) {
    var center = this.getCenterFromLocations(globe, locations);
    var previousHeading = Location.greatCircleAzimuth(center, previousPosition);
    var deltaHeading = Location.greatCircleAzimuth(center, newPosition) - previousHeading;

    if (locations.length > 0 && Array.isArray(locations[0])) {
        for (var i = 0, ilen = locations.length; i < ilen; i++) {
            for (var j = 0, jlen = locations[i].length; j < jlen; j++) {
                var heading = Location.greatCircleAzimuth(center, locations[i][j]);
                var distance = Location.greatCircleDistance(center, locations[i][j]);
                Location.greatCircleLocation(
                    center,
                    heading + deltaHeading,
                    distance,
                    locations[i][j]
                );
            }
        }
    } else {
        for (var i = 0, len = locations.length; i < len; i++) {
            var heading = Location.greatCircleAzimuth(center, locations[i]);
            var distance = Location.greatCircleDistance(center, locations[i]);
            Location.greatCircleLocation(
                center,
                heading + deltaHeading,
                distance,
                locations[i]
            );
        }
    }

    return deltaHeading;
};

// Returns the point on a segment that is closest to the specified point.
BaseSurfaceEditorFragment.prototype.closestPointOnSegment = function (segmentStart, segmentEnd, point) {
    var segment = segmentEnd.subtract(segmentStart);

    var segmentCopy = new Vec3(0, 0, 0);
    segmentCopy.copy(segment);
    var dir = segmentCopy.normalize();

    var pointCopy = new Vec3(0, 0, 0);
    pointCopy.copy(point);
    var dot = pointCopy.subtract(segmentStart).dot(dir);

    if (dot < 0.0) {
        return segmentCopy.copy(segmentStart);
    } else if (dot > segment.magnitude()) {
        return segmentCopy.copy(segmentEnd);
    } else {
        return new Line(segmentStart, dir).pointAt(dot, segmentCopy);
    }
};

// Computes the location for a shadow control point for two given locations.
BaseSurfaceEditorFragment.prototype.computeShadowPointLocations = function (shape,
                                                                            shadowControlPoint,
                                                                            startLocation,
                                                                            endLocation) {
    var segmentAzimuth = null;
    var segmentDistance = null;

    if (shape.pathType === WorldWind.LINEAR) {
        shadowControlPoint.position = new Location(
            (startLocation.latitude + endLocation.latitude) / 2,
            (startLocation.longitude + endLocation.longitude) / 2
        );
    } else if (shape.pathType === WorldWind.RHUMB_LINE) {
        if (segmentAzimuth == null) {
            segmentAzimuth = Location.rhumbAzimuth(startLocation, endLocation);
            segmentDistance = Location.rhumbDistance(startLocation, endLocation);
        }
        Location.rhumbLocation(startLocation, segmentAzimuth, 0.5 * segmentDistance,
            shadowControlPoint.position);
    } else {
        // Great Circle
        if (segmentAzimuth == null) {
            segmentAzimuth = Location.greatCircleAzimuth(startLocation, endLocation); //degrees
            segmentDistance = Location.greatCircleDistance(startLocation, endLocation); //radians
        }
        //Location, degrees, radians, Location
        Location.greatCircleLocation(startLocation, segmentAzimuth, 0.5 * segmentDistance,
            shadowControlPoint.position);
    }

};

export default BaseSurfaceEditorFragment;