import React, { Component } from 'react';

export default class  extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let description = "";
        let longName = "";
        if (this.props.searchService.descriptionDocument) {
            description =  this.props.searchService.descriptionDocument.description;
            longName =  this.props.searchService.descriptionDocument.longName;
        }
        return (
            <div className="sidebar-block content active" id="provider-content">

                <div className="sidebar-tabs">
                    <a data-for="provider-base" className="active">Provider</a>
                    <a data-for="provider-search">Collection search</a>
                    <a data-for="provider-results">Search results</a>
                </div>

                <div className="sidebar-tab active" id="provider-base">
                    <div className="sidebar-base-description">
                        <span className = "sidebar-header-content-name">{longName}</span>
                        <span className = "sidebar-text">{description}</span>
                    </div>
                </div>

                <div className="sidebar-tab" id="provider-search">

                    <div className="search-properties">
                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Text</h2>
                                <div className="eoos-property-input">
                                    <label>
                                        <input type="text" id="collection-fulltext" />
                                    </label>
                                </div>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>

                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Search area</h2>
                                <div className="eoos-property-input">
                                    <input type="text" id="collection-location-find" />
                                </div>
                                <button id="collection-location-draw-in-map">Draw in map</button>
                                <button id="collection-location-load-file">Load from file</button>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>

                        {/*
                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Time range</h2>
                                <div className="eoos-property-timerange">
                                    From
                                    <div className="eoos-property-timerange-inputs">
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-from-year" min="2015" max="2017" value="2017" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>-</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-from-month" min="1" max="12" value="5" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>-</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-from-day" min="1" max="31" value="16" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <div className="eoos-property-timerange-input">
                                            <input type="date" id="collection-timerange-from-date" value="2017-05-16" />
                                        </div>

                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-from-hours" min="0" max="23" value="18" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>:</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-from-minutes" min="0" max="59" value="30" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <div className="eoos-property-timerange-input">
                                            <input type="time" id="collection-timerange-from-time" value="18:30" />
                                        </div>
                                    </div>
                                </div>
                                <div className="eoos-property-timerange">
                                    To
                                    <div className="eoos-property-timerange-inputs">
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-to-year" min="2015" max="2017" value="2017" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>-</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-to-month" min="1" max="12" value="5" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>-</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-to-day" min="1" max="31" value="16" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <div className="eoos-property-timerange-input">
                                            <input type="date" id="collection-timerange-to-date" value="2017-05-16" />
                                        </div>

                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-to-hours" min="0" max="23" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <span>:</span>
                                        <div className="eoos-property-timerange-input">
                                            <a className="eoos-property-timerange-spinner top"></a>
                                            <input type="number" id="collection-timerange-to-minutes" min="0" max="59" />
                                            <a className="eoos-property-timerange-spinner bottom"></a>
                                        </div>
                                        <div className="eoos-property-timerange-input">
                                            <input type="time" id="collection-timerange-to-time" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>
                        */}

                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Platform</h2>
                                <div className="eoos-property-input select">
                                    <input type="text" id="collection-platform" />
                                </div>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>

                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Instrument</h2>
                                <div className="eoos-property-input select">
                                    <input type="text" id="collection-instrument" />
                                </div>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>

                        <div className="eoos-property">
                            <div className="eoos-property-content">
                                <h2>Organisation</h2>
                                <div className="eoos-property-input select">
                                    <input type="text" id="collection-organisation" />
                                </div>
                            </div>
                            <div className="eoos-property-indicator"></div>
                        </div>

                    </div>

                </div>

                <div className="sidebar-tab" id="provider-results">

                    <h3>Found collections</h3>
                    <div className="sidebar-list">

                        <div className="sidebar-list-item collection">
                            <span>Collection One</span>
                        </div>

                        <div className="sidebar-list-item collection">
                            <span>Collection Two</span>
                        </div>

                        <div className="sidebar-list-item collection">
                            <span>Collection Three</span>
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}
