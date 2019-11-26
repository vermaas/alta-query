
import React, {useState }  from 'react';

import { Redirect } from "react-router-dom"
import {Card, Button } from 'react-bootstrap'
import Form from "react-jsonschema-form";
import LayoutField from "react-jsonschema-form-layout-grid"

import { get_base_url, get_alta_frontend_url } from '../../config'
import { useGlobalReducer } from '../../Store';
import { SET_ALTA_QUERY } from '../../reducers/GlobalStateReducer'
import QueryActivities from './QueryActivities'
import QueryObservations from './QueryObservations'

import { useFetch } from '../../hooks/useFetch';


export default function Query(props) {

    // react hooks
    const [query, setQuery] = useState("")
    const [redirect, setRedirect] = useState(false)

    // custom hooks
    const response = useFetch(get_base_url(), {})
    const [my_state, my_dispatch] = useGlobalReducer()

    const log = (type) => console.log.bind(console, type);

    const schema = {
        "title": "Search Observations",
        "type": "object",
        "properties": {
            "source": {type: "string", title: "Source"},
            "runId": {type: "string", title: "RunId"},
            "runId_start": {type: "string", title: "TaskID Start", default: ""},
            "runId_end": {type: "string", title: "TaskID End", default: ""},

            "starttime": {
                "type": "string",
                "format": "date-time",
                "title": "Start Time"
            },
            "endtime": {
                "type": "string",
                "format": "date-time",
                "title": "End Time"
            },

            "targets_only": {type: "boolean", title: "Targets Only?", default: true},
            "frontendQuery": {
                type: "boolean",
                title: "ALTA Frontend Query",
                default: true,
                "description": ""
            },
        }
    };

    const fields = {
        layout: LayoutField
    }

    const uiSchema = {
        "runId_start": {"ui:widget": {"color": "red"}},
    }

    function myObjectFieldTemplate({TitleField, properties, title, description}) {
        return (
            <div>
                <TitleField title={title}/>
                <div className="row">
                    {properties.map(prop => (
                        <div
                            className="col-lg-2 col-md-4 col-sm-6 col-xs-12"
                            key={prop.content.key}>
                            {prop.content}
                        </div>
                    ))}
                </div>
                {description}
            </div>
        );
    }

    // construct the query.
    // The query itself is similar for the frontend and backend.
    const constructQuery = (formData) => {
        let query = ""
        if (formData.source) {
            query = query + "&target__icontains=" + formData.source.trim()
        }

        if (formData.runId) {
            query = query + "&datasetID__icontains=" + formData.runId.trim()
        }

        if (formData.runId_start) {
            query = query + "&runId__gte=" + formData.runId_start
        }

        if (formData.runId_end) {
            query = query + "&runId__lte=" + formData.runId_end
        }

        // cut off the leading &
        query = query.substr(1)

        // dispatch the query as state to the global store
        my_dispatch({type: SET_ALTA_QUERY, alta_query: query})

        return query
    }

    // handle the submit and dispatch an action accordingly
    const queryALTABackend = (formData) => {
        // construct the query to the ALTA backend (REST API)
        let query = constructQuery(formData)

        // execute the useFetch hook with the new url
        let new_url = get_base_url() + '?' + query
        response.fetchData(new_url)

        // indicate that the query operation is finished and jump back to the obseration screen.
        setRedirect(true)
    }

    // handle the submit and dispatch an action accordingly
    const queryALTAFrontend = (formData) => {
        // construct the query to the ALTA frontend
        let query = constructQuery(formData)

        // redirect to ALTA by rudely leaving this application and forward to ALTA.
        let new_url = get_alta_frontend_url() + '/' + query
        window.location = new_url

    }

    // handle the submit and dispatch an action accordingly
    const handleSubmit = ({formData}, e) => {
        if (formData.frontendQuery) {
            queryALTAFrontend(formData)
        } else {
            queryALTABackend(formData)
        }
    }


    const handleError = ({errors}, e) => {
        alert(errors)
        //my_dispatch({type: SET_IMAGE_TYPE, image_type: imageType})
    }

    // if redirect is set (by the submit button) then redirect to the observation page to see the results
    let renderRedirect
    if (redirect) {
        renderRedirect = <Redirect to="/observations"/>
    }

    return (
        <div >
            {renderRedirect}
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