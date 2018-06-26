import React from 'react';

const SidebarHeader = ({searchService, resetProvider, resetCollection, selectedCollection}) => {
    let dd = searchService.descriptionDocument;
    let shortName = dd ? dd.shortName : "";
    return (
        <div>
            <div className={"sidebar-block header " + (dd ? "" : "active")} id="eoos-header" onClick={resetProvider}>
                <span>EO OpenSearch</span>
            </div>
            {dd &&
            <div className="sidebar-block header" id="provider-header" onClick={resetCollection}>
                <span className="sidebar-header-name">Provider</span>
                <a className="sidebar-header-change" onClick={resetProvider}>change</a>
                <span className="sidebar-header-content-name">{shortName}</span>
            </div>
            }
            {selectedCollection.properties &&
            <div className="sidebar-block header" id="collection-header">
                <span className="sidebar-header-name">Collection</span>
                <a className="sidebar-header-change" onClick={resetCollection}>change</a>
                <div className="sidebar-header-content-name">{selectedCollection.properties.identifier}</div>
            </div>
            }
        </div>
    )
}

export default SidebarHeader;
