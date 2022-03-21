/*************** fetch function ***************
 * @returns: fetched data
 * @url : endpoint to which request will be send
 * @data : data that will be put into body of request
 * @method : HTTP method, POST is default 
 * **********************************************/ 

 dataFetch = (url, data={}, method="POST") => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if(!res.ok)     throw res.status
        return res.json()        
    })
}