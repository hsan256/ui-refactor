import { Badge } from "@/components/ui/badge"
import { SkipSelectionProps } from "@/lib/types"
import { Clock, Star } from "lucide-react"

export function SkipSelection({
  skips,
  selectedSkip,
  hoveredSkip,
  onSelectSkip,
  onHoverSkip,
}: SkipSelectionProps) {
  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Skip Size</h1>
        <p className="text-gray-600">Select the perfect skip for your project needs</p>
      </div>

      {/* Skip Options List */}
      <div className="space-y-3">
        {skips.map((skip) => (
          <div
            key={skip.id}
            className={`relative group cursor-pointer transition-all duration-500 ease-out ${
              selectedSkip === skip.id ? "scale-[1.015]" : hoveredSkip === skip.id ? "scale-[1.008]" : ""
            }`}
            onClick={() => onSelectSkip(skip.id)}
            onMouseEnter={() => onHoverSkip(skip.id)}
            onMouseLeave={() => onHoverSkip(null)}
          >
            <div
              className={`relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-500 ease-out ${
                selectedSkip === skip.id
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-white/20 hover:border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {skip.popular && (
                <div className="absolute -top-2 left-6">
                  <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Radio Button */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-out ${
                      selectedSkip === skip.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-400"
                    }`}
                  >
                    {selectedSkip === skip.id && (
                      <div className="w-2 h-2 bg-white rounded-full transition-transform duration-200 ease-out scale-100" />
                    )}
                  </div>

                  {/* Skip Image */}
                  <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-100 transition-transform duration-300 ease-out group-hover:scale-105">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-xs font-bold">
                      🗑️
                    </div>
                  </div>

                  {/* Skip Details */}
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">{skip.size}</h3>
                      <span className="text-sm text-gray-500 font-medium">{skip.unit}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 transition-colors duration-300 group-hover:text-gray-700">{skip.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {skip.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">£{skip.price}</div>
                  <div className="text-xs text-gray-500">inc. delivery</div>
                </div>
              </div>

              {/* Features - Show on hover or selection */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  (selectedSkip === skip.id || hoveredSkip === skip.id) 
                    ? "max-h-20 opacity-100 mt-4 pt-4" 
                    : "max-h-0 opacity-0 mt-0 pt-0"
                }`}
              >
                <div className={`border-t border-gray-100 transition-opacity duration-300 delay-100 ${
                  (selectedSkip === skip.id || hoveredSkip === skip.id) ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {skip.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full transition-all duration-300 hover:bg-blue-100 hover:text-blue-700"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: (selectedSkip === skip.id || hoveredSkip === skip.id) 
                            ? 'fadeInUp 0.3s ease-out forwards' 
                            : 'none'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
} 