import React from "react"

export interface SkipOption {
  id: number
  size: string
  unit: string
  period: string
  price: number
  popular: boolean
  description: string
  features: string[]
  image?: string
}

export interface Step {
  id: number
  name: string
  icon: React.ComponentType<{ className?: string }>
  completed?: boolean
  current?: boolean
}

export interface ApiSkipResponse {
  id?: number
  size?: number
  hire_period_days?: number
  transport_cost?: number | null
  per_tonne_cost?: number | null
  price_before_vat?: number
  vat?: number
  postcode?: string
  area?: string
  forbidden?: boolean
  created_at?: string
  updated_at?: string
  allowed_on_road?: boolean
  allows_heavy_waste?: boolean
  [key: string]: unknown
}

export interface SkipSelectionProps {
  skips: SkipOption[]
  selectedSkip: number
  hoveredSkip: number | null
  onSelectSkip: (id: number) => void
  onHoverSkip: (id: number | null) => void
}

export interface OrderSummaryProps {
  selectedOption: SkipOption | undefined
  onContinue: () => void
  onBack: () => void
}

export interface ProgressStepsProps {
  steps: Step[]
} 