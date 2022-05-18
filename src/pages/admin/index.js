import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { toast, ToastContainer } from "react-toastify";
import {
  changeFee,
  changeMintLimit,
  getFeePerQuantity,
  getMintLimit,
  hasRoleAdmin,
} from "../../web3";
import WhiteListModal from "../../components/WhiteListModal";
import AdminNavBar from "../../components/AdminNavBar";

const Admin = () => {
  const { active, account, chainId } = useWeb3React();
  const [adminData, setAdminData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const feeInputRef = useRef(null);
  const mintLimitInputRef = useRef(null);

  const loadAdmin = async () => {
    if (active) {
      if (chainId !== "4") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      }
      const _fee = await getFeePerQuantity();
      const _mintLimit = await getMintLimit();
      const _isAdmin = await hasRoleAdmin(account);
      setIsAdmin(_isAdmin);

      setAdminData({
        feePerQuantity: Web3.utils.fromWei(_fee, "ether"),
        mintLimit: _mintLimit,
      });
    }
  };

  useEffect(() => {
    loadAdmin();
  }, [active]);

  const onConfirmChangeFee = () => {
    const id = toast.loading("Transaction pending");
    changeFee(Web3.utils.toWei(feeInputRef?.current.value), account)
      .on("receipt", function (receipt) {
        toast.update(id, {
          render: "Successfully Fee Changed",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        loadAdmin();
      })
      .on("error", function (error) {
        let errorMessage = "";
        if (error.code === 4001) {
          errorMessage =
            "MetaMask Tx Signature: User denied transaction signature.";
        }
        if (error.code === -32603) {
          errorMessage = "execution reverted: Ownable: caller is not the owner";
        }
        toast.update(id, {
          render: errorMessage || "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const onConfirmMintLimit = () => {
    const id = toast.loading("Transaction pending");
    changeMintLimit(mintLimitInputRef?.current.value, account)
      .on("receipt", function (receipt) {
        toast.update(id, {
          render: "Successfully Mint Limit Changed",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        loadAdmin();
      })
      .on("error", function (error) {
        let errorMessage = "";
        if (error.code === 4001) {
          errorMessage =
            "MetaMask Tx Signature: User denied transaction signature.";
        }
        if (error.code === -32603) {
          errorMessage = "execution reverted: Ownable: caller is not the owner";
        }
        toast.update(id, {
          render: errorMessage || "Error",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  const showModal = () => {
    setModalStatus(true);
  };

  return (
    <div className="page-admin">
      <AdminNavBar />
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
      {active ? (
        !!adminData ? (
          isAdmin ? (
            <div className="card">
              <div className="fee-input">
                <div className="label">{`Fee (${
                  adminData?.feePerQuantity || 0
                } ETH)`}</div>
                <div className="input-box">
                  <input ref={feeInputRef} />
                  <button onClick={onConfirmChangeFee}>{"Confirm"}</button>
                </div>
              </div>
              <div className="fee-input">
                <div className="label">{`Mint Limit (${
                  adminData?.mintLimit || 0
                })`}</div>
                <div className="input-box">
                  <input ref={mintLimitInputRef} />
                  <button onClick={onConfirmMintLimit}>{"Confirm"}</button>
                </div>
              </div>
              <div className="whitelist">
                <div className="label">{"Whitelisted address"}</div>
                <button onClick={showModal}>{"Add/remove address"}</button>
              </div>

              {modalStatus && (
                <WhiteListModal onClose={() => setModalStatus(false)} />
              )}
            </div>
          ) : (
            <div className="text">You are not admin</div>
          )
        ) : (
          <div className="text">Loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Admin;
