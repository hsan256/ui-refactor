import { ProgressStepsProps } from "@/lib/types"
import { CheckCircle } from "lucide-react"

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm border border-white/20">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                step.completed
                  ? "bg-emerald-500 text-white"
                  : step.current
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <step.icon className="w-4 h-4" />
              )}
            </div>
            <span
              className={`ml-2 text-xs font-medium hidden sm:block ${
                step.completed || step.current ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-6 sm:w-12 h-px mx-3 transition-all duration-300 ${
                  step.completed ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 