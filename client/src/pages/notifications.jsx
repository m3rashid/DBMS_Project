import React from "react";

const notifs = [
  { name: "username", notif: "thisia kasdflkas dflkasdjf ladf" },
  { name: "user two", notif: "skjdhfkjalsd falksdfakl sdfjhkj " },
  { name: "user three", notif: "skjdhfkjalsd falksdfakl sdfjhkj " },
];

const Notifications = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4  md:w-auto m-[10px]">
        {notifs.map(({ name, notif }, index) => (
          <div
            key={index}
            className="bg-[white] p-2 md:px-4 rounded-md flex gap-4 w-full"
          >
            <div className="">
              <img
                className="h-16 w-16 rounded-full"
                src={process.env.REACT_APP_IMG}
                alt={name}
              />
            </div>
            <div className="">
              <div className="">{name}</div>
              <div className="">{notif}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
