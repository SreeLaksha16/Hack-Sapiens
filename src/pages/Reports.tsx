import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Heart, Droplets, Flame, Dumbbell } from "lucide-react";
import { getRecords, getDemoData, getDailyCalories, getDailyWaterIntake, getBMICategory } from "@/lib/bmi-storage";

export default function ReportsPage() {
  const records = useMemo(() => {
    const r = getRecords();
    return r.length > 0 ? r : getDemoData();
  }, []);

  const latest = records[records.length - 1];

  const recommendation = (cat: string) => {
    switch (cat) {
      case "Underweight": return "Focus on calorie-dense, nutritious foods. Consider strength training and consult a dietitian for a personalized meal plan.";
      case "Normal": return "Excellent! Maintain your healthy habits with balanced nutrition and regular physical activity. Keep monitoring your health.";
      case "Overweight": return "Gradually reduce calorie intake and increase physical activity. Focus on whole foods, lean proteins, and vegetables.";
      case "Obese": return "Consider consulting a healthcare professional. Start with gentle exercise and focus on sustainable dietary changes.";
      default: return "";
    }
  };

  const exportPDF = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head><title>Health Report - Upgraded Lifestyle</title>
      <style>body{font-family:system-ui;padding:40px;max-width:700px;margin:auto}h1{color:#6c47ff}h2{color:#333;margin-top:24px}.card{border:1px solid #ddd;border-radius:12px;padding:20px;margin:12px 0}.label{color:#666;font-size:14px}.value{font-size:24px;font-weight:bold}</style></head>
      <body><h1>🏥 Health Report</h1><p>Generated: ${new Date().toLocaleDateString()}</p>
      <div class="card"><div class="label">Name</div><div>${latest.name}</div></div>
      <div class="card"><div class="label">BMI</div><div class="value">${latest.bmi.toFixed(1)}</div><div>Category: ${latest.category}</div></div>
      <div class="card"><div class="label">Details</div><div>Age: ${latest.age} | Sex: ${latest.sex} | Height: ${latest.heightCm}cm | Weight: ${latest.weightKg}kg</div><div>Goal: ${latest.healthGoal} | Activity: ${latest.activityLevel}</div></div>
      <h2>Recommendation</h2><p>${recommendation(latest.category)}</p>
      <h2>Daily Targets</h2><p>Calories: ${getDailyCalories(latest.bmi, latest.sex, latest.activityLevel, latest.healthGoal)} kcal</p><p>Water: ${getDailyWaterIntake(latest.weightKg)}L</p>
      <script>window.print()</script></body></html>
    `);
    w.document.close();
  };

  const catColor = (cat: string) => {
    switch (cat) {
      case "Underweight": return "bg-warning/20 text-warning border-warning";
      case "Normal": return "bg-success/20 text-success border-success";
      case "Overweight": return "bg-warning/20 text-warning border-warning";
      case "Obese": return "bg-destructive/20 text-destructive border-destructive";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Report</h1>
        <p className="text-muted-foreground">Your latest health summary and recommendations</p>
      </div>

      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" /> Latest BMI Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary">{latest.bmi.toFixed(1)}</div>
              <Badge className={`mt-2 ${catColor(latest.category)}`}>{latest.category}</Badge>
            </div>
            <div className="flex-1 space-y-1 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {latest.name}</p>
              <p><span className="text-muted-foreground">Age:</span> {latest.age} | <span className="text-muted-foreground">Sex:</span> {latest.sex}</p>
              <p><span className="text-muted-foreground">Height:</span> {latest.heightCm}cm | <span className="text-muted-foreground">Weight:</span> {latest.weightKg}kg</p>
              <p><span className="text-muted-foreground">Goal:</span> {latest.healthGoal} | <span className="text-muted-foreground">Activity:</span> {latest.activityLevel}</p>
              <p><span className="text-muted-foreground">Date:</span> {latest.date}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg mb-6">
        <CardHeader><CardTitle>Daily Targets</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted">
              <Flame className="h-6 w-6 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">{getDailyCalories(latest.bmi, latest.sex, latest.activityLevel, latest.healthGoal)}</div>
              <div className="text-xs text-muted-foreground">kcal/day</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted">
              <Droplets className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">{getDailyWaterIntake(latest.weightKg)}L</div>
              <div className="text-xs text-muted-foreground">water/day</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted">
              <Dumbbell className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{latest.activityLevel === "Sedentary" ? "30" : latest.activityLevel === "Light" ? "45" : "60"}+</div>
              <div className="text-xs text-muted-foreground">min exercise</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg mb-6">
        <CardHeader><CardTitle>Recommendation</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{recommendation(latest.category)}</p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={exportPDF} className="gradient-primary text-primary-foreground">
          <Download className="h-4 w-4 mr-2" /> Export Report as PDF
        </Button>
      </div>
    </div>
  );
}
