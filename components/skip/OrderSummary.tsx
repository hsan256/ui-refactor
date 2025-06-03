import { Button } from "@/components/ui/button"
import { OrderSummaryProps } from "@/lib/types"
import { ArrowLeft, ArrowRight, Zap } from "lucide-react"
import Image from "next/image"

export function OrderSummary({ selectedOption, onContinue, onBack }: OrderSummaryProps) {
  if (!selectedOption) {
    return (
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Please select a skip size to see your order summary.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <div className="w-12 h-8 relative rounded overflow-hidden">
                <Image 
                  src={selectedOption.image || 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg'}
                  alt="Selected skip"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{selectedOption.size} Yard Skip</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{selectedOption.period} hire</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Skip hire</span>
                <span className="font-medium text-gray-900 dark:text-white">£{selectedOption.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery & Collection</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Included</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-blue-600 dark:text-blue-400">£{selectedOption.price}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" 
                size="lg"
                onClick={onContinue}
              >
                Continue to Permit Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button 
                variant="outline" 
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800" 
                size="sm"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Zap className="w-3 h-3" />
                <span>Next day delivery available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 