import { useState, useEffect } from "react";

import axios from "axios";

const useFetchData = (API) => {
  const [apiStatus, setApiStatus] = useState({});

  let cache;

  useEffect(() => {
    async function fetchApi() {
      try {
        if (cache) {
          setApiStatus(JSON.parse(cache));
        } else {
          const response = await axios.request(API);

          setApiStatus((state) => ({
            ...state,

            data: response.data
          }));
        }
      } catch (error) {
        setApiStatus((state) => ({
          ...state,

          error: error.message
        }));
      } finally {
        setApiStatus((state) => ({
          ...state,

          isLoading: !state.isLoading
        }));
      }
    }

    fetchApi();
  }, [API, cache]);

  const refetchData = async (newAPI) => {
    try {
      const response = await axios.request(newAPI);

      setApiStatus((state) => ({
        ...state,

        data: response.data
      }));
    } catch (error) {
      setApiStatus((state) => ({
        ...state,

        error: error.message
      }));
    } finally {
      setApiStatus((state) => ({
        ...state,

        isLoading: !state.isLoading
      }));
    }
  };

  // cache = sessionStorage.getItem(JSON.stringify(apiStatus));

  return { apiStatus, refetchData };
};

export default useFetchData;
