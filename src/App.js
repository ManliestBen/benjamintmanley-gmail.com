import React from 'react';
import Titles from '../src/components/titles';
import Form from '../src/components/form';
import Weather from '../src/components/weather';

class App extends React.Component {
  state = {
    temperature: undefined,
    tempLow: undefined,
    tempHigh: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    windSpeed: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    const response = await api_call.json();
    this.setState({
      temperature: Math.trunc((response.main.temp - 273.15)*(1.8)+32),
      tempLow: Math.trunc((response.main.temp_min - 273.15)*(1.8)+32),
      tempHigh: Math.trunc((response.main.temp_max - 273.15)*(1.8)+32),
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      windSpeed: response.wind.speed,
      error: ""
      
    })
    console.log(response);
  }
  
  render() {

    return (
      <div>
        <Titles />
        <Form loadWeather={this.getWeather} />
        <Weather temperature={this.state.temperature}
        tempLow={this.state.tempLow}
        tempHigh={this.state.tempHigh}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        windSpeed={this.state.windSpeed}
        error={this.state.error}
        />
      </div>
    )
  }
}

export default App;