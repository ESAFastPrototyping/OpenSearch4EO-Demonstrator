import React, {Component} from 'react';
import OpenSearchService from '../WebWorldWind/ogc/openSearch/OpenSearchService';

export default class Connector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.connect = this.connect.bind(this);
        this.connectFedeo = this.connectFedeo.bind(this);
        this.connectGeoSpaceBel = this.connectGeoSpaceBel.bind(this);
        this.connectNasa = this.connectNasa.bind(this);
    }

    handleChange(event) {
        this.setState({url: event.target.value});
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.connect();
        }
    }

    handleClick() {
        this.connect();
    }

    connect() {
        this.connectUrl(this.state.url);
    }

    connectUrl(url, username, password) {
        let service = new OpenSearchService(url);
        service.discover({}, username || this.props.username, password || this.props.password)
            .then(result => {
                this.props.connect(result);
            })
            .catch(err => {
                if(err.toString().indexOf('401') !== -1) {
                    this.props.login(this.connectUrl.bind(this, url));
                } else {
                    console.error("Error: ", err);
                    alert("There was an issue with the provided link.\nTry again later or try a different provider.\n " +
                        "If you are a developer, try taking a look whether your browser provided some more information.\n " +
                        "Ignored CORS and wrong HTTPS certificate won't be shown as the XMLHTTPRequest doesn't provide this information.")
                }
            });

        this.setState({url: ""});
    }

    connectFedeo() {
        this.connectUrl('https://fedeo.esa.int/opensearch/description.xml');
    }

    connectGeoSpaceBel() {
        this.connectUrl('https://geo.spacebel.be/opensearch/description.xml');
    }

    connectNasa() {
        this.connectUrl('https://cmr.earthdata.nasa.gov/opensearch/collections/descriptor_document.xml?clientId=WebWorldWindDemo');
    }

    render() {
        return (
            <div>
                <div className="sidebar-connector">
                    <label htmlFor="provider-connector-url">
                        Address of the OpenSearch Description Document <br/>
                        (Collection Search)
                        <input type="url" id="provider-connector-url" value={this.state.url}
                               onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                        <div className="eoos-provider-go" onClick={this.handleClick}></div>
                    </label>
                </div>
                <div>
                    <h3>Saved providers</h3>
                    <div className="sidebar-list">

                        <div onClick={this.connectFedeo} className="sidebar-list-item provider">
                            <span>FEDEO</span>
                        </div>
                        <div onClick={this.connectGeoSpaceBel} className="sidebar-list-item provider">
                            <span>GEO Space Bel</span>
                        </div>
                        <div onClick={this.connectNasa} className="sidebar-list-item provider">
                            <span>NASA EarthData</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
