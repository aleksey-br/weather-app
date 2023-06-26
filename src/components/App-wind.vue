<template>
  <div
    class="max-w-3/4 lg:w-full h-[300px] flex flex-col justify-between border-2 rounded-xl p-5 bg-cover lg:bg-bottom relative overflow-hidden">
    <div
      class="overlay absolute top-0 left-0 bottom-0 right-0 bg-no-repeat bg-center bg-cover bg-slate-700"
      :style="{ backgroundImage: `url(${imageWind})` }"></div>
    <div class="h-full flex flex-col justify-between z-50">
      <div class="card-header">
        <p class="text-2xl text-white font-medium">Сила ветра</p>
      </div>
      <div class="card-body mb-4">
        <h4 class="text-white font-bold text-5xl inline">
          {{ wind_speed }} м/с
        </h4>
        <div class="text-white">{{ changeDeg }} ветер</div>
      </div>
      <div class="card-footer flex gap-2">
        <div
          class="w-full h-18 bg-gray-100 rounded-lg p-2 relative flex items-end"
          :class="wind_speed > 20 ? 'bg-red-500' : ''">
          <span class="absolute left-4 top-1 font-medium">Слабый</span>
          <span class="absolute right-4 top-1 font-medium">Сильный</span>
          <div class="w-full h-3 overflow-hidden rounded-md">
            <span
              :style="{ width: changeWindSpeed + '%' }"
              class="h-3 block bg-green-300"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wind_deg", "wind_speed", "imageWind"],

  data() {
    return {};
  },
  computed: {
    changeDeg() {
      const directions = [
        "Северный",
        "Северо-восточный",
        "Восточный",
        "Юго-восточный",
        "Южный",
        "Юго-западный",
        "Запад",
        "Северо-западный",
      ];
      // const directions = [
      //   "North",
      //   "Northeast",
      //   "East",
      //   "Southeast",
      //   "South",
      //   "Southwest",
      //   "West",
      //   "Northwest",
      // ];
      let degrees = (this.wind_deg * 8) / 360;
      degrees = Math.round(degrees, 0);
      degrees = (degrees + 8) % 8;
      return directions[degrees];
    },

    changeWindSpeed() {
      return (this.wind_speed * 100) / 32;
    },
  },
};
</script>

<style scoped>
.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-color: #3333336e;
  width: 100%;
  height: 100%;
}
</style>
