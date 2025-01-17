import React from 'react';
import Head from 'next/head';
import { FaTelegram, FaTwitter } from 'react-icons/fa';

const Index = () => {
  return (
    <>
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
        `}</style>
      </Head>
      <div className="min-h-screen flex flex-col bg-white text-white">
      <header className="bg-blue-900 shadow-lg">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src="/dia-logo.png" alt="DIA Logo" className="w-8 h-8 object-contain" />
        <h2 className="text-2xl font-bold">DIA</h2>
      </div>
      <nav>
        <ul className="flex items-center space-x-4">
          <li><a href="#" className="text-sm hover:text-blue-300">Home</a></li>
          <li>
            <a href="#" className="p-1 rounded-full">
              <FaTelegram size={25} />
            </a>
          </li>
          <li>
            <a href="#" className="p-1 rounded-full">
              <FaTwitter size={25} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="border-4 border-blue-500 p-8 max-w-4xl w-full bg-white text-black flex flex-col items-center space-y-6">
            <img src="/dia-logo.png" alt="DIA Logo" className="w-32 h-32 object-contain" />
            <h1 className="text-4xl font-bold text-center">THIS WEBSITE IS RUN BY DIA</h1>
            <p className="text-xl text-center">
              This domain has been seized by the Decentral Intelligence Agency (DIA) as part of a coordinated buidl enforcement action.
            </p>
            <div className="flex space-x-4">
            <button className="scribbly-button"><strong>DIA TASKS</strong></button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;