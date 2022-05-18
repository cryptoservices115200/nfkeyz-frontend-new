import {InjectedConnector} from "@web3-react/injected-connector";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const NFKeysContractAbi = require("./abi/NFKeysContractAbi.json");

// testnet rinkbey
const NFKeysContractAddress = "0xE6413d90e5d100C640fa1D88BA2BDF76E87B64F6";

// const NFKeysContractAddress = "0xAcAf3E313aDA728d77FF0F81eaeBAce006e04529";
// const SalesContractAddress = "0x223B710c14cB0c08bA5b50B45b45c73D67CE9d67";

const NFKeysContract = new web3.eth.Contract(
    NFKeysContractAbi,
    NFKeysContractAddress
);

const injected = new InjectedConnector({ supportedNetworks: [1, 4] });

const connect = async (activate) => {
    try {
        await activate(injected);
    } catch (error) {
        console.log(error);
    }
};

const disconnect = async (deactivate) => {
    try {
        deactivate();
    } catch (error) {
        console.log(error);
    }
};

const humanReadableAccount = (_account) => {
    return _account.slice(0, 6) + "..." + _account.slice(_account.length - 4);
};

const mint = (address, quantity, fee) => {
    return NFKeysContract.methods.mintPublic(quantity).send({
        from: address,
        value: quantity * fee,
    });
};

const whiteListMint = (address, quantity, fee) => {
    return NFKeysContract.methods.mintPresale(quantity).send({
        from: address,
        value: quantity * fee,
    });
};

const getBalanceOf = (address) => {
    return NFKeysContract.methods.balanceOf(address).call();
};

const getTotalSupply = () => {
    return NFKeysContract.methods.totalSupply().call();
};

const getMintStep = () => {
    return NFKeysContract.methods.mintStep().call();
}

const getFeePerQuantity = () => {
    return NFKeysContract.methods.mintPrice().call();
};

const getPresaleFeeQuantity = () => {
    return NFKeysContract.methods.presalePrice().call();
}

const getMintLimit = () => {
    return NFKeysContract.methods.mintLimit().call();
};

const getPresaleMintLimit = () => {
    return NFKeysContract.methods.presaleLimit().call();
}

const changeMintLimit = (mintLimit, address) => {
    return NFKeysContract.methods
        .changeMintLimit(mintLimit)
        .send({from: address});
};

const changeFee = (fee, address) => {
    return NFKeysContract.methods.changePublicMintPrice(fee).send({from: address});
};

const hasRoleAdmin = async (address) => {
    const _admin = await NFKeysContract.methods.ADMIN().call();
    return NFKeysContract.methods.hasRole(_admin, address).call();
};

const setMerkleRootWL = (root, address) => {
    return NFKeysContract.methods.setMerkleRootWL(root).send({from: address});
};

export {
    connect,
    disconnect,
    humanReadableAccount,
    mint,
    getMintStep,
    getFeePerQuantity,
    getPresaleFeeQuantity,
    getTotalSupply,
    getBalanceOf,
    getMintLimit,
    getPresaleMintLimit,
    hasRoleAdmin,
    changeMintLimit,
    changeFee,
    setMerkleRootWL,
    whiteListMint,
};
