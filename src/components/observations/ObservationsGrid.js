import React from 'react';
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../Store';
import { SET_ACTIVE_TASKID } from '../../reducers/GlobalStateReducer'
import { url } from '../Main'

export default function ObservationsGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.runId})
    }

    // generate the details link to forward to
    const getLink = (observation) => {
        let details_link = "/details/"+observation.runId
        return details_link
    }

    // generate the api link
    const getAPI = (observation) => {
        let api_link = url + '/' + observation.id.toString()
        return api_link
    }

    const columns = [
        {
            name: 'runId',
            selector: 'runId',
            sortable: true,
        },
        {
            name: 'Field',
            selector: 'target',
            sortable: true,
        },

        {
            name: 'Start Time',
            selector: 'startTime',
            sortable: true,
        },
        {
            name: 'End Time',
            selector: 'endTime',
            sortable: true,
        },
        {
            name: 'Target/Calibrator',
            selector: 'calibrator_target',
            sortable: true,
          },
        {
            name: 'Quality',
            selector: 'quality',
            sortable: true,
        },
        {
            name: 'Release',
            selector: 'release',
            sortable: true,
        },
        {
            cell: row =>
                <a href={getAPI(row)} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline-info" onClick={() => handleClick(row)}>API</Button>&nbsp;
                </a>,
            button: true,
        },
        {
            cell: row =>
                <Link to={() => getLink(row)}>
                    <Button variant="warning" onClick={() => handleClick(row)}>Details</Button>&nbsp;
                </Link>,

            button: true,
        },
    ];

    const myTheme = {
        title: {
            fontSize: '22px',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
        },
        contextMenu: {
            backgroundColor: '#E91E63',
            fontColor: '#FFFFFF',
        },
        header: {
            fontSize: '12px',
            fontColorActive: 'FFFFFF',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            borderColor: 'rgba(255, 255, 255, .12)',
        },
        rows: {
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            borderColor: 'rgba(255, 255, 255, .12)',
            hoverFontColor: 'black',
            hoverBackgroundColor: 'rgba(0, 0, 0, .24)',
        },
        cells: {
            cellPadding: '48px',
        },
        pagination: {
            fontSize: '13px',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            buttonFontColor: '#FFFFFF',
            buttonHoverBackground: 'rgba(255, 255, 255, .12)',
        },
        expander: {
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            expanderColor: '#FFFFFF',
        },
        footer: {
            separatorColor: 'rgba(255, 255, 255, .12)',
        },
    };

    const conditionalRowStyles = [
        {
            when: row => row.quality == 'great',
            style: {
                backgroundColor: 'green',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality == 'good',
            style: {
                backgroundColor: '#C0FFC0',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality == 'medium',
            style: {
                backgroundColor: 'lightgrey',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality == 'bad',
            style: {
                backgroundColor: '#ffddd3',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.quality == 'simulated',
            style: {
                backgroundColor: 'lightblue',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },

    ];

    // this creates an 'expand' icon in front of every row and shows additional information (images)
    const ExpandableComponent = ({ data }) => <div>
        <p>{data.description}</p>
        <img src={data.thumbnail} height={200} />;
        &nbsp;

    </div>;

    return (
        <div>
            <DataTable
                columns={columns}
                data={props.data}
                conditionalRowStyles={conditionalRowStyles}
                pagination
                //customTheme={myTheme}

                expandableRows
                expandableRowsComponent={<ExpandableComponent />}
            />
        </div>
    );
}