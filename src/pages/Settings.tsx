
import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="scraping">Scraping</TabsTrigger>
            <TabsTrigger value="integrations">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service-name">Service Name</Label>
                  <Input id="service-name" defaultValue="Cricket Bet Oracle" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-debug" />
                    <Label htmlFor="enable-debug">Enable Debug Mode</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Logs additional information for debugging purposes
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scraping">
            <Card>
              <CardHeader>
                <CardTitle>Scraping Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="odds-interval">Odds Scraping Interval (seconds)</Label>
                    <Input id="odds-interval" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="results-interval">Results Fetching Interval (minutes)</Label>
                    <Input id="results-interval" type="number" defaultValue="5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Bookmakers to Scrape</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="sportingindex" defaultChecked />
                      <Label htmlFor="sportingindex">SportingIndex</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="spreadex" defaultChecked />
                      <Label htmlFor="spreadex">Spreadex</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="ladbrokes" defaultChecked />
                      <Label htmlFor="ladbrokes">Ladbrokes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sportspreads" defaultChecked />
                      <Label htmlFor="sportspreads">Sportspreads</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cricket-api-key">Cricket API Key</Label>
                  <Input id="cricket-api-key" type="password" defaultValue="••••••••••••••••" />
                  <p className="text-sm text-muted-foreground">
                    Used to fetch match results (e.g. CricAPI)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proxy-api-key">Proxy API Key</Label>
                  <Input id="proxy-api-key" type="password" />
                  <p className="text-sm text-muted-foreground">
                    Optional: For proxy rotation services like BrightData or ScraperAPI
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Keys</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
