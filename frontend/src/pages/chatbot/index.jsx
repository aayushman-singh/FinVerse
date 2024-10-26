import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import axios from 'axios';

const apiKey = "l0rMwHVqEnhXh7UBaDPKsiu0FuwiRzcr"; // API key
const endpointId = 'predefined-openai-gpt4turbo';

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeChatSession = async () => {
      try {
        const newSessionId = await createChatSession("123");
        setSessionId(newSessionId);
        console.log("Session ID created:", newSessionId);
      } catch (error) {
        setError("Failed to create chat session. Please try again later.");
        console.error("Error creating chat session:", error.message);
      }
    };

    initializeChatSession();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setError(null);
    const newConversation = [...conversation, { message, sender: "user" }];
    setConversation(newConversation);
    setMessage("");
    setLoading(true);

    try {
      if (!sessionId) throw new Error("Session ID is not available");

      // Call submitQuery to get the chatbot response
      const chatbotMessage = await submitQuery(sessionId, message);
      console.log("Chatbot Answer:", chatbotMessage); // Log the answer field

      setConversation([
        ...newConversation,
        { message: chatbotMessage, sender: "chatbot" },
      ]);
    } catch (error) {
      setError("Failed to submit query. Please check your connection.");
      console.error("Error submitting query:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a chat session
  async function createChatSession(externalUserId) {
    try {
      const response = await axios.post('https://api.on-demand.io/chat/v1/sessions', {
        pluginIds: [],
        externalUserId: externalUserId
      }, {
        headers: {
          apikey: apiKey
        }
      });

      if (response.data && response.data.data && response.data.data.id) {
        return response.data.data.id;
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Session ID not found in response');
      }
    } catch (error) {
      console.error('Error creating chat session:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    }
  }

  // Function to submit a query using the session ID
  async function submitQuery(sessionId, query) {
    try {
      const response = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
        endpointId: endpointId,
        query: query,
        pluginIds: [
          'plugin-1712327325',
          'plugin-1713962163',
          'plugin-1716434059',
          'plugin-1728287833',
          'plugin-1728314839',
          'plugin-1716455998',
          'plugin-1715808194'
        ],
        responseMode: 'sync'
      }, {
        headers: {
          apikey: apiKey
        }
      });

      if (response.data && response.data.data && response.data.data.answer) {
        console.log("Response Structure:", response.data); // Log the entire response structure
        return response.data.data.answer;  // Return only the answer field
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('No answer found in query result');
      }
    } catch (error) {
      console.error('Error submitting query:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center py-2 px-4 text-sm">
        Chat with TradePro Pro
      </div>

      <main>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl roboto-black font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Ask TradePro Pro anything
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Get answers to your trading questions and more.
            </p>
            <form className="flex max-w-md mx-auto" onSubmit={handleSendMessage}>
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="rounded-l-full rounded-r-none border-r-0"
              />
              <Button
                type="submit"
                className="rounded-r-full rounded-l-none bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Conversation</h2>
            <div className="flex flex-col space-y-4">
              {conversation.map((msg, index) => (
                <Card
                  key={index}
                  className="bg-card hover:bg-card/80 transition-colors duration-300 border-2 border-primary/20"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{msg.sender === "user" ? "You" : "TradePro Pro"}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{msg.message}</CardDescription>
                  </CardContent>
                </Card>
              ))}
              {loading && (
                <Card className="bg-card border-2 border-primary/20 animate-bounce">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="typing-indicator">TradePro Pro is typing...</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FinVerse. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        .typing-indicator {
          animation: fadeBounce 1.5s infinite ease-in-out;
        }

        @keyframes fadeBounce {
          0%, 100% {
            opacity: 0.5;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
