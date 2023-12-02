import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

const AuthContext = createContext({ user: null });

const AuthProvider = (props) => {
  // auth.getAuth();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, function (u) {
      if (u) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
