import { useSelector } from "react-redux";

const Setting = () => {
  const user = useSelector((store) => store?.user);

  return (
    <div>
      <img
        src={user?.avatar}
        alt="profile-pic"
        className="w-60 h-60 rounded-full"
      />
      <h1>{user?.fullName}</h1>
    </div>
  );
};

export default Setting;
