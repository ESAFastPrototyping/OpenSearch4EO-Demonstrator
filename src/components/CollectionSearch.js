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
            selected: "provider-base",
            activeSearchRequests: 0
        }
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

    finishedSearchRequest() {
        if (this._isMounted) {
            this.setState({activeSearchRequests: this.state.activeSearchRequests - 1});
        }
    }

    render() {
        let description = "";
        let longName = "";
        if (this.props.searchService.descriptionDocument) {
            description = this.props.searchService.descriptionDocument.description;
            longName = this.props.searchService.descriptionDocument.longName;
        }

        let tabs = [
            {id: "provider-base", title: "Provider"},
            {id: "provider-search", title: "Collection Search"},
            {id: "provider-results", title: "Search results"}
        ];

        return (
            <div className="sidebar-block content active" id="provider-content">
                <TabHeaders tabs={tabs} select={this.select} selected={this.state.selected}/>

                <div className={"sidebar-tab " + (this.state.selected === "provider-base" ? "active" : "")}
                     id="provider-base">
                    <div className="sidebar-base-description">
                        <span className="sidebar-header-content-name">{longName}</span>
                        <span className="sidebar-text">{description}</span>
                    </div>
                </div>

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
                    />
                    }
                    {this.state.activeSearchRequests > 0 && <Loader/>}
                </div>
            </div>
        )
    }
}
