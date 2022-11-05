import React, {useState, useRef, useEffect} from 'react'

// export default function MapComponent() {
//     const ref = useRef(null);
//     const [map, setMap] = useState();

//     useEffect(() => {
//     if (ref.current && !map) {
//         setMap(new window.google.maps.Map(ref.current, {}));
//     }
//     }, [ref, map]);
//     return <div ref={ref} />
// }

export default function MapComponent() {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();

    React.useEffect(() => {
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    return <div ref={ref} />
}