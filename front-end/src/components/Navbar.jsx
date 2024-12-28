import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [text, setText] = useState("");
  const { user } = useSelector((store) => store.app); // Get user from Redux store
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message); // Show success toast
        dispatch(setAuthUser(null)); // Clear user state in Redux
        setText(""); // Optionally clear search text
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during logout.");
    }
  };

  useEffect(() => {
    // Dispatch search text only when it's non-empty
    if (text.trim() !== "") {
      dispatch(setSearchText(text));
    }
  }, [text, dispatch]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <RxHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
            alt="Gmail logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>

      {user ? (
        <>
          <div className="w-[50%] mr-60">
            <div className="flex items-center bg-[#EAF1FB] px-2 py-2 rounded-full">
              <CiSearch size={"24px"} />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search Mail"
                className="rounded-full w-full bg-transparent outline-none px-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <IoIosSettings size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>
            <span onClick={logoutHandler} className="underline cursor-pointer">
              Logout
            </span>
            <Avatar
              src={user?.profilePhoto || "https://via.placeholder.com/150"}
              name={user?.name || "User"}
              size="40"
              round={true}
              alt="User Avatar"
            />
          </div>
        </>
      ) : (
        <div className="text-gray-500">Please log in.</div>
      )}
    </div>
  );
};

export default Navbar;
