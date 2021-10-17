import { useEffect } from "react";
import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { Views } from "@/lib/types";

type ViewCounterProps = {
  slug: string;
};

const ViewCounter: React.FC<ViewCounterProps> = ({ slug }) => {
  const { data } = useSWR<Views>(`/api/views?slug=${slug}`, fetcher);
  const views = Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views`, {
        body: JSON.stringify({ slug }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

    if (slug) {
      registerView();
    }
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : "–––"} views`}</span>;
};

export default ViewCounter;
