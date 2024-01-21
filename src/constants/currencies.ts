export interface Currency {
  currencyCode: string,
  name: string
}

export const currencies: Currency[] = [
  {"currencyCode": "CHF", "name": "Swiss franc"},
  {"currencyCode": "EUR", "name": "European Euro"},
  {"currencyCode": "GBP", "name": "British pound"},
  {"currencyCode": "PLN", "name": "Polish zloty"},
  {"currencyCode": "USD", "name": "United States dollar"}
]
