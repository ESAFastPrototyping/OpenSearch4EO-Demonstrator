import WorldWind from '@nasaworldwind/worldwind';
import OpenSearchConstants from '../OpenSearchConstants';

const ArgumentError = WorldWind.ArgumentError,
    Logger = WorldWind.Logger;


/**
 * Constructs a parser registry.
 *
 * @alias OpenSearchParserRegistry
 * @constructor
 * @classdesc Provides a parser registry.
 *
 * Parsers are stored for the provided mime type and relation.
 * The mime type indicates the file format that the parser can handle.
 * The relation specifies the role of the resource being parsed, and as specified in the description document.
 * Services can register or retrieve a parser by specifying the mime type and relation.
 */
var OpenSearchParserRegistry = function () {
    this._entries = Object.create(null);
};

/**
 * Registers a parser for the specified mime type and relation.
 *
 * The parse method of the parser will be called with the response of the server when the mime type and
 * relation type matches.
 *
 * @param {String} type Mime type of the parser to register.
 * @param {String} rel Relation type of the parser to register.
 * @param {Object} parser An object with a parse method.
 */
OpenSearchParserRegistry.prototype.registerParser = function (type, rel, parser) {
    if (!type) {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified type is missing."));
    }
    if (typeof type !== 'string') {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified type is not a string."));
    }
    if (!rel) {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified rel is missing."));
    }
    if (typeof rel !== 'string') {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified rel is not a string"));
    }
    if (!parser) {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified parser is missing."));
    }
    if (typeof parser !== 'object') {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified parser is not an object."));
    }
    if (typeof parser.parse !== 'function') {
        throw new ArgumentError(
            Logger.logMessage(Logger.LEVEL_SEVERE, "OpenSearchParserRegistry", "registerParser",
                "The specified parser does not have a parse method."));
    }

    if (!this._entries[type]) {
        this._entries[type] = Object.create(null);
    }
    this._entries[type][rel] = parser;
};

/**
 * Returns the parser for the specified mime type and relation.
 *
 * @param {String} type Mime type of the parser.
 * @param {String} rel Relation type of the parser.
 *
 * @return {Object|undefined} The parser.
 */
OpenSearchParserRegistry.prototype.getParser = function (type, rel) {
    if (!type || typeof type !== 'string') {
        return;
    }
    if (typeof rel !== 'string') {
        return;
    }

    rel = rel || OpenSearchConstants.RESULTS;
    if (!this._entries[type]) {
        return;
    }
    return this._entries[type][rel];
};

/**
 * Returns a list with the supported mime types.
 *
 * @return {String[]} The list of supported mime types.
 */
OpenSearchParserRegistry.prototype.getFormats = function () {
    return Object.keys(this._entries);
};

/**
 * Removes a parser for the specified mime type and relation.
 *
 * @param {String} type Mime type of the registered parser.
 * @param {String} rel Relation type of the registered parser.
 */
OpenSearchParserRegistry.prototype.removeParser = function (type, rel) {
    if (!this._entries[type]) {
        return;
    }
    if (!rel) {
        delete this._entries[type];
    }
    delete this._entries[type][rel];
};


export default OpenSearchParserRegistry;