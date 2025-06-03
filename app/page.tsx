"use client"

import {
  Calendar,
  CreditCard,
  MapPin,
  Shield,
  Trash2,
  Truck
} from "lucide-react"
import { useEffect, useState } from "react"

import { OrderSummary } from "@/components/skip/OrderSummary"
import { ProgressSteps } from "@/components/skip/ProgressSteps"
import { SkipLoadingSkeleton } from "@/components/skip/SkipLoadingSkeleton"
import { SkipSelection } from "@/components/skip/SkipSelection"
import { fetchSkipOptions } from "@/lib/api"
import { SkipOption, Step } from "@/lib/types"

const steps: Step[] = [
  { id: 1, name: "Location", icon: MapPin, completed: true },
  { id: 2, name: "Waste", icon: Trash2, completed: true },
  { id: 3, name: "Skip", icon: Truck, current: true },
  { id: 4, name: "Permit", icon: Shield },
  { id: 5, name: "Date", icon: Calendar },
  { id: 6, name: "Payment", icon: CreditCard },
]

export default function SkipHireOrder() {
  const [skips, setSkips] = useState<SkipOption[]>([])
  const [selectedSkip, setSelectedSkip] = useState<number>(0)
  const [hoveredSkip, setHoveredSkip] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSkipOptions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const skipOptions = await fetchSkipOptions('NR32', 'Lowestoft')
        
        if (!skipOptions || skipOptions.length === 0) {
          throw new Error('No skip options available for this location')
        }
        
        setSkips(skipOptions)
        
        const popularSkip = skipOptions.find(skip => skip.popular)
        const defaultSkip = popularSkip || skipOptions[0]
        if (defaultSkip) {
          setSelectedSkip(defaultSkip.id)
        }
      } catch (err) {
        console.error('Error loading skip options:', err)
        setError(err instanceof Error ? err.message : 'Failed to load skip options')
      } finally {
        setLoading(false)
      }
    }

    loadSkipOptions()
  }, [])

  const selectedOption = skips.find((skip) => skip.id === selectedSkip)

  const handleContinue = () => {
    if (!selectedOption) return
    console.log('Continuing with skip:', selectedOption)
    // TODO: Navigate to permit check page
  }

  const handleBack = () => {
    console.log('Going back to previous step')
    // TODO: Navigate to previous step
  }

  const handleRetry = () => {
    const loadSkipOptions = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const skipOptions = await fetchSkipOptions('NR32', 'Lowestoft')
        setSkips(skipOptions)
        
        if (skipOptions.length > 0) {
          const popularSkip = skipOptions.find(skip => skip.popular)
          const defaultSkip = popularSkip || skipOptions[0]
          if (defaultSkip) {
            setSelectedSkip(defaultSkip.id)
          }
        }
      } catch (err) {
        console.error('Error loading skip options:', err)
        setError(err instanceof Error ? err.message : 'Failed to load skip options')
      } finally {
        setLoading(false)
      }
    }

    loadSkipOptions()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <ProgressSteps steps={steps} />
          <div className="grid lg:grid-cols-3 gap-8">
            <SkipLoadingSkeleton />
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="h-16 bg-gray-100 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <ProgressSteps steps={steps} />
          
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-sm max-w-md mx-auto">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Skip Options</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <ProgressSteps steps={steps} />

        <div className="grid lg:grid-cols-3 gap-8">
          <SkipSelection
            skips={skips}
            selectedSkip={selectedSkip}
            hoveredSkip={hoveredSkip}
            onSelectSkip={setSelectedSkip}
            onHoverSkip={setHoveredSkip}
          />

          <OrderSummary
            selectedOption={selectedOption}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        </div>
      </div>
    </div>
  )
}
