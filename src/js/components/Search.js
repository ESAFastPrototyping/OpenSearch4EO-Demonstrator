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
            endDate: moment()
        };

        this.changeText = this.changeText.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
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
    search(){
        let service = this.props.searchService;
        let searchParams = [
            {name: 'query', value: this.state.text},
            {name: 'startDate', value: this.state.startDate.toISOString()},
            {name: 'endDate', value: this.state.endDate.toISOString()}
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
                <button onClick = {this.search}>Search</button>
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
                    <InputSelector />
                </ContentBox>
                <ContentBox title = "Instrument">
                    <InputSelector />
                </ContentBox>
                <ContentBox title = "Organization">
                    <InputSelector/>
                </ContentBox>
            </div>
        )
    }

}
