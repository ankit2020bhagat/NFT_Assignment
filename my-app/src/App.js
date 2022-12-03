import React, { useEffect, useState } from 'react';
import './style/App.css';

import { ethers } from 'ethers';
import contractAbi from './artifacts/contracts/MyNFT.sol/MyNFT.json'
const CONTRACT_ADDRESS = "0xC5Cd55f2306efe632fd3715709a61b39DE5A0B86";
let OPENSEA_LINK = '';
function App() {

  const [currentAccount, setAccount] = useState(null);
  const [imageUri, setimageUri] = useState(null);
  const [maxsupply, setmaxSupply] = useState(null);
  const [curator_fee, setCuratorFee] = useState(null);
  const [name, setName] = useState(null);
  const [symbol,setSymbol]= useState(null);
  const [Count, setCount] = useState(0);
 

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const checkifWalletisConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have a Metamask");
      return;
    }
    else {
      console.log("We have ethereum object ", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("found an Authorize account ", account);
      setAccount(account);
    }
    else {
      console.log("No authorize account ");
    }
  }
  async function setNFTAtribute() {
   
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const EpicNFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
   
    const tranasction_callmakeAnEpicNFT = await EpicNFTContract.setNFTAttribute(name,symbol,imageUri,maxsupply,curator_fee);
    console.log("Going to pop wallet now ti pay to gas");
    await tranasction_callmakeAnEpicNFT.wait();
    getDetails()
    

  }
  async function getDetails(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
   
    const EpicNFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, provider);
    const max_suply=await EpicNFTContract.maxSupply();
    console.log("Max_Supply:",max_suply.toString());
    const fee = await EpicNFTContract.curator_fee();
    console.log("Fee:",fee.toString());
    const imageUri = await EpicNFTContract.imageUri();
    console.log("Imaage Uri :",imageUri);
  }

  async function mintNFT() {
    let count=0;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const EpicNFTContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
    const tranasction_mintCharacterNFT = await EpicNFTContract.mintCharacterNFT({ value: ethers.utils.parseEther(curator_fee) });
    console.log("Minting...please wait")
    await tranasction_mintCharacterNFT.wait();

    console.log(`Mitned see the transaction at  https://goerli.etherscan.io/tx/${tranasction_mintCharacterNFT.hash}`)
          count += 1;
          setCount(count);
          OPENSEA_LINK = `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${count}`
          console.log(OPENSEA_LINK);
  }






  const renderNotConnectedContainer = () => (
     <button onClick={connectWallet} className="cta-button connect-wallet-button">
          connect to metamask
        </button> 
  );

  useEffect(() => {
    checkifWalletisConnected();


  }, [])



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          
          {!currentAccount && renderNotConnectedContainer()}
          <br/>
          <br/>
          <input
            type="text"
            value={name}
            placeholder='Enter Name of NFT'
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            value={symbol}
            placeholder='Enter  NFT symbol'
            onChange={e => setSymbol(e.target.value)}
          />
          <input
            type="text"
            value={imageUri}
            placeholder='Enter ipfs CID'
            onChange={e => setimageUri(e.target.value)}
          />


          <input
            type="text"
            value={maxsupply}
            placeholder='maxsupply'
            onChange={e => setmaxSupply(e.target.value)}
          />

          <input
            type="text"
            value={curator_fee}
            placeholder='Enter curator fee'
            onChange={e => setCuratorFee(e.target.value)}
          />
        

           <br/>
           <br/>

          <button onClick={setNFTAtribute} className="cta-button connect-wallet-button">
            set NFT Attribute
          </button>
          <br/>
          <br/>
          <button onClick={mintNFT} className="cta-button connect-wallet-button">
            Mint
          </button>





        </div>

        {/* <button onClick={connectWallet} className="cta-button connect-wallet-button">
          connect to metamask
        </button> */}

        
       
       
       
      </div>


    </div>
  );
}

export default App;
