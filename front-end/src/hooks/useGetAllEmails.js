import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/email/getallemails",
          {
            withCredentials: true,
          }
        );
        // Dispatch the emails directly (replacing old emails)
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    };
    fetchEmails();
  }, [dispatch]); // Use dispatch as dependency, avoid using emails here
};

export default useGetAllEmails;
