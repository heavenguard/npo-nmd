"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  Globe,
  Download,
  Eye,
  MousePointer,
  Clock,
} from "lucide-react";
import { useState } from "react";

const websiteTrafficData = [
  { month: "Jan", visitors: 4200, pageViews: 12600 },
  { month: "Feb", visitors: 5100, pageViews: 15300 },
  { month: "Mar", visitors: 4800, pageViews: 14400 },
  { month: "Apr", visitors: 6200, pageViews: 18600 },
  { month: "May", visitors: 7100, pageViews: 21300 },
  { month: "Jun", visitors: 6800, pageViews: 20400 },
];

const membershipGrowthData = [
  { month: "Jan", members: 1180 },
  { month: "Feb", members: 1205 },
  { month: "Mar", members: 1247 },
  { month: "Apr", members: 1289 },
  { month: "May", members: 1324 },
  { month: "Jun", members: 1356 },
];

const contentPerformanceData = [
  { name: "Articles", value: 45, color: "#0891b2" },
  { name: "Videos", value: 25, color: "#f59e0b" },
  { name: "News", value: 20, color: "#10b981" },
  { name: "Images", value: 10, color: "#8b5cf6" },
];

const topPages = [
  { page: "/advisory-board", views: 3420, bounce: 32 },
  { page: "/projects/mars-rover", views: 2890, bounce: 28 },
  { page: "/events/space-conference", views: 2156, bounce: 45 },
  { page: "/education/space-camp", views: 1876, bounce: 38 },
  { page: "/about", views: 1654, bounce: 52 },
];

export default function AnalyticsPage() {
  const [coming, setComing] = useState(true);

  if (coming) {
    return <>Coming Soon</>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Track website performance, member engagement, and content metrics
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">15.2K</div>
                <p className="text-sm text-muted-foreground">
                  Monthly Visitors
                </p>
                <p className="text-xs text-green-600">+8.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">45.6K</div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-xs text-green-600">+12.4% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">3:24</div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <p className="text-xs text-green-600">+0:15 from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">2.8%</div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <p className="text-xs text-red-600">+0.3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Traffic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Website Traffic
            </CardTitle>
            <CardDescription>Monthly visitors and page views</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={websiteTrafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#0891b2" name="Visitors" />
                <Bar dataKey="pageViews" fill="#f59e0b" name="Page Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Membership Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Membership Growth
            </CardTitle>
            <CardDescription>Total members over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={membershipGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="members"
                  stroke="#0891b2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>
              Distribution of content types by engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentPerformanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }: { name: any; value: any }) =>
                    `${name}: ${value}%`
                  }
                >
                  {contentPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div
                  key={page.page}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">#{index + 1}</span>
                      <span className="text-sm">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {page.views.toLocaleString()} views
                      </span>
                      <Badge
                        variant={
                          page.bounce < 35
                            ? "default"
                            : page.bounce < 45
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {page.bounce}% bounce
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={(page.views / 3500) * 100}
                    className="w-20"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>
            Key metrics and recent performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Content Engagement</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Articles</span>
                  <span>85% engagement</span>
                </div>
                <Progress value={85} />
                <div className="flex justify-between text-sm">
                  <span>Videos</span>
                  <span>72% engagement</span>
                </div>
                <Progress value={72} />
                <div className="flex justify-between text-sm">
                  <span>News</span>
                  <span>68% engagement</span>
                </div>
                <Progress value={68} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Member Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Active</span>
                  <span>342 members</span>
                </div>
                <Progress value={65} />
                <div className="flex justify-between text-sm">
                  <span>Weekly Active</span>
                  <span>789 members</span>
                </div>
                <Progress value={58} />
                <div className="flex justify-between text-sm">
                  <span>Monthly Active</span>
                  <span>1,156 members</span>
                </div>
                <Progress value={85} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Event Participation</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conferences</span>
                  <span>92% attendance</span>
                </div>
                <Progress value={92} />
                <div className="flex justify-between text-sm">
                  <span>Workshops</span>
                  <span>78% attendance</span>
                </div>
                <Progress value={78} />
                <div className="flex justify-between text-sm">
                  <span>Webinars</span>
                  <span>65% attendance</span>
                </div>
                <Progress value={65} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
