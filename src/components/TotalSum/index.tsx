import { useContext } from "react";

import { GlobalContext, PERCENTAGE } from "../../utils/GlobalContext.tsx";
import { toEURO } from "../../utils";

import './styles.scss'

export const TotalSum = () => {
	const {totalSum, isTipInputShow} = useContext(GlobalContext)

	return (
		<div className={"total"} >
			<span >{"Total"}</span >
			<span className={'total__sum'} >{isTipInputShow ? toEURO(0) : toEURO(totalSum)}</span >
			<span >{`Transfer fee - ${PERCENTAGE*100}%`}</span >
		</div >
	);
};