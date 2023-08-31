import * as React from 'react';
import { useEffect, useRef } from 'react';

const options = {
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
}

export default function AutoComplete(): React.ReactElement {
  const ref = useRef(null);

  useEffect(() => {
    const google = window.google
    const autoComplete = new google.maps.places.Autocomplete(ref.current, options)
    google.maps.event.addListener(autoComplete, 'place_changed', function(){
      const place = autoComplete.getPlace();
      console.log('LATLONG?', place.geometry.location.lat(), place.geometry.location.lng())
    })
  })

  return (
    <input ref={ref} type='text' placeholder='Enter location'/>
  );
}