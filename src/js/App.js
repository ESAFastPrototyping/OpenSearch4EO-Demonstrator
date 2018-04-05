import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Connector from './components/Connector';
import CollectionSearch from './components/CollectionSearch';
import ProductSearch from './components/ProductSearch';
import moment from 'moment';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            searchService: {},
            collectionSearchService: {},
            collectionsResult: {},
            productsResult: {},
            selectedCollection: {},
            selectedProduct: {},
            worldWindow: {},
            productParams: {},
            collectionParams: {
              bbox: [],
              text: '',
              startDate: moment().subtract(1, 'years'),
              endDate: moment(),
              platform: '',
              instrument: '',
              organisationName: ''
            }
        }
        this.connect = this.connect.bind(this);
        this.connectCollection = this.connectCollection.bind(this);
        this.resetProvider = this.resetProvider.bind(this);
        this.resetCollection = this.resetCollection.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
        this.updateProducts = this.updateProducts.bind(this);
        this.selectCollection = this.selectCollection.bind(this);
        this.selectProduct = this.selectProduct.bind(this);
        this.setWorldWindow = this.setWorldWindow.bind(this);
        this.changeProductParams = this.changeProductParams.bind(this);
        this.changeCollectionParams = this.changeCollectionParams.bind(this);
    }
    
    changeProductParams(params) {
      let newParams = Object.assign({}, this.state.productParams, params);
      this.setState({productParams: newParams});
    }

    changeCollectionParams(params) {
      let newParams = Object.assign({}, this.state.collectionParams, params);
      this.setState({collectionParams: newParams});
    }

    connect(searchService){
        this.setState({searchService: searchService});
    }
    connectCollection(collectionSearchService){
        this.setState({collectionSearchService: collectionSearchService});
    }
    resetProvider(){
        this.setState({
            searchService: {},
            collectionSearchService: {},
            collectionsResult: {},
            productsResult: {},
            selectedCollection: {},
            selectedProduct: {}
        });
    }
    resetCollection(){
        this.setState({
            productsResult: {},
            collectionSearchService: {},
            selectedCollection: {},
            selectedProduct: {}
        });
    }
    updateCollections(result){
        this.setState({collectionsResult: result});
    }
    updateProducts(result){
        this.setState({productsResult: result});
    }
    selectCollection(collection){
        this.setState({selectedCollection: collection});
    }
    selectProduct(product){
        this.setState({selectedProduct: product});
    }
    setWorldWindow(wwd){
        this.setState({worldWindow: wwd});
    }
    createSidebarBody(){
        let body;
        //If there is a selected collection and we can search on it, show ProductSearch
        if (this.state.selectedCollection.id && this.state.collectionSearchService.descriptionDocument){
            body = <ProductSearch searchService = {this.state.collectionSearchService}
                        productsResult = {this.state.productsResult}
                        selectedCollection = {this.state.selectedCollection}
                        worldWindow = {this.state.worldWindow}
                        updateResult = {this.updateProducts}
                        selectProduct = {this.selectProduct}
                        searchParams = {this.state.productParams}
                        collectionSearchParams = {this.state.collectionParams}
                        changeParams = {this.changeProductParams}
                    />;
        }
        //If we can search on the provider, show CollectionSearch
        else if (this.state.searchService.descriptionDocument){
            body = <CollectionSearch searchService = {this.state.searchService}
                        collectionsResult = {this.state.collectionsResult}
                        worldWindow = {this.state.worldWindow}
                        updateResult = {this.updateCollections}
                        selectCollection = {this.selectCollection}
                        connectCollection = {this.connectCollection}
                        searchParams = {this.state.collectionParams}
                        changeParams = {this.changeCollectionParams}
                    />;
        }
        //Else show input for entering description document for a provider
        else {
            // TODO: Update to provide the
            body = <Connector connect = {this.connect}/>;
        }
        return body;
    }
    render(){
        console.log("collections", this.state.collectionsResult);
        console.log("products", this.state.productsResult);
        return (
            <div>
                <Map productsResult = {this.state.productsResult}
                    setWorldWindow = {this.setWorldWindow}
                />
                <Sidebar searchService = {this.state.searchService}
                    selectedCollection = {this.state.selectedCollection}
                    resetCollection = {this.resetCollection}
                    resetProvider = {this.resetProvider}
                >
                    {this.createSidebarBody()}
                </Sidebar>
            </div>
        );
    }
}
