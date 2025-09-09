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
import {
  Users,
  Rocket,
  Calendar,
  Activity,
  Globe,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useAdminContext } from "@/context/admin-context";
import { useEffect, useState } from "react";
import { getACollection } from "@/functions/get-a-collection";

const recentActivities = [
  {
    id: 1,
    type: "member",
    message: "New member registration: Dr. Sarah Johnson",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    type: "project",
    message: "Project 'Mars Rover Initiative' milestone completed",
    time: "4 hours ago",
    status: "success",
  },
  {
    id: 3,
    type: "event",
    message: "Space Education Workshop scheduled for next week",
    time: "6 hours ago",
    status: "info",
  },
  {
    id: 4,
    type: "alert",
    message: "Server maintenance required for website",
    time: "1 day ago",
    status: "warning",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Space Technology Conference",
    date: "March 15, 2024",
    attendees: 150,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Youth Space Camp",
    date: "March 22, 2024",
    attendees: 45,
    status: "planning",
  },
  {
    id: 3,
    title: "Advisory Board Meeting",
    date: "March 28, 2024",
    attendees: 12,
    status: "confirmed",
  },
];

export default function AdminDashboard() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    // const unsubscribeDonations = listenToSubCollection("users", user.uid, "donations", setDonations)
    // const unsubscribeOffers = listenToSubCollection("users", user.uid, "offers", setOffers)
    const unsubscribeMembers = getACollection("users", setMembers);

    return () => {
      if (unsubscribeMembers) unsubscribeMembers();
    };
  }, []);

  const stats = [
    {
      title: "Total Members",
      value: members?.length ?? 0,
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Contribution",
      value: "-",
      change: "coming soon",
      changeType: "positive" as const,
      icon: Rocket,
    },
    {
      title: "Upcoming Events",
      value: "-",
      change: "coming soon",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Website Visitors",
      value: "-",
      change: "coming soon",
      changeType: "positive" as const,
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Admin
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with NPO NMD today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType !== "neutral"
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities {members?.length ?? 0}
            </CardTitle>
            <CardDescription>
              Latest updates and activities across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-card-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Events scheduled for the coming weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {event.attendees} attendees
                    </span>
                    <Badge
                      variant={
                        event.status === "confirmed" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Manage Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for efficient management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2">
              <Users className="h-5 w-5" />
              Add Member
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Rocket className="h-5 w-5" />
              New Project
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Calendar className="h-5 w-5" />
              Schedule Event
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <BookOpen className="h-5 w-5" />
              Create Content
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      {/* <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-yellow-800">
              • Server maintenance scheduled for this weekend (March 16-17)
            </p>
            <p className="text-sm text-yellow-800">
              • Database backup completed successfully
            </p>
            <p className="text-sm text-yellow-800">
              • 3 pending member applications require review
            </p>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
