import React from 'react';

const Product = ({product, showInfo, selected, selectProduct}) => {
    const selectedClass = selected ? 'selected eoos-result' : 'eoos-result';

    return (
        <div className={selectedClass} onClick={function(){
            selectProduct(product.properties);
        }}>
            <div className="eoos-result-properties">
                <div className="eoos-result-name-time">
                    <span className="eoos-result-name">{product.properties.title}</span>
                    <span className="eoos-result-time">{product.properties.updated}</span>
                </div>
            </div>
            <div className="eoos-result-controls">
                <div className="eoos-result-detail-button" title="Show details…"
                     onClick={() => showInfo(product)}></div>
            </div>
        </div>
    );
};

export default Product;
