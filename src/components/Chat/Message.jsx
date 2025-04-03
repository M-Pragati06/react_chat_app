// src/components/Chat/Message.jsx
import { format } from 'date-fns';

export function Message({ message, isCurrentUser }) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}
      >
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {format(message.timestamp?.toDate(), 'h:mm a')}
        </p>
      </div>
    </div>
  );
}