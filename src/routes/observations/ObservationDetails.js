import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../Store';
import { deg2HMS, deg2DMS} from '../../utils/astro'
import { getUrlESASky, getUrlSDSS, getUrlCDSPortal} from '../../utils/skyserver'

import DetailsThumbnail from '../../components/DetailsThumbnail'
import ImageCard from '../../components/ImageCard'
import AltaLink from '../../components/AltaLink'

import { url } from '../../components/Main'

export default function ObservationDetails(props) {

    // get the observation info from the global state.
    const [ my_state , my_dispatch] = useGlobalReducer()


    function findElement(arr, propName, propValue) {
        for (var i=0; i < arr.length; i++)
            if (arr[i][propName] === propValue)
                return arr[i];
    }

    if (my_state.status === 'unfetched') {
        return null
    }

    // find the current observation in the fetched observations by taskID
    let observation = findElement(my_state.fetched_observations,"runId",props.runId)

    // links to various datacenters
    let url_esa_sky = getUrlESASky(observation.RA,observation.dec,"J2000",observation.fov,"DSS2 color")
    let url_cds = getUrlCDSPortal(observation.RA,observation.dec)
    let url_alta = "https://alta.astron.nl/science/details/"+props.runId

    return (

        <div>
            <tr>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<td><h2>{observation.runId} </h2> </td></tr>
            <Container fluid>

                <Row>
                    <Col sm={3} md={3} lg={3}>

                        <Card>
                            <DetailsThumbnail key={observation.runId} observation = {observation} />
                        </Card>
                            <Card>
                            <Table striped bordered hover size="sm">
                                <tbody>
                                <tr>
                                    <td className="key">Target</td>
                                    <td className="value">{observation.target}</td>
                                </tr>
                                <tr>
                                    <td className="key">RA</td>
                                    <td className="value">{deg2HMS(observation.RA)}</td>
                                </tr>
                                <tr>
                                    <td className="key">dec</td>
                                    <td className="value">{deg2DMS(observation.dec)}</td>
                                </tr>
                                <tr>
                                    <td className="key">Start Time</td>
                                    <td className="value">{observation.startTime}</td>
                                </tr>
                                <tr>
                                    <td className="key">Duration</td>
                                    <td className="value">{observation.derived_duration}</td>
                                </tr>
                                <tr>
                                    <td className="key">Data Centers</td>
                                    <td className="value">
                                        <a href={url_esa_sky} target="_blank" rel="noopener noreferrer">ESA</a>&nbsp;
                                        <a href={url_cds} target="_blank" rel="noopener noreferrer">CDS</a>&nbsp;
                                        <a href={url_alta} target="_blank" rel="noopener noreferrer">ALTA</a>&nbsp;

                                    </td>
                                </tr>

                                </tbody>
                            </Table>

                        </Card>
                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <ImageCard key={observation.runId} observation = {observation} />
                        </Card>
                    </Col>

                </Row>

            </Container>

        </div>
    );
}