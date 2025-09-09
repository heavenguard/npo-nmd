"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";

const members = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "Lagos, Nigeria",
    role: "Space Engineer",
    status: "active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "m.chen@university.edu",
    phone: "+1 (555) 234-5678",
    location: "Cape Town, South Africa",
    role: "Research Director",
    status: "active",
    joinDate: "2022-11-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Dr. Amara Okafor",
    email: "amara.okafor@space.org",
    phone: "+1 (555) 345-6789",
    location: "Nairobi, Kenya",
    role: "Mission Specialist",
    status: "pending",
    joinDate: "2024-02-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Eng. David Mbeki",
    email: "d.mbeki@tech.com",
    phone: "+1 (555) 456-7890",
    location: "Accra, Ghana",
    role: "Systems Analyst",
    status: "active",
    joinDate: "2023-08-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Members</h2>
          <p className="text-muted-foreground">
            Manage organization members and their roles
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Add a new member to the organization
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Location" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineer">Space Engineer</SelectItem>
                  <SelectItem value="researcher">Research Director</SelectItem>
                  <SelectItem value="specialist">Mission Specialist</SelectItem>
                  <SelectItem value="analyst">Systems Analyst</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button className="flex-1">Add Member</Button>
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
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">1,198</div>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">49</div>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">23</div>
            <p className="text-sm text-muted-foreground">New This Month</p>
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
                placeholder="Search members..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {member.location}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "active"
                          ? "default"
                          : member.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
