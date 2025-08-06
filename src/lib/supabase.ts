// Database types for TypeScript
export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  created_at: string;
}

export interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  users: {
    id: string;
    name: string;
    email: string;
  };
}