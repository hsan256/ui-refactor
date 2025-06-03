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
}

export interface Step {
  id: number
  name: string
  icon: React.ComponentType<{ className?: string }>
  completed?: boolean
  current?: boolean
}

export interface ApiSkipResponse {
  id?: number | string
  size?: string | number
  unit?: string
  period?: string
  price?: number
  popular?: boolean
  description?: string
  features?: string[]
  hire_period?: string
  cost?: number
  capacity?: string | number
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