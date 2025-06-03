import React, { useState, useEffect } from 'react';
import './App.css';

// Change this URL to your bot's backend API
const API_BASE_URL = 'https://your-bot-backend-url.com';

function App() {
  const [botStats, setBotStats] = useState(null);
  const [selectedServerId, setSelectedServerId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [searchUserId, setSearchUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch bot stats on component mount
  useEffect(() => {
    fetchBotStats();
  }, []);

  const fetchBotStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/bot/stats`);
      if (response.ok) {
        const data = await response.json();
        setBotStats(data);
      } else {
        setError('Failed to fetch bot stats');
      }
    } catch (err) {
      setError('Error connecting to bot API');
      console.error('Error fetching bot stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    if (!selectedServerId) {
      setError('Please enter a server ID');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/api/bot/leaderboard/${selectedServerId}`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } else {
        setError('Failed to fetch leaderboard');
        setLeaderboard([]);
      }
    } catch (err) {
      setError('Error fetching leaderboard');
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    if (!selectedServerId || !searchUserId) {
      setError('Please enter both server ID and user ID');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/api/bot/user/${selectedServerId}/${searchUserId}`);
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      } else {
        setError('User not found or error fetching stats');
        setUserStats(null);
      }
    } catch (err) {
      setError('Error fetching user stats');
      setUserStats(null);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'King Bob Chatter': return 'text-purple-600 bg-purple-100';
      case 'Extreme Chatter': return 'text-red-600 bg-red-100';
      case 'Better Chatter': return 'text-blue-600 bg-blue-100';
      case 'Noob Chatter': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🤖 Discord XP Bot Dashboard
          </h1>
          <p className="text-xl text-purple-200">
            Track user levels, experience points, and server leaderboards
          </p>
        </div>

        {/* Bot Status Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
            Bot Status
          </h2>
          {botStats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{botStats.total_servers}</div>
                <div className="text-purple-200">Servers</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-white">{botStats.total_users}</div>
                <div className="text-purple-200">Total Users</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-lg font-bold text-white">{botStats.status}</div>
                <div className="text-purple-200">Status</div>
              </div>
            </div>
          ) : (
            <div className="text-white">Loading bot stats...</div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Server Controls</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Server ID</label>
              <input
                type="text"
                value={selectedServerId}
                onChange={(e) => setSelectedServerId(e.target.value)}
                placeholder="Enter Discord Server ID"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-purple-400 focus:outline-none"
              />
              <p className="text-purple-200 text-sm mt-1">
                Right-click your server name in Discord → Copy Server ID (Developer Mode required)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={fetchLeaderboard}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg transition-colors"
              >
                {loading ? 'Loading...' : 'Get Leaderboard'}
              </button>
              <button
                onClick={fetchBotStats}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors"
              >
                Refresh Bot Stats
              </button>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">User Stats</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">User ID</label>
              <input
                type="text"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                placeholder="Enter Discord User ID"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:border-purple-400 focus:outline-none"
              />
            </div>
            <button
              onClick={fetchUserStats}
              disabled={loading || !selectedServerId || !searchUserId}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
            >
              Get User Stats
            </button>
          </div>

          {userStats && (
            <div className="mt-6 bg-white/10 rounded-lg p-4">
              <h3 className="text-xl font-bold text-white mb-3">{userStats.username}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.level}</div>
                  <div className="text-purple-200">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.total_xp}</div>
                  <div className="text-purple-200">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.total_words}</div>
                  <div className="text-purple-200">Words Written</div>
                </div>
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor(userStats.current_role)}`}>
                    {userStats.current_role}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-white mb-2">
                  Progress to Next Level: {userStats.progress_to_next_level.current}/{userStats.progress_to_next_level.needed} XP 
                  ({userStats.progress_to_next_level.percentage}%)
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${userStats.progress_to_next_level.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <div className="text-red-200">❌ {error}</div>
          </div>
        )}

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              🏆 Server Leaderboard
            </h2>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getRankEmoji(user.rank)}</div>
                    <div>
                      <div className="text-white font-bold">{user.username}</div>
                      <div className="text-purple-200">
                        Level {user.level} • {user.total_xp} XP • {user.total_words} words
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bot Commands Info */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Bot Commands</h2>
          <div className="space-y-3 text-purple-200">
            <div>
              <code className="bg-white/20 px-2 py-1 rounded text-white">!level</code> - Show your level and XP
            </div>
            <div>
              <code className="bg-white/20 px-2 py-1 rounded text-white">!level @user</code> - Show another user's level
            </div>
            <div>
              <code className="bg-white/20 px-2 py-1 rounded text-white">!leaderboard</code> - Show server leaderboard
            </div>
            <div>
              <code className="bg-white/20 px-2 py-1 rounded text-white">!fixroles</code> - Fix role assignments (admin only)
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-2">How it works:</h3>
            <ul className="text-purple-200 space-y-1">
              <li>• Write real words in chat to gain XP (1 word = 1 XP)</li>
              <li>• Level up automatically with exponential progression</li>
              <li>• Get roles based on your level (Noob → Better → Extreme → King Bob Chatter)</li>
              <li>• Spam and repeated characters are filtered out</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-200">
          <p>Discord XP Bot - Encouraging real conversations and engagement</p>
        </div>
      </div>
    </div>
  );
}

export default App;