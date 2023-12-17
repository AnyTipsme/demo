import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'

type TGlobalContext = {
	amountTips: number
	isCustomTips: boolean
	changeAmountTips: (amount: number) => void
	isReviewOpen: boolean
	isTipInputShow: boolean
	reviewText: string
	changeReviewText: (text: string) => void
	openReview: () => void
	closeReview: () => void
	showTipInput: () => void
	hideTipInput: () => void
	rate: 'Good' | 'Bad' | 'Excellent' | null
	changeRate: (rate: 'Good' | 'Bad' | 'Excellent' | null) => void
	totalSum: number
}

export const GlobalContext = createContext<TGlobalContext>({
	amountTips: 3,
	rate: null,
	changeRate: () => {},
	isCustomTips: false,
	changeAmountTips: () => {},
	isReviewOpen: false,
	isTipInputShow: false,
	reviewText: '',
	changeReviewText: () => {},
	openReview: () => {},
	closeReview: () => {},
	showTipInput: () => {},
	hideTipInput: () => {},
	totalSum: 3.09,
})

export const DEFAULT_TIPS = [1, 2, 3, 4]
export const PERCENTAGE = 0.03;
export const isCustomTipsFn = (tips: number) => !DEFAULT_TIPS.includes(tips)

export const Provider = ({ children }: PropsWithChildren) => {
	const [isReviewOpen, setReviewOpen] = useState(false)
	const [isTipInputShow, setTipInputShow] = useState(false)
	const [reviewText, setReviewText] = useState('')

	const closeReview = useCallback(() => setReviewOpen(false), [])
	const openReview = useCallback(() => setReviewOpen(true), [])
	const hideTipInput = useCallback(() => setTipInputShow(false), [])
	const showTipInput = useCallback(() => setTipInputShow(true), [])
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

	const totalSum = amountTips + (amountTips * PERCENTAGE);

	const context = useMemo(
		() => ({
			amountTips,
			isCustomTips,
			changeAmountTips,
			isReviewOpen,
			isTipInputShow,
			reviewText,
			changeReviewText,
			closeReview,
			openReview,
			showTipInput,
			hideTipInput,
			rate,
			changeRate,
			totalSum,
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
			isTipInputShow,
			hideTipInput,
			showTipInput,
			rate,
			reviewText,
			totalSum,
		]
	)

	return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
}
