import React, { Component } from 'react';
import Search from './common/Search';
import PageControls from './common/PageControls';
import TabHeaders from './common/TabHeaders';
import FoundProducts from './FoundProducts';

export default class ProductSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: "collection-base"
        }
        this.select = this.select.bind(this);
    }
    select(id){
        this.setState({
            selected: id
        });
    }
    render(){
        let description = this.props.selectedCollection.properties && this.props.selectedCollection.properties.title;

        let tabs = [
            {id: "collection-base", title: "Collection"},
            {id: "collection-search", title: "Product Search"},
            {id: "collection-results", title: "Search results"}
        ];

        return (
            <div className="sidebar-block content active" id="collection-content">
                <TabHeaders tabs = {tabs} select = {this.select} selected = {this.state.selected} />

                <div className={"sidebar-tab " + (this.state.selected === "collection-base" ? "active": "")} id="collection-base">
                    <div className="sidebar-base-description">
                        <span className = "sidebar-header-content-name">Collection</span>
                        <span className = "sidebar-text">{description || "No description available"}</span>
                    </div>
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "collection-search" ? "active": "")} id="collection-search">
                    <Search searchService = {this.props.searchService}
                        updateResult = {this.props.updateResult}
                        relation = 'results'
                    />
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "collection-results" ? "active": "")} id="collection-results">
                    <FoundProducts productsResult = {this.props.productsResult}
                        selectProduct = {this.props.selectProduct}
                    />
                    {this.props.productsResult.properties && this.props.productsResult.properties.totalResults > 0 &&
                    <PageControls currentResult = {this.props.productsResult}
                        updateResult = {this.props.updateResult}
                    />
                    }
                </div>
            </div>
        )
    }
}
