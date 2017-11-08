import React, { Component } from 'react';
import Connector from './Connector';
import SidebarHeader from './SidebarHeader';
import CollectionSearch from './CollectionSearch';

export default class SideBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="sidebar">
                <SidebarHeader searchService = {this.props.searchService} resetService = {this.props.resetService}/>

                <div className="sidebar-block content active" id="eoos-content">
                    {this.props.searchService.descriptionDocument ?
                        <CollectionSearch searchService = {this.props.searchService} updateResult = {this.props.updateResult}/>
                        :
                        <Connector connect = {this.props.connect}/>
                    }
                </div>
            </div>
        )
    }

}
