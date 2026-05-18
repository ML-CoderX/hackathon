'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, MapPin, LineChart as LineChartIcon } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function MandiPrices() {
  const [selectedCrop, setSelectedCrop] = useState('wheat')

  const mandiData = {
    wheat: {
      name: 'Wheat',
      currentPrice: 2450,
      previousPrice: 2395,
      change: 55,
      changePercent: 2.3,
      unit: 'per quintal',
      priceHistory: [
        { date: 'Jan 1', price: 2350 },
        { date: 'Jan 8', price: 2380 },
        { date: 'Jan 15', price: 2410 },
        { date: 'Jan 22', price: 2395 },
        { date: 'Jan 29', price: 2420 },
        { date: 'Feb 5', price: 2450 },
      ],
      mandis: [
        { name: 'Delhi Mandi', price: 2460, change: 1.2 },
        { name: 'Kanpur Mandi', price: 2440, change: 0.8 },
        { name: 'Indore Mandi', price: 2455, change: 1.5 },
        { name: 'Ludhiana Mandi', price: 2470, change: 2.1 },
      ],
    },
    rice: {
      name: 'Rice',
      currentPrice: 3850,
      previousPrice: 3810,
      change: 40,
      changePercent: 1.1,
      unit: 'per quintal',
      priceHistory: [
        { date: 'Jan 1', price: 3750 },
        { date: 'Jan 8', price: 3780 },
        { date: 'Jan 15', price: 3810 },
        { date: 'Jan 22', price: 3825 },
        { date: 'Jan 29', price: 3840 },
        { date: 'Feb 5', price: 3850 },
      ],
      mandis: [
        { name: 'Delhi Mandi', price: 3865, change: 1.3 },
        { name: 'Chennai Mandi', price: 3840, change: 1.0 },
        { name: 'Kolkata Mandi', price: 3830, change: 0.9 },
        { name: 'Mumbai Mandi', price: 3855, change: 1.4 },
      ],
    },
    corn: {
      name: 'Corn',
      currentPrice: 1920,
      previousPrice: 1935,
      change: -15,
      changePercent: -0.8,
      unit: 'per quintal',
      priceHistory: [
        { date: 'Jan 1', price: 2000 },
        { date: 'Jan 8', price: 1985 },
        { date: 'Jan 15', price: 1960 },
        { date: 'Jan 22', price: 1945 },
        { date: 'Jan 29', price: 1930 },
        { date: 'Feb 5', price: 1920 },
      ],
      mandis: [
        { name: 'Delhi Mandi', price: 1930, change: -0.5 },
        { name: 'Mumbai Mandi', price: 1915, change: -1.2 },
        { name: 'Pune Mandi', price: 1925, change: -0.2 },
        { name: 'Bangalore Mandi', price: 1920, change: -0.8 },
      ],
    },
    soybeans: {
      name: 'Soybeans',
      currentPrice: 4200,
      previousPrice: 4150,
      change: 50,
      changePercent: 1.2,
      unit: 'per quintal',
      priceHistory: [
        { date: 'Jan 1', price: 4050 },
        { date: 'Jan 8', price: 4080 },
        { date: 'Jan 15', price: 4120 },
        { date: 'Jan 22', price: 4140 },
        { date: 'Jan 29', price: 4170 },
        { date: 'Feb 5', price: 4200 },
      ],
      mandis: [
        { name: 'Indore Mandi', price: 4215, change: 1.8 },
        { name: 'Ujjain Mandi', price: 4205, change: 1.5 },
        { name: 'Jalgaon Mandi', price: 4190, change: 0.8 },
        { name: 'Bhopal Mandi', price: 4200, change: 1.2 },
      ],
    },
  }

  const currentData = mandiData[selectedCrop as keyof typeof mandiData]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">Mandi Prices</h1>
              <p className="text-muted-foreground">
                Real-time agricultural market prices with trends and regional insights
              </p>
            </motion.div>

            {/* Crop Selection */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {Object.entries(mandiData).map(([key, data], idx) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCrop(key)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCrop === key
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">{data.name}</p>
                  <p className={`text-sm font-bold ${data.changePercent >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {data.changePercent >= 0 ? '↑' : '↓'} {Math.abs(data.changePercent)}%
                  </p>
                </motion.button>
              ))}
            </motion.div>

            {/* Current Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border mb-8 bg-gradient-to-r from-primary/8 via-accent/5 to-primary/8">
                <CardHeader>
                  <CardTitle className="text-2xl">{currentData.name} - Current Market Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      <p className="text-sm text-muted-foreground mb-2">Current Price</p>
                      <p className="text-5xl font-bold text-primary">₹{currentData.currentPrice}</p>
                      <p className="text-sm text-muted-foreground">per quintal</p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                    >
                      <p className="text-sm text-muted-foreground mb-2">Price Change</p>
                      <div className="flex items-center gap-2">
                        {currentData.changePercent >= 0 ? (
                          <>
                            <TrendingUp className="w-6 h-6 text-primary" />
                            <span className="text-4xl font-bold text-primary">+₹{currentData.change}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-6 h-6 text-destructive" />
                            <span className="text-4xl font-bold text-destructive">₹{currentData.change}</span>
                          </>
                        )}
                      </div>
                      <p className={`text-sm font-semibold mt-2 ${currentData.changePercent >= 0 ? 'text-primary' : 'text-destructive'}`}>
                        {currentData.changePercent >= 0 ? '+' : ''}{currentData.changePercent}% from yesterday
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-card rounded-lg p-4 border border-border"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <p className="text-sm text-muted-foreground mb-2">Previous Close</p>
                      <p className="text-2xl font-bold text-foreground">₹{currentData.previousPrice}</p>
                      <p className="text-xs text-muted-foreground mt-2">Day before yesterday</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Price Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border mb-8 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="w-5 h-5 text-primary" />
                    Price Trend (Last 30 Days)
                  </CardTitle>
                  <CardDescription>Historical price movement and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={currentData.priceHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '2px solid var(--primary)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                        cursor={{ fill: 'var(--primary)/10' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--primary)', r: 6 }}
                        activeDot={{ r: 8 }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Regional Mandi Prices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Regional Mandi Prices
                    </CardTitle>
                    <CardDescription>Prices across different mandis today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentData.mandis.map((mandi, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ x: 4 }}
                        className="border border-border rounded-lg p-4 hover:bg-secondary/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-foreground">{mandi.name}</p>
                          <span className={`text-sm font-bold ${mandi.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                            {mandi.change >= 0 ? '↑' : '↓'} {Math.abs(mandi.change)}%
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">₹{mandi.price}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Price Comparison Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Mandi Comparison Chart</CardTitle>
                    <CardDescription>Price comparison across mandis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={currentData.mandis} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          stroke="var(--muted-foreground)"
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            border: '2px solid var(--accent)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          }}
                          cursor={{ fill: 'var(--accent)/10' }}
                        />
                        <Bar dataKey="price" fill="var(--accent)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Market Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-border mt-8 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Market Insights & Recommendations</CardTitle>
                  <CardDescription>AI-driven analysis and trading suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg p-4"
                      whileHover={{ y: -2 }}
                    >
                      <p className="font-semibold text-foreground mb-2">📊 Market Trend</p>
                      <p className="text-sm text-muted-foreground">
                        {currentData.changePercent >= 0
                          ? 'Prices trending upward. Strong demand signals. Good opportunity to sell if holding stock.'
                          : 'Prices declining steadily. Consider holding for better prices or processing value-added products.'}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-4"
                      whileHover={{ y: -2 }}
                    >
                      <p className="font-semibold text-foreground mb-2">🎯 Best Mandi</p>
                      <p className="text-sm text-muted-foreground">
                        {currentData.mandis.reduce((a, b) => (a.price > b.price ? a : b)).name} is offering the highest price today. Transport considerations recommended.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
