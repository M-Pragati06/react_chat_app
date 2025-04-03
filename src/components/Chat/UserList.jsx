// src/components/Chat/UserList.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export function UserList() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('uid', '!=', currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
          Online Users
        </h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.uid} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
              <div className="relative">
                <img 
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}`} 
                  alt={user.displayName} 
                  className="w-8 h-8 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              </div>
              <span className="ml-2 text-sm font-medium">
                {user.displayName || user.email.split('@')[0]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}