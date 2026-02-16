import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Target, Activity, FileText, Heart } from "lucide-react";
import { getRecords, getDemoData } from "@/lib/bmi-storage";

export default function ProfilePage() {
  const records = useMemo(() => {
    const r = getRecords();
    return r.length > 0 ? r : getDemoData();
  }, []);

  const latest = records[records.length - 1];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <div className="h-24 w-24 rounded-full gradient-wellness mx-auto flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">{latest.name}</h1>
        <p className="text-muted-foreground">Wellness Enthusiast</p>
      </div>

      <div className="grid gap-4">
        <Card className="shadow-lg">
          <CardHeader><CardTitle className="text-base">Personal Info</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><span className="text-xs text-muted-foreground block">Age</span><span className="font-semibold">{latest.age}</span></div>
            <div><span className="text-xs text-muted-foreground block">Sex</span><span className="font-semibold">{latest.sex}</span></div>
            <div><span className="text-xs text-muted-foreground block">Height</span><span className="font-semibold">{latest.heightCm} cm</span></div>
            <div><span className="text-xs text-muted-foreground block">Weight</span><span className="font-semibold">{latest.weightKg} kg</span></div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader><CardTitle className="text-base">Wellness Summary</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Health Goal</div>
              <Badge variant="secondary">{latest.healthGoal}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-accent" /> Activity Level</div>
              <Badge variant="secondary">{latest.activityLevel}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-destructive" /> Latest BMI</div>
              <Badge>{latest.bmi.toFixed(1)} — {latest.category}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> Total Records</div>
              <Badge variant="outline">{records.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
