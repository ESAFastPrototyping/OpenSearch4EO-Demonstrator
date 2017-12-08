import React, {Component} from 'react';
import Controls from '../MapControls/Controls';

export default class MapControls extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let controls = new Controls(this.props.wwd);
        controls.setupInteraction();
    }
    render(){
        return (
            <div className="control-group">

                <div id="map-controls">
                    <div className="zoom-control control">
                        <a id="zoom-plus-control"><i className="fa fa-plus"></i></a>
                        <a id="zoom-minus-control"><i className="fa fa-minus"></i></a>
                    </div>
                    <div className="rotate-control control">
                        <a id="rotate-right-control"><i className="fa fa-rotate-right"></i></a>
                        <a id="rotate-needle-control"><i className="fa fa-location-arrow"></i></a>
                        <a id="rotate-left-control"><i className="fa fa-rotate-left"></i></a>
                    </div>
                    <div className="tilt-control control">
                        <a id="tilt-more-control">
                            <svg version="1.1" id="icon-tilt-more" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="18px" height="18px" viewBox="0 0 511.625 511.627" enableBackground="new 0 0 511.625 511.627"
                            xmlSpace="preserve">
                                <g>
                                    <path d="M224.595,201.822h-93.576c-6.879,0-13.674,3.236-15.211,7.307l-24.902,66.025c-2.188,5.797,2.867,10.61,11.34,10.61
                                        h115.271c8.477,0,15.584-4.813,15.873-10.611l3.295-66.024C236.888,205.057,231.474,201.822,224.595,201.822z"/>
                                    <path d="M379.204,201.821l-93.574,0.001c-6.879,0-12.293,3.236-12.092,7.307l3.293,66.024c0.291,5.798,7.4,10.611,15.873,10.611
                                        h115.275c8.473,0,13.525-4.813,11.338-10.611l-24.902-66.024C392.879,205.057,386.081,201.821,379.204,201.821z"/>
                                    <path d="M419.61,319.696H295.565c-9.117,0-16.227,5.703-15.865,12.927l6.236,125.035c0.586,11.742,10.93,21.594,23.078,21.594
                                        h165.289c12.148,0,18.283-9.852,13.855-21.594l-47.164-125.035C438.272,325.398,428.727,319.696,419.61,319.696z"/>
                                    <path d="M214.657,319.696l-124.043,0.001c-9.121,0-18.662,5.702-21.387,12.926L22.065,457.657
                                        c-4.428,11.742,1.703,21.594,13.855,21.594h165.285c12.152,0,22.492-9.852,23.076-21.594l6.24-125.035
                                        C230.884,325.399,223.776,319.696,214.657,319.696z"/>
                                </g>
                            </svg>
                        </a>
                        <a id="tilt-less-control">
                            <svg version="1.1" id="icon-tilt-less" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="18px" height="18px" viewBox="0 0 511.625 511.627" enableBackground="new 0 0 511.625 511.627"
                            xmlSpace="preserve">
                                <g>
                                    <path d="M210.81,37.038H55.599c-11.047,0-20,8.954-20,20v155.211c0,11.046,8.953,20,20,20H210.81c11.045,0,20-8.954,20-20V57.038
                                        C230.81,45.992,221.854,37.038,210.81,37.038z"/>
                                    <path d="M454.127,37.038H298.917c-11.047,0-20,8.954-20,20v155.211c0,11.046,8.953,20,20,20h155.211c11.045,0,20-8.954,20-20
                                        V57.038C474.127,45.992,465.172,37.038,454.127,37.038z"/>
                                    <path d="M454.127,280.369H298.917c-11.047,0-20,8.954-20,20V455.58c0,11.046,8.953,20,20,20h155.211c11.045,0,20-8.954,20-20
                                        V300.369C474.127,289.323,465.172,280.369,454.127,280.369z"/>
                                    <path d="M210.81,280.369H55.599c-11.047,0-20,8.954-20,20V455.58c0,11.046,8.953,20,20,20H210.81c11.045,0,20-8.954,20-20V300.369
                                        C230.81,289.323,221.854,280.369,210.81,280.369z"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
