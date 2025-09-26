import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Leaf, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

interface StatsData {
  totalScans: number;
  healthyPlants: number;
  diseasesDetected: number;
  weeklyGrowth: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      title: "Total Scans",
      value: stats.totalScans,
      icon: Leaf,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Healthy Plants",
      value: stats.healthyPlants,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Diseases Found",
      value: stats.diseasesDetected,
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Weekly Growth",
      value: `+${stats.weeklyGrowth}%`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.title === "Weekly Growth" && (
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                from last week
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};