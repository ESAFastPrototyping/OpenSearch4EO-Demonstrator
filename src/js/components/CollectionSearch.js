import React, { Component } from 'react';
import Search from './Search';
import FoundCollections from './FoundCollections';
import PageControls from './PageControls';

export default class CollectionSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "provider-base"
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id){
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
        return (
            <div className="sidebar-block content active" id="provider-content">
                <div className="sidebar-tabs">
                    <a data-for="provider-base" className={this.state.selected === "provider-base" ? "active": ""} onClick = {this.handleClick.bind(this, "provider-base")}>Provider</a>
                    <a data-for="provider-search" className={this.state.selected === "provider-search" ? "active": ""} onClick = {this.handleClick.bind(this, "provider-search")}>Collection search</a>
                    <a data-for="provider-results" className={this.state.selected === "provider-results" ? "active": ""} onClick = {this.handleClick.bind(this, "provider-results")}>Search results</a>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-base" ? "active": "")} id="provider-base">
                    <div className="sidebar-base-description">
                        <span className = "sidebar-header-content-name">{longName}</span>
                        <span className = "sidebar-text">{description}</span>
                    </div>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-search" ? "active": "")} id="provider-search">
                    <Search searchService = {this.props.searchService} updateResult = {this.props.updateResult} parentIdentifier = ""
                        relation = 'collection'/>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-results" ? "active": "")} id="provider-results">
                    <FoundCollections collectionsResult = {this.props.collectionsResult} selectCollection = {this.props.selectCollection}/>
                    {this.props.collectionsResult.properties &&
                    <PageControls currentResult = {this.props.collectionsResult} updateResult = {this.props.updateResult}/>
                    }
                </div>

            </div>
        )
    }

}
