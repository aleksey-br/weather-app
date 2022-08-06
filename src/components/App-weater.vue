<template>
  <div
    class="max-w-3/4 md:w-full h-[300px] flex flex-col justify-between border-2 rounded-xl p-5 bg-no-repeat bg-center bg-cover"
    :style="{ backgroundImage: `url(${imageWeater})` }"
  >
    <div class="card-header">
      <p class="text-2xl font-medium">Weather</p>
      <p class="text-lg font-light">What's the weather.</p>
    </div>
    <div class="card-body mb-4 flex gap-5">
      <h4 class="text-color font-bold text-5xl inline">{{ changeTemp }} °C</h4>
      <div class="text-color h-min px-2 py-1 bg-slate-200 rounded-xl text-sm">
        {{ changeFeelsLike }} °C
      </div>
    </div>
    <div class="card-footer flex gap-2">
      <div class="min-w-min w-1/3 rounded-xl bg-slate-800 text-center p-2">
        <span class="text-white font-light mb-2 md:text-base text-xs"
          >Preesure</span
        >
        <p class="text-white font-medium md:text-xl sm:text-base">
          {{ changePresure }} <span class="font-normal">mm </span>
        </p>
      </div>
      <div class="min-w-min w-1/3 rounded-xl bg-lime-300 text-center p-2">
        <span class="font-light text-color mb-2 md:text-base text-xs"
          >visibility</span
        >
        <p class="text-color font-medium md:text-xl sm:text-base">
          {{ changevisibility }} <span class="font-normal">km</span>
        </p>
      </div>
      <div class="w-1/3 rounded-xl bg-slate-50 text-center p-2">
        <span class="font-light text-color mb-2 md:text-base text-xs"
          >Humidity</span
        >
        <p class="text-color font-medium md:text-xl sm:text-base">
          {{ changevisibility }} <span class="font-normal">%</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "temp",
    "presure",
    "visibility",
    "humidity",
    "feels_like",
    "imageWeater",
  ],

  computed: {
    changeTemp() {
      if (typeof this.temp === "number") {
        return this.temp.toFixed(0);
      }
      return this.temp;
    },
    changePresure() {
      if (typeof this.presure === "number") {
        return (this.presure / 1.333).toFixed(0);
      }
      return this.presure;
    },
    changevisibility() {
      if (typeof this.visibility === "number") {
        return this.visibility / 1000;
      }
      return this.visibility;
    },
    changeFeelsLike() {
      if (typeof this.feels_like === "number") {
        return this.feels_like.toFixed(0);
      }
      return this.feels_like;
    },
  },
};
</script>
