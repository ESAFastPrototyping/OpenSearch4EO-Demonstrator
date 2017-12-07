import React, { Component } from 'react';
import OpenSearchUtils from '../../WorldWind/ogc/openSearch/OpenSearchUtils';
import OpenSearchRequest from '../../WorldWind/ogc/openSearch/OpenSearchRequest';
import AtomParser from '../../WorldWind/ogc/openSearch/responseFormats/atomParser/OpenSearchAtomParser';

export default class PageControls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching: false
        };
    }
    navigate(url){
        if(!url || this.state.isFetching == true){
            return;
        }
        let requestOptions = new OpenSearchRequest();
        requestOptions.url = url;
        requestOptions.method = 'GET';

        this.props.startedSearchRequest();
        this.setState({isFetching: true});

        OpenSearchUtils.fetch(requestOptions)
        .then(result => {
            let parsedResult = AtomParser.parse(result, 'collection');
            this.props.updateResult(parsedResult);
            this.props.finishedSearchRequest();
            this.setState({isFetching: false});
        })
        .catch(err => {
            console.log(err);
            this.props.finishedSearchRequest();
            this.setState({isFetching: false});
        });
    }
    render() {
        let links = this.props.currentResult.properties.links;
        let nextLink = links && links.next && links.next.href;
        let previousLink = links && links.previous && links.previous[0] && links.previous[0].href;
        let firstLink = links && links.first && links.first.href;
        let lastLink = links && links.last && links.last.href;

        return (
            <div className = "page-controls">
                <button className = "button-navigation" onClick = {() => this.navigate(firstLink)} disabled = {!firstLink}>First</button>
                <button className = "button-navigation" onClick = {() => this.navigate(previousLink)} disabled = {!previousLink}>Previous</button>
                <button className = "button-navigation" onClick = {() => this.navigate(nextLink)} disabled = {!nextLink}>Next</button>
                <button className = "button-navigation" onClick = {() => this.navigate(lastLink)} disabled = {!lastLink}>Last</button>
            </div>
        );
    }
}
