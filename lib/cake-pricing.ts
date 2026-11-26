export const PRICE_PER_KG = 400
export const EMERGENCY_FEE = 50

export function weightToKg(weight: string) {
  const amount = Number.parseFloat(weight)
  return weight.endsWith('g') && !weight.endsWith('kg') ? amount / 1000 : amount
}

export function discountForWeight(weightKg: number) {
  if (weightKg >= 3) return 25
  if (weightKg >= 2) return 20
  if (weightKg >= 1.5) return 15
  if (weightKg >= 1) return 10
  return 0
}

export function cakeQuote(weightKg: number, emergency = false) {
  const discount = discountForWeight(weightKg)
  const basePrice = Math.round(weightKg * PRICE_PER_KG)
  const discountedPrice = Math.round(basePrice * (1 - discount / 100))
  const emergencyFee = weightKg >= 1 && emergency ? EMERGENCY_FEE : 0

  return {
    basePrice,
    discount,
    emergencyFee,
    total: discountedPrice + emergencyFee,
  }
}
