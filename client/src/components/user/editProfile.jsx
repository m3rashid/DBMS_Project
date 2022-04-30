import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "../atoms/collapse";
import Input from "../atoms/input";
import Select from "react-select";
import { SmallButton } from "./profile";
import { LabelContainer } from "./changePassword";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_ROOT_URL, tokenConfig } from "../../store/constants";
import moment from "moment";
import { updateProfile } from "../../store/actions/auth.action";

const genderOptions = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
  { value: "others", label: "others" },
];

const EditProfileDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    phNumber: user.phNumber || "",
    dob: moment(user.dob).format("YYYY-MM-DD") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = ({ value }, { name }) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdits = async () => {
    if (!profile.firstName || !profile.email || !profile.gender) {
      toast.warn("Insufficient data provided");
      return;
    }
    if (profile.dob === '') profile.dob = null;
    const t3 = toast.loading("Updating profile ... ");
    try {
      const body = JSON.stringify({ profile });
      await axios.post(
        `${SERVER_ROOT_URL}/user/update-profile`,
        body,
        tokenConfig()
      );
      dispatch(updateProfile(profile));
      toast.update(t3, {
        render: "Profile updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(t3, {
        render: "Error in updating profile, please try again later",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <Collapse title="Edit Profile">
      <div className="flex flex-col gap-2 w-full items-end py-3 px-1">
        <LabelContainer label="First Name: ">
          <Input
            type="text"
            className="p-[5px] w-full"
            name="firstName"
            value={profile.firstName}
            placeholder="First Name"
            setValue={handleChange}
          />
        </LabelContainer>
        <LabelContainer label="Last Name: ">
          <Input
            type="text"
            className="p-[5px] w-full"
            name="lastName"
            value={profile.lastName}
            placeholder="Last Name"
            setValue={handleChange}
          />
        </LabelContainer>
        <LabelContainer label="User Email: ">
          <Input
            type="text"
            className="p-[5px] w-full"
            name="email"
            value={profile.email}
            placeholder="User Email"
            setValue={handleChange}
          />
        </LabelContainer>
        <LabelContainer label="Mobile No: ">
          <Input
            type="number"
            className="p-[5px] w-full"
            name="phNumber"
            value={profile.phNumber}
            placeholder="Mobile Number"
            setValue={handleChange}
          />
        </LabelContainer>
        <LabelContainer label="Gender: ">
          <Select
            styles={{
              control: (base) => ({
                ...base,
                border: "none",
              }),
            }}
            className="w-full ml-[1.35rem]"
            classNamePrefix="bg-gray-200 dark:bg-gray-700 text-black dark:text-white outline-none"
            options={genderOptions}
            value={profile.gender}
            placeholder={profile.gender}
            onChange={handleSelectChange}
            name="gender"
          />
        </LabelContainer>
        <LabelContainer label="Birth Date: ">
          <Input
            type="date"
            className="p-[5px] w-full"
            name="dob"
            value={profile.dob}
            placeholder="Date of Birth"
            setValue={handleChange}
          />
        </LabelContainer>
        <div className="flex justify-end w-full">
          <SmallButton label="Save profile" onClick={submitEdits} />
        </div>
      </div>
    </Collapse>
  );
};

export default EditProfileDetails;
