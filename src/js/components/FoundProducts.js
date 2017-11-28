import React, { Component } from 'react';
import OpenSearchUtils from '../WorldWind/ogc/openSearch/OpenSearchUtils';
import OpenSearchRequest from '../WorldWind/ogc/openSearch/OpenSearchRequest';
import {parseString} from 'xml2js';

export default class FoundProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: ""
        };
        this.showInfo = this.showInfo.bind(this);
        this.closeInfo = this.closeInfo.bind(this);
    }
    showInfo(product){
        let requestOptions = new OpenSearchRequest();
        let metadataLink;
        if (product.properties && product.properties.links && product.properties.links.via){
        metadataLink = product.properties.links.via.find(link => link.title == 'Product metadata');
        }
        if (metadataLink && metadataLink.href){
            requestOptions.url = metadataLink.href;
            requestOptions.method = 'GET';

            OpenSearchUtils.fetch(requestOptions)
            .then(result => {
            	parseString(result, (err, json) => {
            		let str = JSON.stringify(json['Granule'], null, '\t');
            		str = str.replace(/[\[\]],?\n?\t*/g, "");
            		str = str.replace(/[{"]/g, "");
            		str = str.replace(/\t*},?\n?/g, "");
            		str = str.replace(/\t{2}/g, "\t");
            	    this.setState({info: str});
            	});
            })
            .catch(err => console.log(err));
        }
    }
    closeInfo(){
        this.setState({info: ""});
    }
    render(){
        let products;
        if (this.props.productsResult.features && this.props.productsResult.features.length > 0){
            products = this.props.productsResult.features.map((product, index) => {
                return (
                    <div className="eoos-result" key = {index}>
						<div className="eoos-result-properties">
							<div className="eoos-result-name-time">
								<span className="eoos-result-name">{product.properties.title}</span>
								<span className="eoos-result-time">{product.properties.updated}</span>
							</div>
						</div>
						<div className="eoos-result-controls">
							<div className="eoos-result-detail-button" title="Show details…" onClick = {this.showInfo.bind(this, product)}></div>
						</div>
					</div>
                );
            });
        }
        else {
            products = (<h4>No products found</h4>);
        }
        return (
            <div>
                <h3>Found products</h3>
				<div id="results-list-header">
					<div id="results-list-header-name-time">Name / time</div>
				</div>
                <div id="results-list">
                    {products}
                </div>
                {this.state.info &&
                    <div id = "info-panel">
                        {this.state.info}
                        <span id = "close-info-panel" className = "fa fa-window-close" onClick = {this.closeInfo}></span>
                    </div>
                }
            </div>
        )
    }

}
