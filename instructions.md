# Create the application in your code directory using:
```
npx create-react-app weather-tutorial
```

# Fire it up and make sure it is working by using:

```
npm start
```
# Create a directory for components:
``` 
mkdir src/components
```
# Create 3 components.  One for a title, one for a form, and one to display the weather info we'll save in state.
```
touch src/components/titles.js src/components/form.js src/components/weather.js
```
# Add a simple title to the titles.js component:
```js
import React from 'react';

const Titles = () => {
    return (
        <div>
            <h1>Weather Info</h1>
            <p>This app displays weather conditions for a city selected by the user.</p>
        </div>
    )
}

export default Titles;
```
# Clear out the contents of App.js.  We'll write it from scratch and start by including the titles component:

```js
import React from 'react';
import Titles from '../src/components/titles';

class App extends React.Component {
  render() {
    
    return (
      <div>
        <Titles />
      </div>
    )
  }
}

export default App;
```
# Make sure everything is running properly in the browser.  You should no longer see the React logo,  you should see the title component.
# 
# Next, we'll set up the form component.  Include two text fields for the user to enter a city and country:
```js
import React from 'react';

const Form = (props) => {
    return (
        <form>
            <input type="text" name="city" placeholder="City..." />
            <input type="text" name="country" placeholder="Country..." />
            <button>Get Weather</button>
        </form>
    )
}

export default Form;
```
# Next, import the form to App.js and add it as a component underneath the title component:
```js
import Form from '../src/components/form';
.
.
.
 <div>
    <Titles />
    <Form />
</div>
.
.
.
```
# You should now see the form displayed in your application in the browser.  (The button won't do anything yet because we haven't coded any functionality into it.)
# 
# Next, we can write the code for the weather component.  We'll be passing props to this component and displaying different conditions, which we'll write in once we've had a look at the API data we receive.  For now, just leave it as an empty <div>:
```js
import React from 'react';

const Weather = (props) => {
    return (
        <div>
        </div>
    )
}

export default Weather;
```
# Follow the same procedure as the previous two components and add the weather component to App.js, making sure to import it at the top of the file:
```js
import Weather from '../src/components/weather';
.
.
.
<div>
    <Titles />
    <Form />
    <Weather />
</div>
.
.
.
```
# Next, let's set up our API call.  Sign up for a free account on openweathermap.org.  Once you have an API key, create a .env file to safely store the key using the following format:
```
touch .env
```
```
REACT_APP_WEATHER_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
# MAKE SURE YOU RESTART YOUR APP AFTER ADDING THE KEY!  If you don't, you won't have access to the key stored inside the process.env!

# In order to send a request to the API, we need to write a function.  Above the render function in App.js, add an asynchronous function called getWeather:
```js
getWeather = async (e) => {
    e.preventDefault();
    const city = "Austin";
    const country = "USA";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    const response = await api_call.json();
    console.log(response);
}
```
# Now, we need a place to call this function.  Pass it through to the form component:
```js
.
.
.
<Titles />
<Form loadWeather={this.getWeather} />
.
.
.
```
# Next, update the form to execute the function when the button is pressed:
```js
.
.
.
<form onSubmit={props.loadWeather}>
.
.
.
```
# We're using a predefined city and state for now, just to test out the API.  Hit the button and check out the console in your developer tools on Chrome.  You'll see the object returned from the API!!!
# 
# Let's configure the city/country in the fetch request to come from the input fields.  Change the default values we used to test the API:  
```js
const city = e.target.elements.city.value;
const country = e.target.elements.country.value;
```
# Now that we have an idea of what data we're receiving from the API, we can configure the state of the application to save and display the items we want.
# 
# Add an object to hold state at the top of the App component:
```js
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
```
# After configuring state, use this.setState inside of the getWeather function to store the response from the API:
```js
.
.
.
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
.
.
.
```
# Next, we need to pass this information into the weather component in order to display it:
```js
.
.
.
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
.
.
.
```
# Now that the state is being passed to the component, write the code to display those props inside of the weather component:
```js
.
.
.
const Weather = (props) => {
    return (
        <div>
            {props.country && props.city && <p>Location: {props.city},  {props.country}</p>}
            {props.temperature && <p>Temperature: {props.temperature} °F</p>}
            {props.tempLow && props.tempHigh && <p>High Temp: {props.tempLow}°F  Low Temp: {props.tempHigh}°F</p>}
            {props.humidity && <p>Humidity: {props.humidity} %</p>}
            {props.description && <p>Conditions: {props.description}</p>}
            {props.windSpeed && <p>Wind Speed: {props.windSpeed} mph</p>}
            {props.error && <p>{props.error}</p>}
        </div>
    )
}

.
.
.
```
# That's it!  Now, you can spice it up by adding some styling!



