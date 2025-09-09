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
  FileText,
  ImageIcon,
  Video,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

const content = [
  {
    id: 1,
    title: "Mars Exploration: The Next Frontier",
    type: "article",
    status: "published",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-02-15",
    views: 1250,
    category: "Research",
  },
  {
    id: 2,
    title: "Space Technology Conference Highlights",
    type: "video",
    status: "draft",
    author: "Media Team",
    publishDate: "2024-03-01",
    views: 0,
    category: "Events",
  },
  {
    id: 3,
    title: "African Space Initiative Launch",
    type: "news",
    status: "published",
    author: "Communications Team",
    publishDate: "2024-02-28",
    views: 2100,
    category: "News",
  },
  {
    id: 4,
    title: "Satellite Technology Infographic",
    type: "image",
    status: "review",
    author: "Design Team",
    publishDate: "2024-03-05",
    views: 0,
    category: "Education",
  },
];

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
      case "news":
        return FileText;
      case "image":
        return ImageIcon;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Content Management
          </h2>
          <p className="text-muted-foreground">
            Manage articles, news, media, and educational content
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>
                Add new article, news, or media content
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Content Title" />
              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Content Description or Summary" rows={4} />
              <Input placeholder="Author Name" />
              <Input type="date" placeholder="Publish Date" />
              <div className="flex gap-2">
                <Button className="flex-1">Create Content</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Save as Draft
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
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">47</div>
                <p className="text-sm text-muted-foreground">
                  Published Content
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-accent" />
              <div>
                <div className="text-2xl font-bold text-accent">25.4K</div>
                <p className="text-sm text-muted-foreground">Total Views</p>
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
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <Badge variant="outline" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.type}</Badge>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "published"
                            ? "default"
                            : item.status === "draft"
                            ? "secondary"
                            : item.status === "review"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.publishDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views.toLocaleString()}
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
