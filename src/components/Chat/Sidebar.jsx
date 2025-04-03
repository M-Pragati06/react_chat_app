// src/components/Chat/Sidebar.jsx
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserList } from './UserList';

export function Sidebar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Chat App</h1>
        </div>
      </div>
      
      <UserList />
      
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || currentUser.email}`} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
            </div>
            <span className="ml-2 text-sm font-medium">
              {currentUser.displayName || currentUser.email}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}