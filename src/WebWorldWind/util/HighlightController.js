import WorldWind from '@nasaworldwind/worldwind';

const ArgumentError = WorldWind.ArgumentError,
    Logger = WorldWind.Logger,
    TapRecognizer = WorldWind.TapRecognizer;

/**
 * Constructs a highlight controller and associates it with a specified WorldWindow.
 * @alias HighlightController
 * @constructor
 * @classdesc Monitors mouse-move and touch-device tap events and highlights shapes they identify.
 * @param {WorldWindow} worldWindow The WorldWindow to monitor for mouse-move and tap events.
 * @param changeSelected {Function}
 * @throws {ArgumentError} If the specified WorldWindow is null or undefined.
 */
var HighlightController = function (worldWindow, changeSelected) {
    if (!worldWindow) {
        throw new ArgumentError(Logger.logMessage(Logger.LEVEL_SEVERE, "HighlightController", "constructor",
            "missingWorldWindow"));
    }

    /**
     * This controller's WorldWindow
     * @type {WorldWindow}
     * @readonly
     */
    this.worldWindow = worldWindow;

    let previouslyHighlightedItem = null;
    let currentlyHighlighted = null;

    var handlePick = function (o) {
        // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
        // the mouse or tap location.
        var x = o.clientX,
            y = o.clientY;

        let redrawRequired = false;
        if(currentlyHighlighted) {
            previouslyHighlightedItem = currentlyHighlighted;
            redrawRequired = true;
        }

        // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
        // relative to the upper left corner of the canvas rather than the upper left corner of the page.
        var pickList = worldWindow.pick(worldWindow.canvasCoordinates(x, y));
        if (pickList.objects.length > 0) {
            redrawRequired = true;

            let nonTerrainObjects = pickList.objects.filter(object => {
                return !object.isTerrain;
            });

            if(nonTerrainObjects.length > 0) {
                let indexOfHighlighted = -1;
                if(previouslyHighlightedItem) {
                    nonTerrainObjects.forEach((object, index) => {
                        if (object.userObject.customProperties.identifier === previouslyHighlightedItem.customProperties.identifier) {
                            indexOfHighlighted = index;
                        }
                    });

                    previouslyHighlightedItem.highlighted = false;
                    previouslyHighlightedItem = null;
                }

                if (indexOfHighlighted === -1) {
                    indexOfHighlighted = 0;
                } else {
                    indexOfHighlighted = (indexOfHighlighted + 1) % nonTerrainObjects.length;

                }

                currentlyHighlighted = nonTerrainObjects[indexOfHighlighted].userObject;
                currentlyHighlighted.highlighted = true;

                changeSelected(currentlyHighlighted.customProperties);
            }
        }

        // Update the window if we changed anything.
        if (redrawRequired) {
            worldWindow.redraw(); // redraw to make the highlighting changes take effect on the screen
        }
    };

    // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
    this.worldWindow.addEventListener("click", handlePick);

    // Listen for taps on mobile devices and highlight the placemarks that the user taps.
    new TapRecognizer(this.worldWindow, handlePick);
};

// Add the possibility

export default HighlightController;