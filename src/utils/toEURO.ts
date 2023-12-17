export const toEURO = (amount: number) => {
	return amount.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 0
	})
}