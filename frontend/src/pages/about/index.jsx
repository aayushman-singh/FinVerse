import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp, Cpu, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-12">
      <div className="container mx-auto text-center space-y-4">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
          About FinVerse
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 pb-12">
          Discover the journey of FinVerse, an advanced AI-powered trading platform that brings together analytics, real-time data, and a secure environment for trading in global markets.
        </p>
      </div>

      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-blue-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-blue-500">
              Data Collection
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Utilizing web scraping techniques, FinVerse gathers real-time data from various stock markets. Our intelligent scraper continuously updates data to provide users with current information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <Cpu className="h-12 w-12 text-purple-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-purple-500">
              AI Analysis
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Leveraging machine learning algorithms, FinVerse predicts market trends based on historical data and provides actionable insights for users to make informed trading decisions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <LineChart className="h-12 w-12 text-pink-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-pink-500">
              Visualization
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Our intuitive charts and graphs make it easy to analyze complex data. With customizable features, users can view data across various time frames and formats.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-green-500">
              Security & Privacy
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              FinVerse incorporates bank-grade security protocols, ensuring that your data and funds are safe. We use encryption, secure access, and monitoring to protect user accounts.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <Cpu className="h-12 w-12 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-yellow-500">
              Smart Portfolio Management
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Our platform provides advanced portfolio management tools, allowing users to monitor investments, manage risk, and rebalance assets for optimized returns.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-primary/20 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-red-500" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-semibold text-red-500">
              Real-time Execution
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Experience low-latency trade execution with FinVerse, making it possible for you to capitalize on market opportunities as they arise without delay.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto mt-16 text-center">
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
          FinVerse is more than just a trading platform. It’s a complete ecosystem designed to empower traders of all levels. From data collection to AI-driven insights, visualization, security, and execution, FinVerse covers every step of your trading journey.
        </p>
        <Link to="/signup">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Join FinVerse Today
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
