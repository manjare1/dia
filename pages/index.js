import React, { useState, useEffect } from "react";
import Head from "next/head";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui"; 

const DIA_CONTRACT_ADDRESS = new PublicKey(
  "3LbZxMSmRe2mACnBMjsrng7U2FzgJh4hmUsa4w3bpump"
);
const MIN_DIA_BALANCE = 10000;

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task1Completed, setTask1Completed] = useState(false);
  const [postLink, setPostLink] = useState("");
  const [isDiaHolder, setIsDiaHolder] = useState(false);
  const [renderFlag, setRenderFlag] = useState(false); 
  const { publicKey, connected } = useWallet();
  const [xPostLink, setXPostLink] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0); 

  useEffect(() => {
    const checkDiaBalance = async () => {
      if (connected && publicKey) {
        const connection = new Connection(
          "https://mainnet.helius-rpc.com/?api-key=9c0e42d6-3a14-44d5-80f0-9fd3fc3c30f8"
        );
        try {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            { mint: DIA_CONTRACT_ADDRESS }
          );
          if (tokenAccounts.value.length > 0) {
            const balance =
              tokenAccounts.value[0].account.data.parsed.info.tokenAmount
                .uiAmount;
            setTokenBalance(balance); 
            const isHolder = balance >= MIN_DIA_BALANCE;
            setIsDiaHolder(isHolder);
            setRenderFlag((prev) => !prev); 
          } else {
            setIsDiaHolder(false);
            setRenderFlag((prev) => !prev); 
          }
        } catch (error) {
          setIsDiaHolder(false);
          setRenderFlag((prev) => !prev); 
        }
      } else {
      }
    };
    checkDiaBalance();
  }, [connected, publicKey]);

  const handleTask1Click = () => {
    setTask1Completed(true);
    window.open(
      "https://twitter.com/intent/tweet?text=Agent%20X%20reporting%20for%20Duty.%20%23DIA",
      "_blank"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "1",
          xPostLink,
          walletAddress: publicKey.toString(),
          tokenBalance,
        }),
      });
      if (response.ok) {
        alert("Task data submitted successfully!");
        setIsModalOpen(false);
      } else {
        alert("Failed to submit task data.");
      }
    } catch (error) {
      console.error("Error submitting task data:", error);
    }
  };

  return (
    <WalletModalProvider>
      <Head>
        <title>Decentral Intelligence Agency (DIA)</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{`
            @font-face {
              font-family: 'Elegant Typewriter';
              src: url('/eletwr.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }
    
            body {
              font-family: 'Elegant Typewriter', sans-serif;
              background-color: #ede461; /* Set the background color site-wide */
            }
    
            .scribbly-button {
              position: relative;
              display: inline-block;
              padding: 10px 20px;
              font-size: 18px;
              color: #1d4ed8;
              background: none;
              border: none;
              cursor: pointer;
              transition: all 0.3s ease;
            }
    
            .scribbly-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border: 2px solid #1d4ed8;
              border-radius: 5px;
              opacity: 0.7;
            }
    
            .scribbly-button::after {
              content: '';
              position: absolute;
              top: -5px;
              left: -5px;
              right: -5px;
              bottom: -5px;
              border: 2px dashed #1d4ed8;
              border-radius: 10px;
              opacity: 0.5;
            }
    
            .scribbly-button:hover {
              color: #2563eb;
            }
    
            .scribbly-button:hover::before,
            .scribbly-button:hover::after {
              border-color: #2563eb;
            }
    
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
            }
    
            .modal-content {
              background: #ffffff; /* Set modal background color */
              padding: 20px;
              border-radius: 8px;
              max-width: 500px;
              width: 100%;
            }
    
            input[type="url"] {
              border: 2px solid #1d4ed8;
              padding: 10px;
              width: 100%;
              border-radius: 5px;
              margin-top: 10px;
              font-size: 16px;
              transition: border-color 0.3s ease;
            }
    
            input[type="url"]:focus {
              border-color: #2563eb;
              outline: none;
            }
          `}</style>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#ede461] text-white relative">
        <header className="bg-blue-900 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/dia-logo.png" alt="DIA Logo" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">DIA</h2>
            </div>
            <nav>
              <ul className="flex items-center space-x-4">

                <li>
                  <a
                    href="https://x.com/DIA_AGentK"
                    className="p-1 rounded-full"
                  >
                    <FaTelegram size={25} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/decentralizedIntelligenceAgency"
                    className="p-1 rounded-full"
                  >
                    <FaTwitter size={25} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dexscreener.com/solana/fg1zsabrblcersattk5397goqui4kcz9d6ud5vdtranc"
                    className="p-1 rounded-full"
                  >
                    <img
                      src="/dexscreener.png"
                      alt="Dexscreener"
                      className="w-7 h-7"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dextools.io/app/en/solana/pair-explorer/Fg1zSaBRBLCERsaTTk5397GoQUi4kcZ9d6Ud5vDtranC?t=1737144071538"
                    className="p-1 rounded-full"
                  >
                    <img
                      src="/dextools.png"
                      alt="Dextools"
                      className="w-8 h-8"
                      style={{ marginTop: "-3px" }}
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="border-4 border-blue-500 p-8 max-w-4xl w-full bg-white text-black flex flex-col items-center space-y-6">
            <img
              src="/dia-logo.png"
              alt="DIA Logo"
              className="w-32 h-32 object-contain"
            />
            <h1 className="text-4xl font-bold text-center">
              THIS WEBSITE IS RUN BY DIA
            </h1>
            <p className="text-xl text-center">
              This domain has been seized by the Decentral Intelligence Agency
              (DIA) as part of a coordinated buidl enforcement action.
            </p>
            <p className="text-center">
              Operatives need 10k tokens to verify identity to access the
              mainframe
            </p>
            <div className="flex space-x-4">
              <WalletMultiButton startIcon={null}>
                {connected
                  ? `${publicKey.toString().slice(0, 4)}...${publicKey
                      .toString()
                      .slice(-4)}`
                  : "Connect"}
              </WalletMultiButton>
              <button
                className="scribbly-button"
                onClick={() => setIsModalOpen(true)}
                disabled={!connected || !isDiaHolder}
              >
                <strong>DIA TASKS</strong>
              </button>
            </div>
          </div>
        </main>
        <img
          src="/agent-bg.png"
          alt="Background"
          className="fixed bottom-0 left-0 w-1/2 md:w-1/3 lg:w-1/2"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">DIA Tasks</h2>
            <div className="space-y-4">
              <div>
                <button className="scribbly-button" onClick={handleTask1Click}>
                  1: Make an X Post with #DIA hashtag and your Agent code name
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                
                <input
                  type="url"
                  placeholder="Enter your X Post link"
                  value={xPostLink}
                  onChange={(e) => setXPostLink(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
                <button
                  type="submit"
                  className="scribbly-button mt-2"
                  disabled={!task1Completed}
                >
                  <strong>Submit Task</strong>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </WalletModalProvider>
  );
};

export default Index;
