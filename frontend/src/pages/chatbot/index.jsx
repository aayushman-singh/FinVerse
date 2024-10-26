import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Paperclip } from "lucide-react";
import axios from "axios";

const apiKey = "l0rMwHVqEnhXh7UBaDPKsiu0FuwiRzcr";
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

      const chatbotMessage = await submitQuery(sessionId, message);
      console.log("Chatbot Answer:", chatbotMessage);

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
        console.log("Response Structure:", response.data);
        return response.data.data.answer;
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
        Chat with FinVerse.ai
      </div>

      <main className="flex-1 overflow-y-auto">
        <section className="py-6 px-4 bg-background">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Conversation</h2>
            <div className="flex flex-col space-y-4">
              {conversation.map((msg, index) => (
                <Card
                  key={index}
                  className={`bg-${msg.sender === "user" ? "blue-50" : "gray-100"} p-4 rounded-lg shadow-md border-l-4 ${msg.sender === "user" ? "border-blue-500" : "border-gray-500"}`}
                >
                  <CardHeader>
                    <CardTitle className={`text-${msg.sender === "user" ? "blue-600" : "gray-600"} font-semibold`}>
                      {msg.sender === "user" ? "You" : "FinVerse.ai"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-800 leading-relaxed">
                      {msg.message}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
              {loading && (
                <Card className="bg-gray-100 border-l-4 border-gray-500 animate-pulse p-4 rounded-lg shadow-md">
                  <CardHeader>
                    <CardTitle className="text-gray-600 font-semibold">FinVerse.ai is typing...</CardTitle>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="sticky bottom-0 w-full bg-white border-t p-4">
        <form className="flex items-center" onSubmit={handleSendMessage}>
          <Button
            variant="ghost"
            className="mr-2 p-2 rounded-full text-gray-500 hover:bg-gray-100"
            onClick={(e) => e.preventDefault()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 px-4 py-2 rounded-l-full"
          />
          <Button
            type="submit"
            className="rounded-r-full bg-blue-600 hover:bg-blue-700 text-white px-4"
          >
            Send
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;
