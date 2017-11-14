import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {},
            collectionsResult: {},
            selectedCollection: {}
        }
        this.connect = this.connect.bind(this);
        this.resetService = this.resetService.bind(this);
        this.updateResult = this.updateResult.bind(this);
        this.selectCollection = this.selectCollection.bind(this);
    }
    connect(searchService){
        this.setState({searchService: searchService});
    }
    resetService(){
        this.setState({searchService: {}});
    }
    updateResult(result){
        this.setState({collectionsResult: result});
    }
    selectCollection(collection){
        this.setState({selectedCollection: collection});
    }
    render(){
        console.log(this.state.selectedCollection);
        return (
            <div>
                <Map collectionsResult = {this.state.collectionsResult}/>
                <Sidebar connect = {this.connect} resetService = {this.resetService}
                    updateResult = {this.updateResult} selectCollection = {this.selectCollection}
                    searchService = {this.state.searchService} collectionsResult = {this.state.collectionsResult}
                    selectedCollection = {this.state.selectedCollection}/>
            </div>
        );
    }
}
