import React from "react";

import Button from "../atoms/Button";
import Input from "../atoms/input";
import useCreateTopic from "../../hooks/useCreateTopic";

const CreateTopic = () => {
  const {
    state: { topicName },
    createThisTopic,
    setTopicName,
  } = useCreateTopic();

  return (
    <div className="rounded-lg dark:text-gray-200 border mt-8 mb-12">
      <div className="flex items-center justify-center gap-2 p-2">
        <label className="text-lg mr-4 font-bold" htmlFor="topicName">
          Create a Topic
        </label>
        <Input
          name="topicName"
          id="topicName"
          type="text"
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
