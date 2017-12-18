import React from 'react';
import moment from 'moment';

const InputTime = (props) => {

    function incrementYears(){
        let newDate = moment(props.date).add(1, 'years');
        props.changeDate(newDate);
    }
    function decrementYears(){
        let newDate = moment(props.date).subtract(1, 'years');
        props.changeDate(newDate);
    }
    function changeYears(event){
        let newDate = moment(props.date).year(event.target.value>2999 ? 2999 : event.target.value);
        props.changeDate(newDate);
    }

    function incrementMonths(){
        let newDate = moment(props.date).add(1, 'months');
        props.changeDate(newDate);
    }
    function decrementMonths(){
        let newDate = moment(props.date).subtract(1, 'months');
        props.changeDate(newDate);
    }
    function changeMonths(event){
        let val = event.target.value;
        const max = 12;
        val = val>max ? val % 10 - 1 : val - 1;
        val = val<0 ? 0 : val;
        let newDate = moment(props.date).month(val);
        props.changeDate(newDate);
    }

    function incrementDays(){
        let newDate = moment(props.date).add(1, 'days');
        props.changeDate(newDate);
    }
    function decrementDays(){
        let newDate = moment(props.date).subtract(1, 'days');
        props.changeDate(newDate);
    }
    function changeDays(event){
        let val = event.target.value;
        const max = moment(props.date).daysInMonth();
        val = val>max ? val % 10 : val;
        val = val<1 ? 1 : val;
        let newDate = moment(props.date).date(val);
        props.changeDate(newDate);
    }

    function incrementHours(){
        let newDate = moment(props.date).add(1, 'hours');
        props.changeDate(newDate);
    }
    function decrementHours(){
        let newDate = moment(props.date).subtract(1, 'hours');
        props.changeDate(newDate);
    }
    function changeHours(event){
        let newDate = moment(props.date).hour(event.target.value>23 ? 23 : event.target.value);
        props.changeDate(newDate);
    }

    function incrementMinutes(){
        let newDate = moment(props.date).add(1, 'minutes');
        props.changeDate(newDate);
    }
    function decrementMinutes(){
        let newDate = moment(props.date).subtract(1, 'minutes');
        props.changeDate(newDate);
    }
    function changeMinutes(event){
        let newDate = moment(props.date).minute(event.target.value>59 ? 59 : event.target.value);
        props.changeDate(newDate);
    }

    return (
        <div className="eoos-property-timerange">
            {props.label}
            <div className="eoos-property-timerange-inputs">
                <div className="eoos-property-timerange-input">
                    <a className="eoos-property-timerange-spinner top" onClick = {incrementYears}></a>
                    <input type="text" min="2015" max="2017" id = "timerange-year" value={moment(props.date).format('YYYY')} onChange = {changeYears} />
                    <a className="eoos-property-timerange-spinner bottom" onClick = {decrementYears}></a>
                </div>
                <span>-</span>
                <div className="eoos-property-timerange-input">
                    <a className="eoos-property-timerange-spinner top" onClick = {incrementMonths}></a>
                    <input type="text" min="1" max="12" value={moment(props.date).format('MM')} onChange = {changeMonths}/>
                    <a className="eoos-property-timerange-spinner bottom" onClick = {decrementMonths}></a>
                </div>
                <span>-</span>
                <div className="eoos-property-timerange-input">
                    <a className="eoos-property-timerange-spinner top" onClick = {incrementDays}></a>
                    <input type="text" min="1" max="31" value={moment(props.date).format('DD')} onChange = {changeDays}/>
                    <a className="eoos-property-timerange-spinner bottom" onClick = {decrementDays}></a>
                </div>
                <span></span>
                <div className="eoos-property-timerange-input">
                    <a className="eoos-property-timerange-spinner top" onClick = {incrementHours}></a>
                    <input type="text" min="0" max="23" value={moment(props.date).format('HH')} onChange = {changeHours}/>
                    <a className="eoos-property-timerange-spinner bottom" onClick = {decrementHours}></a>
                </div>
                <span>:</span>
                <div className="eoos-property-timerange-input">
                    <a className="eoos-property-timerange-spinner top" onClick = {incrementMinutes}></a>
                    <input type="text" min="0" max="59" value={moment(props.date).format('mm')} onChange = {changeMinutes}/>
                    <a className="eoos-property-timerange-spinner bottom" onClick = {decrementMinutes}></a>
                </div>
            </div>
        </div>
    );
}
export default InputTime;
