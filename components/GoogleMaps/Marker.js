import { useEffect, useState } from "react"

// note that the map is implicitly passed when a marker is a child
// component of the map
const Marker = ({position, map, label, ...props}) => {
    const [marker, setMarker] = useState(null)

    // once component is mounted create a new marker
    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker())
        }
    }, [])

    // set options for the marker once it is ready
    useEffect(() => {
        if (marker) {
            marker.setOptions({position, map, label})
        }

    }, [marker])

    return <></>
}

export default Marker