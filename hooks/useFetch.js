import { useEffect, useState } from 'react'
import axios from 'axios'

// obtain you PapidApiKey in https://rapidapi.com/hub
const PapidApiKey = '';

const useFetch = (endpoint, query) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);


  // 接口数据来自于 Rapid API [JSearch]
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': PapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setErr(error);
      alert("There is an error !");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return { data, loading, err, fetchData }
}

export default useFetch;