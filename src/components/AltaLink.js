import React from 'react';
import {Button, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import alta_icon from '../assets/alta_icon.ico';



// show the description as a collapsing text
export default function AltaLink(props) {

    // only show the info button when there is a description
    let url_to_alta = "https://alta.astron.nl/science/details/"+props.observation.runId

    if (props.runId==='') {
        return null
    }

    return (
        <a href = {url_to_alta} target="_blank" rel="noopener noreferrer">
            <Button variant="outline-info">
                <img src={alta_icon} className="App-logo"  style={{width: 24, height:24}} alt="logo" />
                ALTA
            </Button>
        </a>
    );
}

