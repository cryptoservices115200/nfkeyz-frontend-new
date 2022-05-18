import { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { Images_Src } from "../../config/images";

import {
  humanReadableAccount,
  connect,
  disconnect,
  getBalanceOf,
} from "../../web3";

const WelcomeSection = () => {

  const { active, account, activate, deactivate } = useWeb3React();

  const handleConnectWallet = () => {
    if (active) {
      disconnect(deactivate);
    } else {
      connect(activate);
    }
  };

  return (
    <div className="welcome-section">
      <div className="left">
        <div className="sup-title">{"WELCOME TO NFKEYZ"}</div>
        <Title>{"The Official NFT’s For The CroGram App."}</Title>
        <div className="flex mt-8 sm-wrap">
          <Button className="mr-4">{"View On Opensea"}</Button>
          {/* <Button gradient>{"Mint Now"}</Button> */}
          <button gradient
              className="connect-wallet-btn"
              onClick={handleConnectWallet}
            >
              {active ? humanReadableAccount(account) : "Connect Wallet"}
          </button>
        </div>
      </div>
      <div className="right">
        <img src={Images_Src.welcome} alt="key" />
      </div>
    </div>
  );
};

export default WelcomeSection;
