import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Calculator, BarChart3, MessageCircle, FileText, ArrowRight, Heart, Sparkles } from "lucide-react";

const features = [
  { icon: Calculator, title: "BMI Calculator", desc: "Calculate your BMI with personalized health advice", to: "/bmi", color: "text-primary" },
  { icon: BarChart3, title: "Health Insights", desc: "Interactive charts and analytics from your health data", to: "/insights", color: "text-accent" },
  { icon: MessageCircle, title: "AI Coach", desc: "Chat with your AI wellness coach for tips and guidance", to: "/chat", color: "text-wellness" },
  { icon: FileText, title: "Reports", desc: "View and export your health reports as PDF", to: "/reports", color: "text-success" },
];

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" /> Your Personal Health Dashboard
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Upgrade Your <span className="bg-gradient-to-r from-primary to-wellness bg-clip-text text-transparent">Lifestyle</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Track your BMI, get AI-powered health advice, visualize your progress with interactive charts, and take control of your wellness journey.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/bmi">
            <Button size="lg" className="gradient-primary text-primary-foreground">
              <Calculator className="h-5 w-5 mr-2" /> Calculate BMI
            </Button>
          </Link>
          <Link to="/chat">
            <Button size="lg" variant="outline">
              <MessageCircle className="h-5 w-5 mr-2" /> Talk to AI Coach
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <Link key={f.to} to={f.to}>
              <Card className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer">
                <CardContent className="p-6">
                  <f.icon className={`h-10 w-10 mb-4 ${f.color}`} />
                  <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
                  <span className="text-primary text-sm font-medium flex items-center gap-1">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-4 w-4 text-destructive" />
          <span className="font-semibold text-foreground">Upgraded Lifestyle</span>
        </div>
        <p>Your health, your data, your journey. © 2026</p>
      </footer>
    </div>
  );
}
