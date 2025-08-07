"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, CreditCard, Gift, Calendar, DollarSign, Download, Settings, LogOut, Heart, Plus, History, Target, Users, GraduationCap, Rocket } from 'lucide-react'
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { addToSubCollection, setToSubCollection } from "@/functions/add-to-a-sub-collection"
import Loader from "@/components/loader"

export default function MemberPortalPage() {
  const [donationDialogOpen, setDonationDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [donationType, setDonationType] = useState("")
  const [donationAmount, setDonationAmount] = useState<any>(0)
  const [donationNote, setDonationNote] = useState("")
  const { userInfo, donations, offers, user } = useAuth()
  const [depositId, setDepositId] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRegisteringLoading, setIsRegisteringLoadin] = useState(false)

  // Fixed amounts for different donation types
  const fixedAmounts = {
    membership: 65500,
    sponsorship: 250000,
    mission: 655000, // Example fixed amount for mission contribution
  }

  // Mock member data
  const memberData = {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    memberNumber: "NMD-2025-001",
    joinDate: "January 15, 2025",
    country: "Cameroon",
    profession: "Software Engineer",
    status: "Active",
    totalContributed: 125000, // in XAF
  }

  // Mock donation history
  const donationHistory = [
    {
      id: 1,
      date: "2025-01-15",
      type: "Membership Payment",
      amount: 30000,
      status: "Completed",
      description: "Annual membership fee"
    },
    {
      id: 2,
      date: "2025-01-20",
      type: "Student Sponsorship",
      amount: 30000,
      status: "Completed",
      description: "Sponsorship for Marie Kamga"
    },
    {
      id: 3,
      date: "2025-02-01",
      type: "General Donation",
      amount: 25000,
      status: "Completed",
      description: "Support for Mission 237"
    },
    {
      id: 4,
      date: "2025-02-15",
      type: "Mission Contribution",
      amount: 50000,
      status: "Completed",
      description: "Mission 237 development fund"
    }
  ]

  const memberOffers = [
    {
      image: "/assets/introductionSpaceMission.png",
      id: "testing",
      title: "Introduction to space mission design",
      description: "Learn the basics of space missions conception and design",
      date: "March 15-17, 2025",
      status: "Available",
      type: "Training",
    },
  ]

  const handleDonationTypeChange = (type: string) => {
    setDonationType(type)
    // Set fixed amount for non-donation types, clear amount for donation
    if (type === "donation") {
      setDonationAmount("")
    } else if (type === "membership") {
      setDonationAmount(fixedAmounts.membership)
    } else if (type === "sponsorship") {
      setDonationAmount(fixedAmounts.sponsorship)
    } else if (type === "mission") {
      setDonationAmount(fixedAmounts.mission)
    }
  }

  const handleDonation = () => {
    // Handle donation submission
    console.log("Donation submitted:", { donationType, donationAmount, donationNote })
    setDonationDialogOpen(false)
    // Reset form
    setDonationType("")
    setDonationAmount("")
    setDonationNote("")
  }

  const getDonationTypeIcon = (type: string) => {
    switch (type) {
      case "donation":
        return <Heart className="h-4 w-4" />
      case "membership":
        return <User className="h-4 w-4" />
      case "sponsorship":
        return <GraduationCap className="h-4 w-4" />
      case "mission":
        return <Rocket className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDonationTypeDescription = (type: string) => {
    switch (type) {
      case "donation":
        return "Support our general activities and mission"
      case "membership":
        return "Annual membership fee - 65,500 XAF"
      case "sponsorship":
        return "Sponsor a student's training - 250,000 XAF"
      case "mission":
        return "Contribute to the first Mission 237 development - 655,000 XAF"
      default:
        return ""
    }
  }

    useEffect(() => {
      const savedDepositId = localStorage.getItem("depositId");
      if (savedDepositId) {
        setDepositId(savedDepositId);
      }
    }, []);
  
    useEffect(() => {
      let intervalId: NodeJS.Timeout;
  
      if (depositId) {
        intervalId = setInterval(async () => {
          try {
            const response = await fetch(`/api/pawapay/deposits?depositId=${depositId}`);
            const data = await response.json();
            const status = data[0]?.status || data.status;
            console.log(status)
            console.log(depositId)
            
            if (status === "COMPLETED") {
              clearInterval(intervalId);
  
              // Retrieve form data after payment
              const savedFormData = localStorage.getItem("pendingDonationData");
              console.log(savedFormData)
              if (savedFormData) {
                const pendingDonationData = JSON.parse(savedFormData);
                console.log(pendingDonationData)
                // Create the account here
                try {
                  if(!user) {
                    console.log(user)
                    console.log(userInfo)
                    return null
                  }
                  await addToSubCollection(
                    {
                      amount: pendingDonationData.donationAmount,
                      type: pendingDonationData.donationType === "donation"
                        ? "Donation"
                        : pendingDonationData.donationType === "mission"
                        ? "Mission Support"
                        : pendingDonationData.donationType === "sponsorship"
                        ? "Student Sponsorship"
                        : "Membership",
                      status: "completed",
                      description: pendingDonationData.donationType === "donation"
                        ? "General donation made"
                        : pendingDonationData.donationType === "mission"
                        ? "Contribution to the mission"
                        : pendingDonationData.donationType === "sponsorship"
                        ? "Sponsorship for a student"
                        : "Yearly membership payment",
                    },
                    "users",
                    user.uid,
                    "donations"
                  );
  
                  toast.success("New user has been added successfully");
  
                  // Reset form and close dialog
                  setDonationType("")
                  setDonationAmount("")
                  setDonationNote("")
  
                // Clear localStorage
                localStorage.removeItem("depositId");
                localStorage.removeItem("pendingDonationData");
                setDepositId("")
                toast.success("Donation completed successfully!");
                setLoading(false)
                } catch (error) {
                  toast.error("Failed to create user. Please try again.",);
                }
              }
  
              toast.success("Donation completed successfully!");
            }
            else if(status === undefined){
              toast.error("Le paiement a échoué, veuillez recommencer.");
              localStorage.removeItem("depositId");
              setDepositId("")
              localStorage.removeItem("pendingDonationData");
              setLoading(false)
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            clearInterval(intervalId);
          }
        }, 10000);
      }
  
      return () => clearInterval(intervalId);
    }, [depositId, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = JSON.stringify({
      amount: donationAmount,
      currentUrl: "https://npo.nanosatellitemissions.com//member-portal",
      product: donationType
    });

    try {
      setLoading(true)
      const res = await fetch("/api/pawapay/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      // Save depositId in localStorage
      localStorage.setItem("depositId", data.depositId);
      setDepositId(data.depositId);

      // Optional: Save any form data so you can still create the account after refresh
      localStorage.setItem("pendingDonationData", JSON.stringify({donationType: donationType, donationAmount: donationAmount, donationNote: donationNote}));

      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      }

      toast.success("Please complete the payment on your mobile device.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleRegister = async (offer: any) => {
    try {
      setIsRegisteringLoadin(true)
      const response = await fetch("/api/lms/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          displayName: userInfo.name,
        }),
      });
      await setToSubCollection(offer.id, offer, "users", userInfo.uid, "offers")
      setIsRegisteringLoadin(false)

    } catch (error) {
        toast.error("Failed to create user. Please try again.",);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
            {depositId && <Loader />}
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Member Portal</h1>
                <p className="text-gray-600">Welcome, {userInfo?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Member Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-6">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{userInfo?.name}</h2>
                  <p className="text-blue-100">{userInfo?.profession}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Member number:</span>
                    <span className="font-semibold">{userInfo?.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Member since:</span>
                    <span className="font-semibold">
                      {userInfo?.createdAt && "toDate" in userInfo.createdAt && (
                        <p>{userInfo.createdAt.toDate().toLocaleString()}</p>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Country:</span>
                    <span className="font-semibold">{userInfo?.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Voting Member:</span>
                    <Badge className="bg-green-500 text-white">{donations.reduce((sum, item) => sum + item.amount, 0) > 80000 ? "Yes" : "Non"}</Badge>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-2" />
                  Download Card
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Donation Dialog */}
              <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Make a Donation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Make a Donation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div>
                      <Label htmlFor="donation-type" className="text-gray-900 font-medium">
                        Donation Type
                      </Label>
                      <Select onValueChange={handleDonationTypeChange}>
                        <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select donation type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="donation">General Donation</SelectItem>
                          <SelectItem value="membership">Membership Payment</SelectItem>
                          <SelectItem value="sponsorship">Student Sponsorship</SelectItem>
                          <SelectItem value="mission">Mission Contribution</SelectItem>
                        </SelectContent>
                      </Select>
                      {donationType && (
                        <p className="text-sm text-gray-600 mt-2">
                          {getDonationTypeDescription(donationType)}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="amount" className="text-gray-900 font-medium">
                        Amount (XAF)
                      </Label>
                      {donationType === "donation" ? (
                        <Input
                          id="amount"
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter amount"
                        />
                      ) : (
                        <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-900 font-semibold">
                              {donationAmount ? Number.parseInt(donationAmount).toLocaleString() : "0"} XAF
                            </span>
                            <span className="text-sm text-gray-600">Fixed amount</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="note" className="text-gray-900 font-medium">
                        Note (Optional)
                      </Label>
                      <Textarea
                        id="note"
                        value={donationNote}
                        onChange={(e) => setDonationNote(e.target.value)}
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Add a note for your donation..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setDonationDialogOpen(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                        disabled={!donationType || !donationAmount}
                      >
                        {donationType === "donation" ? "Donate" : 
                         donationType === "membership" ? "Pay Membership" :
                         donationType === "sponsorship" ? "Sponsor Student" :
                         donationType === "mission" ? "Contribute to Mission" : "Proceed"} 
                        {donationAmount && ` - ${Number.parseInt(donationAmount).toLocaleString()} XAF`}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Donation History Dialog */}
              <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 flex-1">
                    <History className="h-4 w-4 mr-2" />
                    Donation History
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900">Donation History</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {donations.map((donation) => (
                        <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                {getDonationTypeIcon(donation.type.toLowerCase().split(' ')[0])}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{donation.type}</h4>
                                <p className="text-sm text-gray-600">{donation.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{donation.amount.toLocaleString()} XAF</p>
                              <Badge className={getStatusColor("donation.status")}>
                                {donation.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                            <span>ID: #{donation.id}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total Contributed:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {donations.reduce((sum, item) => sum + item.amount, 0)} XAF
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Total Contributed */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Total Contributed</h3>
                      <p className="text-gray-600">Your lifetime contributions to NMD ASSOCIATION</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      {donations.reduce((sum, item) => sum + item.amount, 0)} XAF
                    </p>
                    <p className="text-sm text-gray-600">~{donations.reduce((sum, item) => sum + item.amount, 0)} EUR</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Member Offers */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Gift className="h-5 w-5 mr-2 text-purple-600" />
                  My Exclusive Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(!offers.length && (
                    memberOffers.length > 0) ? (
                      memberOffers.map((offer, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-start gap-4"
                        >
                          {/* Image on the left */}
                          <div className="w-full md:w-40 h-32 overflow-hidden rounded-lg flex-shrink-0">
                            <img
                              src={offer.image || "/placeholder.jpg"}
                              alt={offer.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>

                          {/* Content on the right */}
                          <div className="flex-1 flex flex-col justify-between">
                            {/* Title + Description + Status Badge */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{offer.title}</h3>
                                <p className="text-gray-600 text-sm">{offer.description}</p>
                              </div>
                              <Badge
                                className={
                                  offer.status === "Available"
                                    ? "bg-green-100 text-green-800"
                                    : offer.status === "Registered"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {offer.status}
                              </Badge>
                            </div>

                            {/* Footer: Date, Type & Button */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {offer.date}
                                </div>
                                <Badge variant="outline">{offer.type}</Badge>
                              </div>

                              <Button
                                size="sm"
                                className={
                                  offer.status === "Available"
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : offer.status === "Registered"
                                    ? "bg-gray-100 text-gray-600"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                                disabled={offer.status !== "Available" || isRegisteringLoading}
                                onClick={() => handleRegister(offer)}
                              >
                                {offer.status === "Available"
                                  ? "Register"
                                  : offer.status === "Registered"
                                  ? "Registered"
                                  : "Pending"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 px-6 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No offers available</h3>
                        <p className="text-gray-600">You currently don’t have any available member offers.</p>
                      </div>
                    )
                  )}

                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <Target className="h-4 w-4 mr-2" />
                    Join Mission 237
                  </Button>
                  <Button className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100">
                    <Users className="h-4 w-4 mr-2" />
                    Refer a Friend
                  </Button>
                  <Button className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100">
                    <User className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card> */}

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trainings completed</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students sponsored</span>
                    <span className="font-semibold text-gray-900">{donations.filter((donation) => donation.type === "Student Sponsorship").length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total donations</span>
                    <span className="font-semibold text-gray-900">{donations.reduce((sum, item) => sum + item.amount, 0)} XAF</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
