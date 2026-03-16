import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { T__1, useSubmitLead } from "../hooks/useQueries";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  mode: "site_visit" | "property_details";
  propertyId?: bigint;
  propertyTitle?: string;
}

export default function LeadModal({
  open,
  onClose,
  mode,
  propertyId,
  propertyTitle,
}: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLead = useSubmitLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in required fields");
      return;
    }

    const messageText =
      mode === "site_visit"
        ? `Preferred Date: ${preferredDate}. ${message}`
        : message;

    try {
      await submitLead.mutateAsync({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: messageText,
        leadType:
          mode === "site_visit" ? T__1.site_visit : T__1.property_details,
        propertyId: propertyId ?? null,
      });
      setSubmitted(true);
      toast.success("Request submitted! We'll contact you shortly.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setEmail("");
    setPreferredDate("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md" data-ocid="lead_modal.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-navy">
            {mode === "site_visit"
              ? "Schedule a Site Visit"
              : "Get Property Details"}
          </DialogTitle>
          <DialogDescription>
            {propertyTitle
              ? `For: ${propertyTitle}`
              : mode === "site_visit"
                ? "We'll arrange a visit at your convenience."
                : "We'll send you all the details right away."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div
            className="flex flex-col items-center py-8 gap-4"
            data-ocid="lead_modal.success_state"
          >
            <CheckCircle className="h-14 w-14 text-green-500" />
            <p className="text-center font-medium text-navy">
              Thank you! Our team will contact you within 24 hours.
            </p>
            <Button
              onClick={handleClose}
              className="bg-navy text-white hover:bg-navy/90"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="lead-name">Full Name *</Label>
              <Input
                id="lead-name"
                data-ocid="lead_modal.input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-phone">Phone Number *</Label>
              <Input
                id="lead-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-email">Email Address</Label>
              <Input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            {mode === "site_visit" && (
              <div className="space-y-1.5">
                <Label htmlFor="lead-date">Preferred Date</Label>
                <Input
                  id="lead-date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="lead-message">Message</Label>
              <Textarea
                id="lead-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any specific requirements or questions?"
                rows={3}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-ocid="lead_modal.close_button"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="lead_modal.submit.button"
                disabled={submitLead.isPending}
                className="flex-1 bg-navy text-white hover:bg-navy/90"
              >
                {submitLead.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : mode === "site_visit" ? (
                  "Schedule Visit"
                ) : (
                  "Get Details"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
