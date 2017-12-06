import React, { Component } from 'react';
import Search from './common/Search';
import PageControls from './common/PageControls';
import TabHeaders from './common/TabHeaders';
import FoundCollections from './FoundCollections';

export default class CollectionSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "provider-base"
        }
        this.select = this.select.bind(this);
    }
    select(id){
        this.setState({
            selected: id
        });
    }
    render(){
        let description = "";
        let longName = "";
        if (this.props.searchService.descriptionDocument) {
            description =  this.props.searchService.descriptionDocument.description;
            longName =  this.props.searchService.descriptionDocument.longName;
        }

        let tabs = [
            {id: "provider-base", title: "Provider"},
            {id: "provider-search", title: "Collection Search"},
            {id: "provider-results", title: "Search results"}
        ];

        let defaultParams = this.props.collectionsResult.properties ?
            this.props.collectionsResult.searchParams : "";

        return (
            <div className="sidebar-block content active" id="provider-content">
                <TabHeaders tabs = {tabs} select = {this.select} selected = {this.state.selected} />

                <div className={"sidebar-tab " + (this.state.selected === "provider-base" ? "active": "")} id="provider-base">
                    <div className="sidebar-base-description">
                        <span className = "sidebar-header-content-name">{longName}</span>
                        <span className = "sidebar-text">{description}</span>
                    </div>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-search" ? "active": "")} id="provider-search">
                    <Search searchService = {this.props.searchService}
                        updateResult = {this.props.updateResult}
                        relation = 'collection'
                        defaultParams = {defaultParams}
                    />
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-results" ? "active": "")} id="provider-results">
                    <FoundCollections collectionsResult = {this.props.collectionsResult}
                        selectCollection = {this.props.selectCollection}
                        connectCollection = {this.props.connectCollection}
                    />
                    {this.props.collectionsResult.properties && this.props.collectionsResult.properties.totalResults > 0 &&
                    <PageControls currentResult = {this.props.collectionsResult}
                        updateResult = {this.props.updateResult}
                    />
                    }
                </div>
            </div>
        )
    }
}
