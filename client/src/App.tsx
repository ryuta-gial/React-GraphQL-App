// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import UserForm from "./UserForm";
import Confirmation from "./Confirmation";
import Complete from "./Complete";
import { UserContext } from "./UserContext";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace this with the URI of your GraphQL server
  cache: new InMemoryCache(),
});

// App.tsx
function App() {
  const [user, setUser] = useState({
    name: "",
    dateOfBirth: new Date(),
    gender: "",
    phoneNumber: "",
  });
  const [completionMessage, setCompletionMessage] = useState("");

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider
        value={{ user, setUser, completionMessage, setCompletionMessage }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/complete" element={<Complete />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
