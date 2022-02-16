import React from "react";

const User = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commons = "bg-[white] p-2 rounded-md relative";

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <div className={`${commons}`}>
          <div className="w-full h-28 bg-gray-500 z-0 rounded-t-md flex items-start"></div>
          <div className="flex items-center justify-center relative -top-16">
            <img
              className="h-32 w-32 rounded-full"
              src={process.env.REACT_APP_IMG}
              alt=""
            />
          </div>
          {/* <div className="details">
            <p className="">@Username</p>
          </div> */}
        </div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
      </div>
    </>
  );
};

export default User;
