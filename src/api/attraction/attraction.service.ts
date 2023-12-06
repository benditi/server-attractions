import database from '../../services/database.service';

export async function seedAttractions() {
    try {
        console.log('inside seedAttractions');
        let data = {
            resource_id: '967a8a23-c08c-4c47-b39d-ce350537821b', // the resource id
            limit: 40, // get 40 results
          
          };
        let response= await fetch('https://data.gov.il/api/3/action/datastore_search',{method:'post', body:JSON.stringify(data), headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },})
        console.log('response',response);
        let responseData= await response.json()
        console.log('responseData',responseData)
        let attractions= responseData.result.records
        console.log('attractions',attractions)
        database.changeAllItems(attractions)
    } catch (err) {
        console.log('Cannot get attractions', err)
    }
}