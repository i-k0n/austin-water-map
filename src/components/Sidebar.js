import React from 'react';
import LocationList from './LocationList'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="heading">
                <h1>Locations</h1>
            </div>
            <LocationList />
        </div>
    )
}