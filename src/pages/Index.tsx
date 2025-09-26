import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlantUpload } from '@/components/PlantUpload';
import { DiseaseResults } from '@/components/DiseaseResults';
import { 
  Leaf, 
  Shield, 
  Zap, 
  Globe,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Camera
} from 'lucide-react';
import heroImage from '@/assets/hero-plant-health.jpg';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock disease results for demonstration
  const mockResults = [
    {
      id: '1',
      name: 'Early Blight',
      confidence: 0.89,
      severity: 'mild' as const,
      description: 'Early blight is a common fungal disease affecting tomatoes and potatoes. It typically appears as dark spots with concentric rings on older leaves.',
      symptoms: [
        'Dark brown spots on leaves',
        'Concentric rings in spots',
        'Yellow halos around spots',
        'Leaf yellowing and drop'
      ],
      treatment: [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation around plants',
        'Water at soil level, not on leaves'
      ],
      prevention: [
        'Rotate crops annually',
        'Provide adequate spacing between plants',
        'Mulch around plants to prevent soil splash',
        'Choose disease-resistant varieties'
      ]
    }
  ];

  const handleImageUpload = (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Detection',
      description: 'Upload a photo and get instant disease identification using advanced machine learning'
    },
    {
      icon: Shield,
      title: 'Treatment Guidance',
      description: 'Receive specific treatment recommendations and prevention strategies'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get analysis results in seconds, not days'
    },
    {
      icon: Globe,
      title: 'Available Anywhere',
      description: 'Access from any device, perfect for field work'
    }
  ];

  if (analysisResults && uploadedFile) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setAnalysisResults(null);
                setUploadedFile(null);
              }}
              className="mb-4"
            >
              ← Analyze Another Plant
            </Button>
          </div>
          
          <DiseaseResults 
            results={analysisResults} 
            imageUrl={URL.createObjectURL(uploadedFile)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold">PlantHealth</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  Protect Your Crops with
                  <span className="text-primary block">AI-Powered Detection</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Detect plant diseases early, get instant treatment recommendations, 
                  and prevent crop losses with our advanced AI technology.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2">
                  <Camera className="w-5 h-5" />
                  Start Detection
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>99% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Free to Use</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Healthy plant leaves with technology overlay"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Analyze Your Plant in 3 Simple Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload a clear photo of your plant leaf, and our AI will identify diseases 
              and provide treatment recommendations in seconds.
            </p>
          </div>
          
          <PlantUpload onImageUpload={handleImageUpload} />
          
          {isAnalyzing && (
            <div className="text-center mt-8 space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                <span className="text-primary font-medium">
                  Analyzing your plant image...
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI is examining the image for disease indicators
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose PlantHealth?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced AI technology meets agricultural expertise to protect your crops
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Protect Your Plants?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of farmers using AI to detect diseases early and prevent crop losses.
            </p>
            <Button size="lg" className="gap-2">
              <Camera className="w-5 h-5" />
              Start Free Analysis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">PlantHealth</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 PlantHealth. Protecting crops with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;