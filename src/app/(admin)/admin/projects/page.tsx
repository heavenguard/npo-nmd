"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Rocket,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Mars Rover Initiative",
    description:
      "Development of autonomous rover technology for Mars exploration",
    status: "active",
    progress: 75,
    budget: "$2.5M",
    team: 12,
    startDate: "2023-06-01",
    endDate: "2024-12-31",
    priority: "high",
  },
  {
    id: 2,
    name: "Satellite Communication Network",
    description:
      "Building communication infrastructure for remote African regions",
    status: "active",
    progress: 45,
    budget: "$1.8M",
    team: 8,
    startDate: "2023-09-15",
    endDate: "2025-03-30",
    priority: "medium",
  },
  {
    id: 3,
    name: "Space Education Program",
    description: "Educational outreach program for African universities",
    status: "planning",
    progress: 20,
    budget: "$500K",
    team: 5,
    startDate: "2024-01-01",
    endDate: "2024-08-31",
    priority: "medium",
  },
  {
    id: 4,
    name: "Lunar Research Station",
    description: "Feasibility study for lunar base establishment",
    status: "completed",
    progress: 100,
    budget: "$3.2M",
    team: 15,
    startDate: "2022-03-01",
    endDate: "2023-11-30",
    priority: "high",
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-muted-foreground">
            Manage space initiatives and research projects
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new space initiative or research project
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Project Name" />
              <Textarea placeholder="Project Description" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Budget" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" placeholder="Start Date" />
                <Input type="date" placeholder="End Date" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Create Project</Button>
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
              <Rocket className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">23</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">$8.2M</div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">156</div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">7</div>
                <p className="text-sm text-muted-foreground">Due This Month</p>
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
                placeholder="Search projects..."
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
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {project.description}
                      </div>
                      <Badge
                        variant={
                          project.priority === "high"
                            ? "destructive"
                            : project.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="mt-1"
                      >
                        {project.priority} priority
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress value={project.progress} className="w-20" />
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.team}
                    </div>
                  </TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "active"
                          ? "default"
                          : project.status === "completed"
                          ? "secondary"
                          : project.status === "planning"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      <div className="text-muted-foreground">
                        to {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </div>
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
