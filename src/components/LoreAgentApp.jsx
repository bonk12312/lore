import React, { useState, useRef, useEffect } from 'react';

const LoreAgentApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [balance, _setBalance] = useState('45.32');
  const [agentStatus, setAgentStatus] = useState('Ready');
  const [advancedMode, setAdvancedMode] = useState(false);
  const [transactionApproval, setTransactionApproval] = useState(false);
  const [realTimeNotifications, setRealTimeNotifications] = useState(true);
  
  // Console messages for the agent terminal
  const [consoleMessages, setConsoleMessages] = useState([
    { type: 'system', text: '// Agent console initialized' },
    { type: 'system', text: '// Ready to accept commands' },
    { type: 'system', text: '// Type your instruction below' }
  ]);
  
  const messageInputRef = useRef(null);
  const soundRef = useRef(null);
  
  // Effect for focusing on input when active tab is agent
  useEffect(() => {
    if (activeTab === 'agent' && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [activeTab]);
  
  // Function to play the sound effect
const playSound = () => {
  if (soundRef.current) {
    // Reset to beginning if it's already playing
    soundRef.current.currentTime = 0;
    soundRef.current.volume = 0.3; // Lower volume
    soundRef.current.play().catch(e => console.error("Audio play failed:", e));
  }
};
  
  // Simulate wallet connection
  const connectWallet = () => {
    playSound(); // Play sound on button click
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
    }, 800);
  };
  
  // Reset conversation
  const resetConversation = () => {
    playSound(); // Play sound on button click
    setConsoleMessages([
      { type: 'system', text: '// Agent console reset' },
      { type: 'system', text: '// Ready to accept commands' },
      { type: 'system', text: '// Type your instruction below' }
    ]);
    setMessage('');
  };
  
  // Toggle settings with music
  const toggleSetting = (setting, value) => {
    playSound(); // Play sound on button click
    if (setting === 'transactionApproval') {
      setTransactionApproval(value);
    } else if (setting === 'realTimeNotifications') {
      setRealTimeNotifications(value);
    } else if (setting === 'advancedMode') {
      setAdvancedMode(value);
    }
  };
  
  // Function to handle any button click
  const handleButtonClick = (callback) => {
    return (...args) => {
      playSound(); // Play music on any button click
      if (callback) callback(...args);
    };
  };
  
  // Simulate sending a message to the agent
  const sendMessage = (text = message) => {
    if (!text.trim()) return;
    
    playSound(); // Play music when sending message
    
    // Add user message to console
    const userMessage = { type: 'user', text: text };
    setConsoleMessages(prev => [...prev, userMessage]);
    
    setAgentStatus('Processing');
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate a response based on the user's command
      let response;
      
      if (text.toLowerCase().includes('swap')) {
        response = { 
          type: 'agent', 
          text: `Processing swap request. Checking market rates and liquidity pools. Current slippage tolerance set to 0.5%. Transaction ID: SOL${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        };
      } else if (text.toLowerCase().includes('stake') || text.toLowerCase().includes('staking')) {
        response = { 
          type: 'agent', 
          text: `Analyzing staking options. Current APY ranges from 5.8% to 7.2% across validated pools. Would you like me to recommend specific validators based on performance history?`
        };
      } else if (text.toLowerCase().includes('nft') || text.toLowerCase().includes('buy')) {
        response = { 
          type: 'agent', 
          text: `Searching NFT markets. Found ${Math.floor(Math.random() * 12) + 3} items matching your criteria. Lowest price: ${(Math.random() * 2 + 0.5).toFixed(2)} SOL. Shall I display options by price or rarity?`
        };
      } else if (text.toLowerCase().includes('contract') || text.toLowerCase().includes('deploy')) {
        response = { 
          type: 'agent', 
          text: `Smart contract analysis complete. Code validated with ${Math.floor(Math.random() * 3) + 1} optimization suggestions. Estimated deployment cost: ${(Math.random() * 0.1).toFixed(4)} SOL. Proceed with deployment?`
        };
      } else if (text.toLowerCase().includes('monitor') || text.toLowerCase().includes('transaction')) {
        response = { 
          type: 'agent', 
          text: `Transaction monitoring activated. Status: Confirmed (${Math.floor(Math.random() * 300) + 20} confirmations). Block height: ${Math.floor(Math.random() * 150000000) + 149000000}. Finalized on Solana mainnet.`
        };
      } else if (text.toLowerCase().includes('balance') || text.toLowerCase().includes('portfolio')) {
        response = { 
          type: 'agent', 
          text: `Portfolio value: ${(Math.random() * 10000 + 1000).toFixed(2)} USD. SOL: ${balance} ($${(parseFloat(balance) * 98.5).toFixed(2)}), USDC: 125.00 ($125.00). 24h change: ${(Math.random() * 8 - 4).toFixed(2)}%`
        };
      } else {
        // Generic response for other commands
        const responses = [
          "Command received. Processing blockchain operation. Please confirm authorization via connected wallet.",
          "Analyzing request pattern. Optimizing execution path for lower gas fees. Ready for execution.",
          "Decoding instruction. Cross-referencing with Solana program registry. Compatible interfaces detected.",
          "Query parameters validated. Preparing on-chain interaction. Awaiting transaction signature.",
          "Instruction buffered. Simulating transaction outcome. Expected confirmation time: 2-4 seconds.",
          "Command parsed successfully. Connecting to Solana RPC endpoints. Network status: Optimal."
        ];
        response = { type: 'agent', text: responses[Math.floor(Math.random() * responses.length)] };
      }
      
      // Add the response to console messages
      setConsoleMessages(prev => [...prev, response]);
      
      setAgentStatus('Ready');
      setLoading(false);
      setMessage('');
    }, 1500);
  };
  
  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };
  
  // Handle example command click
  const handleExampleClick = (cmd) => {
    playSound(); // Play music when clicking on example
    setMessage(cmd);
    sendMessage(cmd);
  };
  
  // Features data
  const features = [
    { 
      title: 'AI-Powered Tasks', 
      description: 'Execute complex on-chain operations through natural language commands',
      icon: '⚡'
    },
    { 
      title: 'Smart Contract Integration', 
      description: 'Seamlessly interact with any Solana program or smart contract',
      icon: '📝'
    },
    { 
      title: 'Secure Transactions', 
      description: 'End-to-end encryption and multi-signature authorization',
      icon: '🔒'
    },
    { 
      title: 'Comprehensive Analytics', 
      description: 'Real-time insights into your Solana portfolio and market trends',
      icon: '📊'
    }
  ];
  
  // Portfolio data
  const portfolio = [
    { token: 'SOL', balance: '45.32', value: '$7,795.23', change: '+2.4%' },
    { token: 'USDC', balance: '125.00', value: '$125.01', change: '-1.2%' },
    { token: 'RAY', balance: '345.67', value: '$1,032', change: '+3.5%' },
    { token: 'BONK', balance: '1,450,000', value: '$43.5', change: '-0.8%' }
  ];
  
  // Example commands
  const exampleCommands = [
    'Swap 2 SOL for USDC',
    'Check my staking rewards',
    'Buy NFT from collection XYZ',
    'Deploy my smart contract',
    'Monitor transaction XYZ...'
  ];

  return (
    <div className="bg-black min-h-screen text-gray-200">
      {/* Fixed Twitter button with big white X */}
<a 
  href="https://x.com/elonmusk" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="fixed top-4 right-4 z-50 bg-black hover:bg-gray-800 text-white p-2 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center border border-gray-700"
  onClick={(e) => {
    e.preventDefault();
    playSound();
    window.open('https://x.com/elonmusk', '_blank', 'noopener,noreferrer');
  }}
>
  <span className="text-white font-bold text-2xl">𝕏</span>
</a>
      {/* Audio element for sound effects */}
<audio ref={soundRef} src="/sound.mp3" preload="auto"></audio>
      
      {advancedMode && activeTab === 'agent' ? (
        // Fullscreen Agent Console in Advanced Mode
        <div className="fixed inset-0 z-50 bg-black overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-400">
                Agent Console <span className="text-sm text-green-600">(Advanced Mode)</span>
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 mr-2">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${agentStatus === 'Ready' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                  {agentStatus}
                </span>
                <button 
                  onClick={() => toggleSetting('advancedMode', false)}
                  className="text-gray-400 hover:text-white px-3 py-1 bg-gray-800 rounded-lg"
                >
                  Exit Advanced Mode
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">⚙️</span>
                  <span className="font-medium">Lore Agent Terminal</span>
                </div>
                <button 
                  onClick={resetConversation}
                  className="text-gray-400 hover:text-white p-2 bg-gray-800 hover:bg-gray-700 rounded"
                  title="Reset conversation"
                >
                  🔄 Reset
                </button>
              </div>
              
              <div className="h-96 p-4 bg-black overflow-y-auto font-mono text-sm">
                {consoleMessages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.type === 'system' ? 'text-gray-500' : msg.type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                    {msg.type === 'system' ? (
                      msg.text
                    ) : msg.type === 'user' ? (
                      <span><span className="text-yellow-500">&gt;</span> {msg.text}</span>
                    ) : (
                      <span><span className="text-green-500">LORE_AGENT:</span> {msg.text}</span>
                    )}
                  </div>
                ))}
                {agentStatus === 'Processing' && (
                  <div className="text-green-400">
                    <span className="inline-block animate-pulse">_</span>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <div className="flex">
                  <input
                    ref={messageInputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a command for Lore Agent..."
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:border-green-500"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!message.trim() || loading}
                    className={`bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-r-lg font-medium flex items-center justify-center ${!message.trim() || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? '⏳' : '📤'}
                    <span className="ml-2">Send</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-green-300">
                  Example Commands
                </h3>
                <div className="space-y-3">
                  {exampleCommands.map((cmd, index) => (
                    <div 
                      key={index}
                      onClick={() => handleExampleClick(cmd)}
                      className="px-3 py-2 bg-gray-800 rounded text-sm cursor-pointer hover:bg-gray-700"
                    >
                      {cmd}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-green-300">
                  Agent Configuration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Transaction Approval</span>
                    <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('transactionApproval', !transactionApproval)}>
                      <div className={`block w-12 h-6 rounded-full ${transactionApproval ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${transactionApproval ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Real-time Notifications</span>
                    <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('realTimeNotifications', !realTimeNotifications)}>
                      <div className={`block w-12 h-6 rounded-full ${realTimeNotifications ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${realTimeNotifications ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Advanced Mode</span>
                    <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('advancedMode', !advancedMode)}>
                      <div className={`block w-12 h-6 rounded-full ${advancedMode ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${advancedMode ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">
                      <span className="text-sm text-gray-400">Transaction Limit</span>
                      <select 
                        className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                        onChange={handleButtonClick()}
                      >
                        <option>0.5 SOL</option>
                        <option>1 SOL</option>
                        <option>5 SOL</option>
                        <option>10 SOL</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular layout when not in Advanced Mode or not on Agent tab
        <>
          {/* Header */}
          <header className="border-b border-green-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-green-400 mr-2 text-xl font-bold">⚙️</div>
                <h1 className="text-xl font-bold text-green-400">LORE AGENT</h1>
              </div>
              
              <nav className="hidden md:flex space-x-2">
                <button 
                  onClick={handleButtonClick(() => setActiveTab('home'))}
                  className={`px-4 py-2 rounded ${activeTab === 'home' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  Home
                </button>
                <button 
                  onClick={handleButtonClick(() => setActiveTab('features'))}
                  className={`px-4 py-2 rounded ${activeTab === 'features' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  Features
                </button>
                <button 
                  onClick={handleButtonClick(() => setActiveTab('dashboard'))}
                  className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleButtonClick(() => setActiveTab('agent'))}
                  className={`px-4 py-2 rounded ${activeTab === 'agent' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  Agent Console
                </button>
                <button 
                  onClick={handleButtonClick(() => setActiveTab('docs'))}
                  className={`px-4 py-2 rounded ${activeTab === 'docs' ? 'bg-green-500 text-black' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  Documentation
                </button>
              </nav>
              
              <div>
                {connected ? (
                  <span className="px-3 py-1 rounded-full text-sm text-green-400 bg-green-900">
                    Connected
                  </span>
                ) : (
                  <button 
                    onClick={connectWallet}
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-black font-medium flex items-center"
                    disabled={loading}
                  >
                    {loading ? '⏳' : '💼'} 
                    <span className="ml-2">Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            {/* Home Tab */}
            {activeTab === 'home' && (
              <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <div className="text-center mb-8">
                  <div className="text-xl text-white mb-2">a Solana agent</div>
                  <div className="text-6xl font-bold text-green-400 mb-2">$LORE</div>
                </div>
                
                <div className="relative w-full max-w-lg mx-auto h-[500px]">
                  {/* Image of the agent - Make sure to move 979789.png to your public folder */}
                  <img src="/godu.png" alt="AI Agent" className="w-full h-full" />
                </div>
                
                <div className="max-w-md mx-auto text-center mt-8">
                  <div className="flex justify-center space-x-4">
                    <button 
                      className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-black font-bold"
                      onClick={handleButtonClick(() => setActiveTab('agent'))}
                    >
                      Launch Agent
                    </button>
                    <button 
                      className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold"
                      onClick={handleButtonClick(() => setActiveTab('features'))}
                    >
                      Explore Features
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="max-w-5xl mx-auto">
                {/* Features content (previously the home content) */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 text-green-400">
                    Your AI-Powered Solana Agent
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    Execute advanced blockchain operations with simple natural language commands
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button 
                      className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-black font-bold"
                      onClick={handleButtonClick(() => setActiveTab('agent'))}
                    >
                      Launch Agent Console
                    </button>
                    <button 
                      className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 font-bold"
                      onClick={handleButtonClick(() => setActiveTab('docs'))}
                    >
                      View Documentation
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <div className="rounded-xl border border-green-500 bg-gray-900 p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-green-300">
                      AI-Powered Intelligence
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Lore Agent uses advanced machine learning to understand your intentions and 
                      execute complex Solana blockchain operations automatically.
                    </p>
                    <div className="h-2 w-20 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="rounded-xl border border-green-500 bg-gray-900 p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-green-300">
                      Seamless Solana Integration
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Direct interaction with Solana's ecosystem, including DeFi protocols, 
                      NFT marketplaces, and custom smart contracts.
                    </p>
                    <div className="h-2 w-20 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="mb-16">
                  <h3 className="text-2xl font-bold mb-8 text-center text-green-400">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                      <div 
                        key={index}
                        onClick={handleButtonClick()}
                        className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-green-800 transition-all cursor-pointer"
                      >
                        <div className="text-green-400 mb-4 text-2xl">
                          {feature.icon}
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-green-300">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-8 border border-green-900">
                  <h3 className="text-2xl font-bold mb-6 text-green-400">
                    Get Started in Minutes
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center cursor-pointer" onClick={handleButtonClick()}>
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold mb-4">
                        1
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-green-300">
                        Connect Wallet
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        Securely link your Solana wallet to enable agent operations
                      </p>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer" onClick={handleButtonClick()}>
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold mb-4">
                        2
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-green-300">
                        Set Preferences
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        Customize agent behavior and permission levels
                      </p>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer" onClick={handleButtonClick()}>
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold mb-4">
                        3
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-green-300">
                        Issue Commands
                      </h4>
                      <p className="text-gray-400 text-center text-sm">
                        Start using natural language to control your Solana experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-green-400">
                  Dashboard
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Transactions', value: '1,432', icon: '🔄' },
                    { label: 'Agent Tasks', value: '86', icon: '⚙️' },
                    { label: 'SOL Balance', value: balance, icon: '💰' },
                    { label: 'Network Status', value: 'Optimal', icon: '📶' }
                  ].map((metric, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-900 rounded-lg p-6 border border-gray-800 cursor-pointer"
                      onClick={handleButtonClick()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-400 font-medium">{metric.label}</h3>
                        <div className="text-green-400 text-xl">{metric.icon}</div>
                      </div>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Activity Timeline
                    </h3>
                    <div className="space-y-4">
                      {[
                        { action: 'Token Swap Executed', time: '10 minutes ago' },
                        { action: 'Smart Contract Interaction', time: '1 hour ago' },
                         { action: 'NFT Purchase', time: '3 hours ago' },
                        { action: 'Staking Rewards Claimed', time: 'Yesterday' }
                      ].map((activity, index) => (
                        <div 
                          key={index} 
                          className="flex items-start cursor-pointer" 
                          onClick={handleButtonClick()}
                        >
                          <div className="h-2 w-2 mt-2 rounded-full bg-green-500 mr-3"></div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Agent Performance
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Response Time', value: '92%' },
                        { label: 'Task Success Rate', value: '87%' },
                        { label: 'Gas Optimization', value: '95%' }
                      ].map((stat, index) => (
                        <div key={index} onClick={handleButtonClick()} className="cursor-pointer">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-400">{stat.label}</span>
                            <span className="text-sm font-medium">{stat.value}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: stat.value }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      {['Execute Swap', 'Verify Contract', 'Check Balance', 'View Market'].map((action, index) => (
                        <button 
                          key={index} 
                          className="w-full text-left px-4 py-3 rounded bg-gray-800 hover:bg-gray-700 flex justify-between items-center"
                          onClick={handleButtonClick()}
                        >
                          <span>{action}</span>
                          <span className="text-green-400">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Portfolio Overview
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {portfolio.map((item, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{item.token}</span>
                            <span className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {item.change}
                            </span>
                          </div>
                          <p className="text-lg font-bold">{item.balance}</p>
                          <p className="text-xs text-gray-500">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Agent Console Tab (when not in advanced mode) */}
            {activeTab === 'agent' && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-400">
                    Agent Console
                  </h2>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${agentStatus === 'Ready' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                      {agentStatus}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">⚙️</span>
                      <span className="font-medium">Lore Agent Terminal</span>
                    </div>
                    <button 
                      onClick={resetConversation}
                      className="text-gray-400 hover:text-white p-2 bg-gray-800 hover:bg-gray-700 rounded"
                      title="Reset conversation"
                    >
                      🔄 Reset
                    </button>
                  </div>
                  
                  <div className="h-64 p-4 bg-black overflow-y-auto font-mono text-sm">
                    {consoleMessages.map((msg, index) => (
                      <div key={index} className={`mb-2 ${msg.type === 'system' ? 'text-gray-500' : msg.type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                        {msg.type === 'system' ? (
                          msg.text
                        ) : msg.type === 'user' ? (
                          <span><span className="text-yellow-500">&gt;</span> {msg.text}</span>
                        ) : (
                          <span><span className="text-green-500">LORE_AGENT:</span> {msg.text}</span>
                        )}
                      </div>
                    ))}
                    {agentStatus === 'Processing' && (
                      <div className="text-green-400">
                        <span className="inline-block animate-pulse">_</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex">
                      <input
                        ref={messageInputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter a command for Lore Agent..."
                        className="flex-grow bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:border-green-500"
                      />
                      <button
                        onClick={() => sendMessage()}
                        disabled={!message.trim() || loading}
                        className={`bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-r-lg font-medium flex items-center justify-center ${!message.trim() || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? '⏳' : '📤'}
                        <span className="ml-2">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Example Commands
                    </h3>
                    <div className="space-y-3">
                      {exampleCommands.map((cmd, index) => (
                        <div 
                          key={index}
                          onClick={() => handleExampleClick(cmd)}
                          className="px-3 py-2 bg-gray-800 rounded text-sm cursor-pointer hover:bg-gray-700"
                        >
                          {cmd}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-green-300">
                      Agent Configuration
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Transaction Approval</span>
                        <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('transactionApproval', !transactionApproval)}>
                          <div className={`block w-12 h-6 rounded-full ${transactionApproval ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${transactionApproval ? 'translate-x-6' : ''}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Real-time Notifications</span>
                        <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('realTimeNotifications', !realTimeNotifications)}>
                          <div className={`block w-12 h-6 rounded-full ${realTimeNotifications ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${realTimeNotifications ? 'translate-x-6' : ''}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Advanced Mode</span>
                        <div className="relative inline-block w-12 h-6 cursor-pointer" onClick={() => toggleSetting('advancedMode', !advancedMode)}>
                          <div className={`block w-12 h-6 rounded-full ${advancedMode ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform ${advancedMode ? 'translate-x-6' : ''}`}></div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2">
                          <span className="text-sm text-gray-400">Transaction Limit</span>
                          <select className="w-full mt-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500">
                            <option>0.5 SOL</option>
                            <option>1 SOL</option>
                            <option>5 SOL</option>
                            <option>10 SOL</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Documentation Tab */}
            {activeTab === 'docs' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-green-400">
                  Documentation
                </h2>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-green-300">
                    Getting Started with Lore Agent
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Lore Agent is an AI-powered assistant for the Solana blockchain. It helps you interact with the Solana ecosystem using natural language commands, making blockchain operations accessible to everyone.
                  </p>
                  <div className="flex space-x-4 mt-6">
                    <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-black font-medium">
                      Quick Start Guide
                    </button>
                    <button className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 font-medium">
                      API Reference
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <span className="text-green-400 mr-2 text-xl">📚</span>
                    <h3 className="text-xl font-bold text-green-300">
                      Documentation Sections
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: 'Command Reference', icon: '📝', desc: 'Learn about all available commands and their syntax' },
                      { title: 'Smart Contract Integration', icon: '📄', desc: 'How to connect your smart contracts with Lore Agent' },
                      { title: 'Wallet Management', icon: '💼', desc: 'Secure wallet integration and transaction signing' },
                      { title: 'Agent Configuration', icon: '⚙️', desc: 'Customize agent behavior and permissions' }
                    ].map((section, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg p-5 border border-gray-800 hover:border-green-800 transition-all">
                        <div className="flex items-center mb-3">
                          <div className="text-green-400 mr-2">{section.icon}</div>
                          <h4 className="font-bold">{section.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm">{section.desc}</p>
                        <button className="mt-4 text-sm font-medium text-green-400 hover:text-green-300 flex items-center">
                          Read More
                          <span className="ml-1">→</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-xl font-bold mb-4 text-green-300">
                    Examples & Tutorials
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      'Setting up your first agent task',
                      'Automating token swaps with natural language',
                      'Creating a custom agent for NFT monitoring',
                      'Advanced: Building multi-step workflows'
                    ].map((tutorial, index) => (
                      <div key={index} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{tutorial}</span>
                          <button className="text-green-400 hover:text-green-300">
                            🌐
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <button className="text-sm font-medium text-green-400 hover:text-green-300 flex items-center">
                      View All Tutorials
                      <span className="ml-1">→</span>
                    </button>
                    <button className="flex items-center text-sm text-gray-400 hover:text-gray-300">
                      <span className="mr-1">🔮</span>
                      GitHub Examples
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
          
          {/* Footer */}
          <footer className="border-t border-green-900 px-6 py-4 bg-gray-950 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-green-400 mr-2">⚙️</span>
                <span className="font-bold text-green-400">LORE AGENT</span>
              </div>
              
             <nav className="flex space-x-6 mb-4 md:mb-0">
  <button 
    onClick={handleButtonClick()}
    className="text-gray-400 hover:text-green-400 text-sm"
  >
    Documentation
  </button>
  <button 
    onClick={handleButtonClick()}
    className="text-gray-400 hover:text-green-400 text-sm"
  >
    API
  </button>
  <button 
    onClick={handleButtonClick()}
    className="text-gray-400 hover:text-green-400 text-sm"
  >
    Support
  </button>
  <button 
    onClick={handleButtonClick()}
    className="text-gray-400 hover:text-green-400 text-sm"
  >
    Privacy
  </button>
</nav>
              
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-green-400">🔮</button>
                <button className="text-gray-400 hover:text-green-400">🌐</button>
                <button className="text-gray-400 hover:text-green-400">💬</button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default LoreAgentApp;