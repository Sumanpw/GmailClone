import { IoMdStar } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5"; // Updated import
import { LuPencil } from "react-icons/lu";
import {
  MdInbox,
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../redux/appSlice";

const sidebarItems = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Inbox",
  },
  {
    icon: <IoMdStar size={"20px"} />,
    text: "Starred",
  },
  {
    icon: <IoTimeOutline size={"20px"} />, // Fixed Snoozed icon
    text: "Snoozed",
  },
  {
    icon: <TbSend2 size={"20px"} />,
    text: "Sent",
  },
  {
    icon: <MdOutlineDrafts size={"20px"} />,
    text: "Drafts",
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={"20px"} />,
    text: "More",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-[15%]">
      <div className="p-3">
        <button
          onClick={() => dispatch(setOpen(true))}
          className="flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md"
        >
          <LuPencil size={"24px"} />
          Compose
        </button>
      </div>

      <div className="text-gray-600">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center pl-6 py-2 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200"
          >
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
