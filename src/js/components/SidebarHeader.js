import React, { Component } from 'react';

export default class SidebarHeader extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.resetService();
    }
    render(){
        let dd = this.props.searchService.descriptionDocument;
        let shortName = dd ? dd.shortName : "";
        return (
            <div>
        		<div className={"sidebar-block header " + (dd ? "" : "active" )} id="eoos-header" onClick = {this.handleClick}>
        			<span>EO OpenSearch</span>
        		</div>
                {dd &&
                    <div className="sidebar-block header" id="provider-header">
                        <span className="sidebar-header-name">Provider</span>
                        <a className="sidebar-header-change" onClick = {this.handleClick}>change</a>
                        <span className="sidebar-header-content-name">{shortName}</span>
                    </div>
                }
            </div>
        )
    }

}
