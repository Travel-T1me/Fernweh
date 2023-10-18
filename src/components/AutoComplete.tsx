import * as React from 'react';
import { useEffect, useRef, ChangeEvent } from 'react';
import useStore from '../store';
import { SetLocationAsString, SetLatLong } from '../../types';

const options = {
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
}

export default function AutoComplete(): React.ReactElement {
  const ref = useRef(null);

  type AutoCompleteStore = {
    location: string,
    setLocationAsString: SetLocationAsString,
    latLong: string,
    setLatLong: SetLatLong
  }

  const {
    location,
    setLocationAsString,
    latLong,
    setLatLong
  } : AutoCompleteStore = useStore()

  useEffect(() => {
    const google = window.google
    const autoComplete = new google.maps.places.Autocomplete(ref.current, options)
    google.maps.event.addListener(autoComplete, 'place_changed', function(){
      const place = autoComplete.getPlace();
      let locationFromUser = place.address_components[0].long_name + ',' + place.address_components[2].short_name
      let latLongFromUser = place.geometry.location.lat().toString() + ',' + place.geometry.location.lng().toString();
      setLocationAsString(locationFromUser);
      setLatLong(latLongFromUser);
    })
  })


  return (
    <input 
      style={{
        width: '75%', 
        height: '40px', 
        border: 'solid',
        borderColor: 'darkcyan',
        borderRadius: '20px', 
        margin:'50px 0', 
        fontSize: '20px', 
        textAlign: 'center', 
        padding: '0 10px 0 0', 
        backgroundColor: 'rgb(242, 242, 242)', 
      }} 
      ref={ref} 
      placeholder='Enter location' 
    />
  );
}