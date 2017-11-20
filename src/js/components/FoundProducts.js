import React, { Component } from 'react';

export default class FoundProducts extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let products;
        if (this.props.productsResult.features && this.props.productsResult.features.length > 0){
            products = (<h4>Products here</h4>);
        }
        else {
            products = (<h4>No products found</h4>);
        }
        return (
            <div>
                <h3>Found products</h3>
                {products}
            </div>
        )
    }

}
