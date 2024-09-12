import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const handleUpdateProfile = async (user, name) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: user.photoURL,
    })
      .then(() => {
        console.log("profile updated", user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // login with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const authInformation = {
    createUser,
    signIn,
    handleUpdateProfile,
    logOut,
    signInWithGoogle,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInformation}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
