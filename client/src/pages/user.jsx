import React from "react";

const User = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commons = "bg-[white] p-2 rounded-md";

  return (
    <>
      <div className="flex flex-col gap-2 p-2">
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
        <div className={`${commons}`}>name</div>
      </div>
    </>
  );
};

export default User;
