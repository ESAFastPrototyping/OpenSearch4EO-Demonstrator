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
        this.state = {
            text: "",
            startDate: moment().subtract(1, 'years'),
            endDate: moment(),
            platform: "",
            instrument: "",
            organisation: ""
        };

        this.search = _.debounce(this.search.bind(this), 1000);
        this.changeText = this.changeText.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
        this.changeOrganisation = this.changeOrganisation.bind(this);
        this.getX = this.getX.bind(this);
        this.getPlatforms = this.getPlatforms.bind(this);
        this.getInstruments = this.getInstruments.bind(this);
        this.getOrganisations = this.getOrganisations.bind(this);
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
    changePlatform(platform){
        this.setState({platform: platform}, this.search);
    }
    changeInstrument(instrument){
        this.setState({instrument: instrument}, this.search);
    }
    changeOrganisation(organisation){
        this.setState({organisation: organisation}, this.search);
    }
    getPlatforms(){
        return this.getX('platform');
    }
    getInstruments(){
        return this.getX('instrument');
    }
    getOrganisations(){
        return this.getX('organisationName');
    }
    getX(name){
        let dd = this.props.searchService.descriptionDocument;
        if(dd){
            let atomUrl = dd.urls.find(url => url.type == 'application/atom+xml');
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
        else {
            return [];
        }
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
            {name: 'platform', value: this.state.platform},
            {name: 'instrument', value: this.state.instrument},
            {name: 'organisationName', value: this.state.organisation},
            {name: 'parentIdentifier', value: this.props.parentIdentifier}
        ];
        service.search(searchParams, {relation: this.props.relation})
        .then(result => {
            this.props.updateResult(result);
        })
        .catch(err => this.handleError(err));
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
    render(){
        return (
            <div className="search-properties">
                <ContentBox title = "Text">
                    <InputText text = {this.state.text} changeText = {this.changeText} />
                </ContentBox>
                <ContentBox title = "Search area">
                    <InputArea />
                </ContentBox>
                <ContentBox title = "Time range">
                    <InputTime label = "From" changeDate = {this.changeStartDate} date = {this.state.startDate}/>
                    <InputTime label = "To" changeDate = {this.changeEndDate} date = {this.state.endDate}/>
                </ContentBox>
                <ContentBox title = "Platform">
                    <InputSelector text = {this.state.platform} change = {this.changePlatform}
                        options = {this.getPlatforms()} listName = 'platform'/>
                </ContentBox>
                <ContentBox title = "Instrument">
                    <InputSelector text = {this.state.instrument} change = {this.changeInstrument}
                        options = {this.getInstruments()} listName = 'instrument'/>
                </ContentBox>l
                <ContentBox title = "Organisation">
                    <InputSelector text = {this.state.organisation} change = {this.changeOrganisation}
                    options = {this.getOrganisations()} listName = 'organisation'/>
                </ContentBox>
            </div>
        )
    }

}
