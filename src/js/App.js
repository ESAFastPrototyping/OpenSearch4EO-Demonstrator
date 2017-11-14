import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {},
            collectionsResult: {},
            selectedCollection: {},
            productsResult: {}
        }
        this.connect = this.connect.bind(this);
        this.resetService = this.resetService.bind(this);
        this.updateCollections = this.updateCollections.bind(this);
        this.updateProducts = this.updateProducts.bind(this);
        this.selectCollection = this.selectCollection.bind(this);
    }
    connect(searchService){
        this.setState({searchService: searchService});
    }
    resetService(){
        this.setState({searchService: {}, selectedCollection: {}, collectionsResult: {}, productsResult: {}});
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
    render(){
        console.log("collections", this.state.collectionsResult);
        console.log("products", this.state.productsResult);
        return (
            <div>
                <Map productsResult = {this.state.productsResult}/>
                <Sidebar connect = {this.connect} resetService = {this.resetService}
                    updateCollections = {this.updateCollections} updateProducts = {this.updateProducts} selectCollection = {this.selectCollection}
                    searchService = {this.state.searchService} collectionsResult = {this.state.collectionsResult}
                    selectedCollection = {this.state.selectedCollection}/>
            </div>
        );
    }
}
