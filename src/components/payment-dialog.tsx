import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/auth-context"
import { setToCollection } from "@/functions/add-to-collection"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CheckCircle, CreditCard, User } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { useTranslations } from "@/lib/useTranslations"

interface PaymentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription: string;
  amount: number;
  type: string
}

export default function PaymentDialog({ open, setOpen, dialogTitle, dialogDescription, amount, type } : PaymentDialogProps ){
    const [units, setUnits] = useState(1)
    const t = useTranslations()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        voting: false,
        country: "",
        profession: "",
        motivation: "",
        agreeTerms: false,
        payYearlyMembership: false,
      })
      const [depositId, setDepositId] = useState("")
      const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const {login} = useAuth()
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(amount*units)
        const body = JSON.stringify({
          amount: amount*units,
          currentUrl: "https://npo.nanosatellitemissions.com//get-involved",
          product: "Membership"
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
          localStorage.setItem("pendingFormData", JSON.stringify(formData));
    
          if (data?.redirectUrl) {
            window.location.href = data.redirectUrl;
          }
    
          toast.success("Please complete the payment on your mobile device.");
        } catch (error) {
          toast.error((error as Error).message);
        }
    };
    

    return(
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>
                    {dialogDescription}
                </DialogDescription>
                </DialogHeader>
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                    <Card className="border-0 shadow-lg bg-white">
                        <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Email */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                <Label htmlFor="name" className="text-gray-900 font-medium">{t('contact.form.fullName')} *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                </div>
                                <div>
                                <Label htmlFor="email" className="text-gray-900 font-medium">{t('contact.form.email')} *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                </div>
                            </div>

                            {/* Country & Profession */}
                            <div className="grid md:grid-cols-2 gap-20">
                                <div className="w-full">
                                <Label htmlFor="country" className="text-gray-900 font-medium">{t('becomeMember.form.country')} *</Label>
                                <Select
                                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                                >
                                    <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                    <SelectValue placeholder="Sélectionnez votre pays" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-200">
                                    <SelectItem value="cameroon">Cameroun</SelectItem>
                                    <SelectItem value="senegal">Sénégal</SelectItem>
                                    <SelectItem value="ivory-coast">Côte d'Ivoire</SelectItem>
                                    <SelectItem value="mali">Mali</SelectItem>
                                    <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                                    <SelectItem value="niger">Niger</SelectItem>
                                    <SelectItem value="chad">Tchad</SelectItem>
                                    <SelectItem value="gabon">Gabon</SelectItem>
                                    <SelectItem value="congo">Congo</SelectItem>
                                    <SelectItem value="drc">RD Congo</SelectItem>
                                    <SelectItem value="other">Autre pays africain</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>

                                <div>
                                <Label htmlFor="profession" className="text-gray-900 font-medium">{t('becomeMember.form.profession')} *</Label>
                                <Input
                                    id="profession"
                                    type="text"
                                    value={formData.profession}
                                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder={t('becomeMember.form.professionPlaceholder')}
                                    required
                                />
                                </div>
                            </div>

                            {/* Contribution Section */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                                <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                    <CreditCard className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{t('common.fees')}</h3>
                                    <p className="text-gray-600">{t('common.fees')}</p>
                                </div>
                                </div>

                                <div className="text-center bg-white p-6 rounded-xl border-2 border-blue-200">
                                <p className="text-4xl font-bold text-blue-600 mb-2">{amount} FCFA</p>
                                <p className="text-gray-600 mb-4">{type==="mission" ? "~1000 EUR | 1160 USD" : type==="student" ? "~385 EUR | 445 USD" : ""}</p>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>Compte membre inclus</span>
                                </div>
                                </div>

                                {/* Unit Input */}
                                {type!=="don" &&
                                    <div className="mt-4">
                                        <Label htmlFor="units" className="text-gray-900 font-medium">
                                            Nombre d'unités *
                                        </Label>
                                        <Input
                                            id="units"
                                            type="number"
                                            min={1}
                                            value={units || 1}
                                            onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
                                            className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                }
                                
                                {/* Total Calculation */}
                                <div className="mt-2 text-lg font-semibold text-blue-700">
                                Total : {(amount * (units || 1))} FCFA
                                </div>

                                {/* Membership Perks */}
                                <div className="mt-6 space-y-3 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>{t('becomeMember.form.automaticAccount')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>{t('becomeMember.form.digitalCard')}</span>
                                </div>
                                {formData.voting && (
                                    <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>Droits de vote pour les décisions importantes</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>{t('becomeMember.form.exclusiveOffers')}</span>
                                </div>
                                </div>
                            </div>

                            {/* Agreements */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                id="terms"
                                checked={formData.agreeTerms}
                                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                                />
                                <Label htmlFor="terms" className="text-gray-600 text-sm leading-relaxed">
                                {t('becomeMember.form.agreeTerms')}
                                </Label>
                            </div>

                            {/* Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 h-14 text-lg"
                                disabled={!formData.agreeTerms}
                            >
                                {t('common.contributeNow')}
                                <CheckCircle className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                        </CardContent>
                    </Card>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    )
}