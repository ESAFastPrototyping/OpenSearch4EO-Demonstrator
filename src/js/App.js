import React, {Component} from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchService: {}
        }
        this.connect = this.connect.bind(this);
        this.resetService = this.resetService.bind(this);
    }
    connect(searchService){
        this.setState({searchService: searchService});
    }
    resetService(){
        this.setState({searchService: {}});
    }
    render(){
        return (
            <div>
                <Map/>
                <Sidebar connect = {this.connect} searchService = {this.state.searchService} resetService = {this.resetService}/>

                    {/*
                	<div id="timeline" style="display: none">
                		<div id="timeline-results">
                			<div className="eoos-timeline-result" style="left:10.345%"></div>
                			<div className="eoos-timeline-result" style="left:11.45%"></div>
                			<div className="eoos-timeline-result" style="left:11.672%"></div>
                			<div className="eoos-timeline-result" style="left:12.345%"></div>
                			<div className="eoos-timeline-result" style="left:12.45%"></div>
                			<div className="eoos-timeline-result" style="left:12.672%"></div>
                			<div className="eoos-timeline-result" style="left:12.72%"></div>
                			<div className="eoos-timeline-result" style="left:13.02%"></div>
                			<div className="eoos-timeline-result" style="left:13.345%"></div>
                			<div className="eoos-timeline-result" style="left:14.45%"></div>
                			<div className="eoos-timeline-result" style="left:14.672%"></div>
                			<div className="eoos-timeline-result" style="left:14.72%"></div>
                			<div className="eoos-timeline-result" style="left:16.02%"></div>
                		</div>
                		<div id="timeline-timeline">
                			<div className="eoos-timeline-month" style="width:7%">2016/12</div>
                			<div className="eoos-timeline-month" style="width:20%;left:7%">2017/1</div>
                			<div className="eoos-timeline-month" style="width:20%;left:27%">2017/2</div>
                			<div className="eoos-timeline-month" style="width:20%;left:47%">2017/3</div>
                			<div className="eoos-timeline-month" style="width:20%;left:67%">2017/4</div>
                			<div className="eoos-timeline-month" style="width:13%;left:87%">2017/5</div>
                		</div>
                		<div id="timeline-interval" style="width:80%;left:10%">
                			<div className="eoos-timeline-handle"></div>
                			<div className="eoos-timeline-handle"></div>
                		</div>
                	</div>
                    */}

            </div>
        );
    }
}
