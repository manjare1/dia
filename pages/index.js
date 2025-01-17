import React, { useState } from 'react';
import Head from 'next/head';
import { FaTelegram, FaTwitter } from 'react-icons/fa';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task1Completed, setTask1Completed] = useState(false);
  const [postLink, setPostLink] = useState('');

  const handleTask1Click = () => {
    setTask1Completed(true);
    window.open('https://twitter.com/intent/tweet?text=Agent%20X%20reporting%20for%20Duty.%20%23DIA', '_blank');  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the postLink to your API
    try {
      const response = await fetch('/api/submit-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postLink }),
      });
      if (response.ok) {
        alert('Task data submitted successfully!');
        setIsModalOpen(false);
      } else {
        alert('Failed to submit task data.');
      }
    } catch (error) {
      console.error('Error submitting task data:', error);
    }
  };

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
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            width: 100%;
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
              <button className="scribbly-button" onClick={() => setIsModalOpen(true)}><strong>DIA TASKS</strong></button>
            </div>
          </div>
        </main>
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
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Enter your X post link"
              value={postLink}
              onChange={(e) => setPostLink(e.target.value)}
              className="border p-2 w-full"
              disabled={!task1Completed}
              required
            />
            <button
              type="submit"
              className="scribbly-button mt-2"
              disabled={!task1Completed}
            >
              Submit Task
            </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;