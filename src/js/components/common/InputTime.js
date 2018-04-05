import React from 'react';
import moment from 'moment';
import RangeCalendar from 'rc-calendar';

const InputTime = (props) => {
    function changeMinutes(event){
        let newDate = moment(props.date).minute(event.target.value>59 ? 59 : event.target.value);
        // Keep
        props.changeDate(newDate);
    }

    function changeDate(){
        console.log(arguments);
    }

    return (
        <div className="eoos-property-timerange">
            {props.label}
            <div className="eoos-property-timerange-inputs">
                <RangeCalendar
                    onChange={changeDate}
                />
            </div>
        </div>
    );
}
export default InputTime;
