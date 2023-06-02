import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const Confirmation = () => {
  const { user, completionMessage } = useContext(UserContext);

  return (
    <>
      <h1>完了画面</h1>
      <div>名前: {user.name}</div>
      <div>生年月日: {user.dateOfBirth.toISOString().split("T")[0]}</div>
      <div>性別: {user.gender}</div>
      <div>電話番号: {user.phoneNumber}</div>
      {completionMessage && <p>{completionMessage}</p>}
    </>
  );
};

export default Confirmation;
