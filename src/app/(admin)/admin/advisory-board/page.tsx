"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  User,
  Building,
  Award,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface AdvisoryBoardMember {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  email: string;
  bio: string;
  photo: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
}

export default function AdvisoryBoardManagementPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<AdvisoryBoardMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    expertise: "",
    email: "",
    bio: "",
    photo: "",
    status: "Active" as "Active" | "Inactive" | "Pending",
  });

  // Mock data
  const [members, setMembers] = useState<AdvisoryBoardMember[]>([
    {
      id: "1",
      name: "Dr. Amina Hassan",
      title: "Space Systems Engineer",
      company: "African Space Research Centre",
      expertise: [
        "Satellite Design",
        "Mission Planning",
        "Systems Engineering",
      ],
      email: "amina.hassan@asrc.org",
      bio: "Dr. Hassan has over 15 years of experience in satellite mission design and has led multiple successful CubeSat projects across Africa.",
      photo: "/professional-african-woman-space-scientist.jpg",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Prof. Jean-Baptiste Kouame",
      title: "Aerospace Engineering Professor",
      company: "University of Cape Town",
      expertise: ["Aerospace Engineering", "Education", "Research"],
      email: "jb.kouame@uct.ac.za",
      bio: "Professor Kouame is a leading researcher in aerospace engineering with a focus on developing space capabilities in Africa.",
      photo: "/professional-african-man-aerospace-professor.jpg",
      status: "Active",
      joinDate: "2024-02-01",
    },
    {
      id: "3",
      name: "Sarah Okonkwo",
      title: "Technology Executive",
      company: "SpaceTech Africa",
      expertise: [
        "Business Development",
        "Technology Strategy",
        "Partnerships",
      ],
      email: "sarah.okonkwo@spacetech.africa",
      bio: "Sarah leads business development for one of Africa's fastest-growing space technology companies.",
      photo: "/professional-african-woman-technology-executive.jpg",
      status: "Pending",
      joinDate: "2024-03-10",
    },
  ]);

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      company: "",
      expertise: "",
      email: "",
      bio: "",
      photo: "",
      status: "Active",
    });
  };

  const handleAdd = () => {
    const newMember: AdvisoryBoardMember = {
      id: Date.now().toString(),
      ...formData,
      expertise: formData.expertise.split(",").map((e) => e.trim()),
      joinDate: new Date().toISOString().split("T")[0],
    };
    setMembers([...members, newMember]);
    setAddDialogOpen(false);
    resetForm();
    toast.success("Advisory board member added successfully");
  };

  const handleEdit = () => {
    if (!selectedMember) return;

    const updatedMembers = members.map((member) =>
      member.id === selectedMember.id
        ? {
            ...member,
            ...formData,
            expertise: formData.expertise.split(",").map((e) => e.trim()),
          }
        : member
    );
    setMembers(updatedMembers);
    setEditDialogOpen(false);
    setSelectedMember(null);
    resetForm();
    toast.success("Advisory board member updated successfully");
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
    toast.success("Advisory board member removed successfully");
  };

  const openEditDialog = (member: AdvisoryBoardMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      company: member.company,
      expertise: member.expertise.join(", "),
      email: member.email,
      bio: member.bio,
      photo: member.photo,
      status: member.status,
    });
    setEditDialogOpen(true);
  };

  const openViewDialog = (member: AdvisoryBoardMember) => {
    setSelectedMember(member);
    setViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Advisory Board Management
                </h1>
                <p className="text-gray-600">
                  Manage advisory board members and their information
                </p>
              </div>
            </div>

            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">
                    Add Advisory Board Member
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-gray-900 font-medium"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-2"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-gray-900 font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-2"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="title"
                        className="text-gray-900 font-medium"
                      >
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="mt-2"
                        placeholder="Professional title"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="company"
                        className="text-gray-900 font-medium"
                      >
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="mt-2"
                        placeholder="Company or organization"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="expertise"
                      className="text-gray-900 font-medium"
                    >
                      Areas of Expertise
                    </Label>
                    <Input
                      id="expertise"
                      value={formData.expertise}
                      onChange={(e) =>
                        setFormData({ ...formData, expertise: e.target.value })
                      }
                      className="mt-2"
                      placeholder="Separate with commas (e.g., Satellite Design, Mission Planning)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-gray-900 font-medium">
                      Biography
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      className="mt-2"
                      placeholder="Brief professional biography"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="photo"
                        className="text-gray-900 font-medium"
                      >
                        Photo URL
                      </Label>
                      <Input
                        id="photo"
                        value={formData.photo}
                        onChange={(e) =>
                          setFormData({ ...formData, photo: e.target.value })
                        }
                        className="mt-2"
                        placeholder="Profile photo URL"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="status"
                        className="text-gray-900 font-medium"
                      >
                        Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setAddDialogOpen(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAdd}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      disabled={!formData.name || !formData.email}
                    >
                      Add Member
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {members.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Members</p>
                  <p className="text-2xl font-bold text-green-600">
                    {members.filter((m) => m.status === "Active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {members.filter((m) => m.status === "Pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Companies</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(members.map((m) => m.company)).size}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search members by name, company, or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {member.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-900">{member.company}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.slice(0, 2).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {member.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.expertise.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-900">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(member)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-700"
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Edit Advisory Board Member
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="edit-name"
                  className="text-gray-900 font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-email"
                  className="text-gray-900 font-medium"
                >
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="edit-title"
                  className="text-gray-900 font-medium"
                >
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Professional title"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-company"
                  className="text-gray-900 font-medium"
                >
                  Company/Organization
                </Label>
                <Input
                  id="edit-company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Company or organization"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="edit-expertise"
                className="text-gray-900 font-medium"
              >
                Areas of Expertise
              </Label>
              <Input
                id="edit-expertise"
                value={formData.expertise}
                onChange={(e) =>
                  setFormData({ ...formData, expertise: e.target.value })
                }
                className="mt-2"
                placeholder="Separate with commas (e.g., Satellite Design, Mission Planning)"
              />
            </div>

            <div>
              <Label htmlFor="edit-bio" className="text-gray-900 font-medium">
                Biography
              </Label>
              <Textarea
                id="edit-bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="mt-2"
                placeholder="Brief professional biography"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="edit-photo"
                  className="text-gray-900 font-medium"
                >
                  Photo URL
                </Label>
                <Input
                  id="edit-photo"
                  value={formData.photo}
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.value })
                  }
                  className="mt-2"
                  placeholder="Profile photo URL"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-status"
                  className="text-gray-900 font-medium"
                >
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setEditDialogOpen(false);
                  setSelectedMember(null);
                  resetForm();
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                disabled={!formData.name || !formData.email}
              >
                Update Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              Advisory Board Member Details
            </DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="py-4">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedMember.name}
                  </h3>
                  <p className="text-gray-600">{selectedMember.title}</p>
                  <p className="text-gray-600">{selectedMember.company}</p>
                  <Badge className={getStatusColor(selectedMember.status)}>
                    {selectedMember.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-900 font-medium">Email</Label>
                  <p className="text-gray-600 mt-1">{selectedMember.email}</p>
                </div>

                <div>
                  <Label className="text-gray-900 font-medium">
                    Areas of Expertise
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMember.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-gray-900 font-medium">Biography</Label>
                  <p className="text-gray-600 mt-1">{selectedMember.bio}</p>
                </div>

                <div>
                  <Label className="text-gray-900 font-medium">Join Date</Label>
                  <p className="text-gray-600 mt-1">
                    {new Date(selectedMember.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
