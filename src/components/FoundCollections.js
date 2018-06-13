import React, { Component } from 'react';
import OpenSearchService from '../WebWorldWind/ogc/openSearch/OpenSearchService';

export default class FoundCollections extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(collection) {
        let links = collection.links;
        if (links && links.search && links.search[0] && links.search[0].href) {
            let service = new OpenSearchService(links.search[0].href)
            service.discover()
                .then(result => {
                    this.props.connectCollection(result);
                    this.props.selectCollection(collection);
                })
                .catch(err => alert("There was an issue with the selected collection.\nTry again later or try a different collection."));
        } else {
            alert("No search link found, please select a different collection");
        }
    }

    render() {
        let collections;
        let resultsCount = 0;
        if (this.props.collectionsResult.features && this.props.collectionsResult.features.length > 0) {
            collections = this.props.collectionsResult.features.map(collection => {
                let hiddenStyle = {};
                if (!collection.links.search) {
                    hiddenStyle = {
                        color: '#a6a6a6'
                    }
                }
                return (
                    <div className="sidebar-list-item collection"
                         style={hiddenStyle}
                         key={collection.properties.identifier}
                         onClick={this.handleClick.bind(this, collection)}>
                        <h4>{collection.properties.title}</h4>
                    </div>
                );
            });
            resultsCount = this.props.collectionsResult.properties.totalResults;
        }
        return (
            <div>
                <h3>{"Found collections - " + resultsCount + " results"}</h3>
                {collections}
            </div>
        )
    }

}
