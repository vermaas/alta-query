

export default function filterObservations(searchText, fetched_observations, maxResults) {
    //alert("filterObservations("+searchText+")")

    return fetched_observations.filter((observation) => {
        if (observation.datasetID.toUpperCase().includes(searchText)) {

            return true;
        }
        if (observation.target.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.startTime.toString().includes(searchText)) {
            return true;
        }
        return false;
    }).slice(0, maxResults);
}
