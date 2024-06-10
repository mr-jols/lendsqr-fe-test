import { useEffect, useState } from "react";

export function useQuery<T>(url: string): [T | null, boolean, string | null] {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const json = await response.json();
          setData(json);
          setLoading(false);
        } catch (error) {
          setError("Something went wrong");
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return [data, isLoading, error];
  }