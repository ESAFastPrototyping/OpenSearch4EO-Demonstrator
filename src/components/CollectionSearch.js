import React, {Component} from 'react';
import FoundCollections from './FoundCollections';
import Loader from './common/Loader';
import PageControls from './common/PageControls';
import Search from './common/Search';
import TabHeaders from './common/TabHeaders';

export default class CollectionSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "provider-search",
            activeSearchRequests: 0,
            amountOfResults: 0
        };
        this.select = this.select.bind(this);
        this.startedSearchRequest = this.startedSearchRequest.bind(this);
        this.finishedSearchRequest = this.finishedSearchRequest.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    select(id) {
        this.setState({
            selected: id
        });
    }

    startedSearchRequest() {
        if (this._isMounted) {
            this.setState({activeSearchRequests: this.state.activeSearchRequests + 1});
        }
    }

    finishedSearchRequest(result) {
        if (this._isMounted) {
            let totalResults = result && result.properties && result.properties.totalResults;
            this.setState({
                activeSearchRequests: this.state.activeSearchRequests - 1,
                amountOfResults: totalResults || 0
            });
            if(result) {
                this.select('provider-results');
            }
        }
    }

    render() {
        let searchResultsTitle = 'Search results (' + this.state.amountOfResults + ')';
        let tabs = [
            {id: "provider-search", title: "Collection Search"},
            {id: "provider-results", title: searchResultsTitle}
        ];

        return (
            <div className="sidebar-block content active" id="provider-content">
                <TabHeaders tabs={tabs} select={this.select} selected={this.state.selected}/>

                <div className={"sidebar-tab " + (this.state.selected === "provider-search" ? "active" : "")}
                     id="provider-search">
                    <Search searchService={this.props.searchService}
                            updateResult={this.props.updateResult}
                            relation='collection'
                            startedSearchRequest={this.startedSearchRequest}
                            finishedSearchRequest={this.finishedSearchRequest}
                            worldWindow={this.props.worldWindow}
                            searchParams={this.props.searchParams}
                            changeParams={this.props.changeParams}
                            username={this.props.username}
                            password={this.props.password}
                            login={this.props.login}
                    />
                    {this.state.activeSearchRequests > 0 && <Loader/>}
                </div>

                <div className={"sidebar-tab " + (this.state.selected === "provider-results" ? "active" : "")}
                     id="provider-results">
                    <FoundCollections collectionsResult={this.props.collectionsResult}
                                      selectCollection={this.props.selectCollection}
                                      connectCollection={this.props.connectCollection}
                    />
                    {this.props.collectionsResult.properties && this.props.collectionsResult.properties.totalResults > 0 &&
                    <PageControls currentResult={this.props.collectionsResult}
                                  updateResult={this.props.updateResult}
                                  startedSearchRequest={this.startedSearchRequest}
                                  finishedSearchRequest={this.finishedSearchRequest}
                                  username={this.props.username}
                                  password={this.props.password}
                    />
                    }
                    {this.state.activeSearchRequests > 0 && <Loader/>}
                </div>
            </div>
        )
    }
}
