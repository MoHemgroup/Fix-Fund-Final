import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Campaign, ISSUE_ICONS, ISSUE_LABELS, STATUS_LABELS } from "@/data/demo-data";
import { CheckCircle, AlertTriangle, Users, Clock } from "lucide-react";
import FundingProgress from "./FundingProgress";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const percent = Math.round((campaign.funded / campaign.goal) * 100);

  return (
    <Link
      to={`/campaigns/${campaign.id}`}
      className="group block overflow-hidden rounded-lg border bg-card shadow-card transition-all hover:shadow-card-hover"
    >
      {/* Image placeholder with issue icon */}
      <div className="relative flex h-44 items-center justify-center bg-gradient-warm">
        <span className="text-5xl">{ISSUE_ICONS[campaign.issueType]}</span>
        {campaign.urgent && (
          <div className="absolute left-3 top-3">
            <Badge variant="destructive" className="gap-1 text-xs">
              <AlertTriangle className="h-3 w-3" />
              Urgent
            </Badge>
          </div>
        )}
        {campaign.verified && (
          <div className="absolute right-3 top-3">
            <Badge className="gap-1 bg-primary text-xs text-primary-foreground">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        )}
        {campaign.status === "completed" && (
          <div className="absolute inset-0 flex items-center justify-center bg-success/80">
            <span className="font-display text-2xl text-success-foreground">✓ Completed</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {ISSUE_LABELS[campaign.issueType]}
          </Badge>
          <span className="text-xs text-muted-foreground">{campaign.city}</span>
        </div>

        <h3 className="mb-2 font-display text-lg leading-snug text-card-foreground group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>

        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {campaign.story}
        </p>

        <FundingProgress funded={campaign.funded} goal={campaign.goal} />

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {campaign.donorCount} donors
          </span>
          {campaign.daysLeft > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {campaign.daysLeft} days left
            </span>
          )}
          {campaign.status !== "live" && (
            <Badge variant="outline" className="text-xs">
              {STATUS_LABELS[campaign.status]}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
