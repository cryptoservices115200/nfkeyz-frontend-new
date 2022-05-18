import { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { RiCloseCircleFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

const SignIn = ({ signInStatus, user, setUser, showConnectButton }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [error, setError] = useState(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const signIn = (ev) => {
    ev.preventDefault();
    setError(null);
    const auth = getAuth();
    const id = toast.loading("Authenticating");

    signInWithEmailAndPassword(
      auth,
      emailInputRef.current.value,
      passwordInputRef.current.value
    )
      .then((userCredential) => {
        toast.update(id, {
          render: "Success",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setUser(userCredential.user);
        showConnectButton();
        setModalStatus(signInStatus)
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("User doesn't exsit");
        }
        if (error.code === "auth/wrong-password") {
          setError("Wrong Password");
        }
        toast.update(id, {
          render: "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };
  return (
    <div className="component-signin">
      <ToastContainer
        className="text-white"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <button
        onClick={() => {
          setModalStatus(true);
        }}
        className="signin-btn"
        disabled={signInStatus}
      >
          {signInStatus ? user.email : 'Claim VIP Badge'}
      </button>
      {modalStatus && (
        <div className="modal">
          <form className="content" onSubmit={signIn}>
            <div className="close-btn">
              <RiCloseCircleFill onClick={() => setModalStatus(false)} />
            </div>
            <div className="title">
              {"Log in using your CroGram credentials."}
            </div>
            <div className="label">{"Email"}</div>
            <input
              type="email"
              required
              className="component-signin__modal__email"
              ref={emailInputRef}
            />
            <div className="label">{"Password"}</div>
            <input type="password" required ref={passwordInputRef} />
            <div className="error">{error}</div>
            <button type="submit">{"SignIn"}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
