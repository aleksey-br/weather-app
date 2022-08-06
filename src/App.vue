<template>
  <header class="border-b-2">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="user-name">
        <span class="md:text-xl sm:text-sm">Hello,</span>
        <h3 class="md:text-2xl sm:text-lg font-bold">{{ userName }}</h3>
      </div>
      <div class="search max-w-xl">
        <input
          class="max-w-96 bg-gray-50 border-2 rounded-md border-gray-200 p-2 outline-1 outline-orange-400 text-gray-800 focus:shadow-md shadow-orange-500 transition-shadow"
          type="text"
          placeholder="city"
          @keyup.enter="location"
        />
      </div>
    </div>
  </header>
  <main class="wrapper container mx-auto px-4 py-4">
    <div class="w-full mb-8 md:font-light sm:text-xl">
      Weather from
      <h1 class="text-4xl font-bold">
        {{ city }}
      </h1>
    </div>
    <div
      class="grid grid-cols-2 grid-rows-auto grid-flow-d gap-5 lx:justify-items-center"
    >
      <app-weater
        :temp="weater.temp"
        :presure="weater.grnd_level"
        :visibility="weater.visibility"
        :humidity="weater.humidity"
        :feels_like="weater.feels_like"
      />
      <app-wind :wind_deg="weater.wind_deg" :wind_speed="weater.wind_speed" />
    </div>
  </main>
  <App-popup v-if="!userName" @handle="handleClick" />
</template>

<script>
import AppPopup from "./components/App-popup.vue";
import AppWeater from "./components/App-weater.vue";
import AppWind from "./components/App-wind.vue";
export default {
  components: { AppPopup, AppWeater, AppWind },
  name: "App",

  data() {
    return {
      userName: null,
      gps: {
        lat: null,
        lon: null,
      },
      city: "Moscow",
      weater: {
        icon: "",
        temp: "-",
        feels_like: "-",
        humidity: "-",
        grnd_level: "-",
        wind_speed: "-",
        wind_deg: "-",
        visibility: "-",
      },
    };
  },

  mounted() {
    if (localStorage.getItem("name")) {
      this.userName = localStorage.getItem("name");
    }
    this.getLocation();
  },

  methods: {
    location(e) {
      this.city = e.target.value[0].toUpperCase() + e.target.value.slice(1);
      this.getLocation();
      e.target.blur();
      e.target.value = "";
    },
    handleClick(value) {
      this.userName = value;

      localStorage.setItem("name", this.userName);
    },

    async getLocation() {
      const url_location = `https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&appid=${process.env.VUE_APP_KEY}`;
      const localion = await fetch(url_location);
      const data = await localion.json();
      this.gps.lat = data[0].lat;
      this.gps.lon = data[0].lon;

      this.getWeater();
    },

    async getWeater() {
      const weaterFetch = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.gps.lat}&lon=${this.gps.lon}&lang=ru&appid=${process.env.VUE_APP_KEY}&units=metric`
      );

      const weater = await weaterFetch.json();
      console.log(weater.main.grnd_level);
      this.weater.icon = weater.weather[0].icon;
      this.weater.temp = weater.main.temp;
      this.weater.feels_like = weater.main.feels_like;
      this.weater.humidity = weater.main.humidity;
      this.weater.grnd_level = weater.main.pressure;
      this.weater.wind_speed = weater.wind.speed;
      this.weater.wind_deg = weater.wind.deg;
      this.weater.visibility = weater.visibility;
    },
  },
};
</script>

<style></style>
