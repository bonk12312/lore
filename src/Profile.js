import React from 'react';
import { Cpu } from 'lucide-react';

function Profile() {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-green-500 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Cpu className="text-green-400 mr-2" size={24} />
        <h2 className="text-xl font-bold text-green-400">User Profile</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Wallet Address</p>
          <p className="text-white font-mono text-sm truncate">4Qkev2QdgdkT...</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Balance</p>
          <p className="text-white font-bold">45.32 SOL</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Agent Permissions</p>
          <p className="text-white">Read & Execute</p>
        </div>
      </div>
      
      <button className="mt-6 w-full py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded">
        Update Profile
      </button>
    </div>
  );
}

export default Profile;