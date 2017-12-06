import React from 'react';
import Connector from './Connector';
import SidebarHeader from './SidebarHeader';
import CollectionSearch from './CollectionSearch';
import ProductSearch from './ProductSearch';

const Sidebar = (props) => {
    let body;
    if (props.selectedCollection.id && props.collectionSearchService.descriptionDocument){
        body = <ProductSearch selectedCollection = {props.selectedCollection} selectProduct = {props.selectProduct}
            updateResult = {props.updateProducts} searchService = {props.collectionSearchService}
            productsResult = {props.productsResult}/>;
    }
    else if (props.searchService.descriptionDocument){
        body = <CollectionSearch updateResult = {props.updateCollections} selectCollection = {props.selectCollection}
            searchService = {props.searchService} collectionsResult = {props.collectionsResult}
            connectCollection = {props.connectCollection}/>;
    }
    else {
        body = <Connector connect = {props.connect}/>
    }
    return (
        <div id="sidebar">
            <SidebarHeader searchService = {props.searchService} resetProvider = {props.resetProvider}
                resetCollection = {props.resetCollection} selectedCollection = {props.selectedCollection}/>

            <div className="sidebar-block content active" id="eoos-content">
                {body}
            </div>
        </div>
    )
}

export default Sidebar;
