import React, { Component } from 'react';
import Connector from './Connector';
import SidebarHeader from './SidebarHeader';
import CollectionSearch from './CollectionSearch';

export default class  extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="sidebar">
                <SidebarHeader searchService = {this.props.searchService} resetService = {this.props.resetService}/>

                <div className="sidebar-block content active" id="eoos-content">
                    {this.props.searchService.descriptionDocument ?
                        <CollectionSearch searchService = {this.props.searchService}/>
                        :
                        <Connector connect = {this.props.connect}/>
                    }
                </div>


                <div className="sidebar-block header unset" id="collection-header">
                    <span className="sidebar-header-name">Collection</span>
                    <a className="sidebar-header-change">change</a>
                    <div className="sidebar-header-content-name">Collection Two</div>
                </div>


                <div className="sidebar-block content" id="collection-content">

                    <div className="sidebar-tabs">
                        <a data-for="collection-base" className="active">Collection</a>
                        <a data-for="collection-search">Product search</a>
                        <a data-for="collection-results">Search results</a>
                    </div>

                    <div className="sidebar-tab active" id="collection-base">

                        <div className="sidebar-base-description">
                            Sed dapibus sodales dolor, eu maximus enim posuere eget. Etiam bibendum ultrices interdum. Sed eu felis nunc. Fusce facilisis enim sit amet odio molestie blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>

                        <div>
                            <h3>Saved searches</h3>
                            <div className="sidebar-list">

                                <div className="sidebar-list-item">
                                    <div className="sidebar-list-item-properties">
                                        <span title="Area">Switzerland</span>
                                        <span title="Time range">12. 6. 2017 - 15. 6. 2017</span>
                                    </div>
                                </div>

                                <div className="sidebar-list-item">
                                    <div className="sidebar-list-item-properties">
                                        <span title="Area">Custom Area</span>
                                        <span title="Time range">10. 1. 2016 12:00 - 11. 1. 2016 16:00</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <h3>Recent searches</h3>
                            <div className="sidebar-list">

                                <div className="sidebar-list-item">
                                    <div className="sidebar-list-item-properties">
                                        <span title="Area">Switzerland</span>
                                        <span title="Time range">12. 6. 2017 - 15. 6. 2017</span>
                                    </div>
                                </div>

                                <div className="sidebar-list-item">
                                    <div className="sidebar-list-item-properties">
                                        <span title="Area">Custom Area</span>
                                        <span title="Time range">10. 1. 2016 12:00 - 11. 1. 2016 16:00</span>
                                    </div>
                                </div>

                                <div className="sidebar-list-item">
                                    <div className="sidebar-list-item-properties">
                                        <span title="Area">Custom Area</span>
                                        <span title="Time range">10. 1. 2016 12:00 - 11. 1. 2016 16:00</span>
                                        <span title="Instrument">IPSUM</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="sidebar-tab" id="collection-search">

                        <div className="search-properties">
                            <div className="eoos-property">
                                <div className="eoos-property-content">
                                    <h2>Text</h2>
                                    <div className="eoos-property-input">
                                        <label>
                                            <input type="text" id="product-fulltext" />
                                        </label>
                                    </div>
                                </div>
                                <div className="eoos-property-indicator"></div>
                            </div>

                            <div className="eoos-property">
                                <div className="eoos-property-content">
                                    <h2>Search area</h2>
                                    <div className="eoos-property-input">
                                        <input type="text" id="product-location-find" />
                                    </div>
                                    <button id="product-location-draw-in-map">Draw in map</button>
                                    <button id="product-location-load-file">Load from file</button>
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
                                                <input type="number" id="product-timerange-from-year" min="2015" max="2017" value="2017" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>-</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-from-month" min="1" max="12" value="5" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>-</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-from-day" min="1" max="31" value="16" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <div className="eoos-property-timerange-input">
                                                <input type="date" id="product-timerange-from-date" value="2017-05-16" />
                                            </div>

                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-from-hours" min="0" max="23" value="18" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>:</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-from-minutes" min="0" max="59" value="30" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <div className="eoos-property-timerange-input">
                                                <input type="time" id="product-timerange-from-time" value="18:30" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="eoos-property-timerange">
                                        To
                                        <div className="eoos-property-timerange-inputs">
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-to-year" min="2015" max="2017" value="2017" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>-</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-to-month" min="1" max="12" value="5" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>-</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-to-day" min="1" max="31" value="16" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <div className="eoos-property-timerange-input">
                                                <input type="date" id="product-timerange-to-date" value="2017-05-16" />
                                            </div>

                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-to-hours" min="0" max="23" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <span>:</span>
                                            <div className="eoos-property-timerange-input">
                                                <a className="eoos-property-timerange-spinner top"></a>
                                                <input type="number" id="product-timerange-to-minutes" min="0" max="59" />
                                                <a className="eoos-property-timerange-spinner bottom"></a>
                                            </div>
                                            <div className="eoos-property-timerange-input">
                                                <input type="time" id="product-timerange-to-time" />
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
                                        <input type="text" id="product-platform" />
                                    </div>
                                </div>
                                <div className="eoos-property-indicator"></div>
                            </div>

                            <div className="eoos-property">
                                <div className="eoos-property-content">
                                    <h2>Instrument</h2>
                                    <div className="eoos-property-input select">
                                        <input type="text" id="product-instrument" />
                                    </div>
                                </div>
                                <div className="eoos-property-indicator"></div>
                            </div>

                            <div className="eoos-property">
                                <div className="eoos-property-content">
                                    <h2>Organisation</h2>
                                    <div className="eoos-property-input select">
                                        <input type="text" id="product-organisation" />
                                    </div>
                                </div>
                                <div className="eoos-property-indicator"></div>
                            </div>

                        </div>

                    </div>

                    <div className="sidebar-tab" id="collection-results">

                        <h3>Found products</h3>
                        <div id="results-list-header">
                            <div id="results-list-header-name-time">Name / time</div>
                            <div className="eoos-results-list-header">Platform</div>
                            <div className="eoos-results-list-header">Instrument</div>
                        </div>
                        <div id="results-list">

                            <div className="eoos-result">
                                <div className="eoos-result-properties">
                                    <div className="eoos-result-name-time">
                                        <span className="eoos-result-name">Product 1</span>
                                        <span className="eoos-result-time">2017-05-19 18:25:04</span>
                                    </div>
                                    <div className="eoos-result-property">
                                        TERRA
                                    </div>
                                    <div className="eoos-result-property">
                                        MODIS
                                    </div>
                                </div>
                                <div className="eoos-result-controls">
                                    <div className="eoos-result-detail-button" title="Show details…"></div>
                                    <div className="eoos-result-search-button" title="Find similar…"></div>
                                </div>
                            </div>

                            <div className="eoos-result">
                                <div className="eoos-result-properties">
                                    <div className="eoos-result-name-time">
                                        <span className="eoos-result-name">Product 2</span>
                                        <span className="eoos-result-time">2017-05-20 13:00:00</span>
                                    </div>
                                    <div className="eoos-result-property">
                                        AERIAL PHOTOGRAPHS
                                    </div>
                                    <div className="eoos-result-property">
                                        CAMERA
                                    </div>
                                </div>
                                <div className="eoos-result-controls">
                                    <div className="eoos-result-detail-button" title="Show details…"></div>
                                    <div className="eoos-result-search-button" title="Find similar…"></div>
                                </div>
                            </div>

                            <div className="eoos-result">
                                <div className="eoos-result-properties">
                                    <div className="eoos-result-name-time">
                                        <span className="eoos-result-name">Product 3</span>
                                        <span className="eoos-result-time">2017-05-21 8:13:45</span>
                                    </div>
                                    <div className="eoos-result-property">
                                        LANDSAT-7
                                    </div>
                                    <div className="eoos-result-property">
                                        MODIS
                                    </div>
                                </div>
                                <div className="eoos-result-controls">
                                    <div className="eoos-result-detail-button" title="Show details…"></div>
                                    <div className="eoos-result-search-button" title="Find similar…"></div>
                                </div>
                            </div>

                            <div className="eoos-result">
                                <div className="eoos-result-properties">
                                    <div className="eoos-result-name-time">
                                        <span className="eoos-result-name">Product 5</span>
                                        <span className="eoos-result-time">2017-05-22 17:35:12</span>
                                    </div>
                                    <div className="eoos-result-property">
                                        TERRA
                                    </div>
                                    <div className="eoos-result-property">
                                        MODIS
                                    </div>
                                </div>
                                <div className="eoos-result-controls">
                                    <div className="eoos-result-detail-button" title="Show details…"></div>
                                    <div className="eoos-result-search-button" title="Find similar…"></div>
                                </div>
                            </div>

                            <div className="eoos-result">
                                <div className="eoos-result-properties">
                                    <div className="eoos-result-name-time">
                                        <span className="eoos-result-name">Product 7</span>
                                        <span className="eoos-result-time">2017-05-22 18:25:04</span>
                                    </div>
                                    <div className="eoos-result-property">
                                        SENTINEL-1B
                                    </div>
                                    <div className="eoos-result-property">
                                        SLSTR
                                    </div>
                                </div>
                                <div className="eoos-result-controls">
                                    <div className="eoos-result-detail-button" title="Show details…"></div>
                                    <div className="eoos-result-search-button" title="Find similar…"></div>
                                </div>
                            </div>

                        </div>
                        <div id="results-pagination">
                            <a>&laquo;</a>
                            <a>1</a>
                            <a>2</a>
                            <a>3</a>
                            <span>…</span>
                            <a>&raquo;</a>
                        </div>

                    </div>

                </div>



                <div className="sidebar-block header unset" id="product-header">
                    <span className="sidebar-header-name">Product</span>
                </div>


                <div className="sidebar-block content" id="product-content">

                </div>


            </div>
        )
    }

}
