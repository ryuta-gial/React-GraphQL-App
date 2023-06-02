import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "./UserContext";
const UserForm = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const validatePhoneNumber = (phoneNumber: string) => {
    // 09011112222
    const re = /^(?:\+81|0)\d{9,10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      alert("携帯電話のフォーマットではありません");
      return;
    }
    const user = {
      name,
      dateOfBirth,
      gender,
      phoneNumber,
    };

    setUser(user);
    navigate("/confirmation");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>入力</h1>
      <label>
        名前:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        生年月日:
        <DatePicker
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date as Date)}
        />
      </label>
      <br />
      <label>
        性別:
        <input
          type="radio"
          value="男性"
          name="gender"
          onChange={() => setGender("男性")}
        />{" "}
        男性
        <input
          type="radio"
          value="女性"
          name="gender"
          onChange={() => setGender("女性")}
        />{" "}
        女性
      </label>
      <br />
      <label>
        電話番号:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default UserForm;
