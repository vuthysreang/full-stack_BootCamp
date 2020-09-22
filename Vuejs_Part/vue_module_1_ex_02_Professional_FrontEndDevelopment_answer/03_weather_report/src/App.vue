<template>
  <!-- This is a colon shorthand binding the class -->
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : 'cold'">
    <main>
        <!-- IF -->
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <!-- SearchBox -->
        <div class="search-box">
          <input type="text" 
            class="search-bar" 
            placeholder="Search..."
            v-model="query"
            @keypress="fetchWeather"
          />
          <!-- Hint -->
          <div class="hint">
            <p>Enter the "city, state" e.g. "Phnom Penh, Cambodia"</p>
          </div>
        </div>
        <!-- LocationBox -->
        <div class="location-box">
          <div class="location" v-if="city !== ''">{{ this.capitalizeFirstLetter(city)}}, {{ weather.sys.country }}</div>
          <div class="location" v-else>{{  weather.name  }}, {{ weather.sys.country }}</div>
          <div class="date" style="display: flex; align-items:center; justify-content: space-around;">
            <span>{{ dateBuilder() }}</span> 
            <img id="icon" :src="`http://openweathermap.org/img/wn/` + weather.weather[0].icon + `@2x.png`"/>  
          </div>
          <!-- WeatherBox -->
          <div class="weather-box">
            <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
          </div>
        </div>
      </div>
      
        <!-- ELSE-IF -->
      <div class="weather-wrap" v-else-if="!locationFound">
        <!-- SearchBox -->
        <div class="search-box">
            <input type="text" 
            class="search-bar" 
            placeholder="Search..."
            v-model="query"
            @keypress="fetchWeather"
            />
            <!-- Hint -->
          <div class="hint">
            <p>Enter the "city, state" e.g. "Phnom Penh, Cambodia"</p>
          </div>
        </div>
      </div>

        <!-- ELSE -->
      <div class="weather-wrap" v-else>
        <h2 style="color: #FFF; margin-bottom: 10px;">Please refine your search.</h2>
        <!-- SearchBox -->
        <div class="search-box">
            <input type="text" 
            class="search-bar" 
            placeholder="Search..."
            v-model="query"
            @keypress="fetchWeather"
          />
          <!-- Hint -->
          <div class="hint">
            <p>Enter the "city, state" e.g. "Phnom Penh, Cambodia"</p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>


   
<script>
export default {
  name: 'App',
  data() {
    return {
      api_key: 'd7324af368378c6f12212f44ae3252ea',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      locationFound: null,
      city: '',
      state: ''
    }
  }, 
  mounted:function() {
    // On page load
    let long;
    let lat;

    for (var i = 0; i < 2; i++) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          // Fetch weather
          this.locationFound = true;
          long = position.coords.longitude;
          lat = position.coords.latitude;
          fetch(`${this.url_base}weather?lat=${lat}&lon=${long}&units=metric&APPID=${this.api_key}`)
              .then(res => {
                return res.json();
              }).then(res => {
                this.setResults(res);
              });
          }), (error) => {
            if (error.code == error.PERMISSION_DENIED) {
              this.locationFound = false;
            }
          };
      }
  }},
  methods: {
    fetchWeather(e) {
      for (var i = 0; i < 2; i++) {
        if (e.key == "Enter") {
          // fetch() is from JS
          if (this.query.split(",").length == 2) {
            this.city = this.query.split(",")[0].trim();
            this.state = this.query.split(",")[1].trim();
          }
          fetch(`${this.url_base}weather?q=${this.state},${this.city}&units=metric&APPID=${this.api_key}`)
            .then(res => {
              return res.json();
            }).then(this.setResults);
        }
      }
    },

    setResults(results) {
      this.weather = results;
    },
    dateBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  z-index: -1;
  background: linear-gradient(rgba(47,150,163), rgba(48,62,143));
}

#app {
  /* background-size: cover; */
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.4s;
}

#app.warm {
  background-image: url('./assets/warm-bg.jpg')
}
#app.cold {
  background-image: url('./assets/cold-bg.jpg')
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75)) !important;
}

.search-box {
  width: 100%;
  margin-bottom: 25px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;
  
  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 016px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.hint{
  margin-top: 5px;
  text-align:center;
}
.hint p{
  font-size: 15px;
  color: blue;
}
.location-box .location {
  color: #FFF;
  text-align: center;
  margin-bottom: 5px;

  font-size: 40px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;  
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 20px 0px 0px 0px;

  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  margin-top: 10px;
  color: #FFF;
  font-size: 50px;
  font-weight: 700;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  font-style: italic;
}

#icon {
  width: 35px;
  height: 35px;
}

.weather-wrap {
  position: absolute;
  left: 50%;
  margin-right: -50%;
  top: 50%;
  transform: translate(-50%, -50%)
}
</style>
