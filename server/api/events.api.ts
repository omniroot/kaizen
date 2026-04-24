import { useEffect, useState } from "react";
import type { AppEvent } from "~/server/utils/events.ts";

const API_URL = `${window.location.protocol}//${window.location.hostname}:3000/events`;

export const useAppEvents = () => {
  const [lastEvent, setLastEvent] = useState<AppEvent | null>(null);

  console.log({ lastEvent });

  useEffect(() => {
    const es = new EventSource(API_URL);
    const fetchData = async () => {
      // const res = await api.events.$get();
      // console.log(res.json());

      es.onmessage = (e) => {
        try {
          const data: AppEvent = JSON.parse(e.data);
          setLastEvent(data);
        } catch (err) {
          console.error("Failed to parse SSE", err);
        }
      };
    };
    fetchData();

    return () => es.close();
  }, []);

  return lastEvent;
};
