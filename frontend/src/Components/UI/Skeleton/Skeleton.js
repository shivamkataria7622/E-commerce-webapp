import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, style }) => {
    return (
        <div
            className="skeleton-loader"
            style={{
                width,
                height,
                borderRadius,
                ...style,
            }}
        />
    );
};

export default Skeleton;
