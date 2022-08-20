import { useEffect, useState } from "react";
import { apiAxios } from "../utilities/axios";
import { UseFetchApiShape } from "../utilities/interfaces";

export default function useFetch(
  method: string | any,
  url: string,
  category: string,
  tag: string,
  params: any
): UseFetchApiShape {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      setApiData([]);
      setError(true);

      await apiAxios({
        method: method,
        url: `/v1${url}${`?category=${category || "All"}`}&${`tags=${
          tag || "All"
        }`}`,
        params: {
          ...params,
        },
      })
        .then(({ data }) => {
          setLoading(false);
          setApiData(data.message);
          setError(false);
        })
        .catch((error) => {
          setLoading(false);
          setApiData([]);
          setError(true);
        });
    };

    handleFetch();

    // clean up
    return () => {
      return;
    };
  }, [method, url, category, tag, params]);

  return {
    loading,
    apiData,
    error,
  };
}
