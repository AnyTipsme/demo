import { ReactNode, useCallback } from "react";

import { toEURO } from "../../utils";

import { Button } from "../Button";

import './styles.scss'

const CUSTOM_AMOUNT = 'custom'

type TTipsButton = {
	content: string | number | ReactNode;
	isActive?: boolean;
	onClick?: () => void;
	disabled?: boolean;
	fitContent?: boolean
}

export const TipsButton = ({
	content = CUSTOM_AMOUNT,
	isActive = false,
	onClick,
	disabled = false,
	fitContent = false
}: TTipsButton) => {
	const createContent = useCallback(() => {
		const contentType = typeof content;
		switch (contentType) {
			case 'number':
				return toEURO(content as number);
			case 'string':
				return <span >{content}</span >;
			default:
				return content;
		}
	}, []);

	return <li className='tips-button' data-amount={content} >
		<Button filled={isActive} bold onClick={onClick} disabled={disabled} fitContent={fitContent} >
			{createContent()}
		</Button >
	</li >
}