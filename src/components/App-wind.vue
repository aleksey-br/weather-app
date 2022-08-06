<template>
  <div
    class="max-w-3/4 lg:w-full h-[300px] flex flex-col justify-between border-2 rounded-xl p-5 bg-cover lg:bg-bottom"
    :style="{ backgroundImage: `url(${require('@/assets/wind.png')})` }"
  >
    <div class="card-header">
      <p class="text-2xl font-medium">Wind Force</p>
      <p class="text-lg font-light">What's the wind.</p>
    </div>
    <div class="card-body mb-4">
      <h4 class="text-color font-bold text-5xl inline">{{ wind_speed }} m/s</h4>
      <div>{{ changeDeg }} Wind</div>
    </div>
    <div class="card-footer flex gap-2">
      <div
        class="w-full h-18 bg-gray-100 rounded-lg p-2 relative flex items-end"
        :class="wind_speed > 20 ? 'bg-red-500' : ''"
      >
        <span class="absolute left-4 top-1 font-medium">Weak</span>
        <span class="absolute right-4 top-1 font-medium">Strong</span>
        <div class="w-full h-3 overflow-hidden rounded-md">
          <span
            :style="{ width: changeWindSpeed + '%' }"
            class="h-3 block bg-green-300"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wind_deg", "wind_speed"],

  data() {
    return {};
  },
  computed: {
    changeDeg() {
      const directions = [
        "North",
        "Northeast",
        "East",
        "Southeast",
        "South",
        "Southwest",
        "West",
        "Northwest",
      ];
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

<style lang="scss" scoped></style>
