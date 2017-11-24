import React, { Component } from 'react';
import OpenSearchService from '../WorldWind/ogc/openSearch/OpenSearchService';

export default class FoundCollections extends Component {
    constructor(props){
        super(props);
    }
    handleClick(collection){
        let links = collection.links;
        if (links && links.search && links.search[0] && links.search[0].href) {
            let service = new OpenSearchService(links.search[0].href)
            service.discover()
            .then(result => {
                console.log(result);
                this.props.connectCollection(result);
                this.props.selectCollection(collection);
            })
            .catch(err => console.log(err));
        } else {
            alert("No search link found, please select a different collection");
        }
    }
    render(){
        let collections;
        if (this.props.collectionsResult.features && this.props.collectionsResult.features.length > 0){
            collections = this.props.collectionsResult.features.map(collection => {
                    return (
                        <div className="sidebar-list-item collection" key = {collection.properties.identifier}
                            onClick = {this.handleClick.bind(this, collection)}>
                            <h4>{collection.properties.title}</h4>
                        </div>
                        );
                });
        }
        else {
            collections = (<h4>No collections found</h4>);
        }
        return (
            <div>
                <h3>Found collections</h3>
                {collections}
            </div>
        )
    }

}
