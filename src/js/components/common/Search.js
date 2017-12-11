import React, { Component } from 'react';
import InputText from './InputText';
import InputArea from './InputArea';
import InputTime from './InputTime';
import InputSelector from './InputSelector';
import ContentBox from './ContentBox';
import moment from 'moment';
import _ from 'underscore';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.selectors = [
            {parameter: "platform", title: "Platform"},
            {parameter: "instrument", title: "Instrument"},
            {parameter: "organisationName", title: "Organisation"}
        ];

        let defaultParams = this.props.defaultParams || {};

        this.state = {
            text: defaultParams.text || "",
            startDate: defaultParams.startDate || moment().subtract(1, 'years'),
            endDate: defaultParams.endDate || moment()
        };

        this.selectors.forEach(selector => {
            this.state[selector.parameter] = defaultParams[selector.parameter] || "";
        });

        this.search = _.debounce(this.search.bind(this), 1000);
        this.changeText = this.changeText.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeParameter = this.changeParameter.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.isInParameters = this.isInParameters.bind(this);
    }

    componentDidMount(){
        this.search();
    }

    changeText(text){
        this.setState({text: text}, this.search);
    }

    changeStartDate(date){
        this.setState({startDate: date}, this.search);
    }

    changeEndDate(date){
        this.setState({endDate: date}, this.search);
    }

    changeParameter(parameter, value){
        this.setState({[parameter]: value}, this.search);
    }

    getOptions(name){
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type == 'application/atom+xml' && url.relations[0] == this.props.relation);
        let parameter;
        if (atomUrl && atomUrl.parameters){
            parameter = atomUrl.parameters.find(parameter => parameter.name == name);
        }
        if (parameter){
            return parameter.options || [];
        }
        else {
            return [];
        }
    }

    isInParameters(parameter){
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type == 'application/atom+xml' && url.relations[0] == this.props.relation);
        let parameters = atomUrl ? atomUrl._paramsByName : {};
        return !!parameters[parameter];
    }

    search(){
        let service = this.props.searchService;
        //TODO: why is accepted date somehow different for collection and product search?
        let startDate = this.props.relation == "collection" ? moment(this.state.startDate).format("YYYY-MM-DD[T]HH:mm:ssZ") : moment(this.state.startDate).format("YYYY-MM-DD");
        let endDate = this.props.relation == "collection" ? moment(this.state.endDate).format("YYYY-MM-DD[T]HH:mm:ssZ") : moment(this.state.endDate).format("YYYY-MM-DD");

        let searchParams = [
            {name: 'query', value: this.state.text},
            {name: 'startDate', value: startDate},
            {name: 'endDate', value: endDate},
            {name: 'recordSchema', value: 'server-choice'}
        ];
        this.selectors.forEach(selector => {
            searchParams.push({name: selector.parameter, value: this.state[selector.parameter]});
        });

        searchParams = searchParams.filter((param) => this.isInParameters(param.name));

        this.props.startedSearchRequest();
        service.search(searchParams, {relation: this.props.relation})
        .then(result => {
            //keep the search parameters on the result object
            result.searchParams = this.state;
            this.props.updateResult(result);
            this.props.finishedSearchRequest();
        })
        .catch(err => {
            this.handleError(err);
            this.props.finishedSearchRequest();
        });
    }

    handleError(err){
        if(err.toString().indexOf('400') > -1){
            alert('400 Bad Request\nPlease try a different search');
        }
        else if(err.toString().indexOf('413') > -1){
            alert('413 Request Entity Too Large\nPlease narrow down the search');
        }
        else if(err.toString().indexOf('500') > -1){
            alert('500 Internal Server Error\nAn error occured on the server, try later');
        }
        else if(err.toString().indexOf('501') > -1){
            alert('501 Not Implemented\nAn error occured on the server');
        }
        else if(err.toString().indexOf('503') > -1){
            alert('503 Service Unavailable\nTemporarily unavailable, try again later');
        }
        else if(err.toString().indexOf('504') > -1){
            alert('504 Gateway Timeout\nUnavailable, try again later');
        }
        else {
            alert('An unknown error occured, sorry. Try later');
        }
    }

    createSelectorInputs(){
        return this.selectors.reduce((accumulator, selector) => {
            if (this.isInParameters(selector.parameter)) {
                return accumulator.concat(
                    <ContentBox title = {selector.title} key = {selector.title}>
                        <InputSelector text = {this.state[selector.parameter]}
                            change = {this.changeParameter}
                            options = {this.getOptions(selector.parameter)}
                            parameter = {selector.parameter}
                        />
                    </ContentBox>
                );
            }
            else {
                return accumulator;
            }
        }, []);
    }

    render(){
        return (
            <div className="search-properties">
                {this.isInParameters('query') &&
                <ContentBox title = "Text">
                    <InputText text = {this.state.text} changeText = {this.changeText} />
                </ContentBox> }

                {this.isInParameters('bbox') &&
                <ContentBox title = "Search area">
                    <InputArea wwd = {this.props.worldWindow}/>
                </ContentBox> }

                {this.isInParameters('startDate') && this.isInParameters('endDate') &&
                <ContentBox title = "Time range">
                    <InputTime label = "From" changeDate = {this.changeStartDate} date = {this.state.startDate}/>
                    <InputTime label = "To" changeDate = {this.changeEndDate} date = {this.state.endDate}/>
                </ContentBox> }

                {this.createSelectorInputs()}
            </div>
        )
    }

}
