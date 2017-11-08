import React, { Component } from 'react';
import InputText from './InputText';
import InputArea from './InputArea';
import InputTime from './InputTime';
import InputSelector from './InputSelector';
import ContentBox from './ContentBox';
import moment from 'moment';

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

        this.changeText = this.changeText.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this);
        this.changeOrganisation = this.changeOrganisation.bind(this);
        this.search = this.search.bind(this);
    }
    changeText(text){
        this.setState({text: text});
    }
    changeStartDate(date){
        this.setState({startDate: date});
    }
    changeEndDate(date){
        this.setState({endDate: date});
    }
    changePlatform(platform){
        this.setState({platform: platform});
    }
    changeInstrument(instrument){
        this.setState({instrument: instrument});
    }
    changeOrganisation(organisation){
        this.setState({organisation: organisation});
    }
    search(){
        let service = this.props.searchService;
        let searchParams = [
            {name: 'query', value: this.state.text},
            {name: 'startDate', value: this.state.startDate.toISOString()},
            {name: 'endDate', value: this.state.endDate.toISOString()},
            {name: 'platform', value: this.state.platform},
            {name: 'instrument', value: this.state.instrument},
            {name: 'organisationName', value: this.state.organisation}
        ];
        service.search(searchParams, {relation: 'collection'})
        .then(result => {
            console.log(result);
            this.props.updateResult(result);
        })
        .catch(err => console.log(err));
    }
    render(){
        return (
            <div className="search-properties">
                <button onClick = {this.search} id = "collection-search-go">Search</button>
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
                    <InputSelector text = {this.state.platform} change = {this.changePlatform}/>
                </ContentBox>
                <ContentBox title = "Instrument">
                    <InputSelector text = {this.state.instrument} change = {this.changeInstrument}/>
                </ContentBox>
                <ContentBox title = "Organisation">
                    <InputSelector text = {this.state.organisation} change = {this.changeOrganisation}/>
                </ContentBox>
            </div>
        )
    }

}
