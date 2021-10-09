let search=[
    {
        "id": "",
        "name": "",
        "email": "",
        "role": ""
    }
]
let list=[
    {
        "id": "",
        "name": "",
        "email": "",
        "role": ""
    }
]
let searchTerm=""
let data={
    list,
    search,
    searchTerm
}

export function reducer(state=data, action){
    switch (action.type) {
        case 'FETCH_DATA':
            
            return({
                ...state,
                list:[...action.payload]
            })
            
    
        default:
            return state
           
    }
    
}