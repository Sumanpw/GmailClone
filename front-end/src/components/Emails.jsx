import { useSelector } from "react-redux";
import useGetAllEmails from "../hooks/useGetAllEmails";
import Email from "./Email";
import { useEffect, useState } from "react";

const Emails = () => {
  useGetAllEmails();
  const { emails, searchText } = useSelector((store) => store.app);

  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(() => {
    // If searchText is empty, reset filterEmail to show all emails
    if (searchText.trim() === "") {
      setFilterEmail(emails);
    } else {
      // Filter emails based on searchText
      const filteredEmail = emails.filter((email) => {
        return (
          email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
          email.to.toLowerCase().includes(searchText.toLowerCase()) ||
          email.message.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterEmail(filteredEmail);
    }
  }, [searchText, emails]);

  // Check if emails are available
  if (!emails || emails.length === 0) {
    return <div>No emails available</div>; // Show a message if no emails are found
  }

  return (
    <div>
      {filterEmail && filterEmail.length > 0 ? (
        filterEmail.map((email) => <Email key={email._id} email={email} />)
      ) : (
        <div>No emails match the search criteria</div>
      )}
    </div>
  );
};

export default Emails;
