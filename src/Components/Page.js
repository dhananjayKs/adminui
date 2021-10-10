import React from "react";
import { Cards } from "./Cards";
export function Page({ Num, list }) {
	let cards;
	console.log(Num);
	if (list !== undefined) {
		cards = list.map((ele) => {
			return <Cards name={ele.name} key={ele.id} id={ele.id} role={ele.role} email={ele.email}></Cards>;
		});
	}

	return (
		<div className='mx-auto w-4/5 h-4/5 rounded-sm border-2 border-blue-600'>
			
			{cards}
		</div>
	);
}
