import React from "react";
import { FaHashtag } from "react-icons/fa";

import Button from "../atoms/Button";
import Input from "../atoms/input";
import useTopic from "../../hooks/useTopic";

const CreateTopic = () => {
  const {
    state: { topicName },
    createThisTopic,
    setTopicName,
  } = useTopic();

  return (
    <div className="rounded-lg dark:text-gray-200 border border-gray-200 dark:border-gray-600 mt-8 mb-12">
      <div className="flex items-center justify-center gap-2 p-2 pl-4">
        <label className="text-lg mr-4 font-bold" htmlFor="topicName">
          Create a Topic
        </label>
        <Input
          name="topicName"
          id="topicName"
          type="text"
          Icon={FaHashtag}
          placeholder="Enter topic name"
          value={topicName}
          setValue={(e) => setTopicName(e.target.value)}
        />
        <Button label="Create" onClick={createThisTopic} />
      </div>
    </div>
  );
};

export default CreateTopic;
