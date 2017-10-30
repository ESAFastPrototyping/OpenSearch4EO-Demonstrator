import React, { Component } from 'react';
import InputText from './InputText';
import InputArea from './InputArea';
import InputTimeRange from './InputTimeRange';
import InputSelector from './InputSelector';

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
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }
    render(){
        return (
            <div className="search-properties">
                <button onClick = {this.search}>Search</button>
                <InputText text = {this.state.text} changeText = {this.changeText} />
                <InputArea />
                <InputTimeRange />
                <InputSelector category = "platform"/>
                <InputSelector category = "instrument"/>
                <InputSelector category = "organization"/>
            </div>
        )
    }

}
