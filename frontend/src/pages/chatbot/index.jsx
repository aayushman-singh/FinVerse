import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSendMessage = () => {
    // TO DO: Implement sending message logic here
    setConversation([...conversation, { message, sender: "user" }]);
    setMessage("");
  };

  const handleReceiveMessage = (message) => {
    // TO DO: Implement receiving message logic here
    setConversation([...conversation, { message, sender: "chatbot" }]);
  };

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
            <form className="flex max-w-md mx-auto">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="rounded-l-full rounded-r-none border-r-0"
              />
              <Button type="submit" className="rounded-r-full rounded-l-none bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSendMessage}>
                Send
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Conversation</h2>
            <div className="flex flex-col space-y-4">
              {conversation.map((message, index) => (
                <Card key={index} className="bg-card hover:bg-card/80 transition-colors duration-300 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{message.sender}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{message.message}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FinVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Chatbot;