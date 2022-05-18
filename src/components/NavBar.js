import { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { doc, setDoc } from "firebase/firestore";
import { Images_Src } from "../config/images";
import {
  humanReadableAccount,
  connect,
  disconnect,
  getBalanceOf,
} from "../web3";
import SocialIcons from "./SocialIcons";
import SignIn from "./SignIn";
import { db } from "../firebase";

const NavBar = ({ user, setUser }) => {
  const { active, account, activate, deactivate } = useWeb3React();
  const [hamburgerStatus, setHamburgerShow] = useState(false);
  const [signInStatus, setSingInStatus] = useState(false);
  const sidebarRef = useRef(null);

  const toggleVisible = () => {
    if (hamburgerStatus) {
      setHamburgerShow(false);
      sidebarRef.current.style.transform = "scaleY(0)";
    } else {
      setHamburgerShow(true);
      sidebarRef.current.style.transform = "scaleY(1)";
    }
  };

  const handleConnectWallet = () => {
    if (active) {
      disconnect(deactivate);
    } else {
      connect(activate);
    }
  };

  const showConnectButton = () => {
    setSingInStatus(true);
  };

  const addToFireStore = async () => {
    const _balance = await getBalanceOf(account);
    if (user && account) {
      setDoc(doc(db, "userbalance", user.uid), {
        email: user.email,
        account: account,
        balance: parseInt(_balance),
        userid: user.uid
      });
    }
  };

  useEffect(() => {
    if (active) {
      addToFireStore();
    }
  }, [active]);

  return (
    <div className="component-navbar">
      <div className="navigation">
        <div className="flex items-center">
          <div className="nav-logo">
            <img src={Images_Src.logo} alt="logo" />
          </div>
        </div>

        <div className="flex items-center">
          <SocialIcons />
          {/*{!signInStatus ? (*/}
          <SignIn
              signInStatus={signInStatus}
              user={user}
              setUser={(val) => setUser(val)}
              showConnectButton={() => showConnectButton()}
            />
          {/*) : (*/}
            {/* <button
              className="connect-wallet-btn"
              onClick={handleConnectWallet}
            >
              {active ? humanReadableAccount(account) : "Connect Wallet"}
            </button> */}
          {/*)}*/}
        </div>
        {/* <div
          className={"hamburger " + (hamburgerStatus && "active")}
          onClick={toggleVisible}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div> */}
      </div>

      <div className="sidebar" ref={sidebarRef} onClick={() => toggleVisible()}>
        <div>
          <SocialIcons />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
