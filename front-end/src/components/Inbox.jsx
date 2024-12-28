import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdOutlineLocalOffer, MdPeople } from "react-icons/md";
import { useState } from "react";
import Emails from "./Emails";

const mailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <MdOutlineLocalOffer size={"20px"} />,
    text: "Promotion",
  },
  {
    icon: <MdPeople size={"20px"} />,
    text: "Social",
  },
];

const Inbox = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      {/* Toolbar Section */}
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20"} />
            <GoTriangleDown size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"24px"} />
          <MdKeyboardArrowRight size={"24px"} />
        </div>
      </div>

      {/* Mail Type Tabs */}
      <div className="h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-1 p-4">
          {mailType.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`flex items-center gap-5 px-4 w-full py-2
                  ${
                    selected === index
                      ? "border-b-4 border-b-blue-600 text-blue-600"
                      : "border-b-4 border-transparent"
                  } hover:bg-gray-200`}
            >
              {item.icon}
              <span>{item.text}</span>
            </button>
          ))}
        </div>
        <Emails />
      </div>
    </div>
  );
};

export default Inbox;
