import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart3, PieChart as PieIcon, TrendingUp, Activity } from "lucide-react";
import { getDataForCharts } from "@/lib/bmi-storage";

const COLORS = ["hsl(40, 90%, 55%)", "hsl(155, 65%, 45%)", "hsl(250, 70%, 58%)", "hsl(0, 72%, 55%)"];

export default function HealthInsightsPage() {
  const data = useMemo(() => getDataForCharts(), []);

  const ageGroupData = useMemo(() => {
    const groups: Record<string, { total: number; count: number }> = {
      "10–20": { total: 0, count: 0 },
      "21–30": { total: 0, count: 0 },
      "31–40": { total: 0, count: 0 },
      "41–50": { total: 0, count: 0 },
      "51+": { total: 0, count: 0 },
    };
    data.forEach(r => {
      const key = r.age <= 20 ? "10–20" : r.age <= 30 ? "21–30" : r.age <= 40 ? "31–40" : r.age <= 50 ? "41–50" : "51+";
      groups[key].total += r.bmi;
      groups[key].count += 1;
    });
    return Object.entries(groups).map(([name, v]) => ({ name, avgBMI: v.count ? +(v.total / v.count).toFixed(1) : 0 }));
  }, [data]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = { Underweight: 0, Normal: 0, Overweight: 0, Obese: 0 };
    data.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const scatterData = useMemo(() => data.filter(r => r.exerciseMinutes).map(r => ({ exercise: r.exerciseMinutes, bmi: +r.bmi.toFixed(1) })), [data]);

  const trendData = useMemo(() => data.slice().sort((a, b) => a.date.localeCompare(b.date)).map(r => ({ date: r.date, bmi: +r.bmi.toFixed(1) })), [data]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Health Insights</h1>
        <p className="text-muted-foreground">Analytics from {data.length} BMI records</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> BMI by Age Group</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="avgBMI" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><PieIcon className="h-5 w-5 text-primary" /> BMI Category Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> BMI vs Exercise (min)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="exercise" name="Exercise (min)" fontSize={12} />
                <YAxis dataKey="bmi" name="BMI" fontSize={12} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={scatterData} fill="hsl(var(--accent))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> BMI Trend Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" fontSize={10} />
                <YAxis fontSize={12} domain={["auto", "auto"]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bmi" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
