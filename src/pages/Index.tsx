
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BarChartIcon, CpuIcon, TimerIcon, CoinsIcon } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="container px-4 md:px-6 py-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-cricket-primary px-3 py-1 text-sm text-white mb-4">
              Cricket Betting Microservice
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Cricket Bet Oracle
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A powerful odds scraper and bet grading system for cricket matches. Scrapes odds from multiple bookmakers, 
              fetches match results, and grades bets automatically.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button className="bg-cricket-primary hover:bg-cricket-secondary">
                Dashboard
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/matches">
              <Button variant="outline">View Matches</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <Card className="p-6 shadow-md flex flex-col items-center text-center">
            <div className="rounded-full bg-cricket-primary/10 p-3 mb-4">
              <BarChartIcon className="h-6 w-6 text-cricket-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Odds Scraper</h3>
            <p className="text-sm text-gray-500">
              Scrapes live cricket odds from SportingIndex, Spreadex, Ladbrokes, and Sportspreads every 60 seconds.
            </p>
          </Card>
          
          <Card className="p-6 shadow-md flex flex-col items-center text-center">
            <div className="rounded-full bg-cricket-primary/10 p-3 mb-4">
              <CpuIcon className="h-6 w-6 text-cricket-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Results Fetcher</h3>
            <p className="text-sm text-gray-500">
              Pulls match results from cricket APIs every 5 minutes to keep your data current and accurate.
            </p>
          </Card>
          
          <Card className="p-6 shadow-md flex flex-col items-center text-center">
            <div className="rounded-full bg-cricket-primary/10 p-3 mb-4">
              <CoinsIcon className="h-6 w-6 text-cricket-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Bet Grader</h3>
            <p className="text-sm text-gray-500">
              Automatically grades pending bets as Win, Lose, or Push based on match results.
            </p>
          </Card>
          
          <Card className="p-6 shadow-md flex flex-col items-center text-center">
            <div className="rounded-full bg-cricket-primary/10 p-3 mb-4">
              <TimerIcon className="h-6 w-6 text-cricket-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">URL Crawler</h3>
            <p className="text-sm text-gray-500">
              Crawls bookmaker websites to discover new match URLs for comprehensive coverage.
            </p>
          </Card>
        </div>

        <div className="mt-16 border-t pt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Integrate</h2>
          <p className="max-w-[600px] mx-auto text-gray-500 mb-6">
            This microservice is designed to run independently from your main betting platform,
            making it easy to scale and manage separately.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
            <a href="https://github.com/your-repo/cricket-bet-oracle" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">View on GitHub</Button>
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
