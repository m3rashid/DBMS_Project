import React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

import { SERVER_ROOT_URL, tokenConfig } from "../store/constants";
import Input from "../components/atoms/input";
import Button from "../components/atoms/Button";
import { ReceivedMessage, SentMessage } from "../components/chat/helpers";

const socket = io(`${SERVER_ROOT_URL}`);

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = React.useState("");
  const [allChats, setAllChats] = React.useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send-message", {
        userName: user.userName,
        userID: user.userID,
        message: message,
      });
    }
    setMessage("");
  };

  const getAllChats = React.useCallback(async () => {
    try {
      const res = await axios.post(
        `${SERVER_ROOT_URL}/chats/all`,
        JSON.stringify({}),
        tokenConfig()
      );
      const data = await res.data;
      setAllChats(data.chats);
    } catch (err) {
      console.log(err.message || "An error occured in getting all chats");
    }
  }, []);

  React.useEffect(() => {
    getAllChats();
    socket.emit("new-user-in-chat", {
      userName: user.userName,
      userID: user.userID,
    });
    return () => {
      socket.emit("user-left-the-chat", {
        userName: user.userName,
        userID: user.userID,
      });
    };
  }, []);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", (data) => {
      const newChat = allChats.find((chat) => chat.id === data.id);
      if (!newChat) {
        setAllChats((prev) => [...prev, data]);
      }
    });

    socket.on("user-joined-chat", (data) => {
      if (data.userName !== user.userName) {
        toast.info(`${data.userName} joined the chat`);
      }
    });

    socket.on("user-left-chat", (data) => {
      if (data.userName !== user.userName) {
        toast.info(`${data.userName} left the chat`);
      }
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-joined-chat");
      socket.off("user-left-chat");
    };
  });

  return (
    <>
      <div className="flex flex-col justify-between dark:text-gray-200 md:w-auto m-[10px] bg-gray-200 dark:bg-gray-800 rounded-md shadow-md pt-6">
        <div className="flex flex-col gap-4 h-[calc(100vh-250px)] md:h-[calc(100vh-180px)] overflow-auto hide-scrollbar px-2 md:px-4 pb-4">
          {allChats.map((chat) => {
            if (chat.userID === user.userID) {
              return <SentMessage key={chat.id} chat={chat} />;
            } else {
              return <ReceivedMessage key={chat.id} chat={chat} />;
            }
          })}
        </div>
        <div className="flex flex-row justify-between items-center pr-2 md:px-2">
          <Input
            type="text"
            name="message"
            value={message}
            className="p-1 w-full"
            placeholder="Type your message here"
            setValue={(e) => setMessage(e.target.value)}
          />
          <Button Icon={<FaTelegramPlane />} onClick={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default Chat;
