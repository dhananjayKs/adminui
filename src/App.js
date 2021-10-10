import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { Page } from "./Components/Page";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./actions";

import SearchBar from "./Components/SearchBar";

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

		let defaultPage = (
			<Route key={`def`} path={`/`} exact>
				<Redirect to="/1"></Redirect>
			</Route>
		);
		let pagesCont = [defaultPage];
		let linksCont = [];

		for (let i = 0; i < numPages - 1; i++) {
			let page = pageData.slice(i * 10, (i + 1) * 10);
			linksCont.push(
				<NavLink to={`/${i + 1}`} key={`${i + 1}`}>
					<p className="h-8 w-8 inline-block border border-black rounded text-center leading-8 m-2">{`${i + 1}`}</p>
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
			console.log("left", leftOver, numPages);
			let page;
			if (pageData.length === 10) {
				page = pageData.slice(0, 10);
			} else {
				page = pageData.slice((numPages - 1) * 10, (numPages - 1) * 10 + leftOver);
			}
			linksCont.push(
				<NavLink to={`${numPages}`} key={`${numPages}`}>
					<p className="h-8 w-8 inline-block border border-black rounded text-center leading-8 m-2">{`${numPages}`}</p>
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

	function delSelected() {
		dispatch({
			type: "DELETED_SELECTED",
		});
	}

	return (
		<BrowserRouter>
			<div className="w-auto py-20 bg-blue-50 relative block">
				<SearchBar />
				<Switch>{pages}</Switch>
				<nav className="w-4/5 h-8 leading-8 mx-auto text-center">{pageLinks}</nav>
				<p className="w-32 h-8 bg-red-500 border border-red-400 rounded text-center leading-8 mx-auto my-8" onClick={delSelected}>
					Delete Selected
				</p>
			</div>
		</BrowserRouter>
	);
}

export default App;
