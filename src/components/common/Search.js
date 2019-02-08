import React, {Component} from 'react';
import InputArea from './InputArea';
import InputTime from './InputTime';
import InputSelector from './InputSelector';
import ContentBox from './ContentBox';
import moment from 'moment';
import InputPassword from "./InputPassword";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.selectors = [
            {parameter: "platform", title: "Platform"},
            {parameter: "instrument", title: "Instrument"},
            {parameter: "organisationName", title: "Organisation"}
        ];

        this.state = {
            login: false
        };

        this.search = this.search.bind(this);
        this.changeBBox = this.changeBBox.bind(this);
        this.changeText = this.changeText.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeParameter = this.changeParameter.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.isInParameters = this.isInParameters.bind(this);
        this.login = this.login.bind(this);
    }

    login(username, password) {
        this.props.login(username, password);
        // Callback when the user actually provides the login information.

        this.setState({
            login: false
        });

        this.search();
    }

    changeBBox(bbox) {
        this.props.changeParams({bbox: bbox});
    }

    changeText(text) {
        this.props.changeParams({text: text});
    }

    changeStartDate(date) {
        this.props.changeParams({startDate: date});
    }

    changeEndDate(date) {
        this.props.changeParams({endDate: date});
    }

    changePassword(password) {
        this.props.changeParams({password: password});
    }

    changeParameter(parameter, value) {
        this.props.changeParams({[parameter]: value});
    }

    getOptions(name) {
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type === 'application/atom+xml' && url.relations[0] === this.props.relation);
        let parameter;
        if (atomUrl && atomUrl.parameters) {
            parameter = atomUrl.parameters.find(parameter => parameter.name === name);
        }
        if (parameter) {
            return parameter.options || [];
        }
        else {
            return [];
        }
    }

    isInParameters(parameter) {
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type === 'application/atom+xml' && url.relations[0] === this.props.relation);
        let parameters = atomUrl ? atomUrl._paramsByName : {};
        return !!parameters[parameter];
    }

    getParameterByName(parameter) {
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type === 'application/atom+xml' && url.relations[0] === this.props.relation);
        let parameters = atomUrl ? atomUrl._paramsByName : {};
        return parameters[parameter];
    }

    getAllParameters() {
        let atomUrl = this.props.searchService.descriptionDocument.urls.find(url => url.type === 'application/atom+xml' && url.relations[0] === this.props.relation);
        return atomUrl ? atomUrl._paramsByName : {};
    }

    search() {
        let service = this.props.searchService;

        let searchParams = [
            {name: 'startDate', value: moment(this.props.searchParams.startDate).format("YYYY-MM-DD[T]HH:mm:ss[Z]")},
            {name: 'endDate', value: moment(this.props.searchParams.endDate).format("YYYY-MM-DD[T]HH:mm:ss[Z]")}
        ];

        if(this.props.searchParams.bbox && this.props.searchParams.bbox.length > 0) {
           searchParams.push({name: 'bbox', value: this.props.searchParams.bbox.join(',')});
        }

        Object.keys(this.props.searchParams).forEach(parameterName => {
            if (['startDate', 'endDate', 'bbox'].indexOf(parameterName) !== -1) {
                return null;
            }

            if(this.props.searchParams[parameterName]) {
                searchParams.push({name: parameterName, value: this.props.searchParams[parameterName]});
            }
        });

        searchParams = searchParams.filter((param) => this.isInParameters(param.name));

        this.props.startedSearchRequest();
        service.search(searchParams, {relation: this.props.relation}, this.props.username, this.props.password)
            .then(result => {
                this.props.updateResult(result);
                this.props.finishedSearchRequest(result);
            })
            .catch(err => {
                this.props.finishedSearchRequest();
                if (err.toString().indexOf('403') > -1) {
                    this.props.login();
                } else {
                    this.handleError(err);
                }
            });
    }

    handleError(err) {
        if (err.toString().indexOf('400') > -1) {
            alert('400 Bad Request\nPlease try a different search');
        }
        else if (err.toString().indexOf('403') > -1) {
            alert('403 Forbidden\nEither you don\'t have access to the collection or you provided incorrect credentials.\n. Full text of Error: ' + err);
        }
        else if (err.toString().indexOf('413') > -1) {
            alert('413 Request Entity Too Large\nPlease narrow down the search');
        }
        else if (err.toString().indexOf('500') > -1) {
            alert('500 Internal Server Error\nAn error occured on the server, try later\n. Full text of Error: ' + err);
        }
        else if (err.toString().indexOf('501') > -1) {
            alert('501 Not Implemented\nAn error occured on the server');
        }
        else if (err.toString().indexOf('503') > -1) {
            alert('503 Service Unavailable\nTemporarily unavailable, try again later');
        }
        else if (err.toString().indexOf('504') > -1) {
            alert('504 Gateway Timeout\nUnavailable, try again later');
        }
        else {
            alert('An unknown error occured, sorry. Try later. ' + err.toString());
        }
    }

    createSelectorInputs() {
        const allParameters = this.getAllParameters();
        return Object.keys(allParameters).map(parameterName => {
            if (['startDate', 'endDate', 'startPage', 'startRecord', 'maximumRecords', 'bbox', 'geometry', 'lat', 'lon', 'radius'].indexOf(parameterName) !== -1) {
                return null;
            }

            const parameter = allParameters[parameterName];
            let title = parameter.name.replace(/([A-Z])/g, " $1");
            title = title.charAt(0).toUpperCase() + title.slice(1);

            if (parameter.name === 'bbox') {
                return (
                    <ContentBox title={title} info={parameter.title} key={parameter.name} required={parameter.required}>
                        <InputArea wwd={this.props.worldWindow} changeBBox={this.changeBBox}
                                   bbox={this.props.searchParams.bbox}/>
                    </ContentBox>
                );
            } else if(parameter.name === 'password') {
                return (
                    <ContentBox title={title} info={parameter.title} key={parameter.name} required={parameter.required}
                                minimum={parameter.minInclusive || parameter.minExclusive || null}
                                maximum={parameter.maxInclusive || parameter.maxExclusive || null}
                                pattern={parameter.pattern || null}>
                        <InputPassword text={this.props.searchParams[parameter.name]}
                                       changeText={this.changePassword}
                        />
                    </ContentBox>
                )
            } else {
                return (
                    <ContentBox title={title} info={parameter.title} key={parameter.name} required={parameter.required}
                                minimum={parameter.minInclusive || parameter.minExclusive || null}
                                maximum={parameter.maxInclusive || parameter.maxExclusive || null}
                                pattern={parameter.pattern || null}>
                        <InputSelector text={this.props.searchParams[parameter.name]}
                                       change={this.changeParameter}
                                       options={this.getOptions(parameter.name)}
                                       parameter={parameter.name}
                        />
                    </ContentBox>
                )
            }
        })
    }

    render() {
        const startDateParam = this.getParameterByName('startDate');
        const endDateParam = this.getParameterByName('endDate');

        return (
            <div className="search-properties">
                {this.isInParameters('startDate') &&
                <ContentBox title="Time range from:" info={startDateParam.title} key={startDateParam.name} required={startDateParam.required}
                            minimum={startDateParam.minInclusive || startDateParam.minExclusive || null}
                            maximum={startDateParam.maxInclusive || startDateParam.maxExclusive || null}
                            pattern={startDateParam.pattern || null}
                    >
                    <InputTime changeDate={this.changeStartDate} date={this.props.searchParams.startDate}
                               calendarClass="from"/>
                </ContentBox>}
                {this.isInParameters('endDate') &&
                <ContentBox title="Time range to:" info={endDateParam.title} key={endDateParam.name} required={endDateParam.required}
                            minimum={endDateParam.minInclusive || endDateParam.minExclusive || null}
                            maximum={endDateParam.maxInclusive || endDateParam.maxExclusive || null}
                            pattern={endDateParam.pattern || null}
                    >
                    <InputTime changeDate={this.changeEndDate} date={this.props.searchParams.endDate}
                               calendarClass="to"/>
                </ContentBox>}

                {this.createSelectorInputs()}

                <div>
                    <button onClick={this.search}>Search</button>
                </div>
            </div>
        )
    }

}
