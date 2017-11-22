import React, { Component } from 'react';
import moment from 'moment';

export default class InputTime extends Component {
    constructor(props){
        super(props);
        this.incrementYears = this.incrementYears.bind(this);
        this.decrementYears = this.decrementYears.bind(this);
        this.changeYears = this.changeYears.bind(this);
        this.incrementMonths = this.incrementMonths.bind(this);
        this.decrementMonths = this.decrementMonths.bind(this);
        this.changeMonths = this.changeMonths.bind(this);
        this.incrementDays = this.incrementDays.bind(this);
        this.decrementDays = this.decrementDays.bind(this);
        this.changeDays = this.changeDays.bind(this);
        this.incrementHours = this.incrementHours.bind(this);
        this.decrementHours = this.decrementHours.bind(this);
        this.changeHours = this.changeHours.bind(this);
        this.incrementMinutes = this.incrementMinutes.bind(this);
        this.decrementMinutes = this.decrementMinutes.bind(this);
        this.changeMinutes = this.changeMinutes.bind(this);
    }

    incrementYears(){
        let date = moment(this.props.date).add(1, 'years');
        this.props.changeDate(date);
    }
    decrementYears(){
        let date = moment(this.props.date).subtract(1, 'years');
        this.props.changeDate(date);
    }
    changeYears(event){
        let date = moment(this.props.date).year(event.target.value>2999 ? 2999 : event.target.value);
        this.props.changeDate(date);
    }
    incrementMonths(){
        let date = moment(this.props.date).add(1, 'months');
        this.props.changeDate(date);
    }
    decrementMonths(){
        let date = moment(this.props.date).subtract(1, 'months');
        this.props.changeDate(date);
    }
    changeMonths(event){
        let val = event.target.value;
        const max = 12;
        val = val>max ? val % 10 - 1 : val - 1;
        val = val<0 ? 0 : val;
        let date = moment(this.props.date).month(val);
        this.props.changeDate(date);
    }
    incrementDays(){
        let date = moment(this.props.date).add(1, 'days');
        this.props.changeDate(date);
    }
    decrementDays(){
        let date = moment(this.props.date).subtract(1, 'days');
        this.props.changeDate(date);
    }
    changeDays(event){
        let val = event.target.value;
        const max = moment(this.props.date).daysInMonth();
        val = val>max ? val % 10 : val;
        val = val<1 ? 1 : val;
        let date = moment(this.props.date).date(val);
        this.props.changeDate(date);
    }
    incrementHours(){
        let date = moment(this.props.date).add(1, 'hours');
        this.props.changeDate(date);
    }
    decrementHours(){
        let date = moment(this.props.date).subtract(1, 'hours');
        this.props.changeDate(date);
    }
    changeHours(event){
        let date = moment(this.props.date).hour(event.target.value>23 ? 23 : event.target.value);
        this.props.changeDate(date);
    }
    incrementMinutes(){
        let date = moment(this.props.date).add(1, 'minutes');
        this.props.changeDate(date);
    }
    decrementMinutes(){
        let date = moment(this.props.date).subtract(1, 'minutes');
        this.props.changeDate(date);
    }
    changeMinutes(event){
        let date = moment(this.props.date).minute(event.target.value>59 ? 59 : event.target.value);
        this.props.changeDate(date);
    }
    render(){
        return (
            <div className="eoos-property-timerange">
                {this.props.label}
                <div className="eoos-property-timerange-inputs">
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick = {this.incrementYears}></a>
                        <input type="number" min="2015" max="2017" id = "timerange-year" value={moment(this.props.date).format('YYYY')} onChange = {this.changeYears} />
                        <a className="eoos-property-timerange-spinner bottom" onClick = {this.decrementYears}></a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick = {this.incrementMonths}></a>
                        <input type="number" min="1" max="12" value={moment(this.props.date).format('MM')} onChange = {this.changeMonths}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick = {this.decrementMonths}></a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick = {this.incrementDays}></a>
                        <input type="number" min="1" max="31" value={moment(this.props.date).format('DD')} onChange = {this.changeDays}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick = {this.decrementDays}></a>
                    </div>

                    <span>    </span>

                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick = {this.incrementHours}></a>
                        <input type="number" min="0" max="23" value={moment(this.props.date).format('HH')} onChange = {this.changeHours}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick = {this.decrementHours}></a>
                    </div>
                    <span>:</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick = {this.incrementMinutes}></a>
                        <input type="number" min="0" max="59" value={moment(this.props.date).format('mm')} onChange = {this.changeMinutes}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick = {this.decrementMinutes}></a>
                    </div>
                </div>
            </div>
        )
    }
}
