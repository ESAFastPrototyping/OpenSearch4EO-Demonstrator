import React, { Component } from 'react';
import OpenSearchUtils from '../worldwind/ogc/openSearch/OpenSearchUtils';
import OpenSearchRequest from '../worldwind/ogc/openSearch/OpenSearchRequest';
import AtomParser from '../worldwind/ogc/openSearch/responseFormats/atomParser/OpenSearchAtomParser';

export default class PageControls extends Component {
    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    navigate(url){
        if(!url){
            return;
        }
        let requestOptions = new OpenSearchRequest();
        requestOptions.url = url;
        requestOptions.method = 'GET';

        OpenSearchUtils.fetch(requestOptions)
        .then(result => {
            let parsedResult = AtomParser.parse(result, 'collection');
            this.props.updateResult(parsedResult);
        })
        .catch(err => console.log(err));
    }
    render(){
        let links = this.props.currentResult.properties.links;
        let nextLink = links && links.next && links.next.href;
        let previousLink = links && links.previous && links.previous[0] && links.previous[0].href;
        let firstLink = links && links.first && links.first.href;
        let lastLink = links && links.last && links.last.href;
        return (
            <div className = "page-controls">
                <button className = "button-navigation" onClick = {this.navigate.bind(this, firstLink)} disabled = {!firstLink}>First</button>
                <button className = "button-navigation" onClick = {this.navigate.bind(this, previousLink)} disabled = {!previousLink}>Previous</button>
                <button className = "button-navigation" onClick = {this.navigate.bind(this, nextLink)} disabled = {!nextLink}>Next</button>
                <button className = "button-navigation" onClick = {this.navigate.bind(this, lastLink)} disabled = {!lastLink}>Last</button>
            </div>
        );
    }

}
