<template>
  <div
    class="popup fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-60 z-[999]">
    <div
      class="xl:w-1/3 md:w-1/2 sm:w-1/2 h-60 bg-white text-black border-2 rounded-lg p-6 shadow-md z-10 relative">
      <h5 class="font-medium text-lg mb-10">Your Name?</h5>
      <input
        class="w-full border-2 rounded-md bg-gray-50 p-2 outline-1 outline-orange-400 focus:shadow-md shadow-orange-500 mb-4"
        type="text"
        name="name"
        id="name"
        placeholder="Ivan Pertov"
        autocomplete="off"
        v-model="fullName" />
      <div class="flex justify-end">
        <button
          @click.stop="$emit('handle', this.firstUpperCase)"
          class="px-6 py-2 bg-orange-400 rounded-md text-white hover:translate-y-1 transition-transform font-medium tracking-wide">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App-popup",
  data() {
    return {
      fullName: "",
    };
  },
  computed: {
    firstUpperCase() {
      return this.fullName.charAt(0).toUpperCase() + this.fullName.slice(1);
    },
  },
  methods: {},
};
</script>

<style scoped></style>
