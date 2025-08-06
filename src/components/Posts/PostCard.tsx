import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Post } from '../../lib/supabase';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start space-x-3">
          <Link
            to={`/profile/${post.user_id}`}
            className="flex-shrink-0"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-lg font-semibold text-white">
                {post.users.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Link
                to={`/profile/${post.user_id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {post.users.name}
              </Link>
              <span className="text-gray-500">•</span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.created_at)}
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <Link
            to={`/profile/${post.user_id}`}
            className="flex items-center hover:text-blue-600 transition-colors"
          >
            <User className="h-4 w-4 mr-1" />
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;