import {useWeb3React} from "@web3-react/core";
import axios from "axios";
import {useEffect, useState} from "react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import Web3 from "web3";
import {Images_Src} from "../../config/images";
import {
    getMintStep,
    getBalanceOf,
    getFeePerQuantity,
    getPresaleFeeQuantity,
    getMintLimit,
    getPresaleLimit,
    getPresaleMintLimit,
    getTotalSupply,
    mint,
    whiteListMint,
} from "../../web3";

const keccak256 = require("keccak256");
const {MerkleTree} = require("merkletreejs");

const MintSection = ({user}) => {
    const {active, account, chainId} = useWeb3React();
    const [quantity, setQuantity] = useState(1);
    const [mintStats, setMintStats] = useState(null);
    const [whitelist, setWhitelist] = useState([]);

    const handleMint = () => {
        if (active) {
            if (!mintStats) {
                return;
            }
            const id = toast.loading("Transaction pending");
            mint(account, parseInt(quantity), mintStats?.feePerQuantity)
                .on("receipt", function (receipt) {
                    toast.update(id, {
                        render: "Successfully Minted",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });

                    load();
                })
                .on("error", function (error) {
                    let errorMessage = "";
                    if (error.code === 4001) {
                        errorMessage =
                            "MetaMask Tx Signature: User denied transaction signature.";
                    }
                    if (error.code === -32603) {
                        errorMessage =
                            "execution reverted: Ownable: caller is not the owner";
                    }
                    toast.update(id, {
                        render: errorMessage || "Error",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                });
        }
    };

    const load = async () => {
        if (active) {
            if (chainId !== "1") {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: "0x1"}],
                });
            }

            const _mintStep = parseInt(await getMintStep());
            const _fee = _mintStep === 1 ? await getPresaleFeeQuantity() : await getFeePerQuantity();
            const _totalSupply = await getTotalSupply();
            const _balance = await getBalanceOf(account);
            const _mintLimit = _mintStep === 1 ? await getPresaleMintLimit() : await getMintLimit();

            setMintStats({
                mintStep: _mintStep,
                feePerQuantity: _fee,
                totalSupply: _totalSupply,
                balance: _balance,
                mintLimit: _mintLimit,
            });

            if (user && account) {
                setDoc(doc(db, "userbalance", user.uid), {
                    email: user.email,
                    account: account,
                    balance: parseInt(_balance),
                    userId: user.uid
                });
            }
        }
    };

    const handleWhiteListMint = async () => {
        if (active) {
            if (!mintStats) {
                return;
            }
            // const hashedAddresses = whitelist.map((addr) => keccak256(addr));
            // const merkleTree = new MerkleTree(hashedAddresses, keccak256, {
            //     sortPairs: true,
            // });
            // const hashedAddress = keccak256(account);
            // const proof = merkleTree.getHexProof(hashedAddress);
            // const res = await axios.get(`http://localhost:5000/api/getProof?address=${account}`)
            // const proof = res.data.hexProof;

            const id = toast.loading("Transaction pending");
            whiteListMint(
                account,
                parseInt(quantity),
                mintStats?.feePerQuantity
            )
                .on("receipt", function (receipt) {
                    toast.update(id, {
                        render: "You are on whitelist and successfully Minted",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    load();
                })
                .on("error", function (error) {
                    let errorMessage = "";
                    if (error.code === 4001) {
                        errorMessage =
                            "MetaMask Tx Signature: User denied transaction signature.";
                    }
                    if (error.code === -32603) {
                        errorMessage =
                            "execution reverted: Ownable: caller is not the owner";
                    }
                    toast.update(id, {
                        render: errorMessage || "Error",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                });
        }
    };

    useEffect(() => {
        load();
    }, [account, user]);

    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/whitelist").then((res) => {
    //         setWhitelist(
    //             res.data.addresses
    //         );
    //     });
    // }, []);

    if (active) {
        return (
            <div className="mint-section">
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
                <div className="image">
                    <img src={Images_Src.mint} alt="key"/>
                </div>
                <div className="right">
                    <div className="stats">
                        {`${mintStats?.totalSupply || 0}/${
                            mintStats?.mintLimit || 0
                        } minted`}
                    </div>
                    <div className="input">
                        <button
                            onClick={() => {
                                if (quantity <= 1) return;
                                setQuantity(quantity - 1);
                            }}
                            className="min-btn"
                        >
                            <FaMinus/>
                        </button>
                        <input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{color: 'white'}}
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="plus-btn"
                        >
                            <FaPlus/>
                        </button>
                    </div>
                    {mintStats && mintStats.mintStep === 2 && <button onClick={handleMint} className="mint-btn">
                        {`Mint(${
                            mintStats
                                ? Web3.utils.fromWei(
                                (mintStats.feePerQuantity * quantity).toString(),
                                "ether"
                                )
                                : 0
                        } ETH)`}
                    </button>}
                    {mintStats && mintStats.mintStep === 1 && <div>
                        <button onClick={handleWhiteListMint} className="mint-btn">
                            {"Presale mint"}
                            <br/>
                            {`(${
                                mintStats
                                    ? Web3.utils.fromWei(
                                    (mintStats.feePerQuantity * quantity).toString(),
                                    "ether"
                                    )
                                    : 0
                            } ETH)`}
                        </button>
                    </div>}
                    <div className="balance">
                        {`Your balance: ${mintStats?.balance || 0}`}
                    </div>
                </div>
            </div>
        );
    } else return <></>;
};


export default MintSection;
