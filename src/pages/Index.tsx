import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, DollarSign, Wrench, Heart, ArrowRight, CheckCircle, Users, Building } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import { campaigns } from "@/data/demo-data";
const heroImage = "https://images.unsplash.com/photo-1606788075819-9574a6edfab3?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const stats = [
  { label: "Repairs Funded", value: "$127,000+", icon: DollarSign },
  { label: "Families Helped", value: "100+", icon: Users },
  { label: "Contractors Vetted", value: "34", icon: Wrench },
];

const steps = [
  {
    num: "01",
    title: "Submit Your Repair Need",
    desc: "Tell us what's broken — plumbing, mold, heat, electrical. Upload photos and describe the issue. It takes 5 minutes.",
    icon: Building,
  },
  {
    num: "02",
    title: "We Verify & Get a Quote",
    desc: "Our team verifies your identity and address privately, then matches you with a licensed contractor who provides a fixed quote.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Donors Fund the Repair",
    desc: "Your campaign goes live. Donors fund the repair directly — you pay nothing. Funds are held in escrow until work is complete.",
    icon: Heart,
  },
  {
    num: "04",
    title: "Repair Gets Done",
    desc: "The contractor completes the work, uploads proof, and gets paid directly. You confirm completion. That's it.",
    icon: Wrench,
  },
];

const Index = () => {
  const featured = campaigns.filter((c) => c.status === "live").slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="mb-4 font-display text-4xl leading-tight text-primary-foreground md:text-6xl md:leading-tight">
              Safe homes shouldn't be a luxury
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              FixStarter connects renters with verified repair needs to donors who fund the fix.
              Every dollar goes directly to a vetted contractor. Tenants pay $0.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/campaigns">
                  <Heart className="mr-2 h-5 w-5" />
                  Fund a Repair
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/create">
                  I Need Help
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-card">
        <div className="container grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 py-6 md:justify-center md:py-8">
              <s.icon className="h-8 w-8 text-primary" />
              <div>
                <p className="font-display text-2xl text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl text-foreground md:text-4xl">How FixStarter Works</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              No cash to tenants. No burden on landlords. Just verified repairs funded by people who care.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-lg border bg-card p-6 shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <step.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Step {step.num}
                </p>
                <h3 className="mb-2 font-display text-lg text-card-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-gradient-warm py-10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Every campaign verified
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Funds held in escrow
            </span>
            <span className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Paid directly to contractor
            </span>
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Tenant pays $0
            </span>
          </div>
        </div>
      </section>

      {/* Featured campaigns */}
      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="mb-2 font-display text-3xl text-foreground">Active Campaigns</h2>
              <p className="text-muted-foreground">Real families, verified needs, transparent funding.</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link to="/campaigns">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl text-primary-foreground md:text-4xl">
            Everyone deserves a safe home
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
            Whether you're a renter in need, a donor who cares, or a contractor who wants to help — there's a place for you here.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/campaigns">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/create">Request Repair Help</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
