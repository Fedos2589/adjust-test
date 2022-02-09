// Please implement your solution in this file

import { useCallback, useEffect, useMemo, useState } from "react";
import { prepareData } from "./task_1";

const API_URL = "https://api.spacexdata.com/v3/launches/past";
const NO_DATA_LABEL = "No data";
const LOADING_LABEL = "Loading...";
const ERROR_LABEL = "Ooooops, an error occured, please reload the page";

function useFetch(filterParams){
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(API_URL);
      const fetchedData = await response.json();

      setData(fetchedData)
    } catch(error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const preparedData = useMemo(() => prepareData(filterParams)(data), [filterParams, data])

  return { data: preparedData, error, loading }
}

export const RocketsList = ({ filterParams }) => {
  const { data, error, loading } = useFetch(filterParams);

  if (loading) {
    return LOADING_LABEL;
  }

  if (data?.length === 0) {
    return NO_DATA_LABEL;
  }

  if (error) {
    return ERROR_LABEL;
  }

  return <>
    {data?.map(
      ({ flight_number, mission_name, payloads_count }) =>
        <div key={flight_number}>{`#${flight_number} ${mission_name} (${payloads_count})`}</div>
      )
    }
  </>
}
