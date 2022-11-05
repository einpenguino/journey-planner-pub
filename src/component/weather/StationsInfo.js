import { useEffect, useState } from "react"

export default function StationsData({childUpdateAPI}) {
    const [responseStatus, setResponseStatus] = useState(null)
    const [responseBody, setResponseBody] = useState(null)
    const [stationInfo, setStationInfo] = useState(null)
    const query = 'https://api.data.gov.sg/v1/environment/rainfall?date_time=2022-11-03T08%3A00%3A00'
    // const query = 'https://excuser.herokuapp.com/v1/excuse'
    // const myHeaders = new Headers()

    const callStationsAPI = async () => {
        const response = await fetch(query)
        const json = await response.json()

        setResponseStatus(response.ok)
        if (response.ok) {
            setResponseBody(json)
            let reformatted = reformatJson(json)
            setStationInfo(reformatted)
        }
        else setResponseBody(null)
    }
    
    // // To Implement Later - for timing calls
    // const expBackOff

    function reformatJson (json) {

        let reformattedObj = {}
    
        for (let stationEntry of json.metadata.stations){
            let {id, location} = stationEntry
    
            // console.log(`id ${id}, lat ${location.latitude} lng ${location.longitude}`)
            // console.log(json.items[0].readings)
            let entryVal = appendValue(id, json.items[0].readings)
            reformattedObj[id] = {
                id:id,
                lat:parseFloat(location.latitude),
                lng:parseFloat(location.longitude),
                value:entryVal
            }
        // console.log(newEntry)
        
        }
        return reformattedObj
    }
    
    function appendValue (id, arr) {
        // arr.map((entry) => entry.id === id ? entry.value : null)
        for (let entry of arr) {
            if (entry['station_id'] === id) return entry.value
            else entry = null
        } 
    }
    // const appendValues = (input) => {
    //     for (obj in input) {
            
    //     }
    // }

    useEffect(() => {
        callStationsAPI()
    }, [])

    // // For extracting stations metadata
    // useEffect(() => {
    //     compileStationData(responseBody)
    // }, [responseBody])

    // For extracting stations metadata
    useEffect(() => {
        // console.log(stationInfo)
        childUpdateAPI(stationInfo)
    }, [stationInfo])

    return (
        <div>
            {/* <h1 onClick={() => {callStationsAPI()}} >Hi</h1> */}
            {/* <button onClick={() => {callStationsAPI()}} /> */}
            {/* <h6>{stationInfo.stations}</h6> */}
        </div>
    )
}