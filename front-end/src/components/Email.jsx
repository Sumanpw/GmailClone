import { MdCropSquare, MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSelectedEmail } from "../redux/appSlice";

const Email = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email._id}`);
  };

  return (
    <div
      onClick={openMail}
      className="flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          <MdCropSquare size={"20px"} />
        </div>
        <div className="text-gray-400">
          <MdOutlineStarBorder size={"20px"} />
        </div>
        <div>
          <h1 className="font-semibold truncate w-48">
            {email?.subject || "No Subject"}
          </h1>
        </div>
      </div>

      <div className="flex-1 ml-4 truncate w-64">
        <p>{email?.message || "No Message"}</p>
      </div>

      <div className="flex-none text-gray-500 text-sm">
        <p>{email?.createdAt || "No Date"}</p>
      </div>
    </div>
  );
};

// Prop Types validation
Email.propTypes = {
  email: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    subject: PropTypes.string,
    message: PropTypes.string,
    createdAt: PropTypes.string, // Updated from timestamp to createdAt
  }).isRequired,
};

export default Email;
