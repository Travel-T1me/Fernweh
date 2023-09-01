import axios from 'axios';
import * as React from 'react';
import WeatherContainer from './WeatherContainer';

export default function WeatherProvider(): React.ReactElement {
    return (
        <div>
            <WeatherContainer forecast={forecast}></WeatherContainer>
        </div>
    )
}