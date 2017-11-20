import React, { Component } from 'react';

export default class SidebarHeader extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let dd = this.props.searchService.descriptionDocument;
        let collectionProperties = this.props.selectedCollection.properties;
        let shortName = dd ? dd.shortName : "";
        return (
            <div>
        		<div className={"sidebar-block header " + (dd ? "" : "active" )} id="eoos-header" onClick = {this.props.resetProvider}>
        			<span>EO OpenSearch</span>
        		</div>
                {dd &&
                    <div className="sidebar-block header" id="provider-header" onClick = {this.props.resetCollection}>
                        <span className="sidebar-header-name">Provider</span>
                        <a className="sidebar-header-change" onClick = {this.props.resetProvider}>change</a>
                        <span className="sidebar-header-content-name">{shortName}</span>
                    </div>
                }
                {collectionProperties &&
                    <div className="sidebar-block header" id="collection-header">
            			<span className="sidebar-header-name">Collection</span>
            			<a className="sidebar-header-change" onClick = {this.props.resetCollection}>change</a>
            			<div className="sidebar-header-content-name">{collectionProperties.identifier}</div>
            		</div>
                }
            </div>
        )
    }

}
