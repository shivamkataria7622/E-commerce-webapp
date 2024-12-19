import React from 'react';
import './CollectionCont.css'
import Card1 from './Card/Card1.js'
function CollectionContainer() {
    return (
        <div className="collection-container">
            <Card1/>
            <Card1/>
            <Card1/>
            <Card1/>
        </div>
    );
}

export default CollectionContainer;
