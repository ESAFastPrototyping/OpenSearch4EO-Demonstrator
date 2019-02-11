import React from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';

class InputTime extends React.Component {
    constructor(props) {
        super(props);

        this.incrementYears = this.incrementYears.bind(this);
        this.incrementDays = this.incrementDays.bind(this);
        this.incrementHours = this.incrementHours.bind(this);
        this.incrementMinutes = this.incrementMinutes.bind(this);
        this.incrementMonths = this.incrementMonths.bind(this);

        this.decrementDays = this.decrementDays.bind(this);
        this.decrementHours = this.decrementHours.bind(this);
        this.decrementMinutes = this.decrementMinutes.bind(this);
        this.decrementMonths = this.decrementMonths.bind(this);
        this.decrementYears = this.decrementYears.bind(this);

        this.changeDays = this.changeDays.bind(this);
        this.changeHours = this.changeHours.bind(this);
        this.changeMinutes = this.changeMinutes.bind(this);
        this.changeMonths = this.changeMonths.bind(this);
        this.changeYears = this.changeYears.bind(this);

        this.openCalendar = this.openCalendar.bind(this);
        this.changeFromCalendar = this.changeFromCalendar.bind(this);

        this.state = {
            calendar: false
        }
    }

    incrementYears() {
        let newDate = moment(this.props.date).add(1, 'years');
        this.props.changeDate(newDate);
    }

    decrementYears() {
        let newDate = moment(this.props.date).subtract(1, 'years');
        this.props.changeDate(newDate);
    }

    changeYears(event) {
        let newDate = moment(this.props.date).year(event.target.value > 2999 ? 2999 : event.target.value);
        this.props.changeDate(newDate);
    }

    incrementMonths() {
        let newDate = moment(this.props.date).add(1, 'months');
        this.props.changeDate(newDate);
    }

    decrementMonths() {
        let newDate = moment(this.props.date).subtract(1, 'months');
        this.props.changeDate(newDate);
    }

    changeMonths(event) {
        let val = event.target.value;
        const max = 12;
        val = val > max ? val % 10 - 1 : val - 1;
        val = val < 0 ? 0 : val;
        let newDate = moment(this.props.date).month(val);
        this.props.changeDate(newDate);
    }

    incrementDays() {
        let newDate = moment(this.props.date).add(1, 'days');
        this.props.changeDate(newDate);
    }

    decrementDays() {
        let newDate = moment(this.props.date).subtract(1, 'days');
        this.props.changeDate(newDate);
    }

    changeDays(event) {
        let val = event.target.value;
        const max = moment(this.props.date).daysInMonth();
        val = val > max ? val % 10 : val;
        val = val < 1 ? 1 : val;
        let newDate = moment(this.props.date).date(val);
        this.props.changeDate(newDate);
    }

    incrementHours() {
        let newDate = moment(this.props.date).add(1, 'hours');
        this.props.changeDate(newDate);
    }

    decrementHours() {
        let newDate = moment(this.props.date).subtract(1, 'hours');
        this.props.changeDate(newDate);
    }

    changeHours(event) {
        let newDate = moment(this.props.date).hour(event.target.value > 23 ? 23 : event.target.value);
        this.props.changeDate(newDate);
    }

    incrementMinutes() {
        let newDate = moment(this.props.date).add(1, 'minutes');
        this.props.changeDate(newDate);
    }

    decrementMinutes() {
        let newDate = moment(this.props.date).subtract(1, 'minutes');
        this.props.changeDate(newDate);
    }

    changeMinutes(event) {
        let newDate = moment(this.props.date).minute(event.target.value > 59 ? 59 : event.target.value);
        this.props.changeDate(newDate);
    }

    openCalendar() {
        this.setState({
            calendar: !this.state.calendar
        });
    }

    changeFromCalendar(time) {
        let currentTime = moment(time);
        currentTime.set('hour', moment(this.props.date).get('hour'));
        currentTime.set('minute', moment(this.props.date).get('minute'));
        this.props.changeDate(currentTime);
        this.setState({
            calendar: false
        });
    }

    render() {
        let calendar = '';
        if (this.state.calendar) {
            calendar = (<Calendar onChange={this.changeFromCalendar} value={new Date(this.props.date)}></Calendar>)
        }

        return (
            <div className="eoos-property-timerange">
                {this.props.label}
                <span className="calendar-opener" onClick={this.openCalendar}><i className="fa fa-calendar"
                                                                                 aria-hidden="true"></i></span>
                <span className={this.props.calendarClass}>
                    {calendar}
                </span>
                <div className="eoos-property-timerange-inputs">
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick={this.incrementYears}> </a>
                        <input type="text" min="2015" max="2017" className="timerange-year"
                               value={moment(this.props.date).format('YYYY')} onChange={this.changeYears}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick={this.decrementYears}> </a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick={this.incrementMonths}> </a>
                        <input type="text" min="1" max="12" value={moment(this.props.date).format('MM')}
                               onChange={this.changeMonths}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick={this.decrementMonths}> </a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick={this.incrementDays}> </a>
                        <input type="text" min="1" max="31" value={moment(this.props.date).format('DD')}
                               onChange={this.changeDays}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick={this.decrementDays}> </a>
                    </div>
                    <span> </span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick={this.incrementHours}> </a>
                        <input type="text" min="0" max="23" value={moment(this.props.date).format('HH')}
                               onChange={this.changeHours}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick={this.decrementHours}> </a>
                    </div>
                    <span>:</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top" onClick={this.incrementMinutes}> </a>
                        <input type="text" min="0" max="59" value={moment(this.props.date).format('mm')}
                               onChange={this.changeMinutes}/>
                        <a className="eoos-property-timerange-spinner bottom" onClick={this.decrementMinutes}> </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default InputTime;
