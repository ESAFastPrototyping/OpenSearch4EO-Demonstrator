import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Loader from './components/common/Loader';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {},
            collectionSearchService: {},
            collectionsResult: {},
            productsResult: {},
            selectedCollection: {},
            selectedProduct: {}
        }
        this.connect = this.connect.bind(this);
        this.connectCollection = this.connectCollection.bind(this);
        this.resetProvider = this.resetProvider.bind(this);
        this.resetCollection = this.resetCollection.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
        this.updateProducts = this.updateProducts.bind(this);
        this.selectCollection = this.selectCollection.bind(this);
        this.selectProduct = this.selectProduct.bind(this);
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
    render(){
        console.log("collections", this.state.collectionsResult);
        console.log("products", this.state.productsResult);
        return (
            <div>
                <Map productsResult = {this.state.productsResult}/>
                <Sidebar connect = {this.connect} connectCollection = {this.connectCollection}
                    collectionSearchService = {this.state.collectionSearchService}
                    resetProvider = {this.resetProvider} resetCollection = {this.resetCollection}
                    updateCollections = {this.updateCollections} updateProducts = {this.updateProducts}
                    selectCollection = {this.selectCollection} selectProduct = {this.selectProduct}
                    searchService = {this.state.searchService} collectionsResult = {this.state.collectionsResult}
                    productsResult = {this.state.productsResult} selectedCollection = {this.state.selectedCollection}/>
                <Loader />
            </div>
        );
    }
}
