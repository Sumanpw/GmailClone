import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setEmails, setOpen } from "../redux/appSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const dispatch = useDispatch();
  const { open, emails } = useSelector((store) => store.app);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/email/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Corrected way of updating emails in Redux state
      dispatch(setEmails([...emails, res.data.email]));

      if (res.status === 200 || res.status === 201) {
        toast.success("Email sent successfully!");
        dispatch(setOpen(false)); // Close the modal after email is sent
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(error?.response?.data?.message || "Failed to send email.");
    }
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="flex items-center justify-between px-3 py-1 bg-[#F2F6FC]">
        <h1>New Message</h1>
        <div
          onClick={() => dispatch(setOpen(false))}
          className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
        >
          <RxCross2 size={"20px"} />
        </div>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col p-3 gap-2">
        <input
          value={formData.to}
          onChange={changeHandler}
          name="to"
          type="email"
          placeholder="To"
          className="outline-none py-1"
          required
        />
        <input
          value={formData.subject}
          onChange={changeHandler}
          name="subject"
          type="text"
          placeholder="Subject"
          className="outline-none py-1"
          required
        />
        <textarea
          value={formData.message}
          onChange={changeHandler}
          name="message"
          rows="10"
          cols="30"
          placeholder="Write your message..."
          className="outline-none py-1"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-700 rounded-full px-5 py-1 w-fit text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendEmail;
