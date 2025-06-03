import { ApiSkipResponse, SkipOption } from './types'

function transformApiResponse(apiData: ApiSkipResponse[]): SkipOption[] {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    throw new Error('No skip data available')
  }

  return apiData.map((skip, index) => {
    // Extract size - could be a number or string like "4 Yards", "4", etc.
    let size = String(skip.size || skip.capacity || '0')
    if (size.includes('yard') || size.includes('Yard')) {
      size = size.replace(/[^0-9]/g, '')
    }

    // Extract period - could be "7 days", "7", "1 week", etc.
    let period = skip.period || skip.hire_period || '7 days'
    if (typeof period === 'number') {
      period = `${period} days`
    }

    // Extract price
    const price = skip.price || skip.cost || 0

    return {
      id: Number(skip.id) || index + 1,
      size: size,
      unit: skip.unit || "Yards",
      period: String(period),
      price: Number(price),
      popular: skip.popular || false,
      description: skip.description || `${size} yard skip for your project`,
      features: skip.features || [`${size} yard capacity`, 'Delivery included', 'Collection included'],
    }
  })
}

export async function fetchSkipOptions(postcode: string = 'NR32', area: string = 'Lowestoft'): Promise<SkipOption[]> {
  const response = await fetch(
    `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log('API Response:', data) // For debugging
  
  return transformApiResponse(data)
}
