import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Home className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">FixFund</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Connecting renters in need with donors who care. Every dollar goes directly to verified repairs.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/campaigns" className="hover:text-foreground">Browse Campaigns</Link></li>
            <li><Link to="/create" className="hover:text-foreground">Request Repair</Link></li>
            <li><Link to="/" className="hover:text-foreground">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">Trust & Safety</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Verified campaigns only</li>
            <li>Funds held in escrow</li>
            <li>Direct contractor payment</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-body text-sm font-semibold text-foreground">Transparency</h4>
          <p className="text-sm text-muted-foreground">
            10% platform fee covers verification, escrow management, and contractor coordination. 90% goes to repairs.
          </p>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 FixFund. All rights reserved. No tenant pays a dime.
      </div>
    </div>
  </footer>
);

export default Footer;
