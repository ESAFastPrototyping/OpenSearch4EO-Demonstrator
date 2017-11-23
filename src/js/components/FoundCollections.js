import React, { Component } from 'react';

export default class FoundCollections extends Component {
    constructor(props){
        super(props);
    }
    handleClick(collection){
        let links = collection.links;
        let parentIdentifier;
        if (links && links.search && links.search[0] && links.search[0].href) {
                let url = links.search[0].href;
                parentIdentifier = url.match(/parentIdentifier=(.*)/)[1];
        }
        if(!parentIdentifier){
            alert("No search link, select a different collection");
        }
        else{
            this.props.selectCollection(collection);
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
