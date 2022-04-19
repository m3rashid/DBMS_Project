import React from "react";
import Button from "../atoms/Button";
import { FaTrash, FaEdit, FaHashtag } from "react-icons/fa";
import Input from "../atoms/input";
const Dialog = ({ isDeleteDialog, title, content, onConfirm }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [topicName, setTopicName] = React.useState("");
  return (
    <>
      {isDeleteDialog ? (
        <Button
          Icon={<FaTrash />}
          label="Delete"
          classes="bg-red-500"
          onClick={() => setShowModal(true)}
        />
      ) : (
        <Button
          Icon={<FaEdit />}
          label="Edit"
          classes="bg-blue-500"
          onClick={() => setShowModal(true)}
        />
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold p-4">{title}</h3>
                  <button
                    className="text-black text-2xl font-bold p-4"
                    onClick={() => {
                      setShowModal(false);
                      setTopicName("");
                    }}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {content}
                  </p>
                  {!isDeleteDialog && (
                    <Input
                      className={"w-96 p-2 mx-4"}
                      name="topicName"
                      id="topicName"
                      type="text"
                      Icon={FaHashtag}
                      placeholder="Enter new topic name"
                      value={topicName}
                      setValue={(e) => setTopicName(e.target.value)}
                    />
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setTopicName("");
                    }}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);

                      isDeleteDialog ? onConfirm() : onConfirm(topicName);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default Dialog;
