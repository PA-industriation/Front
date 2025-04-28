<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

defineProps({
  categories: {
    type: Array,
    required: true
  }
});

</script>

<template>
  <Carousel
      :items-to-show="'auto'"
      :wrap-around="true"
      :mouse-drag="true"
      :gap="8"
      :autoplay="3000"
      :pause-autoplay-on-hover="true"

      class="tag-slider"
      :breakpoints="{
      1200: { itemsToShow: 4, gap: 12 },
      900: { itemsToShow: 3, gap: 10 },
      600: { itemsToShow: 2, gap: 8 },
      0: { itemsToShow: 1.5, gap: 6 }
    }"
  >
    <Slide v-for="category in categories" :key="category.url">
      <a :href="category.url" class="tag-btn">{{ category.title }}</a>
    </Slide>
    <template #addons>
      <Navigation/>
    </template>
  </Carousel>
</template>

<style scoped>
.tag-slider {
  margin-bottom: 5px;
  width: 100%;
}

.tag-btn {
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px 16px;

  background: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
}

:deep(.carousel__slide) {
  width: auto !important;
  min-width: max-content !important;
  display: flex;
  justify-content: center;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, box-shadow 0.2s;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.tag-slider:hover :deep(.carousel__prev),
.tag-slider:hover :deep(.carousel__next) {
  opacity: 1;
  pointer-events: auto;
}

:deep(.carousel__prev svg),
:deep(.carousel__next svg) {
  width: 50px;
  height: 50px;
  color: #a1a1a1;
}

</style>
