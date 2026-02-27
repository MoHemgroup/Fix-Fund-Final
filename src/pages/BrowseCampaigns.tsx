import { useState } from "react";
import { campaigns, ISSUE_LABELS, IssueType } from "@/data/demo-data";
import CampaignCard from "@/components/CampaignCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const issueTypes: IssueType[] = ["plumbing", "mold", "heating", "electrical", "roofing", "structural", "pest", "appliance"];

const BrowseCampaigns = () => {
  const [search, setSearch] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<IssueType | "all">("all");

  const filtered = campaigns.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.story.toLowerCase().includes(search.toLowerCase());
    const matchIssue = selectedIssue === "all" || c.issueType === selectedIssue;
    return matchSearch && matchIssue;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero py-12">
        <div className="container">
          <h1 className="mb-2 font-display text-3xl text-primary-foreground md:text-4xl">
            Browse Campaigns
          </h1>
          <p className="mb-6 text-primary-foreground/80">
            Find verified repair campaigns and make a direct impact.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by city, issue, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-none"
            />
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge
            variant={selectedIssue === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedIssue("all")}
          >
            All Issues
          </Badge>
          {issueTypes.map((t) => (
            <Badge
              key={t}
              variant={selectedIssue === t ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedIssue(t)}
            >
              {ISSUE_LABELS[t]}
            </Badge>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No campaigns found. Try adjusting your search.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCampaigns;
