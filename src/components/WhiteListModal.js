import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { setMerkleRootWL } from "../web3";

const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

const WhiteListModal = ({ onClose }) => {
  const { account } = useWeb3React();
  const [whitelist, setWhitelist] = useState([]);
  const addressInputRef = useRef(null);

  // useEffect(() => {
  //   axios.get("http://localhost:4000/whitelist").then((res) => {
  //     setWhitelist(
  //       res.data.map((item, index) => {
  //         return item.address;
  //       })
  //     );
  //   });
  // }, []);

  const addToWhitelist = () => {
    if (addressInputRef.current.value === "") {
      toast.warn("not address");
      return;
    }
    if (whitelist.includes(addressInputRef.current.value)) {
      toast.warn("that address is already on whitelist");
      return;
    } else {
      setWhitelist([...whitelist, addressInputRef.current.value]);
      addressInputRef.current.value = "";
    }
  };

  const removeFromWhitelist = (address) => {
    setWhitelist(whitelist.filter((list) => list !== address));
  };

  const onSetMerkleRootWL = () => {
    if (!whitelist) {
      toast.warn("invalid data");
      return;
    }

    const hashedAddresses = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(hashedAddresses, keccak256, {
      sortPairs: true,
    });
    const root = merkleTree.getHexRoot();
    const id = toast.loading("Transaction pending");

    setMerkleRootWL(root, account)
      .on("receipt", function (receipt) {
        // axios
        //   .post("http://localhost:4000/whitelist/update", whitelist)
        //   .then((res) => {
        //     console.log(res);
        //   });
        toast.update(id, {
          render: "Successfully Whitelist Changed",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
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
  return (
    <div className="component-white-list-modal">
      <div className="modal">
        <div className="close-btn" onClick={() => onClose()}>
          <RiCloseCircleFill />
        </div>
        <div className="add-field">
          <input ref={addressInputRef} />
          <button className="add-btn" onClick={() => addToWhitelist()}>
            <BsFillPlusCircleFill />
          </button>
        </div>
        <div className="content">
          {whitelist?.map((data, index) => (
            <div className="address-line" key={index}>
              <div className="address"> {data}</div>
              <div
                className="remove-btn"
                onClick={() => removeFromWhitelist(data)}
              >
                <AiFillMinusCircle />
              </div>
            </div>
          ))}
        </div>
        <button className="confirm-btn" onClick={() => onSetMerkleRootWL()}>
          {"Confirm"}
        </button>
      </div>
    </div>
  );
};

export default WhiteListModal;
