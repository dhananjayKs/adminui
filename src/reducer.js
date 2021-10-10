let search = [
	{
		id: "",
		name: "",
		email: "",
		role: "",
	},
];
let list = [
	{
		id: "",
		name: "",
		email: "",
		role: "",
	},
];
let searchTerm = "";
let selected=[]
let data = {
	list,
	search,
	searchTerm,
    selected
};

export function reducer(state = data, action) {
	switch (action.type) {
		case "FETCH_DATA":
			return {
				...state,
				list: [...action.payload],
			};
		case "SEARCH_TERM":
			let term = action.payload.state;
			let list = state.list;
			let result = list.filter((obj) => {
				let dattr = ["id", "name", "email", "role"];
				for (let j of dattr) {
					if (obj[j].toUpperCase().includes(term.toUpperCase())) {
						return obj;
					}
				}
			});
			return {
				...state,
				searchTerm: action.payload.state,
				search: result,
			};
        
        case 'SELECT':
            let select=[...state.selected]
            let index=select.indexOf(action.payload)
            if(index===-1){
                select.push(action.payload)
            }else{
                select.splice(index,1)
            }
            return{
                ...state,
                selected:select
            }   
        case "DELETE":
            let arr=[...state.list]
            let eleid=action.payload
			console.log('ele id', eleid)
            let loc=arr.findIndex(ele=>ele.id===eleid)
            console.log('loc',loc)
            if(loc!==-1){
                console.log(typeof loc)
                arr.splice(loc,1)
            }
            
            return{
                ...state,
                list:arr
            }
		
		case 'EDIT_FIELD':
			let editList=[...state.list]
			let editLoc=editList.findIndex(ele=>ele.id===action.payload.id)
			let editEle=editList[editLoc]
			let dattr = ["name", "email", "role"];
				for (let j of dattr) {
					editEle[j]=action.payload[j]
				}
			return{
				...state,
				list:editList
			}
		case 'DELETED_SELECTED':
			let delList=[...state.list]
			let delResult=delList.filter(ele=>{
				if(!state.selected.includes(ele.id)){
					return ele
				}
			})
			return{
				...state,
				list:delResult,
				selected:[]
			}
		default:
			return state;
	}
}
