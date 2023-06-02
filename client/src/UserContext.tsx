// UserContext.tsx
import React from "react";

interface User {
  name: string;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: string;
}

export const UserContext = React.createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  completionMessage: string;
  setCompletionMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  user: { name: "", dateOfBirth: new Date(), gender: "", phoneNumber: "" },
  setUser: () => {},
  completionMessage: "",
  setCompletionMessage: () => {},
});
