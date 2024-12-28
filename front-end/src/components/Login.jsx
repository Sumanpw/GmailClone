import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { setAuthUser } from "../redux/appSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!input.email || !input.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message || "Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      // Handle errors gracefully
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-screen mt-10">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 bg-white p-4 w-[20%] shadow-lg rounded-md"
      >
        <h1 className="font-bold text-2xl uppercase my-2 text-center">Login</h1>

        <input
          onChange={changeHandler}
          value={input.email}
          name="email"
          type="email"
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
          Login
        </button>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
