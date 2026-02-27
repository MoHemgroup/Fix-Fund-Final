import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ISSUE_LABELS, ISSUE_ICONS, IssueType } from "@/data/demo-data";
import { ArrowLeft, ArrowRight, CheckCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const issueTypes: IssueType[] = ["plumbing", "mold", "heating", "electrical", "roofing", "structural", "pest", "appliance"];

const CreateRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    issueType: "" as IssueType | "",
    title: "",
    story: "",
    urgency: "medium" as "low" | "medium" | "high",
    city: "",
    consent: false,
  });

  const totalSteps = 4;

  const canNext = () => {
    if (step === 1) return form.issueType !== "";
    if (step === 2) return form.title.length > 5 && form.story.length > 20;
    if (step === 3) return form.city.length > 1;
    if (step === 4) return form.consent;
    return false;
  };

  const handleSubmit = () => {
    toast.success("Your repair request has been submitted! Our team will review it within 48 hours.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-10">
        <div className="container">
          <h1 className="mb-2 font-display text-3xl text-primary-foreground">
            Request Repair Help
          </h1>
          <p className="text-primary-foreground/80">
            Tell us about your repair need. It takes about 5 minutes. You'll never pay a dime.
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  i + 1 <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1 < step ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`h-0.5 w-8 ${i + 1 < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
        </div>

        <div className="mx-auto max-w-xl">
          {/* Step 1: Issue Type */}
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="mb-2 font-display text-2xl text-foreground">What needs fixing?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Select the type of repair you need.</p>
              <div className="grid grid-cols-2 gap-3">
                {issueTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, issueType: t })}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      form.issueType === t
                        ? "border-primary bg-secondary shadow-card"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <span className="text-2xl">{ISSUE_ICONS[t]}</span>
                    <span className="text-sm font-medium text-foreground">{ISSUE_LABELS[t]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Story */}
          {step === 2 && (
            <div className="animate-fade-up space-y-4">
              <h2 className="mb-2 font-display text-2xl text-foreground">Tell your story</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Help donors understand your situation. Be honest and specific.
              </p>
              <div>
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Broken heating for family of 4"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="story">Your Story</Label>
                <Textarea
                  id="story"
                  placeholder="Describe the issue, how long it's been going on, how it affects your household, and what your landlord's response has been..."
                  rows={6}
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                />
              </div>
              <div>
                <Label>Urgency Level</Label>
                <div className="mt-2 flex gap-2">
                  {(["low", "medium", "high"] as const).map((u) => (
                    <Badge
                      key={u}
                      variant={form.urgency === u ? "default" : "outline"}
                      className="cursor-pointer capitalize"
                      onClick={() => setForm({ ...form, urgency: u })}
                    >
                      {u}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Photos / Video (optional)</Label>
                <div className="mt-2 flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-muted-foreground hover:border-primary/40">
                  <div className="text-center text-sm">
                    <Upload className="mx-auto mb-1 h-5 w-5" />
                    Click to upload
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="animate-fade-up space-y-4">
              <h2 className="mb-2 font-display text-2xl text-foreground">Your Location</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Your exact address stays private. Only your city and neighborhood are shown to donors.
              </p>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="e.g., Chicago"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Full Address (private — for verification only)</Label>
                <Input id="address" placeholder="123 Main St, Apt 4B" />
              </div>
              <div className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  Your full address is never shared with donors. It's used only for verification and contractor scheduling.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="animate-fade-up space-y-4">
              <h2 className="mb-2 font-display text-2xl text-foreground">Review & Submit</h2>
              <div className="rounded-lg border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{form.issueType && ISSUE_ICONS[form.issueType]}</span>
                  <Badge variant="secondary">{form.issueType && ISSUE_LABELS[form.issueType]}</Badge>
                  <Badge variant={form.urgency === "high" ? "destructive" : "outline"} className="capitalize">
                    {form.urgency} urgency
                  </Badge>
                </div>
                <h3 className="font-display text-lg text-card-foreground">{form.title}</h3>
                <p className="text-sm text-muted-foreground">{form.story}</p>
                <p className="text-sm text-muted-foreground">📍 {form.city}</p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={(v) => setForm({ ...form, consent: v === true })}
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground leading-snug">
                  I confirm that I am a tenant at this address and have the right to request repair assistance. 
                  I understand that my identity and address will be verified privately before any campaign is published.
                </label>
              </div>

              <div className="rounded-lg bg-gradient-warm p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">What happens next?</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Our team reviews your request within 48 hours</li>
                  <li>We verify your identity and address privately</li>
                  <li>A contractor visits to assess and quote the repair</li>
                  <li>Your campaign goes live once everything is verified</li>
                </ol>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canNext()}>
                Submit Request <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
