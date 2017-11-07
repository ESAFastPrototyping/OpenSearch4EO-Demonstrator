import React, { Component } from 'react';
import InputText from './InputText';
import InputArea from './InputArea';
import InputTime from './InputTime';
import InputSelector from './InputSelector';
import ContentBox from './ContentBox';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ""
        };
        this.changeText = this.changeText.bind(this);
        this.search = this.search.bind(this);
    }
    changeText(text){
        this.setState({text: text});
    }
    search(){
        let service = this.props.searchService;
        service.search([{name: 'query', value: this.state.text}], {relation: 'collection'})
        .then(result => {
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
                    <InputTime label = "From"/>
                    <InputTime label = "To"/>
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
