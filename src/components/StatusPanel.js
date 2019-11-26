import React from 'react';
import { Card } from 'react-bootstrap'

import { useGlobalReducer } from '../Store';

// show the description as a collapsing text
function StatusPanel(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let render_fetched
    if (my_state.fetched_observations) {
        render_fetched = my_state.fetched_observations.length
    }

    return (
        <div>
            <Card bg="dark" text="white" style={{ width: '50rem' }}>
                <Card.Header>Status</Card.Header>
                <Card.Body>
                    <ul>
                        <li>{process.env.NODE_ENV}</li>
                        <li>status = {my_state.status}</li>
                        <li>query = {my_state.alta_query}</li>
                        <li>fetched = {render_fetched} </li>
                    </ul>
                </Card.Body>
            </Card>
        </div>

    );
}

export default StatusPanel
