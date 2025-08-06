import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import CreatePost from '../components/Posts/CreatePost';
import PostsList from '../components/Posts/PostsList';
import { Post } from '../lib/supabase';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalConnections: 245,
    profileViews: 1847,
    notifications: 13
  });
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setStats(prev => ({ ...prev, totalPosts: data.length }));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const quickActions = [
    { icon: '✍️', title: 'Create Post', desc: 'Share your thoughts', color: 'bg-blue-500' },
    { icon: '👥', title: 'Find People', desc: 'Expand network', color: 'bg-green-500' },
    { icon: '📊', title: 'Analytics', desc: 'View insights', color: 'bg-purple-500' },
    { icon: '🔔', title: 'Notifications', desc: `${stats.notifications} new`, color: 'bg-orange-500' }
  ];

  const trendingTopics = [
    { tag: '#TechInnovation', posts: '1.2k' },
    { tag: '#RemoteWork', posts: '856' },
    { tag: '#AI', posts: '2.1k' },
    { tag: '#Startup', posts: '945' },
    { tag: '#Leadership', posts: '678' }
  ];

  const upcomingEvents = [
    { title: 'Tech Conference 2024', date: 'Dec 15', attendees: 245 },
    { title: 'Networking Meetup', date: 'Dec 18', attendees: 89 },
    { title: 'Workshop: React Advanced', date: 'Dec 22', attendees: 156 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome Back, {user?.email?.split('@')[0] || 'Professional'}!
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Your professional network awaits
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white">{stats.totalPosts}</div>
                <div className="text-blue-200 text-sm">Posts Created</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white">{stats.totalConnections}</div>
                <div className="text-blue-200 text-sm">Connections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white">{stats.profileViews}</div>
                <div className="text-blue-200 text-sm">Profile Views</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white">{stats.notifications}</div>
                <div className="text-blue-200 text-sm">Notifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden group"
              >
                <div className={`${action.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h3 className="text-white font-semibold">{action.title}</h3>
                  <p className="text-white/80 text-sm">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'feed', label: 'Feed', icon: '🏠' },
                { id: 'trending', label: 'Trending', icon: '🔥' },
                { id: 'events', label: 'Events', icon: '📅' },
                { id: 'insights', label: 'Insights', icon: '📈' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2 text-lg group-hover:scale-110 transition-transform duration-200">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">✨</span>
                    Create Something Amazing
                  </h3>
                  {user && <CreatePost onPostCreated={handlePostCreated} />}
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">📰</span>
                    Latest Updates
                  </h3>
                  <PostsList posts={posts} isLoading={isLoading} />
                </div>
              </div>
            )}

            {activeTab === 'trending' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">🔥</span>
                  Trending Topics
                </h3>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <span className="font-semibold text-blue-600">{topic.tag}</span>
                      </div>
                      <div className="text-gray-500">{topic.posts} posts</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">📅</span>
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="font-semibold text-green-700">{event.title}</div>
                        <div className="text-sm text-green-600">{event.date}</div>
                      </div>
                      <div className="text-gray-500">{event.attendees} attending</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">📈</span>
                  Your Performance Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Engagement Rate</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                    <div className="text-sm text-purple-500">+12% from last month</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-orange-700 mb-2">Reach</h4>
                    <div className="text-3xl font-bold text-orange-600 mb-2">2.4K</div>
                    <div className="text-sm text-orange-500">+24% from last month</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {user?.email?.split('@')[0] || 'User'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">Professional Networker</p>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3">
                  <div className="text-green-700 font-semibold">Profile Strength</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="text-sm text-green-600 mt-1">85% Complete</div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Suggestions
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="font-medium text-blue-700">Complete your profile</div>
                  <div className="text-sm text-blue-600">Add skills and experience</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="font-medium text-green-700">Connect with colleagues</div>
                  <div className="text-sm text-green-600">5 mutual connections found</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="font-medium text-purple-700">Join industry groups</div>
                  <div className="text-sm text-purple-600">Based on your interests</div>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Recent Activity
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>John liked your post</div>
                  <div className="text-gray-400">2h</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>New connection request</div>
                  <div className="text-gray-400">4h</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>You have a new follower</div>
                  <div className="text-gray-400">1d</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50">
        <span className="text-2xl">✨</span>
      </button>
    </div>
  );
};

export default Home;