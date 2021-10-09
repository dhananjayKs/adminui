import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Page } from "./Components/Page";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./actions";

function App() {
	let dispatch = useDispatch();
	useEffect(() => {
		dispatch(getData());
	}, []);

	let state = useSelector((state) => state);

	function createPages() {
		let pageData;
		console.log("search term", state.searchTerm);
		if (state.searchTerm === "") {
			pageData = state.list;
		} else {
			pageData = state.search;
		}
		let numPages = Math.ceil(pageData.length / 10);
		console.log(numPages);
		let pagesCont = [];
		let linksCont = [];

		for (let i = 0; i < numPages - 1; i++) {
			let page = pageData.slice(i * 10, (i + 1) * 10);
			linksCont.push(
				<NavLink to={`/${i + 1}`} key={`${i + 1}`}>
					<p>{`${i + 1}`}</p>
				</NavLink>
			);
			pagesCont.push(
				<Route key={`${i + 1}`} path={`/${i + 1}`} exact>
					<Page key={`${i + 1}`} Num={i + 1} list={page} />
				</Route>
			);
		}

		{
			let leftOver = pageData.length % 10;
			let page = pageData.slice((numPages - 1) * 10, (numPages - 1) * 10 + leftOver);
			linksCont.push(
				<NavLink to={`${numPages}`} key={`${numPages}`}>
					<p>{`${numPages}`}</p>
				</NavLink>
			);
			pagesCont.push(
				<Route key={`${numPages}`} path={`/${numPages}`} exact>
					<Page key={`${numPages}`} Num={`${numPages}`} list={page} />
				</Route>
			);
		}
		return [pagesCont, linksCont];
	}

	let [pages, pageLinks] = createPages();

	return (
		<BrowserRouter>
			<Switch>{pages}</Switch>
			<nav>{pageLinks}</nav>
		</BrowserRouter>
	);
}

export default App;
