'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Leaf, CheckCircle, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    soilType: '',
    rainfall: '',
    temperature: '',
    season: '',
  })
  const [recommendations, setRecommendations] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const cropRecommendations = {
    wheat: {
      name: 'Wheat',
      suitability: 92,
      season: 'Winter',
      yield: '45-55 quintals/hectare',
      bestPractices: ['Use certified seeds', 'Maintain soil pH 6-7', 'Irrigate every 30-40 days'],
      marketPrice: '₹2,450/quintal',
    },
    rice: {
      name: 'Rice',
      suitability: 88,
      season: 'Monsoon',
      yield: '50-60 quintals/hectare',
      bestPractices: ['Transplant seedlings in June', 'Maintain water depth of 5cm', 'Apply organic manure'],
      marketPrice: '₹3,850/quintal',
    },
    corn: {
      name: 'Corn',
      suitability: 85,
      season: 'Summer',
      yield: '40-50 quintals/hectare',
      bestPractices: ['Spacing: 60x20cm', 'Drip irrigation recommended', 'Monitor for pests weekly'],
      marketPrice: '₹1,920/quintal',
    },
    soybeans: {
      name: 'Soybeans',
      suitability: 78,
      season: 'Monsoon',
      yield: '20-25 quintals/hectare',
      bestPractices: ['Use high-quality seeds', 'Treat seeds with fungicide', 'Crop rotation essential'],
      marketPrice: '₹4,200/quintal',
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      if (data.recommendations) {
        setRecommendations(data.recommendations)
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error('Failed to fetch recommendation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Crop Recommendation</h1>
              <p className="text-muted-foreground">
                Get AI-powered crop recommendations tailored to your farm conditions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-border sticky top-24 bg-gradient-to-br from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                    <CardDescription>Input your farm parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Soil Type</label>
                        <select
                          value={formData.soilType}
                          onChange={(e) => handleInputChange('soilType', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select soil type</option>
                          <option value="alluvial soils">Alluvial soils</option>
                          <option value="red and yellow soils">Red and Yellow soils</option>
                          <option value="black soils">Black soils</option>
                          <option value="laterite soils">Laterite soils</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Annual Rainfall (mm)</label>
                        <input
                          type="number"
                          value={formData.rainfall}
                          onChange={(e) => handleInputChange('rainfall', e.target.value)}
                          placeholder="e.g., 600"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Avg Temperature (°C)</label>
                        <input
                          type="number"
                          value={formData.temperature}
                          onChange={(e) => handleInputChange('temperature', e.target.value)}
                          placeholder="e.g., 25"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Season</label>
                        <select
                          value={formData.season}
                          onChange={(e) => handleInputChange('season', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">Select season</option>
                          <option value="kharif">Kharif (Monsoon)</option>
                          <option value="rabi">Rabi (Winter)</option>
                          <option value="summer">Summer</option>
                        </select>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                          {isLoading ? 'Processing via ML...' : 'Get Recommendations'}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommendations Section */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {recommendations ? (
                  <>
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h2 className="text-2xl font-bold text-foreground mb-2">Recommended Crops</h2>
                      <p className="text-muted-foreground">
                        Based on your farm conditions, these crops are most suitable for optimal yield
                      </p>
                    </motion.div>

                    {recommendations.map((crop: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <Card className="border-border hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={{ rotate: [0, 5, -5, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Leaf className="w-6 h-6 text-primary" />
                                </motion.div>
                                <div>
                                  <CardTitle>{crop.name}</CardTitle>
                                  <CardDescription>{crop.season} Season</CardDescription>
                                </div>
                              </div>
                              <motion.div 
                                className="text-right flex-shrink-0"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                              >
                                <div className="text-2xl font-bold text-primary">{crop.suitability}%</div>
                                <p className="text-xs text-muted-foreground">Suitability</p>
                              </motion.div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div 
                                className="bg-card rounded-lg p-4 border border-border"
                                whileHover={{ y: -2 }}
                              >
                                <p className="text-sm text-muted-foreground mb-1">Expected Yield</p>
                                <p className="font-semibold text-foreground">{crop.yield}</p>
                              </motion.div>
                              <motion.div 
                                className="bg-card rounded-lg p-4 border border-border"
                                whileHover={{ y: -2 }}
                              >
                                <p className="text-sm text-muted-foreground mb-1">Market Price</p>
                                <p className="font-semibold text-foreground">{crop.marketPrice}</p>
                              </motion.div>
                            </div>

                            {/* Best Practices */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                Best Practices
                              </h4>
                              <ul className="space-y-2">
                                {crop.bestPractices.map((practice: string, i: number) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                                    <span>{practice}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
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
                          <Leaf className="w-16 h-16 text-muted-foreground mb-4" />
                        </motion.div>
                        <p className="text-muted-foreground text-center">
                          Fill in your farm details to get AI-powered crop recommendations based on soil, climate, and market conditions
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
