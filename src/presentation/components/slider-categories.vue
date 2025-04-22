<script setup>
import 'vue3-carousel/carousel.css'
import categoriesData from '../../../data/slider-categories.json'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref } from "vue"

const sliderCategories = ref(categoriesData)
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
    <Slide v-for="category in sliderCategories" :key="category.url">
      <a :href="category.url" class="tag-btn">{{ category.title }}</a>
    </Slide>
    <template #addons>
      <Navigation/>
    </template>
  </Carousel>
</template>

<style scoped>
.tag-slider {
  margin-bottom:20px;
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
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  background: #fff;
  border: 2px solid #000;
  border-radius: 100%;
}

.tag-slider:hover :deep(.carousel__prev),
.tag-slider:hover :deep(.carousel__next) {
  opacity: 1;
  pointer-events: auto;
}

</style>
