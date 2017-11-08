import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {},
            currentResult : {}
        }
        this.connect = this.connect.bind(this);
        this.resetService = this.resetService.bind(this);
        this.updateResult = this.updateResult.bind(this);
    }
    connect(searchService){
        this.setState({searchService: searchService});
    }
    resetService(){
        this.setState({searchService: {}});
    }
    updateResult(result){
        this.setState({currentResult: result});
    }
    render(){
        return (
            <div>
                <Map currentResult = {this.state.currentResult}/>
                <Sidebar connect = {this.connect} searchService = {this.state.searchService}
                    resetService = {this.resetService} updateResult = {this.updateResult}/>
            </div>
        );
    }
}
