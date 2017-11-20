import React, { Component } from 'react';
import Connector from './Connector';
import SidebarHeader from './SidebarHeader';
import CollectionSearch from './CollectionSearch';
import ProductSearch from './ProductSearch';

export default class SideBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let body;
        if (this.props.selectedCollection.id && this.props.searchService.descriptionDocument){
            body = <ProductSearch selectedCollection = {this.props.selectedCollection} selectProduct = {this.props.selectProduct}
                updateResult = {this.props.updateProducts} searchService = {this.props.searchService}
                productsResult = {this.props.productsResult}/>;
        }
        else if (this.props.searchService.descriptionDocument){
            body = <CollectionSearch updateResult = {this.props.updateCollections} selectCollection = {this.props.selectCollection}
                searchService = {this.props.searchService} collectionsResult = {this.props.collectionsResult}/>;
        }
        else {
            body = <Connector connect = {this.props.connect}/>
        }
        return (
            <div id="sidebar">
                <SidebarHeader searchService = {this.props.searchService} resetProvider = {this.props.resetProvider}
                    resetCollection = {this.props.resetCollection} selectedCollection = {this.props.selectedCollection}/>

                <div className="sidebar-block content active" id="eoos-content">
                    {body}
                </div>
            </div>
        )
    }
}
