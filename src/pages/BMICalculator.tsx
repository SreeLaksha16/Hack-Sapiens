import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles, Droplets, Flame, Dumbbell } from "lucide-react";
import { calculateBMI, getBMICategory, saveRecord, getDailyCalories, getDailyWaterIntake, type BMIRecord } from "@/lib/bmi-storage";
import { getBMIAdvice } from "@/lib/ai-chat";

export default function BMICalculatorPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [healthGoal, setHealthGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [result, setResult] = useState<BMIRecord | null>(null);
  const [advice, setAdvice] = useState("");

  const handleCalculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);
    if (!name || !h || !w || !a || !sex || !healthGoal || !activityLevel) return;

    const bmi = calculateBMI(w, h);
    const category = getBMICategory(bmi);
    const record: BMIRecord = {
      id: crypto.randomUUID(),
      name, age: a, sex, heightCm: h, weightKg: w,
      bmi, category, healthGoal, activityLevel,
      date: new Date().toISOString().split("T")[0],
      exerciseMinutes: Math.floor(Math.random() * 60) + 10,
    };
    saveRecord(record);
    setResult(record);
    setAdvice("");
  };

  const handleAdvice = () => {
    if (result) setAdvice(getBMIAdvice(result));
  };

  const categoryColor = (cat: string) => {
    switch (cat) {
      case "Underweight": return "bg-warning/20 text-warning-foreground border-warning";
      case "Normal": return "bg-success/20 text-success border-success";
      case "Overweight": return "bg-warning/20 text-warning border-warning";
      case "Obese": return "bg-destructive/20 text-destructive border-destructive";
      default: return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
        <p className="text-muted-foreground">Calculate your Body Mass Index and get personalized health advice</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Your Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Age</Label><Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25" /></div>
              <div>
                <Label>Sex</Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170" /></div>
              <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" /></div>
            </div>
            <div>
              <Label>Health Goal</Label>
              <Select value={healthGoal} onValueChange={setHealthGoal}>
                <SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger>
                <SelectContent><SelectItem value="Lose Weight">Lose Weight</SelectItem><SelectItem value="Maintain">Maintain</SelectItem><SelectItem value="Gain Weight">Gain Weight</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent><SelectItem value="Sedentary">Sedentary</SelectItem><SelectItem value="Light">Light</SelectItem><SelectItem value="Moderate">Moderate</SelectItem><SelectItem value="Active">Active</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleCalculate} className="flex-1 gradient-primary text-primary-foreground">
                <Calculator className="h-4 w-4 mr-2" /> Calculate BMI
              </Button>
              <Button onClick={handleAdvice} variant="outline" disabled={!result} className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" /> AI Advice
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {result && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">{result.bmi.toFixed(1)}</div>
                  <Badge className={`text-sm px-4 py-1 ${categoryColor(result.category)}`}>{result.category}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <Flame className="h-5 w-5 mx-auto mb-1 text-warning" />
                    <div className="text-lg font-bold">{getDailyCalories(result.bmi, result.sex, result.activityLevel, result.healthGoal)}</div>
                    <div className="text-xs text-muted-foreground">kcal/day</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <Droplets className="h-5 w-5 mx-auto mb-1 text-accent" />
                    <div className="text-lg font-bold">{getDailyWaterIntake(result.weightKg)}L</div>
                    <div className="text-xs text-muted-foreground">water/day</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted">
                    <Dumbbell className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-lg font-bold">{result.activityLevel === "Sedentary" ? "30" : result.activityLevel === "Light" ? "45" : "60"}+</div>
                    <div className="text-xs text-muted-foreground">min/day</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {advice && (
            <Card className="shadow-lg border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> AI Health Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{advice}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
