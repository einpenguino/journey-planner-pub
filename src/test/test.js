async function fetchAPI() {
    const query = 'https://api.data.gov.sg/v1/environment/rainfall?date_time=2022-11-03T08%3A00%3A00'
    const response = await fetch(query)

    let json = await response.json()
    
    if (response.ok){
        reformatJson(json)
    }
        

    // let {id, location} = json.metadata.stations[0]

    // console.log(`id ${id}, lat ${location.latitude} lng ${location.longitude}`)
    // // console.log(json.items[0].readings)
    // let entryVal = appendValue(id, json.items[0].readings)
    // let newEntry = {
    //     id:id,
    //     lat:location.latitude,
    //     lng:location.longitude,
    //     value:entryVal
    // }
    // console.log(newEntry)

    // if (response.ok)
    // return json

    // console.log(reformattedObj)
    // console.log(unpack(reformattedObj))
    unpack(reformattedObj)
}

function reformatJson (json) {

    reformattedObj = {}

    for (let stationEntry of json.metadata.stations){
        let {id, location} = stationEntry

        // console.log(`id ${id}, lat ${location.latitude} lng ${location.longitude}`)
        // console.log(json.items[0].readings)
        let entryVal = appendValue(id, json.items[0].readings)
        reformattedObj[id] = {
            id:id,
            lat:location.latitude,
            lng:location.longitude,
            value:entryVal
        }
    // console.log(newEntry)
    
    }
}

function appendValue (id, arr) {
    // arr.map((entry) => entry.id === id ? entry.value : null)
    for (let entry of arr) {
        if (entry['station_id'] === id) return entry.value
        else entry = null
    } 
}

function unpack (json) {
    let markerArr = []
    console.log(json)
    for (let pin in json){
        let position = {
            lat: json[pin].lat,
            lng: json[pin].lng
        }
        console.log(position)
        markerArr.push(position)
    }
    return markerArr
}

fetchAPI()

// console.log(16 === null)
// json[metadata][stations][0]
// console.log(json)