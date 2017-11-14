import React, { Component } from 'react';

export default class FoundCollections extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let collections;
        if (this.props.collectionsResult.features && this.props.collectionsResult.features.length > 0){
            collections  = this.props.collectionsResult.features.map(collection => {
                    return (
                        <div className="sidebar-list-item collection">
                            <h4>{collection.properties.title}</h4>
                        </div>
                        );
                });
        }
        else {
            collections = (
                <h4>No collections found</h4>
                );
        }
        console.log("Halabulu");
        return (
            <div>
                <h3>Found collections</h3>
                {collections}
            </div>
        )
    }

}