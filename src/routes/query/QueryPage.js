
import React, {useState }  from 'react';

import {Card } from 'react-bootstrap'


import QueryActivities from './QueryActivities'
import QueryObservations from './QueryObservations'


export default function QueryPage(props) {

    return (
        <div >
            <Card className="card-query">
                <Card.Body>
                    <QueryObservations/>
                </Card.Body>
            </Card>
            <Card className="card-query">
                <Card.Body>
                    <QueryActivities/>
                </Card.Body>
            </Card>

        </div>
    );


}