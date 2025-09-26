import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardStats } from '@/components/DashboardStats';
import { 
  Leaf, 
  Plus, 
  Calendar, 
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [recentScans] = useState([
    {
      id: '1',
      plantName: 'Tomato Plant #1',
      date: '2024-01-15',
      result: 'Early Blight',
      severity: 'mild',
      image: '/placeholder-plant.jpg'
    },
    {
      id: '2',
      plantName: 'Rose Bush #2',
      date: '2024-01-14',
      result: 'Healthy',
      severity: 'healthy',
      image: '/placeholder-plant.jpg'
    },
    {
      id: '3',
      plantName: 'Pepper Plant #3',
      date: '2024-01-13',
      result: 'Leaf Spot',
      severity: 'moderate',
      image: '/placeholder-plant.jpg'
    }
  ]);

  const stats = {
    totalScans: 47,
    healthyPlants: 32,
    diseasesDetected: 15,
    weeklyGrowth: 12
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'success';
      case 'mild': return 'warning';
      case 'moderate': return 'warning';
      case 'severe': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'healthy': return CheckCircle;
      case 'mild': return AlertTriangle;
      case 'moderate': return AlertTriangle;
      case 'severe': return AlertTriangle;
      default: return Leaf;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                Plant Health Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Monitor your plant health and track disease detection results
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Plus className="w-4 h-4" />
              New Scan
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Scans
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => {
                const SeverityIcon = getSeverityIcon(scan.severity);
                return (
                  <div 
                    key={scan.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{scan.plantName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {scan.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={getSeverityColor(scan.severity) as any}
                        className="flex items-center gap-1"
                      >
                        <SeverityIcon className="w-3 h-3" />
                        {scan.result}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                View All Scans
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Scan New Plant</h3>
              <p className="text-sm text-muted-foreground">
                Upload a photo to detect diseases
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">View Reports</h3>
              <p className="text-sm text-muted-foreground">
                Access detailed health reports
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Disease Library</h3>
              <p className="text-sm text-muted-foreground">
                Learn about plant diseases
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;