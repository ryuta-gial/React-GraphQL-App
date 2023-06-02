import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $birthDate: String!
    $gender: String!
    $phoneNumber: String!
  ) {
    createUser(
      name: $name
      birthDate: $birthDate
      gender: $gender
      phoneNumber: $phoneNumber
    ) {
      id
    }
  }
`;

const Confirmation = () => {
  const { user, setUser, setCompletionMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          name: user.name,
          birthDate: user.dateOfBirth.toISOString().split("T")[0],
          gender: user.gender,
          phoneNumber: user.phoneNumber,
        },
      });
      setCompletionMessage("登録が完了しました");
      setUser({
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
      });
      navigate("/complete");
    } catch (error) {
      setCompletionMessage("登録が失敗しました");
      console.error(error);
      navigate("/complete");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>確認画面</h1>
      <div>名前: {user.name}</div>
      <div>生年月日: {user.dateOfBirth.toISOString().split("T")[0]}</div>
      <div>性別: {user.gender}</div>
      <div>電話番号: {user.phoneNumber}</div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Confirmation;
