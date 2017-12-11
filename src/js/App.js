import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {},
            collectionSearchService: {},
            collectionsResult: {},
            productsResult: {},
            selectedCollection: {},
            selectedProduct: {},
            worldWindow: {}
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
    render(){
        console.log("collections", this.state.collectionsResult);
        console.log("products", this.state.productsResult);
        return (
            <div>
                <Map productsResult = {this.state.productsResult}
                    setWorldWindow = {this.setWorldWindow}/>
                <Sidebar connect = {this.connect} connectCollection = {this.connectCollection}
                    collectionSearchService = {this.state.collectionSearchService}
                    resetProvider = {this.resetProvider} resetCollection = {this.resetCollection}
                    updateCollections = {this.updateCollections} updateProducts = {this.updateProducts}
                    selectCollection = {this.selectCollection} selectProduct = {this.selectProduct}
                    searchService = {this.state.searchService} collectionsResult = {this.state.collectionsResult}
                    productsResult = {this.state.productsResult} selectedCollection = {this.state.selectedCollection}
                    worldWindow = {this.state.worldWindow} />
            </div>
        );
    }
}
