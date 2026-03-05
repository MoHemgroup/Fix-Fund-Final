import { useParams, Link } from "react-router-dom";
import { campaigns, ISSUE_LABELS, ISSUE_ICONS, STATUS_LABELS } from "@/data/demo-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FundingProgress from "@/components/FundingProgress";
import {
  CheckCircle, AlertTriangle, Shield, Users, Clock, ArrowLeft,
  MapPin, Wrench, Calendar, DollarSign, Heart
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CampaignDetail = () => {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id === id);
  const [donateOpen, setDonateOpen] = useState(false);
  const [amount, setAmount] = useState("");

  if (!campaign) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 font-display text-2xl">Campaign not found</h1>
          <Button variant="outline" asChild>
            <Link to="/campaigns"><ArrowLeft className="mr-2 h-4 w-4" />Back to campaigns</Link>
          </Button>
        </div>
      </div>
    );
  }

  const remaining = campaign.goal - campaign.funded;

  const handleDonate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    toast.success(`Thank you for your $${amount} donation! (Demo — no payment processed)`);
    setDonateOpen(false);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <Link to="/campaigns" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to campaigns
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero area */}
            <div className="mb-6 flex h-56 items-center justify-center rounded-lg bg-gradient-warm md:h-72">
              <span className="text-7xl">{ISSUE_ICONS[campaign.issueType]}</span>
            </div>

            {/* Badges */}
            <div className="mb-4 flex flex-wrap gap-2">
              {campaign.verified && (
                <Badge className="gap-1 bg-primary text-primary-foreground">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
              {campaign.urgent && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" /> Urgent
                </Badge>
              )}
              <Badge variant="secondary">{ISSUE_LABELS[campaign.issueType]}</Badge>
              <Badge variant="outline">{STATUS_LABELS[campaign.status]}</Badge>
            </div>

            <h1 className="mb-4 font-display text-2xl text-foreground md:text-3xl">
              {campaign.title}
            </h1>

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {campaign.neighborhood}, {campaign.city}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Created by {campaign.tenantName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {new Date(campaign.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Story */}
            <div className="mb-8">
              <h2 className="mb-3 font-display text-xl text-foreground">Their Story</h2>
              <p className="leading-relaxed text-muted-foreground">{campaign.story}</p>
            </div>

            {/* Scope */}
            <div className="mb-8 rounded-lg border bg-card p-5">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg text-card-foreground">
                <Wrench className="h-5 w-5 text-primary" /> Repair Scope
              </h2>
              <p className="mb-2 text-sm text-muted-foreground">{campaign.scopeSummary}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Contractor:</span> {campaign.contractorName}
              </p>
            </div>

            {/* Transparency */}
            <div className="mb-8 rounded-lg border border-primary/20 bg-secondary p-5">
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg text-secondary-foreground">
                <Shield className="h-5 w-5" /> Transparency Guarantee
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  Funds held in escrow — never sent to tenant
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  Paid directly to licensed contractor after completion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  Before & after photos shared upon completion
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  10% platform fee covers verification & coordination
                </li>
              </ul>
            </div>

            {/* Updates */}
            {campaign.updates.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-xl text-foreground">Updates</h2>
                <div className="space-y-4">
                  {campaign.updates.map((u) => (
                    <div key={u.id} className="flex gap-3 rounded-lg border bg-card p-4">
                      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm text-foreground">{u.text}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(u.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-card">
              <FundingProgress funded={campaign.funded} goal={campaign.goal} size="md" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-muted p-3 text-center">
                  <p className="font-display text-xl text-foreground">{campaign.donorCount}</p>
                  <p className="text-xs text-muted-foreground">Donors</p>
                </div>
                <div className="rounded-md bg-muted p-3 text-center">
                  <p className="font-display text-xl text-foreground">
                    {campaign.daysLeft > 0 ? campaign.daysLeft : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                </div>
              </div>

              {remaining > 0 && campaign.status === "live" && (
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">${remaining.toLocaleString()}</span> still needed
                </p>
              )}

              {campaign.status === "live" && (
                <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full" size="lg">
                      <Heart className="mr-2 h-5 w-5" />
                      Donate Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-display">Make a Donation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Your donation goes directly to fund this repair. Funds are held in escrow and paid to the contractor upon completion.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[25, 50, 100, 250].map((a) => (
                          <Button
                            key={a}
                            variant={amount === String(a) ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAmount(String(a))}
                          >
                            ${a}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <Button className="w-full" onClick={handleDonate} disabled={!amount}>
                        Donate ${amount || "0"}
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        Demo mode — no payment will be processed.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {campaign.status === "completed" && (
                <div className="mt-4 rounded-md bg-success/10 p-3 text-center">
                  <CheckCircle className="mx-auto mb-1 h-6 w-6 text-success" />
                  <p className="text-sm font-medium text-foreground">Repair Completed!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
