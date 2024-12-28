import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!input.fullname || !input.email || !input.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      // Handle errors gracefully
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("User Allready exist with this email");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-screen mt-10">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 bg-white p-4 w-[20%] shadow-lg rounded-md"
      >
        <h1 className="font-bold text-2xl uppercase my-2 text-center">
          Signup
        </h1>

        <input
          onChange={changeHandler}
          value={input.fullname}
          type="text"
          name="fullname"
          placeholder="Full Name"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          onChange={changeHandler}
          value={input.email}
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          onChange={changeHandler}
          value={input.password}
          name="password"
          type="password"
          placeholder="Password"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <button
          type="submit"
          className="bg-gray-800 p-2 text-white my-2 rounded-md hover:bg-gray-700"
        >
          Signup
        </button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
