import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'

type TGlobalContext = {
	amountTips: number
	isCustomTips: boolean
	changeAmountTips: (amount: number) => void
	isReviewOpen: boolean
	reviewText: string
	changeReviewText: (text: string) => void
	openReview: () => void
	closeReview: () => void
	rate: 'Good' | 'Bad' | 'Excellent' | null
	changeRate: (rate: 'Good' | 'Bad' | 'Excellent' | null) => void
}

export const GlobalContext = createContext<TGlobalContext>({
	amountTips: 3,
	rate: null,
	changeRate: () => {},
	isCustomTips: false,
	changeAmountTips: () => {},
	isReviewOpen: false,
	reviewText: '',
	changeReviewText: () => {},
	openReview: () => {},
	closeReview: () => {}
})

export const DEFAULT_TIPS = [1, 2, 3, 4]
export const isCustomTipsFn = (tips: number) => !DEFAULT_TIPS.includes(tips)

export const Provider = ({ children }: PropsWithChildren) => {
	const [isReviewOpen, setReviewOpen] = useState(false)
	const [reviewText, setReviewText] = useState('')

	const closeReview = useCallback(() => setReviewOpen(false), [])
	const openReview = useCallback(() => setReviewOpen(true), [])
	const changeReviewText = useCallback((text: string) => setReviewText(text), [])

	const [amountTips, setAmountTips] = useState(2)
	const [isCustomTips, setCustomTips] = useState(false)

	const [rate, setRate] = useState<'Good' | 'Bad' | 'Excellent' | null>(null)
	const changeRate = useCallback((_rate: typeof rate) => {
		setRate(prevRate => (prevRate === _rate ? null : _rate))
	}, [])

	const changeAmountTips = useCallback((amount: number) => {
		const isCustom = isCustomTipsFn(amount)
		setCustomTips(isCustom)
		setAmountTips(amount)
	}, [])

	const context = useMemo(
		() => ({
			amountTips,
			isCustomTips,
			changeAmountTips,
			isReviewOpen,
			reviewText,
			changeReviewText,
			closeReview,
			openReview,
			rate,
			changeRate
		}),
		[
			amountTips,
			changeAmountTips,
			changeRate,
			changeReviewText,
			closeReview,
			isCustomTips,
			isReviewOpen,
			openReview,
			rate,
			reviewText
		]
	)

	return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
}
