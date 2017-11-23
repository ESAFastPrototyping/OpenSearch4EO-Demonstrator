import React, { Component } from 'react';
import Search from './Search';
import FoundProducts from './FoundProducts';
import PageControls from './PageControls';

export default class ProductSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "collection-base"
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
        let parentIdentifier;
        let links = this.props.selectedCollection.links;
        if (links) {
            description =  this.props.selectedCollection.properties.title;
            if (links.search && links.search[0] && links.search[0].href) {
                let url = links.search[0].href;
                parentIdentifier = url.match(/parentIdentifier=(.*)/)[1];
            }
        }
        //TODO: what exactly do we do here when there is no parentId?
        if(!parentIdentifier){
            alert("No search link, select a different collection");
        }
        return (
            <div className="sidebar-block content active" id="collection-content">
                <div className="sidebar-tabs">
                    <a data-for="collection-base" className={this.state.selected === "collection-base" ? "active": ""} onClick = {this.handleClick.bind(this, "collection-base")}>Collection</a>
                    <a data-for="collection-search" className={this.state.selected === "collection-search" ? "active": ""} onClick = {this.handleClick.bind(this, "collection-search")}>Product search</a>
                    <a data-for="collection-results" className={this.state.selected === "collection-results" ? "active": ""} onClick = {this.handleClick.bind(this, "collection-results")}>Search results</a>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "collection-base" ? "active": "")} id="collection-base">
                    <div className="sidebar-base-description">
                        <span className = "sidebar-header-content-name">Collection</span>
                        <span className = "sidebar-text">{description}</span>
                    </div>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "collection-search" ? "active": "")} id="collection-search">
                    <Search searchService = {this.props.searchService} updateResult = {this.props.updateResult}
                        parentIdentifier = {parentIdentifier} relation = 'results'/>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "collection-results" ? "active": "")} id="collection-results">
                    <FoundProducts productsResult = {this.props.productsResult} selectProduct = {this.props.selectProduct} />
                    {this.props.productsResult.properties &&
                    <PageControls currentResult = {this.props.productsResult} updateResult = {this.props.updateResult}/>
                    }
                </div>

            </div>
        )
    }
}