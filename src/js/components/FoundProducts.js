import React, { Component } from 'react';
import OpenSearchUtils from '../WorldWind/ogc/openSearch/OpenSearchUtils';
import OpenSearchRequest from '../WorldWind/ogc/openSearch/OpenSearchRequest';
import {parseString} from 'xml2js';
import Product from './Product';

export default class FoundProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: ""
        };

        this.showInfo = this.showInfo.bind(this);
    }

    closeInfo() {
        this.setState({info: ""});
    }

    formatJSON(json) {
        let str = JSON.stringify(json, null, '\t');
        str = str.replace(/[\[\]],?\n?\t*/g, "");
        str = str.replace(/[{"]/g, "");
        str = str.replace(/\t*},?\n?/g, "");
        return str.replace(/\t{2}/g, "\t");
    }

    showInfo(product) {
        let requestOptions = new OpenSearchRequest();

        let infoLink;
        if (product.links && product.links.via){
            infoLink = product.links.via.find(link => link.title == 'Product metadata');
        }
        else if (product.properties && product.properties.links && product.properties.links.via){
            infoLink = product.properties.links.via.find(link => link.title == 'Product metadata');
        }
        if (infoLink && infoLink.href){
            requestOptions.url = infoLink.href;
            requestOptions.method = 'GET';

            OpenSearchUtils.fetch(requestOptions)
            .then(result => {
            	parseString(result, (err, json) => {
            	    this.setState({info: this.formatJSON(json)});
            	});
            })
            .catch(err => console.log(err));
        }
        else {
            alert("No more information available, sorry");
        }
    }

    render() {
        let products;
        let resultsCount = 0;
        if (this.props.productsResult.features && this.props.productsResult.features.length > 0){
            products = this.props.productsResult.features.map((product, index) => {
                return (
                    <Product key = {index} product = {product} showInfo = {this.showInfo} />
                );
            });
            resultsCount = this.props.productsResult.properties.totalResults;
        }

        return (
            <div>
                <h3>{"Found products - " + resultsCount + " results"}</h3>
                {resultsCount > 0 &&
                    <div id="results-list-header">
    					<div id="results-list-header-name-time">Name / time</div>
    				</div>
                }   
                <div id="results-list">
                    {products}
                </div>
                {this.state.info &&
                    <div id = "info-panel">
                        {this.state.info}
                        <span id = "close-info-panel" className = "fa fa-window-close" onClick = {() => this.closeInfo()}></span>
                    </div>
                }
            </div>
        )
    }

}
