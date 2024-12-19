import React from 'react';
import './CollectionCont.css'
import Card1 from './Card/Card1.js'
function CollectionContainer() {
    return (
        <div className="collection-container">
            <Card1 title="Tshirt"/>
            <Card1 title ="Jeans"/>
            <Card1 title=" Pajama"/>
            <Card1 title="Cargo"/>
        </div>
    );
}

export default CollectionContainer;
