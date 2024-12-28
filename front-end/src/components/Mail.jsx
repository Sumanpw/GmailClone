import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdCropSquare,
  MdDeleteOutline,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Mail = () => {
  const navigate = useNavigate();
  const { selectedEmail } = useSelector((store) => store.app);
  const params = useParams(); // Params object

  const deleteHandler = async () => {
    try {
      // Correct API request URL using params.id
      const res = await axios.delete(
        `http://localhost:8080/api/v1/email/${params.id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/"); // Navigate back to the main page after deleting
    } catch (error) {
      console.log(error);
      toast.error("Error deleting email");
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <IoMdArrowBack size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <BiArchiveIn size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineReport size={"20px"} />
          </div>
          <div
            onClick={deleteHandler}
            className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
          >
            <MdDeleteOutline size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineMarkEmailUnread size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineWatchLater size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineAddTask size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <MdOutlineDriveFileMove size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <MdCropSquare size={"20"} />
          <GoTriangleDown size={"20px"} />
        </div>
      </div>

      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex justify-between bg-white items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedEmail?.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2 my-1">
              inbox
            </span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p>12 days ago</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className="my-10">{selectedEmail?.message}</div>
      </div>
    </div>
  );
};

export default Mail;
