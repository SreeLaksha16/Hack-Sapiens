import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Leaf, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantUploadProps {
  onImageUpload: (file: File) => void;
}

export const PlantUpload = ({ onImageUpload }: PlantUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300",
            isDragActive 
              ? "border-primary bg-accent/50 scale-105" 
              : "border-muted-foreground/30 hover:border-primary hover:bg-accent/20"
          )}
        >
          <input {...getInputProps()} />
          
          {uploadedImage ? (
            <div className="space-y-4">
              <img 
                src={uploadedImage} 
                alt="Uploaded plant" 
                className="max-h-48 mx-auto rounded-lg shadow-md"
              />
              <div className="flex items-center justify-center gap-2 text-success">
                <Leaf className="w-5 h-5" />
                <span className="font-medium">Image uploaded successfully!</span>
              </div>
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedImage(null);
                }}
              >
                Upload Different Image
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {isDragActive ? (
                    <Upload className="w-12 h-12 text-primary animate-bounce" />
                  ) : (
                    <Camera className="w-12 h-12 text-primary" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Upload Plant Image</h3>
                <p className="text-muted-foreground">
                  Drop your plant leaf image here or click to browse
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Supports JPG, PNG, WEBP files</span>
              </div>
              
              <Button variant="default" size="lg" className="mx-auto">
                <Camera className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};