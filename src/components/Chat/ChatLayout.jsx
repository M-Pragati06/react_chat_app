// src/components/Chat/ChatLayout.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { MobileSidebar } from './MobileSidebar';

export function ChatLayout() {
  const { currentUser } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {!isMobile && <Sidebar />}
      {isMobile && (
        <MobileSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      )}
      <ChatArea 
        onMenuClick={() => setSidebarOpen(true)} 
        isMobile={isMobile} 
      />
    </div>
  );
}