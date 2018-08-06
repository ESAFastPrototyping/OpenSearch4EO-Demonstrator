import React from 'react';
import SidebarHeader from './SidebarHeader';

const Sidebar = (props) => {
    return (
        <div id="sidebar">
            <SidebarHeader searchService={props.searchService}
                           selectedCollection={props.selectedCollection}
                           resetCollection={props.resetCollection}
                           resetProvider={props.resetProvider}
                           providerInfo={props.providerInfo}
                           collectionInfo={props.collectionInfo}
            />
            <div className="sidebar-block content active" id="eoos-content">
                {props.children}
            </div>
        </div>
    );
}

export default Sidebar;
