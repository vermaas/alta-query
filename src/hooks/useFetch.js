import React, {useState, useEffect }  from 'react';
import { useGlobalReducer } from '../Store';
import { SET_FETCHED_OBSERVATIONS, SET_STATUS} from '../reducers/GlobalStateReducer';

export const useFetch = (url, options) => {
    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);

    const fetchData = async (url) => {
        try {
            // dispatch the status to the global state
            //alert('useFetch('+url+')')
            my_dispatch({type: SET_STATUS, status: 'fetching '+url})
            const res = await fetch(url, options);
            const json = await res.json();
            setResponse(json);
            // dispatch the fetched data and the status to the global state
            my_dispatch({type: SET_FETCHED_OBSERVATIONS, fetched_observations: json.results})
            my_dispatch({type: SET_STATUS, status: 'fetched'})
        } catch (error) {
            setError(error);
            my_dispatch({type: SET_STATUS, status: 'error'})
        }
    };
    React.useEffect(() => {
        if(options.onMount){
            fetchData(url);
        }
    }, []);
    return { response, error, fetchData };
};