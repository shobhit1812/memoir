import { useSelector } from "react-redux";

const Setting = () => {
  const user = useSelector((store) => store?.user);

  return (
    <div className="flex flex-col justify-between items-center max-w-screen-xl mx-auto">
      <h1 className="text-4xl mb-4">Profile</h1>
      <img
        src={user?.avatar}
        alt="profile-pic"
        className="w-60 h-60 rounded-full mb-4"
      />
      <h1 className="text-2xl pb-2">{user?.fullName}</h1>
      <h1 className="text-xl">{user?.email}</h1>
    </div>
  );
};

export default Setting;
