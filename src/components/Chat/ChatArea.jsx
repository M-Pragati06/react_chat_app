// src/components/Chat/ChatArea.jsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export function ChatArea({ onMenuClick, isMobile }) {
  const { currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {selectedUser ? (
        <>
          <div className="border-b border-gray-200 p-4 flex items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onMenuClick}
                className="mr-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={selectedUser.photoURL || `https://ui-avatars.com/api/?name=${selectedUser.displayName || selectedUser.email}`} 
                  alt={selectedUser.displayName} 
                  className="w-8 h-8 rounded-full"
                />
                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${selectedUser.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              </div>
              <span className="ml-2 font-medium">
                {selectedUser.displayName || selectedUser.email.split('@')[0]}
              </span>
            </div>
          </div>
          
          <MessageList selectedUser={selectedUser} messagesEndRef={messagesEndRef} />
          
          <MessageInput selectedUser={selectedUser} scrollToBottom={scrollToBottom} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Welcome to Chat App</h2>
            <p className="text-gray-600 mb-6">
              Select a user from the sidebar to start chatting
            </p>
            {isMobile && (
              <Button onClick={onMenuClick}>
                Open Contacts
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}