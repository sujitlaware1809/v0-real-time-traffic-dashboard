import { Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your system preferences and configurations</p>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col w-full h-auto p-0 bg-transparent">
              <TabsTrigger value="general" className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted">
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="api" className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted">
                API & Integrations
              </TabsTrigger>
              <TabsTrigger value="ai" className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted">
                AI Configuration
              </TabsTrigger>
              <TabsTrigger value="users" className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted">
                User Management
              </TabsTrigger>
              <TabsTrigger value="backup" className="justify-start w-full h-10 px-4 data-[state=active]:bg-muted">
                Backup & Restore
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure basic system settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="system-name">System Name</Label>
                        <Input id="system-name" defaultValue="Zeex AI Traffic Management" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="version">Version</Label>
                        <Input id="version" defaultValue="1.2.5" disabled />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">System Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="AI-powered smart traffic management and safety system for urban environments."
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Regional Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc-8">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-12">UTC-12:00</SelectItem>
                            <SelectItem value="utc-11">UTC-11:00</SelectItem>
                            <SelectItem value="utc-10">UTC-10:00</SelectItem>
                            <SelectItem value="utc-9">UTC-09:00</SelectItem>
                            <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                            <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                            <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                            <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mm-dd-yyyy">
                          <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                            <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="units">Units</Label>
                        <Select defaultValue="imperial">
                          <SelectTrigger id="units">
                            <SelectValue placeholder="Select unit system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="imperial">Imperial (mph, ft)</SelectItem>
                            <SelectItem value="metric">Metric (km/h, m)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Interface Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable dark mode for the interface</p>
                        </div>
                        <Switch id="dark-mode" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-refresh">Auto-Refresh Data</Label>
                          <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                        </div>
                        <Switch id="auto-refresh" defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                        <Input id="refresh-interval" type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-1">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive in-app push notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Desktop Notifications</Label>
                          <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Accidents & Emergencies</Label>
                          <p className="text-sm text-muted-foreground">Critical incidents requiring attention</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Traffic Congestion</Label>
                          <p className="text-sm text-muted-foreground">Heavy traffic and congestion alerts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Alerts</Label>
                          <p className="text-sm text-muted-foreground">System maintenance and status updates</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Signal Malfunctions</Label>
                          <p className="text-sm text-muted-foreground">Traffic signal issues and outages</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Reports & Analytics</Label>
                          <p className="text-sm text-muted-foreground">Scheduled reports and insights</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-1">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="api" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>API & Integrations</CardTitle>
                  <CardDescription>Manage API keys and third-party integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">API Access</h3>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex gap-2">
                        <Input id="api-key" defaultValue="••••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use this key to authenticate API requests to the system.
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable API Access</Label>
                        <p className="text-sm text-muted-foreground">Allow external systems to access the API</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Integrations</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weather Service</Label>
                          <p className="text-sm text-muted-foreground">Integrate weather data for traffic analysis</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Emergency Services</Label>
                          <p className="text-sm text-muted-foreground">Connect with emergency response systems</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Public Transit</Label>
                          <p className="text-sm text-muted-foreground">Integrate with public transportation systems</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>GIS Systems</Label>
                          <p className="text-sm text-muted-foreground">Connect with geographic information systems</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-1">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="ai" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                  <CardDescription>Configure AI models and machine learning parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Model Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="traffic-model">Traffic Prediction Model</Label>
                        <Select defaultValue="advanced">
                          <SelectTrigger id="traffic-model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (Lower resource usage)</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced (Higher accuracy)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="violation-model">Violation Detection Model</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="violation-model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (Lower resource usage)</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced (Higher accuracy)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="accident-model">Accident Detection Model</Label>
                        <Select defaultValue="advanced">
                          <SelectTrigger id="accident-model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (Lower resource usage)</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced (Higher accuracy)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signal-model">Signal Optimization Model</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="signal-model">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (Lower resource usage)</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="advanced">Advanced (Higher accuracy)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Processing</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Edge Computing</Label>
                          <p className="text-sm text-muted-foreground">Process data on edge devices when possible</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cloud Processing</Label>
                          <p className="text-sm text-muted-foreground">Use cloud resources for intensive processing</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="processing-priority">Processing Priority</Label>
                        <Select defaultValue="balanced">
                          <SelectTrigger id="processing-priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="speed">Speed (Faster results, lower accuracy)</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="accuracy">Accuracy (Higher accuracy, slower results)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Training & Updates</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Continuous Learning</Label>
                          <p className="text-sm text-muted-foreground">Allow models to learn from new data</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="update-frequency">Model Update Frequency</Label>
                        <Select defaultValue="weekly">
                          <SelectTrigger id="update-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-1">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
