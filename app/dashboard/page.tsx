'use client'

import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { Footer } from '@/components/footer'
import {
  WeatherCard,
  CropHealthCard,
  YieldAnalyticsCard,
  TemperatureTrendCard,
  MandiInsightsCard,
  DiseaseAlertCard,
  RecentActivityCard,
} from '@/components/dashboard-cards'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor your farm in real-time with AI-powered insights
              </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <WeatherCard />
              <CropHealthCard />
              <MandiInsightsCard />

              {/* Row 2 */}
              <div className="md:col-span-2">
                <YieldAnalyticsCard />
              </div>
              <DiseaseAlertCard />

              {/* Row 3 */}
              <div className="md:col-span-2">
                <TemperatureTrendCard />
              </div>
              <RecentActivityCard />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
