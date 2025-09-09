"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Space Technology Conference 2024",
    description:
      "Annual conference showcasing latest space technology developments",
    date: "2024-03-15",
    time: "09:00",
    location: "Lagos Convention Center, Nigeria",
    attendees: 150,
    maxAttendees: 200,
    status: "confirmed",
    type: "conference",
  },
  {
    id: 2,
    title: "Youth Space Camp",
    description: "Educational camp for young space enthusiasts",
    date: "2024-03-22",
    time: "10:00",
    location: "Cape Town Space Center, South Africa",
    attendees: 45,
    maxAttendees: 50,
    status: "planning",
    type: "workshop",
  },
  {
    id: 3,
    title: "Advisory Board Meeting",
    description: "Quarterly meeting with advisory board members",
    date: "2024-03-28",
    time: "14:00",
    location: "Virtual Meeting",
    attendees: 12,
    maxAttendees: 15,
    status: "confirmed",
    type: "meeting",
  },
  {
    id: 4,
    title: "Satellite Launch Viewing",
    description: "Public viewing event for satellite launch",
    date: "2024-04-05",
    time: "06:00",
    location: "Nairobi Observatory, Kenya",
    attendees: 89,
    maxAttendees: 100,
    status: "confirmed",
    type: "public",
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Events</h2>
          <p className="text-muted-foreground">
            Manage conferences, workshops, and community events
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Schedule a new event for the community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Event Title" />
              <Textarea placeholder="Event Description" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" placeholder="Event Date" />
                <Input type="time" placeholder="Event Time" />
              </div>
              <Input placeholder="Location" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Max Attendees" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="public">Public Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Create Event</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">296</div>
                <p className="text-sm text-muted-foreground">Total Attendees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">3</div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <p className="text-sm text-muted-foreground">Locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.description}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {event.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                    <div className="w-20 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${
                            (event.attendees / event.maxAttendees) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.status === "confirmed"
                          ? "default"
                          : event.status === "planning"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
