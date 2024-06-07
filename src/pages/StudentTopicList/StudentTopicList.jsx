import StudentTopicLink from "./StudentTopicLink";
import { useState, useEffect } from "react";
import { getTopics } from "../../models/Topic";
import "./StudentTopicList.css";
import * as React from "react";

export default function StudentTopicList() {
  const [topics, setTopics] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getTopics();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setTopics(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Topics not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Topics are loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>List of works</h1>
      <div className="line"></div>

      {topics.map((topic, index) => (
        <StudentTopicLink key={index} {...topic} />
      ))}
    </>
  );
}