export const isValidNumber = (value: string) => {
	const isEmpty = value === ''
	const numb = Number(value)
	return (!isNaN(numb) && numb > 0) || isEmpty
}