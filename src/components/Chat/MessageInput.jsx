// src/components/Chat/MessageInput.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import EmojiPicker from 'emoji-picker-react'; // Updated import
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Smile, Send } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export function MessageInput({ selectedUser, scrollToBottom }) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
    
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: message,
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        timestamp: serverTimestamp()
      });
      
      setMessage('');
      scrollToBottom();
    } catch (err) {
      console.error('Error sending message: ', err);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current.focus();
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
          </PopoverContent>
        </Popover>
        
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}