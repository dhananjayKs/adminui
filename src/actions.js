export function getData() {
    //let url
    let url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    let responseData;
    
    return async (dispatch, getState)=>{
        try {
            let response= await fetch(url)
            if(response.ok){
                responseData=await response.json()
            }
            
        } catch (error) {
            console.log(error)
        }

        dispatch({
            type:"FETCH_DATA",
            payload: responseData
        })
    }
}