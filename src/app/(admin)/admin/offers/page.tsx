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
  Gift,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Users,
  Eye,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

interface Offer {
  id: string;
  title: string;
  description: string;
  type: "Training" | "Job" | "Partnership" | "Collaboration";
  requirements: string;
  deadline: string;
  status: "Open" | "Closed" | "Draft" | "Under Review";
  maxParticipants?: number;
  currentParticipants: number;
  createdDate: string;
  image?: string;
}

export default function OffersManagementPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Training" as "Training" | "Job" | "Partnership" | "Collaboration",
    requirements: "",
    deadline: "",
    status: "Draft" as "Open" | "Closed" | "Draft" | "Under Review",
    maxParticipants: "",
    image: "",
  });

  // Mock data
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Introduction to Space Mission Design",
      description:
        "Learn the basics of space missions conception and design through hands-on workshops and expert guidance.",
      type: "Training",
      requirements:
        "Basic engineering background, interest in space technology",
      deadline: "2025-03-15",
      status: "Open",
      maxParticipants: 25,
      currentParticipants: 12,
      createdDate: "2025-01-15",
      image: "/assets/introductionSpaceMission.png",
    },
    {
      id: "2",
      title: "CubeSat Development Internship",
      description:
        "6-month internship program working on real CubeSat projects with our engineering team.",
      type: "Job",
      requirements:
        "Engineering student, programming skills in Python/C++, passion for space",
      deadline: "2025-04-01",
      status: "Open",
      maxParticipants: 5,
      currentParticipants: 3,
      createdDate: "2025-02-01",
    },
    {
      id: "3",
      title: "University Partnership Program",
      description:
        "Collaborate with universities to develop space education curricula and research programs.",
      type: "Partnership",
      requirements:
        "Accredited university, space/engineering programs, research facilities",
      deadline: "2025-05-30",
      status: "Under Review",
      currentParticipants: 8,
      createdDate: "2025-01-20",
    },
    {
      id: "4",
      title: "Satellite Data Analysis Workshop",
      description:
        "Advanced workshop on processing and analyzing satellite imagery and telemetry data.",
      type: "Training",
      requirements:
        "Programming experience, basic understanding of remote sensing",
      deadline: "2025-03-30",
      status: "Draft",
      maxParticipants: 20,
      currentParticipants: 0,
      createdDate: "2025-02-10",
    },
  ]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "Training",
      requirements: "",
      deadline: "",
      status: "Draft",
      maxParticipants: "",
      image: "",
    });
  };

  const handleAdd = () => {
    const newOffer: Offer = {
      id: Date.now().toString(),
      ...formData,
      maxParticipants: formData.maxParticipants
        ? Number.parseInt(formData.maxParticipants)
        : undefined,
      currentParticipants: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setOffers([...offers, newOffer]);
    setAddDialogOpen(false);
    resetForm();
    toast.success("Offer created successfully");
  };

  const handleEdit = () => {
    if (!selectedOffer) return;

    const updatedOffers = offers.map((offer) =>
      offer.id === selectedOffer.id
        ? {
            ...offer,
            ...formData,
            maxParticipants: formData.maxParticipants
              ? Number.parseInt(formData.maxParticipants)
              : undefined,
          }
        : offer
    );
    setOffers(updatedOffers);
    setEditDialogOpen(false);
    setSelectedOffer(null);
    resetForm();
    toast.success("Offer updated successfully");
  };

  const handleDelete = (id: string) => {
    setOffers(offers.filter((offer) => offer.id !== id));
    toast.success("Offer deleted successfully");
  };

  const openEditDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      type: offer.type,
      requirements: offer.requirements,
      deadline: offer.deadline,
      status: offer.status,
      maxParticipants: offer.maxParticipants?.toString() || "",
      image: offer.image || "",
    });
    setEditDialogOpen(true);
  };

  const openViewDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Training":
        return <GraduationCap className="h-4 w-4" />;
      case "Job":
        return <Briefcase className="h-4 w-4" />;
      case "Partnership":
        return <Users className="h-4 w-4" />;
      case "Collaboration":
        return <Gift className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || offer.status === statusFilter;
    const matchesType = typeFilter === "all" || offer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return <>Coming Soon</>;

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     {/* Header */}
  //     <div className="bg-white border-b border-gray-200">
  //       <div className="max-w-7xl mx-auto px-4 py-6">
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center space-x-4">
  //             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
  //               <Gift className="h-6 w-6 text-white" />
  //             </div>
  //             <div>
  //               <h1 className="text-2xl font-bold text-gray-900">
  //                 Offers Management
  //               </h1>
  //               <p className="text-gray-600">
  //                 Manage training programs, job opportunities, and partnerships
  //               </p>
  //             </div>
  //           </div>

  //           <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
  //             <DialogTrigger asChild>
  //               <Button className="bg-blue-600 hover:bg-blue-700 text-white">
  //                 <Plus className="h-4 w-4 mr-2" />
  //                 Create Offer
  //               </Button>
  //             </DialogTrigger>
  //             <DialogContent className="sm:max-w-2xl bg-white">
  //               <DialogHeader>
  //                 <DialogTitle className="text-gray-900">
  //                   Create New Offer
  //                 </DialogTitle>
  //               </DialogHeader>
  //               <div className="space-y-4 py-4">
  //                 <div>
  //                   <Label
  //                     htmlFor="title"
  //                     className="text-gray-900 font-medium"
  //                   >
  //                     Title
  //                   </Label>
  //                   <Input
  //                     id="title"
  //                     value={formData.title}
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, title: e.target.value })
  //                     }
  //                     className="mt-2"
  //                     placeholder="Enter offer title"
  //                   />
  //                 </div>

  //                 <div>
  //                   <Label
  //                     htmlFor="description"
  //                     className="text-gray-900 font-medium"
  //                   >
  //                     Description
  //                   </Label>
  //                   <Textarea
  //                     id="description"
  //                     value={formData.description}
  //                     onChange={(e) =>
  //                       setFormData({
  //                         ...formData,
  //                         description: e.target.value,
  //                       })
  //                     }
  //                     className="mt-2"
  //                     placeholder="Detailed description of the offer"
  //                     rows={3}
  //                   />
  //                 </div>

  //                 <div className="grid grid-cols-2 gap-4">
  //                   <div>
  //                     <Label
  //                       htmlFor="type"
  //                       className="text-gray-900 font-medium"
  //                     >
  //                       Type
  //                     </Label>
  //                     <Select
  //                       value={formData.type}
  //                       onValueChange={(value: any) =>
  //                         setFormData({ ...formData, type: value })
  //                       }
  //                     >
  //                       <SelectTrigger className="mt-2">
  //                         <SelectValue />
  //                       </SelectTrigger>
  //                       <SelectContent className="bg-white">
  //                         <SelectItem value="Training">Training</SelectItem>
  //                         <SelectItem value="Job">Job Opportunity</SelectItem>
  //                         <SelectItem value="Partnership">
  //                           Partnership
  //                         </SelectItem>
  //                         <SelectItem value="Collaboration">
  //                           Collaboration
  //                         </SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                   </div>
  //                   <div>
  //                     <Label
  //                       htmlFor="status"
  //                       className="text-gray-900 font-medium"
  //                     >
  //                       Status
  //                     </Label>
  //                     <Select
  //                       value={formData.status}
  //                       onValueChange={(value: any) =>
  //                         setFormData({ ...formData, status: value })
  //                       }
  //                     >
  //                       <SelectTrigger className="mt-2">
  //                         <SelectValue />
  //                       </SelectTrigger>
  //                       <SelectContent className="bg-white">
  //                         <SelectItem value="Draft">Draft</SelectItem>
  //                         <SelectItem value="Open">Open</SelectItem>
  //                         <SelectItem value="Under Review">
  //                           Under Review
  //                         </SelectItem>
  //                         <SelectItem value="Closed">Closed</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                   </div>
  //                 </div>

  //                 <div>
  //                   <Label
  //                     htmlFor="requirements"
  //                     className="text-gray-900 font-medium"
  //                   >
  //                     Requirements
  //                   </Label>
  //                   <Textarea
  //                     id="requirements"
  //                     value={formData.requirements}
  //                     onChange={(e) =>
  //                       setFormData({
  //                         ...formData,
  //                         requirements: e.target.value,
  //                       })
  //                     }
  //                     className="mt-2"
  //                     placeholder="List the requirements for this offer"
  //                     rows={2}
  //                   />
  //                 </div>

  //                 <div className="grid grid-cols-2 gap-4">
  //                   <div>
  //                     <Label
  //                       htmlFor="deadline"
  //                       className="text-gray-900 font-medium"
  //                     >
  //                       Deadline
  //                     </Label>
  //                     <Input
  //                       id="deadline"
  //                       type="date"
  //                       value={formData.deadline}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, deadline: e.target.value })
  //                       }
  //                       className="mt-2"
  //                     />
  //                   </div>
  //                   <div>
  //                     <Label
  //                       htmlFor="maxParticipants"
  //                       className="text-gray-900 font-medium"
  //                     >
  //                       Max Participants (Optional)
  //                     </Label>
  //                     <Input
  //                       id="maxParticipants"
  //                       type="number"
  //                       value={formData.maxParticipants}
  //                       onChange={(e) =>
  //                         setFormData({
  //                           ...formData,
  //                           maxParticipants: e.target.value,
  //                         })
  //                       }
  //                       className="mt-2"
  //                       placeholder="Leave empty for unlimited"
  //                     />
  //                   </div>
  //                 </div>

  //                 <div>
  //                   <Label
  //                     htmlFor="image"
  //                     className="text-gray-900 font-medium"
  //                   >
  //                     Image URL (Optional)
  //                   </Label>
  //                   <Input
  //                     id="image"
  //                     value={formData.image}
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, image: e.target.value })
  //                     }
  //                     className="mt-2"
  //                     placeholder="URL for offer image"
  //                   />
  //                 </div>

  //                 <div className="flex gap-3 pt-4">
  //                   <Button
  //                     onClick={() => setAddDialogOpen(false)}
  //                     variant="outline"
  //                     className="flex-1"
  //                   >
  //                     Cancel
  //                   </Button>
  //                   <Button
  //                     onClick={handleAdd}
  //                     className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
  //                     disabled={!formData.title || !formData.description}
  //                   >
  //                     Create Offer
  //                   </Button>
  //                 </div>
  //               </div>
  //             </DialogContent>
  //           </Dialog>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="max-w-7xl mx-auto px-4 py-8">
  //       {/* Stats Cards */}
  //       <div className="grid md:grid-cols-4 gap-6 mb-8">
  //         <Card className="border-0 shadow-lg bg-white">
  //           <CardContent className="p-6">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-gray-600 text-sm">Total Offers</p>
  //                 <p className="text-2xl font-bold text-gray-900">
  //                   {offers.length}
  //                 </p>
  //               </div>
  //               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
  //                 <Gift className="h-6 w-6 text-blue-600" />
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="border-0 shadow-lg bg-white">
  //           <CardContent className="p-6">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-gray-600 text-sm">Open Offers</p>
  //                 <p className="text-2xl font-bold text-green-600">
  //                   {offers.filter((o) => o.status === "Open").length}
  //                 </p>
  //               </div>
  //               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
  //                 <Calendar className="h-6 w-6 text-green-600" />
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="border-0 shadow-lg bg-white">
  //           <CardContent className="p-6">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-gray-600 text-sm">Total Participants</p>
  //                 <p className="text-2xl font-bold text-purple-600">
  //                   {offers.reduce((sum, o) => sum + o.currentParticipants, 0)}
  //                 </p>
  //               </div>
  //               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
  //                 <Users className="h-6 w-6 text-purple-600" />
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card className="border-0 shadow-lg bg-white">
  //           <CardContent className="p-6">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-gray-600 text-sm">Training Programs</p>
  //                 <p className="text-2xl font-bold text-orange-600">
  //                   {offers.filter((o) => o.type === "Training").length}
  //                 </p>
  //               </div>
  //               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
  //                 <GraduationCap className="h-6 w-6 text-orange-600" />
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </div>

  //       {/* Search and Filters */}
  //       <Card className="border-0 shadow-lg bg-white mb-6">
  //         <CardContent className="p-6">
  //           <div className="flex flex-col md:flex-row gap-4">
  //             <div className="flex-1">
  //               <div className="relative">
  //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
  //                 <Input
  //                   placeholder="Search offers by title or description..."
  //                   value={searchTerm}
  //                   onChange={(e) => setSearchTerm(e.target.value)}
  //                   className="pl-10"
  //                 />
  //               </div>
  //             </div>
  //             <div className="flex gap-2">
  //               <Select value={typeFilter} onValueChange={setTypeFilter}>
  //                 <SelectTrigger className="w-40">
  //                   <Filter className="h-4 w-4 mr-2" />
  //                   <SelectValue placeholder="All Types" />
  //                 </SelectTrigger>
  //                 <SelectContent className="bg-white">
  //                   <SelectItem value="all">All Types</SelectItem>
  //                   <SelectItem value="Training">Training</SelectItem>
  //                   <SelectItem value="Job">Job</SelectItem>
  //                   <SelectItem value="Partnership">Partnership</SelectItem>
  //                   <SelectItem value="Collaboration">Collaboration</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //               <Select value={statusFilter} onValueChange={setStatusFilter}>
  //                 <SelectTrigger className="w-40">
  //                   <Filter className="h-4 w-4 mr-2" />
  //                   <SelectValue placeholder="All Status" />
  //                 </SelectTrigger>
  //                 <SelectContent className="bg-white">
  //                   <SelectItem value="all">All Status</SelectItem>
  //                   <SelectItem value="Open">Open</SelectItem>
  //                   <SelectItem value="Under Review">Under Review</SelectItem>
  //                   <SelectItem value="Closed">Closed</SelectItem>
  //                   <SelectItem value="Draft">Draft</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>

  //       {/* Offers Table */}
  //       <Card className="border-0 shadow-lg bg-white">
  //         <CardContent className="p-0">
  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead>Offer</TableHead>
  //                 <TableHead>Type</TableHead>
  //                 <TableHead>Participants</TableHead>
  //                 <TableHead>Deadline</TableHead>
  //                 <TableHead>Status</TableHead>
  //                 <TableHead className="text-right">Actions</TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               {filteredOffers.map((offer) => (
  //                 <TableRow key={offer.id}>
  //                   <TableCell>
  //                     <div className="flex items-center space-x-3">
  //                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
  //                         {getTypeIcon(offer.type)}
  //                       </div>
  //                       <div>
  //                         <p className="font-semibold text-gray-900">
  //                           {offer.title}
  //                         </p>
  //                         <p className="text-sm text-gray-600 line-clamp-1">
  //                           {offer.description}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </TableCell>
  //                   <TableCell>
  //                     <Badge variant="outline" className="text-xs">
  //                       {offer.type}
  //                     </Badge>
  //                   </TableCell>
  //                   <TableCell>
  //                     <div className="text-sm">
  //                       <p className="font-semibold text-gray-900">
  //                         {offer.currentParticipants}
  //                       </p>
  //                       {offer.maxParticipants && (
  //                         <p className="text-gray-600">
  //                           / {offer.maxParticipants}
  //                         </p>
  //                       )}
  //                     </div>
  //                   </TableCell>
  //                   <TableCell>
  //                     <p className="text-gray-900">
  //                       {new Date(offer.deadline).toLocaleDateString()}
  //                     </p>
  //                   </TableCell>
  //                   <TableCell>
  //                     <Badge className={getStatusColor(offer.status)}>
  //                       {offer.status}
  //                     </Badge>
  //                   </TableCell>
  //                   <TableCell className="text-right">
  //                     <div className="flex justify-end space-x-2">
  //                       <Button
  //                         variant="ghost"
  //                         size="sm"
  //                         onClick={() => openViewDialog(offer)}
  //                       >
  //                         <Eye className="h-4 w-4" />
  //                       </Button>
  //                       <Button
  //                         variant="ghost"
  //                         size="sm"
  //                         onClick={() => openEditDialog(offer)}
  //                       >
  //                         <Edit className="h-4 w-4" />
  //                       </Button>
  //                       <Button
  //                         variant="ghost"
  //                         size="sm"
  //                         onClick={() => handleDelete(offer.id)}
  //                         className="text-red-600 hover:text-red-700"
  //                       >
  //                         <Trash2 className="h-4 w-4" />
  //                       </Button>
  //                     </div>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </CardContent>
  //       </Card>
  //     </div>

  //     {/* Edit Dialog */}
  //     <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
  //       <DialogContent className="sm:max-w-2xl bg-white">
  //         <DialogHeader>
  //           <DialogTitle className="text-gray-900">Edit Offer</DialogTitle>
  //         </DialogHeader>
  //         <div className="space-y-4 py-4">
  //           <div>
  //             <Label htmlFor="edit-title" className="text-gray-900 font-medium">
  //               Title
  //             </Label>
  //             <Input
  //               id="edit-title"
  //               value={formData.title}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, title: e.target.value })
  //               }
  //               className="mt-2"
  //               placeholder="Enter offer title"
  //             />
  //           </div>

  //           <div>
  //             <Label
  //               htmlFor="edit-description"
  //               className="text-gray-900 font-medium"
  //             >
  //               Description
  //             </Label>
  //             <Textarea
  //               id="edit-description"
  //               value={formData.description}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, description: e.target.value })
  //               }
  //               className="mt-2"
  //               placeholder="Detailed description of the offer"
  //               rows={3}
  //             />
  //           </div>

  //           <div className="grid grid-cols-2 gap-4">
  //             <div>
  //               <Label
  //                 htmlFor="edit-type"
  //                 className="text-gray-900 font-medium"
  //               >
  //                 Type
  //               </Label>
  //               <Select
  //                 value={formData.type}
  //                 onValueChange={(value: any) =>
  //                   setFormData({ ...formData, type: value })
  //                 }
  //               >
  //                 <SelectTrigger className="mt-2">
  //                   <SelectValue />
  //                 </SelectTrigger>
  //                 <SelectContent className="bg-white">
  //                   <SelectItem value="Training">Training</SelectItem>
  //                   <SelectItem value="Job">Job Opportunity</SelectItem>
  //                   <SelectItem value="Partnership">Partnership</SelectItem>
  //                   <SelectItem value="Collaboration">Collaboration</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //             <div>
  //               <Label
  //                 htmlFor="edit-status"
  //                 className="text-gray-900 font-medium"
  //               >
  //                 Status
  //               </Label>
  //               <Select
  //                 value={formData.status}
  //                 onValueChange={(value: any) =>
  //                   setFormData({ ...formData, status: value })
  //                 }
  //               >
  //                 <SelectTrigger className="mt-2">
  //                   <SelectValue />
  //                 </SelectTrigger>
  //                 <SelectContent className="bg-white">
  //                   <SelectItem value="Draft">Draft</SelectItem>
  //                   <SelectItem value="Open">Open</SelectItem>
  //                   <SelectItem value="Under Review">Under Review</SelectItem>
  //                   <SelectItem value="Closed">Closed</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //           </div>

  //           <div>
  //             <Label
  //               htmlFor="edit-requirements"
  //               className="text-gray-900 font-medium"
  //             >
  //               Requirements
  //             </Label>
  //             <Textarea
  //               id="edit-requirements"
  //               value={formData.requirements}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, requirements: e.target.value })
  //               }
  //               className="mt-2"
  //               placeholder="List the requirements for this offer"
  //               rows={2}
  //             />
  //           </div>

  //           <div className="grid grid-cols-2 gap-4">
  //             <div>
  //               <Label
  //                 htmlFor="edit-deadline"
  //                 className="text-gray-900 font-medium"
  //               >
  //                 Deadline
  //               </Label>
  //               <Input
  //                 id="edit-deadline"
  //                 type="date"
  //                 value={formData.deadline}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, deadline: e.target.value })
  //                 }
  //                 className="mt-2"
  //               />
  //             </div>
  //             <div>
  //               <Label
  //                 htmlFor="edit-maxParticipants"
  //                 className="text-gray-900 font-medium"
  //               >
  //                 Max Participants (Optional)
  //               </Label>
  //               <Input
  //                 id="edit-maxParticipants"
  //                 type="number"
  //                 value={formData.maxParticipants}
  //                 onChange={(e) =>
  //                   setFormData({
  //                     ...formData,
  //                     maxParticipants: e.target.value,
  //                   })
  //                 }
  //                 className="mt-2"
  //                 placeholder="Leave empty for unlimited"
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <Label htmlFor="edit-image" className="text-gray-900 font-medium">
  //               Image URL (Optional)
  //             </Label>
  //             <Input
  //               id="edit-image"
  //               value={formData.image}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, image: e.target.value })
  //               }
  //               className="mt-2"
  //               placeholder="URL for offer image"
  //             />
  //           </div>

  //           <div className="flex gap-3 pt-4">
  //             <Button
  //               onClick={() => {
  //                 setEditDialogOpen(false);
  //                 setSelectedOffer(null);
  //                 resetForm();
  //               }}
  //               variant="outline"
  //               className="flex-1"
  //             >
  //               Cancel
  //             </Button>
  //             <Button
  //               onClick={handleEdit}
  //               className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
  //               disabled={!formData.title || !formData.description}
  //             >
  //               Update Offer
  //             </Button>
  //           </div>
  //         </div>
  //       </DialogContent>
  //     </Dialog>

  //     {/* View Dialog */}
  //     <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
  //       <DialogContent className="sm:max-w-2xl bg-white">
  //         <DialogHeader>
  //           <DialogTitle className="text-gray-900">Offer Details</DialogTitle>
  //         </DialogHeader>
  //         {selectedOffer && (
  //           <div className="py-4">
  //             <div className="flex items-start space-x-4 mb-6">
  //               <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
  //                 {getTypeIcon(selectedOffer.type)}
  //               </div>
  //               <div className="flex-1">
  //                 <h3 className="text-xl font-bold text-gray-900">
  //                   {selectedOffer.title}
  //                 </h3>
  //                 <div className="flex items-center space-x-2 mt-2">
  //                   <Badge variant="outline">{selectedOffer.type}</Badge>
  //                   <Badge className={getStatusColor(selectedOffer.status)}>
  //                     {selectedOffer.status}
  //                   </Badge>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="space-y-4">
  //               <div>
  //                 <Label className="text-gray-900 font-medium">
  //                   Description
  //                 </Label>
  //                 <p className="text-gray-600 mt-1">
  //                   {selectedOffer.description}
  //                 </p>
  //               </div>

  //               <div>
  //                 <Label className="text-gray-900 font-medium">
  //                   Requirements
  //                 </Label>
  //                 <p className="text-gray-600 mt-1">
  //                   {selectedOffer.requirements}
  //                 </p>
  //               </div>

  //               <div className="grid grid-cols-2 gap-4">
  //                 <div>
  //                   <Label className="text-gray-900 font-medium">
  //                     Deadline
  //                   </Label>
  //                   <p className="text-gray-600 mt-1">
  //                     {new Date(selectedOffer.deadline).toLocaleDateString()}
  //                   </p>
  //                 </div>
  //                 <div>
  //                   <Label className="text-gray-900 font-medium">
  //                     Participants
  //                   </Label>
  //                   <p className="text-gray-600 mt-1">
  //                     {selectedOffer.currentParticipants}
  //                     {selectedOffer.maxParticipants &&
  //                       ` / ${selectedOffer.maxParticipants}`}
  //                   </p>
  //                 </div>
  //               </div>

  //               <div>
  //                 <Label className="text-gray-900 font-medium">
  //                   Created Date
  //                 </Label>
  //                 <p className="text-gray-600 mt-1">
  //                   {new Date(selectedOffer.createdDate).toLocaleDateString()}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  // );
}
