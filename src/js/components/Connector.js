import React, {Component} from 'react';
import OpenSearchService from '../WorldWind/ogc/openSearch/OpenSearchService';

export default class Connector extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleFedeo = this.handleFedeo.bind(this);
        this.handleGeoSpaceBel = this.handleGeoSpaceBel.bind(this);
        this.connect = this.connect.bind(this);
    }

    handleChange(event){
        this.setState({url: event.target.value});
    }
    handleKeyPress(event){
        if(event.key == 'Enter'){
            this.connect();
        }
    }
    handleClick(){
        this.connect();
    }

    handleFedeo() {
        this.connect('https://fedeo.esa.int/opensearch/description.xml');
    }

    handleGeoSpaceBel() {
        this.connect('http://geo.spacebel.be/opensearch/description.xml');
    }

    connect(url){
        let service = new OpenSearchService(url || this.state.url);
        service.discover()
        .then(result => {
            this.props.connect(result);
            console.log(result);
        })
        .catch(err => alert("There was an issue with the provided link.\nTry again later or try a different provider."));

        this.setState({url: ""});
    }

    render(){
        return (
            <div className="sidebar-connector">
                <label htmlFor="provider-connector-url">
                    Address of the OpenSearch Description Document <br/>
                    (Collection Search)
                    <input type="url" id="provider-connector-url" value = {this.state.url} onChange = {this.handleChange} onKeyPress = {this.handleKeyPress}/>
                    <div className="eoos-provider-go" onClick = {this.handleClick}></div>
                </label>
                <div className={'available-providers'} onClick={this.handleFedeo}>
                    Fedeo
                </div>
                <div className={'available-providers'} onClick={this.handleGeoSpaceBel}>
                    GeoSpaceBel
                </div>
            </div>
        )
    }
}
