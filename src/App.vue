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
          placeholder="Город"
          @keyup.enter="location" />
      </div>
    </div>
  </header>
  <main class="wrapper container mx-auto px-4 py-4">
    <div class="w-full mb-8 md:font-light sm:text-xl">
      Погода в городе:
      <h1 v-if="weather" class="text-4xl font-bold">
        {{ weather.city }}
      </h1>
      <span v-else class="loader"></span>
    </div>

    <div
      v-if="weather"
      class="grid grid-cols-2 grid-rows-auto grid-flow-d gap-5 lx:justify-items-center">
      <app-weather
        :desc="weather.desc"
        :temp="weather.temp"
        :presure="weather.grnd_level"
        :visibility="weather.visibility"
        :humidity="weather.humidity"
        :feels_like="weather.feels_like"
        :imageWeater="weather.image" />
      <app-wind
        :wind_deg="weather.wind_deg"
        :wind_speed="weather.wind_speed"
        :imageWind="weather.imageWind" />
    </div>
    <div v-else class="w-full h-16 flex justify-center items-center">
      <span class="loader"></span>
    </div>
  </main>
  <App-popup v-if="!userName" @handle="handleClick" />
</template>

<script>
import AppPopup from "./components/App-popup.vue";
import AppWeather from "./components/App-weater.vue";
import AppWind from "./components/App-wind.vue";
import Weather from "./Api";
export default {
  components: { AppPopup, AppWeather, AppWind },
  name: "App",

  data() {
    return {
      userName: null,

      city: "-",
      weather: null,
    };
  },

  async mounted() {
    if (localStorage.getItem("name")) {
      this.userName = localStorage.getItem("name");
    }
    this.weather = await Weather.init();
    console.log(this.weather);
  },

  methods: {
    async location(e) {
      this.city = e.target.value[0].toUpperCase() + e.target.value.slice(1);
      this.weather = await Weather.init(this.city);
      e.target.value = "";
    },
    handleClick(value) {
      this.userName = value;
      localStorage.setItem("name", this.userName);
    },
  },
};
</script>

<style>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #215ad4;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader:first-child {
  width: 20px;
  height: 20px;
  border-width: 3px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
