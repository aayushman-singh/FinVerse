import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, TrendingUp, Globe, Cpu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleFreeTrial = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      // Navigate to the chatbot if the user is logged in
      navigate("/chatbot");
    } else {
      // Navigate to login if the user is not logged in
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main>
        <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl roboto-black font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Elevate Your Trading Game
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              FinVerse brings you cutting-edge AI-powered analytics, real-time global market data, and institutional-grade security. Trade smarter, faster, and safer than ever before.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={handleFreeTrial} // Call the function when clicking the button
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Free Trial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary/10">
          <div className="container mx-auto px-8 md:px-12">
            <h2 className="text-3xl font-bold text-center mb-12">Cutting-Edge Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10 text-blue-500" />}
                title="AI-Powered Analytics"
                description="Harness the power of machine learning for predictive market analysis and personalized trading strategies."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-purple-500" />}
                title="Global Market Access"
                description="Trade in over 100 markets worldwide with real-time data and seamless execution across multiple asset classes."
              />
              <FeatureCard
                icon={<Cpu className="h-10 w-10 text-pink-500" />}
                title="High-Frequency Trading"
                description="Execute complex trading algorithms with microsecond latency using our state-of-the-art infrastructure."
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-secondary/20 via-secondary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Revolutionize Your Trading?</h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professional traders who have already unlocked their potential with FinVerse's advanced trading ecosystem.
            </p>
            <form className="flex max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-l-full rounded-r-none border-r-0" />
              <Button type="submit" className="rounded-r-full rounded-l-none bg-blue-600 hover:bg-blue-700 text-white">
                Get Priority Access
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FinVerse. All rights reserved. | 
          <Link to="/terms" className="ml-2 hover:text-primary">Terms of Service</Link> | 
          <Link to="/privacy" className="ml-2 hover:text-primary">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-card hover:bg-card/80 transition-colors duration-300 border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
} 