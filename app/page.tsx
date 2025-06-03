"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  CreditCard,
  MapPin,
  Truck
} from "lucide-react";
import { useEffect, useState } from "react";

interface SkipData {
  id: string;
  size: string;
  price: number;
  hirePeriod: string;
  image?: string;
  description?: string;
}

interface ApiSkipResponse {
  id?: string;
  size?: string;
  price?: number;
  hirePeriod?: string;
  description?: string;
  [key: string]: unknown;
}

const steps = [
  { id: 1, name: "Postcode", icon: MapPin, completed: true },
  { id: 2, name: "Waste Type", icon: Truck, completed: true },
  { id: 3, name: "Select Skip", icon: CheckCircle, active: true },
  { id: 4, name: "Permit Check", icon: CheckCircle, completed: false },
  { id: 5, name: "Choose Date", icon: Calendar, completed: false },
  { id: 6, name: "Payment", icon: CreditCard, completed: false },
];

export default function SkipSelectionPage() {
  const [skips, setSkips] = useState<SkipData[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        
        const data = await response.json();
        
        // Transform API data or use mock data if API structure is different
        const processedSkips: SkipData[] = Array.isArray(data) 
          ? data.map((skip: ApiSkipResponse, index: number) => ({
              id: skip.id || `skip-${index}`,
              size: skip.size || `${4 + index * 2} Yards`,
              price: skip.price || 227 + index * 38,
              hirePeriod: skip.hirePeriod || (index === 1 ? "14 day hire period" : "7 day hire period"),
              description: skip.description,
            }))
          : [
              { id: "skip-1", size: "4 Yards", price: 227, hirePeriod: "7 day hire period" },
              { id: "skip-2", size: "6 Yards", price: 300, hirePeriod: "14 day hire period" },
              { id: "skip-3", size: "8 Yards", price: 325, hirePeriod: "7 day hire period" },
              { id: "skip-4", size: "10 Yards", price: 365, hirePeriod: "7 day hire period" },
              { id: "skip-5", size: "12 Yards", price: 425, hirePeriod: "14 day hire period" },
              { id: "skip-6", size: "14 Yards", price: 485, hirePeriod: "14 day hire period" },
            ];
        
        setSkips(processedSkips);
        // Auto-select the 8 Yard skip (third option) as shown in the original
        setSelectedSkip(processedSkips[2]?.id || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        // Fallback to mock data on error
        const fallbackSkips: SkipData[] = [
          { id: "skip-1", size: "4 Yards", price: 227, hirePeriod: "7 day hire period" },
          { id: "skip-2", size: "6 Yards", price: 300, hirePeriod: "14 day hire period" },
          { id: "skip-3", size: "8 Yards", price: 325, hirePeriod: "7 day hire period" },
          { id: "skip-4", size: "10 Yards", price: 365, hirePeriod: "7 day hire period" },
          { id: "skip-5", size: "12 Yards", price: 425, hirePeriod: "14 day hire period" },
          { id: "skip-6", size: "14 Yards", price: 485, hirePeriod: "14 day hire period" },
        ];
        setSkips(fallbackSkips);
        setSelectedSkip(fallbackSkips[2].id);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const selectedSkipData = skips.find(skip => skip.id === selectedSkip);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header with Step Indicator */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between overflow-x-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center min-w-0">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        step.active
                          ? "bg-blue-600 border-blue-600 text-white"
                          : step.completed
                          ? "bg-green-600 border-green-600 text-white"
                          : "bg-white border-slate-300 text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          step.active
                            ? "text-blue-600"
                            : step.completed
                            ? "text-green-600"
                            : "text-slate-500"
                        }`}
                      >
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-12 h-0.5 bg-slate-200 dark:bg-slate-700 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Select the skip size that best suits your needs. All prices include delivery and collection.
          </p>
        </div>

        {/* Skip Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-96">
                <CardContent className="p-6">
                  <Skeleton className="w-full h-40 mb-4" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-8 w-20 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skips.map((skip) => (
              <Card
                key={skip.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                  selectedSkip === skip.id
                    ? "ring-2 ring-blue-600 shadow-xl border-blue-200"
                    : "hover:border-blue-300"
                }`}
                onClick={() => setSelectedSkip(skip.id)}
              >
                <CardContent className="p-6">
                  {/* Skip Size Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge 
                      variant={selectedSkip === skip.id ? "default" : "secondary"}
                      className="text-sm font-semibold"
                    >
                      {skip.size}
                    </Badge>
                    {selectedSkip === skip.id && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>

                  {/* Skip Image Placeholder */}
                  <div className="w-full h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className="text-white font-bold text-lg">
                      🗑️ {skip.size} Skip
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-20 text-white text-xs px-2 py-1 rounded">
                      WE WANT WASTE
                    </div>
                  </div>

                  {/* Skip Details */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {skip.size} Skip
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {skip.hirePeriod}
                    </p>
                    <div className="text-3xl font-bold text-blue-600">
                      £{skip.price}
                    </div>
                  </div>

                  {/* Selection Button */}
                  <Button
                    className={`w-full mt-6 transition-all duration-200 ${
                      selectedSkip === skip.id
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    }`}
                    variant={selectedSkip === skip.id ? "default" : "secondary"}
                  >
                    {selectedSkip === skip.id ? "Selected" : "Select This Skip"}
                    {selectedSkip !== skip.id && (
                      <ArrowRight className="ml-2 w-4 h-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Summary and Navigation */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {selectedSkipData && (
                <>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">
                    🗑️
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedSkipData.size} Skip
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {selectedSkipData.hirePeriod}
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="text-2xl font-bold text-blue-600">
                    £{selectedSkipData.price}
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={!selectedSkip}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> Using demo data. {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
