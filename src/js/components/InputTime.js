import React, { Component } from 'react';

export default class InputTime extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="eoos-property-timerange">
                {this.props.label}
                <div className="eoos-property-timerange-inputs">
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top"></a>
                        <input type="number" id="collection-timerange-from-year" min="2015" max="2017" defaultValue="2017" />
                        <a className="eoos-property-timerange-spinner bottom"></a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top"></a>
                        <input type="number" id="collection-timerange-from-month" min="1" max="12" defaultValue="5" />
                        <a className="eoos-property-timerange-spinner bottom"></a>
                    </div>
                    <span>-</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top"></a>
                        <input type="number" id="collection-timerange-from-day" min="1" max="31" defaultValue="16" />
                        <a className="eoos-property-timerange-spinner bottom"></a>
                    </div>

                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top"></a>
                        <input type="number" id="collection-timerange-from-hours" min="0" max="23" defaultValue="18" />
                        <a className="eoos-property-timerange-spinner bottom"></a>
                    </div>
                    <span>:</span>
                    <div className="eoos-property-timerange-input">
                        <a className="eoos-property-timerange-spinner top"></a>
                        <input type="number" id="collection-timerange-from-minutes" min="0" max="59" defaultValue="30" />
                        <a className="eoos-property-timerange-spinner bottom"></a>
                    </div>
                </div>
            </div>

        )
    }

}
