import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Droplets, 
  Sun, 
  Shield,
  BookOpen,
  Download
} from 'lucide-react';

interface DiseaseResult {
  id: string;
  name: string;
  confidence: number;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

interface DiseaseResultsProps {
  results: DiseaseResult[];
  imageUrl: string;
}

export const DiseaseResults = ({ results, imageUrl }: DiseaseResultsProps) => {
  const primaryResult = results[0];
  
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Leaf className="w-6 h-6 text-primary" />
                Detection Results
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={getSeverityColor(primaryResult.severity) as any}
                  className="capitalize"
                >
                  {primaryResult.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(primaryResult.confidence * 100)}% confidence
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Save Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={imageUrl} 
                alt="Analyzed plant" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">
                  {primaryResult.description}
                </p>
              </div>
              
              {primaryResult.symptoms.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Symptoms
                  </h4>
                  <ul className="text-sm space-y-1">
                    {primaryResult.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment & Prevention Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Treatment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {primaryResult.treatment.map((treatment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{treatment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Prevention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {primaryResult.prevention.map((prevention, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sun className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{prevention}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Results */}
      {results.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Alternative Possibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.slice(1, 4).map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {React.createElement(getSeverityIcon(result.severity), {
                      className: "w-4 h-4 text-muted-foreground"
                    })}
                    <span className="font-medium">{result.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};