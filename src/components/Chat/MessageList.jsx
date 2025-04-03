// src/components/Chat/MessageList.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { Message } from './Message';

export function MessageList({ selectedUser, messagesEndRef }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedUser) return;

    const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            isCurrentUser={message.senderId === currentUser.uid} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}