'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bug, AlertTriangle, CheckCircle, Upload, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const diseaseDatabase = {
    earlyblight: {
      name: 'Early Blight',
      confidence: 92,
      severity: 'High',
      description: 'Fungal infection causing dark spots with concentric rings on leaves.',
      treatment: [
        'Remove infected leaves immediately',
        'Apply copper fungicide',
        'Improve air circulation',
        'Avoid overhead watering',
      ],
      prevention: ['Use resistant varieties', 'Crop rotation', 'Proper spacing', 'Monitor closely'],
      riskLevel: 'High',
      affectedCrops: ['Tomato', 'Potato'],
    },
    powderymildew: {
      name: 'Powdery Mildew',
      confidence: 78,
      severity: 'Medium',
      description: 'White powdery coating on leaves affecting photosynthesis.',
      treatment: [
        'Apply sulfur spray',
        'Use neem oil',
        'Remove heavily infected leaves',
        'Increase watering at roots',
      ],
      prevention: ['Maintain proper humidity', 'Space plants well', 'Avoid nitrogen excess'],
      riskLevel: 'Medium',
      affectedCrops: ['Grapes', 'Vegetables'],
    },
    leafspot: {
      name: 'Leaf Spot',
      confidence: 85,
      severity: 'Medium',
      description: 'Brown or black spots on leaves with yellow halos.',
      treatment: [
        'Prune infected leaves',
        'Apply fungicide spray',
        'Reduce leaf wetness',
        'Ensure good drainage',
      ],
      prevention: ['Clean tools between plants', 'Avoid wetting foliage', 'Remove plant debris'],
      riskLevel: 'Medium',
      affectedCrops: ['Beans', 'Tomato'],
    },
    healthy: {
      name: 'Healthy Plant',
      confidence: 95,
      severity: 'None',
      description: 'No diseases detected. Plant appears healthy.',
      treatment: ['Continue regular monitoring', 'Maintain good agricultural practices'],
      prevention: ['Regular inspection', 'Proper irrigation', 'Adequate nutrients'],
      riskLevel: 'Low',
      affectedCrops: ['All crops'],
    },
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      const keys = Object.keys(diseaseDatabase)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      setResult(diseaseDatabase[randomKey as keyof typeof diseaseDatabase])
      setIsAnalyzing(false)
    }, 2500)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'text-destructive'
      case 'Medium':
        return 'text-accent'
      case 'Low':
      case 'None':
        return 'text-primary'
      default:
        return 'text-foreground'
    }
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'Medium':
        return 'bg-accent/10 text-accent border-accent/20'
      case 'Low':
        return 'bg-primary/10 text-primary border-primary/20'
      default:
        return 'bg-secondary text-foreground'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">Disease Detection</h1>
              <p className="text-muted-foreground">
                Upload a crop leaf image for AI-powered disease identification with advanced confidence scoring
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-border sticky top-24 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bug className="w-5 h-5 text-primary" />
                      Upload Image
                    </CardTitle>
                    <CardDescription>JPG or PNG, max 5MB</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div 
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer block">
                        {preview ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium text-foreground">Image Selected</p>
                            <p className="text-xs text-muted-foreground truncate">{selectedFile?.name}</p>
                          </motion.div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                            <p className="text-sm font-medium text-foreground">Click to upload</p>
                            <p className="text-xs text-muted-foreground">or drag and drop</p>
                          </div>
                        )}
                      </label>
                    </motion.div>

                    {preview && (
                      <motion.div 
                        className="rounded-lg overflow-hidden border border-border shadow-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <img src={preview} alt="Preview" className="w-full h-auto" />
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || isAnalyzing}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                      >
                        {isAnalyzing ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Zap className="w-4 h-4" />
                            </motion.div>
                            Analyzing...
                          </span>
                        ) : (
                          'Analyze Image'
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Results Section */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {result ? (
                  <>
                    {/* Disease Info Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className={`border-2 bg-gradient-to-br ${result.severity === 'None' ? 'border-primary/30 from-primary/10 to-transparent' : 'border-accent/30 from-accent/10 to-transparent'}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {result.severity === 'None' ? (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <CheckCircle className="w-8 h-8 text-primary" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <AlertTriangle className="w-8 h-8 text-accent" />
                                </motion.div>
                              )}
                              <div>
                                <CardTitle className="text-2xl">{result.name}</CardTitle>
                                <CardDescription>{result.description}</CardDescription>
                              </div>
                            </div>
                            <motion.div 
                              className="text-right flex-shrink-0"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring' }}
                            >
                              <div className="text-3xl font-bold text-primary">{result.confidence}%</div>
                              <p className="text-xs text-muted-foreground">Confidence</p>
                            </motion.div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div 
                              className="bg-card rounded-lg p-4 border border-border"
                              whileHover={{ y: -2 }}
                            >
                              <p className="text-sm text-muted-foreground mb-1">Severity</p>
                              <p className={`font-semibold text-lg ${getSeverityColor(result.severity)}`}>{result.severity}</p>
                            </motion.div>
                            <motion.div 
                              className="bg-card rounded-lg p-4 border border-border"
                              whileHover={{ y: -2 }}
                            >
                              <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                              <div className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${getRiskBadgeColor(result.riskLevel)}`}>
                                {result.riskLevel}
                              </div>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Affected Crops */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg">Commonly Affected Crops</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {result.affectedCrops.map((crop: string, index: number) => (
                              <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-foreground rounded-full text-sm font-medium border border-primary/20"
                              >
                                {crop}
                              </motion.span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Treatment Recommendations */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-accent" />
                            Treatment & Management
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {result.treatment.map((item: string, index: number) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="text-primary font-bold flex-shrink-0">•</span>
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Prevention Tips */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            Prevention & Precautions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {result.prevention.map((item: string, index: number) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="text-primary font-bold flex-shrink-0">✓</span>
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Card className="border-border border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Bug className="w-16 h-16 text-muted-foreground mb-4" />
                        </motion.div>
                        <p className="text-muted-foreground text-center max-w-sm">
                          Upload a clear image of the affected crop leaf to get instant AI-powered disease diagnosis with confidence scoring and personalized treatment recommendations
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
