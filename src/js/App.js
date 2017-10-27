import React, {Component} from 'react';
import Connector from './components/Connector';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {}
        }
        this.connect = this.connect.bind(this);
    }
    connect(searchService){
        this.setState({searchService: searchService});
    }
    render(){
        return (
            <div>
                	<div id="map">
                		<canvas id="wwd-results"></canvas>
                	</div>

                	<div id="sidebar">

                		<div className="sidebar-block header active" id="eoos-header">
                			<span>EO OpenSearch</span>
                		</div>


                		<div className="sidebar-block content active" id="eoos-content">

                			<Connector connect = {this.connect}/>

                			<div>
                				<h3>Saved providers</h3>
                				<div className="sidebar-list">

                					<div className="sidebar-list-item provider">
                						<span>Provider One</span>
                					</div>

                				</div>
                			</div>

                			<div>
                				<h3>Recent providers</h3>
                				<div className="sidebar-list">

                					<div className="sidebar-list-item provider">
                						<span>Provider One</span>
                					</div>

                					<div className="sidebar-list-item provider">
                						<span>Provider Three</span>
                					</div>

                					<div className="sidebar-list-item provider">
                						<span>Provider Two</span>
                					</div>

                				</div>
                				<a className="sidebar-list-more">more…</a>
                			</div>

                			<div>
                				<h3>Saved collections</h3>
                				<div className="sidebar-list">

                					<div className="sidebar-list-item collection">
                						<span>Provider One: Collection One</span>
                					</div>

                					<div className="sidebar-list-item collection">
                						<span>Provider One: Collection Two</span>
                					</div>

                				</div>
                			</div>

                			<div>
                				<h3>Recent collections</h3>
                				<div className="sidebar-list">

                					<div className="sidebar-list-item collection">
                						<span>Provider Two: Collection Three</span>
                					</div>

                					<div className="sidebar-list-item collection">
                						<span>Provider One: Collection One</span>
                					</div>

                					<div className="sidebar-list-item collection">
                						<span>Provider One: Collection Two</span>
                					</div>

                				</div>
                				<a className="sidebar-list-more">more…</a>
                			</div>

                		</div>



                		<div className="sidebar-block header unset" id="provider-header">
                			<span className="sidebar-header-name">Provider</span>
                			<a className="sidebar-header-change">change</a>
                			<span className="sidebar-header-content-name">Provider One</span>
                		</div>


                		<div className="sidebar-block content" id="provider-content">

                			<div className="sidebar-tabs">
                				<a data-for="provider-base" className="active">Provider</a>
                				<a data-for="provider-search">Collection search</a>
                				<a data-for="provider-results">Search results</a>
                			</div>

                			<div className="sidebar-tab active" id="provider-base">

                				<div className="sidebar-base-new-search">
                					<a className="eoos-search-btn">New collection search</a>
                				</div>

                				<div className="sidebar-base-description">
                					Sed dapibus sodales dolor, eu maximus enim posuere eget. Etiam bibendum ultrices interdum. Sed eu felis nunc. Fusce facilisis enim sit amet odio molestie blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                				</div>

                				<div>
                					<h3>Saved collections</h3>
                					<div className="sidebar-list">

                						<div className="sidebar-list-item collection">
                							<span>Collection One</span>
                						</div>

                						<div className="sidebar-list-item collection">
                							<span>Collection Two</span>
                						</div>

                					</div>
                				</div>

                				<div>
                					<h3>Recent collections</h3>
                					<div className="sidebar-list">

                						<div className="sidebar-list-item collection">
                							<span>Collection Three</span>
                						</div>

                						<div className="sidebar-list-item collection">
                							<span>Collection One</span>
                						</div>

                						<div className="sidebar-list-item collection">
                							<span>Collection Two</span>
                						</div>

                					</div>
                					<a className="sidebar-list-more">more…</a>
                				</div>

                				<div>
                					<h3>Recent collection searches</h3>
                					<div className="sidebar-list">

                						<div className="sidebar-list-item">
                							<div className="sidebar-list-item-properties">
                								<span title="Platform">Aerial photographs</span>
                								<span title="Organisation">GCPDN</span>
                							</div>
                						</div>

                						<div className="sidebar-list-item">
                							<div className="sidebar-list-item-properties">
                								<span title="Platform">Aerial photographs</span>
                								<span title="Organisation">Lorem Inc.</span>
                								<span title="Instrument">IPSUM</span>
                								<span title="Spectrum">Infrared</span>
                								<span title="Orbit type">LEO</span>
                							</div>
                						</div>

                						<div className="sidebar-list-item">
                							<div className="sidebar-list-item-properties">
                								<span title="Platform">Aerial photographs</span>
                								<span title="Organisation">Lorem Inc.</span>
                								<span title="Instrument">IPSUM</span>
                							</div>
                						</div>

                					</div>
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

                				<div className="sidebar-base-new-search">
                					<a className="eoos-search-btn">New product search</a>
                				</div>

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

                    {/*
                	<div id="timeline" style="display: none">
                		<div id="timeline-results">
                			<div className="eoos-timeline-result" style="left:10.345%"></div>
                			<div className="eoos-timeline-result" style="left:11.45%"></div>
                			<div className="eoos-timeline-result" style="left:11.672%"></div>
                			<div className="eoos-timeline-result" style="left:12.345%"></div>
                			<div className="eoos-timeline-result" style="left:12.45%"></div>
                			<div className="eoos-timeline-result" style="left:12.672%"></div>
                			<div className="eoos-timeline-result" style="left:12.72%"></div>
                			<div className="eoos-timeline-result" style="left:13.02%"></div>
                			<div className="eoos-timeline-result" style="left:13.345%"></div>
                			<div className="eoos-timeline-result" style="left:14.45%"></div>
                			<div className="eoos-timeline-result" style="left:14.672%"></div>
                			<div className="eoos-timeline-result" style="left:14.72%"></div>
                			<div className="eoos-timeline-result" style="left:16.02%"></div>
                		</div>
                		<div id="timeline-timeline">
                			<div className="eoos-timeline-month" style="width:7%">2016/12</div>
                			<div className="eoos-timeline-month" style="width:20%;left:7%">2017/1</div>
                			<div className="eoos-timeline-month" style="width:20%;left:27%">2017/2</div>
                			<div className="eoos-timeline-month" style="width:20%;left:47%">2017/3</div>
                			<div className="eoos-timeline-month" style="width:20%;left:67%">2017/4</div>
                			<div className="eoos-timeline-month" style="width:13%;left:87%">2017/5</div>
                		</div>
                		<div id="timeline-interval" style="width:80%;left:10%">
                			<div className="eoos-timeline-handle"></div>
                			<div className="eoos-timeline-handle"></div>
                		</div>
                	</div>
                    */}

            </div>
        );
    }
}
