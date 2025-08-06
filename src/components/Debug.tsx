import React from 'react';
import { useAuth } from '../context/AuthContext';

const Debug: React.FC = () => {
  const { user, token } = useAuth();
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');

  return (
    <div className="p-4 bg-gray-100 border rounded-lg">
      <h3 className="text-lg font-bold mb-4">Debug Information</h3>
      <div className="space-y-2">
        <div>
          <strong>Auth Context User:</strong>
          <pre className="bg-white p-2 rounded text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Auth Context Token:</strong>
          <p className="bg-white p-2 rounded text-sm break-all">
            {token ? `${token.substring(0, 50)}...` : 'null'}
          </p>
        </div>
        <div>
          <strong>LocalStorage User:</strong>
          <pre className="bg-white p-2 rounded text-sm overflow-auto">
            {storedUser}
          </pre>
        </div>
        <div>
          <strong>LocalStorage Token:</strong>
          <p className="bg-white p-2 rounded text-sm break-all">
            {storedToken ? `${storedToken.substring(0, 50)}...` : 'null'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Debug;
