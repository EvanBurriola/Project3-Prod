import { useRef, useState, useEffect, Children, isValidElement, cloneElement } from 'react'

// requires a wrapper component from @googlemaps/react-wrapper 
// containing the maps API key
const Map = ({children, center, zoom, ...props}) => {
    const ref = useRef(null)
    const [map, setMap] = useState()

    // if component mounts to client then create a new map
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center, zoom}))
        }
    }, [ref, map])

    return (
        <div ref={ref} style={props.style}>
            {/* Have to ensure that the markers added to the map are
                valid nodes that can be added to the dom
             */}
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { map });
                }
            })}
        </div>
    )

}

export default Map