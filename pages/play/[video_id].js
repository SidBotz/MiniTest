import { useEffect, useState } from "react";
import axios from "axios";

export default function VideoPlayer({ video_id }) {
  const [streamLink, setStreamLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the stream link
    const fetchStream = async () => {
      try {
        const response = await axios.get(
          `http://139.59.115.28:8080/play/song/${video_id}`
        );
        setStreamLink(response.data.streamLink);
      } catch (err) {
        setError("Failed to fetch stream link");
        console.error(err);
      }
    };

    fetchStream();
  }, [video_id]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Video Player</h1>
      {error ? (
        <p>{error}</p>
      ) : streamLink ? (
        <video
          controls
          poster={`https://img.youtube.com/vi/${video_id}/hqdefault.jpg`}
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        >
          <source src={streamLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// Fetch the video_id from the URL
export async function getServerSideProps(context) {
  const { video_id } = context.params;
  return {
    props: { video_id },
  };
}
