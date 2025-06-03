import { ApiSkipResponse, SkipOption } from './types'

function transformApiResponse(apiData: ApiSkipResponse[]): SkipOption[] {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    throw new Error('No skip data available')
  }

  return apiData.map((skip, index) => {
    const size = String(skip.size || '0')
    const period = skip.hire_period_days ? `${skip.hire_period_days} days` : '7 days'
    const priceBeforeVat = skip.price_before_vat || 0
    const vatRate = skip.vat || 20
    const totalPrice = Math.round(priceBeforeVat * (1 + vatRate / 100))

    return {
      id: skip.id || index + 1,
      size: size,
      unit: "Yards",
      period: period,
      price: totalPrice,
      popular: false,
      description: `${size} yard skip for your project`,
      features: [`${size} yard capacity`, 'Delivery included', 'Collection included'],
      image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg'
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
      signal: AbortSignal.timeout(10000),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log('API Response:', data)
  
  return transformApiResponse(data)
}
