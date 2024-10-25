// import React, { useState, useEffect } from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import io from 'socket.io-client';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const socket = io("YOUR_SOCKET_URL"); // Replace with your socket URL

//   useEffect(() => {
//     socket.on('bot_response', (response) => {
//       setMessages((prev) => [...prev, { id: uuidv4(), sender: 'bot', text: response }]);
//       setIsTyping(false);
//     });

//     return () => socket.disconnect();
//   }, []);

//   const sendMessage = async () => {
//     if (input.trim()) {
//       const userMessage = { id: uuidv4(), sender: 'user', text: input };
//       setMessages((prev) => [...prev, userMessage]);
//       setIsTyping(true);

//       try {
//         const response = await axios.post('YOUR_AGENT_ENDPOINT', { message: input });
//         setMessages((prev) => [...prev, { id: uuidv4(), sender: 'bot', text: response.data.reply }]);
//       } catch (error) {
//         setMessages((prev) => [...prev, { id: uuidv4(), sender: 'bot', text: "I'm sorry, something went wrong!" }]);
//       }

//       setInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-96 w-full max-w-md mx-auto border rounded-lg shadow-lg">
//       <ScrollToBottom className="flex-1 p-4 overflow-y-auto bg-gray-100">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`my-2 p-2 rounded-lg max-w-xs ${
//               msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-gray-900 mr-auto'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {isTyping && <div className="text-gray-500 italic">Typing...</div>}
//       </ScrollToBottom>

//       <div className="flex items-center p-3 border-t bg-white">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           placeholder="Type your message here..."
//           className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
