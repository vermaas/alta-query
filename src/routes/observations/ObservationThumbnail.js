import React from 'react';
import {Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useGlobalReducer } from '../../Store';
import { SET_ACTIVE_TASKID } from '../../reducers/GlobalStateReducer'


// display a single observation on a card
export default function ObservationThumbnail(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.taskID})
        //my_dispatch({type: SET_ACTIVE_OBSERVATION, observation: observation})
    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+props.observation.runId
        return details_link
    }

    let title = props.observation.runId
    let thumbnail=props.observation.thumbnail

    let my_status = ''
    if (props.observation.my_status!=='done') {
        my_status = ' ('+props.observation.my_status+')'
    }


    return (

        <Card className="card-img-top">
            <Card.Img variant top src={thumbnail}  />

            <Card.ImgOverlay>
                <h2>{title}</h2>
                   <Link to={() => getLink(props.observation)}>
                    <Button variant="outline-warning" onClick={() => handleClick(props.observation)}>Details</Button>&nbsp;
                </Link>

            </Card.ImgOverlay>

        </Card>

    );

}

