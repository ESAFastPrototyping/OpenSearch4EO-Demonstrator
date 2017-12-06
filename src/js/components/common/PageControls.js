import React from 'react';
import OpenSearchUtils from '../../WorldWind/ogc/openSearch/OpenSearchUtils';
import OpenSearchRequest from '../../WorldWind/ogc/openSearch/OpenSearchRequest';
import AtomParser from '../../WorldWind/ogc/openSearch/responseFormats/atomParser/OpenSearchAtomParser';

const PageControls = ({ currentResult, updateResult }) => {
    function navigate(url){
        if(!url){
            return;
        }
        let requestOptions = new OpenSearchRequest();
        requestOptions.url = url;
        requestOptions.method = 'GET';

        OpenSearchUtils.fetch(requestOptions)
        .then(result => {
            let parsedResult = AtomParser.parse(result, 'collection');
            updateResult(parsedResult);
        })
        .catch(err => console.log(err));
    }
    let links = currentResult.properties.links;
    let nextLink = links && links.next && links.next.href;
    let previousLink = links && links.previous && links.previous[0] && links.previous[0].href;
    let firstLink = links && links.first && links.first.href;
    let lastLink = links && links.last && links.last.href;

    return (
        <div className = "page-controls">
            <button className = "button-navigation" onClick = {() => navigate(firstLink)} disabled = {!firstLink}>First</button>
            <button className = "button-navigation" onClick = {() => navigate(previousLink)} disabled = {!previousLink}>Previous</button>
            <button className = "button-navigation" onClick = {() => navigate(nextLink)} disabled = {!nextLink}>Next</button>
            <button className = "button-navigation" onClick = {() => navigate(lastLink)} disabled = {!lastLink}>Last</button>
        </div>
    );
}

export default PageControls;
