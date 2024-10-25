import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart, Lock, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
     
    

    

      <main>
        {/* Content sections */}
        <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="container mx-auto px-4  text-center">
            <h1 className="text-4xl md:text-6xl roboto-black font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Trade Smarter, Faster, Safer
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of stock trading with TradePro. Advanced tools, real-time data, and unparalleled security.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary/10">
  <div className="container mx-auto px-8 md:px-12">
    <h2 className="text-3xl font-bold text-center mb-12">Premium Features</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<LineChart className="h-10 w-10 text-blue-500" />}
        title="Advanced Charting"
        description="Interactive charts with multiple timeframes and indicators for in-depth technical analysis."
      />
      <FeatureCard
        icon={<Zap className="h-10 w-10 text-purple-500" />}
        title="Lightning-Fast Execution"
        description="Execute trades in milliseconds with our high-performance trading engine."
      />
      <FeatureCard
        icon={<Lock className="h-10 w-10 text-pink-500" />}
        title="Bank-Grade Security"
        description="Your funds and data are protected with state-of-the-art encryption and security measures."
      />
    </div>
  </div>
</section>


        <section className="py-20 bg-gradient-to-br from-secondary/20 via-secondary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Start Trading?</h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of traders who have already discovered the TradePro advantage.
            </p>
            <form className="flex max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-l-full rounded-r-none border-r-0" />
              <Button type="submit" className="rounded-r-full rounded-l-none bg-blue-600 hover:bg-blue-700 text-white">
                Get Early Access
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FinVerse. All rights reserved.
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
