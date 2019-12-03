
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import ObservationTiles from './ObservationTiles'
import ObservationsGrid from './ObservationsGrid'
import { useGlobalReducer } from '../../Store';
import StatusPanel from '../../components/StatusPanel';

export default function Observations(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()

    const loading = my_state.status === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderObservations

    if (my_state.status==='fetched') {
        renderObservations = <ObservationsGrid data = {my_state.fetched_observations} />
    } else
    if (my_state.status==='filtered') {
        renderObservations = <ObservationsGrid data = {my_state.filtered_observations} />
    }

    return (
        <div className="App">

                {loading ? <LoadingSpinner /> :
                    <Container fluid>

                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <div>
                                    {renderObservations}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
            <StatusPanel/>
        </div>
    );
}