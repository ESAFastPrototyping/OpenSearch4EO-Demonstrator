import React from 'react';

const TabHeaders = ({tabs, select, selected}) => {
    let headers = tabs.map(tab => {
        return (
            <a data-for={tab.id} className={selected === tab.id ? "active" : ""}
               onClick={() => select(tab.id)} key={tab.id}>
                {tab.title}
            </a>
        );
    });

    return (
        <div className="sidebar-tabs">
            {headers}
        </div>
    )
}

export default TabHeaders;
