import { useEffect, useState } from "react"

export default function StationsData({childUpdateAPI}) {
    const [responseStatus, setResponseStatus] = useState(null)
    const [responseBody, setResponseBody] = useState(null)
    const [stationInfo, setStationInfo] = useState(null)
    // const query = 'https://excuser.herokuapp.com/v1/excuse'
    // const myHeaders = new Headers()

    const callStationsAPI = async () => {
        const date = new Date()
        const dateFields = {
            year : String(date.getFullYear()),
            month : String(date.getMonth() + 1).padStart(2, '0'),
            day : String(date.getDate()).padStart(2, '0'),
            hour : String(date.getHours()).padStart(2, '0'),
            minute : String(date.getMinutes()).padStart(2, '0'),
            second : String(date.getSeconds()).padStart(2, '0')
        }
        // const query = `https://api.data.gov.sg/v1/environment/rainfall?date_time=2022-11-03T08%3A00%3A00`
        const query = `https://api.data.gov.sg/v1/environment/rainfall?date_time=${dateFields.year}-${dateFields.month}-${dateFields.day}T${dateFields.hour}%3A${dateFields.minute}%3A${dateFields.second}`
        const response = await fetch(query)
        const json = await response.json()

        setResponseStatus(response.ok)
        if (response.ok) {
            setResponseBody(json)
            let reformatted = reformatJson(json)
            setStationInfo(reformatted)
            console.log(query)
            // console.log(`Full Date: ${date}`)
            // console.log(`Year: ${date.getFullYear()}`)
            // console.log(`Month: ${date.getMonth() + 1}`)
            // console.log(`Day: ${date.getDate()}`)
            // console.log(`Hour: ${date.getHours()}`)
            // console.log(`Minute: ${date.getMinutes()}`)
            // console.log(`Seconds: ${date.getSeconds()}`)

        }
        else setResponseBody(null)
    }
    
    // // To Implement Later - for timing calls
    // const expBackOff

    function reformatJson (json) {

        let reformattedObj = {}
    
        for (let stationEntry of json.metadata.stations){
            let {id, name, location} = stationEntry
    
            // console.log(`id ${id}, lat ${location.latitude} lng ${location.longitude}`)
            // console.log(json.items[0].readings)
            let entryVal = appendValue(id, json.items[0].readings)
            reformattedObj[id] = {
                id:id,
                address:name,
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
        // const date = new Date()
        callStationsAPI()
        setInterval(() => {
            // const date = new Date(
            callStationsAPI()
        }, 60000)
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

    // return (
    //     <div>
    //         {/* <h1 onClick={() => {callStationsAPI()}} >Hi</h1> */}
    //         {/* <button onClick={() => {callStationsAPI()}} /> */}
    //         {/* <h6>{stationInfo.stations}</h6> */}
    //     </div>
    // )
}