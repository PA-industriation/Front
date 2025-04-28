<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import productsCards from '../../../data/productsCards.json';
import {ref} from "vue";

const products = ref(productsCards);

</script>

<template>
  <div class="carousel-wrapper tag-slider">
    <Carousel
        ref="carousel"
        :items-to-show="4"
        :items-to-scroll="4"
        :wrap-around="true"
        :paginateByItemsToShow="true"
        :snap-align="'start'"
        :pause-autoplay-on-hover="true"
        :mouse-drag="true"
    >
      <Slide v-for="product in products" :key="product.id" class="carousel-slide">
        <div class="product-card">
          <img :src="product.img" :alt="product.title" class="product-img" />
          <div class="product-info">
            <div class="product-price">{{product.price}}</div>
            <div class="product-code">Артикул: {{ product.code }}</div>
            <div class="product-title">{{ product.title }}</div>
            <div v-if="product.stock > 0" class="product-stock">
              На складе {{ product.stock }} шт
            </div>
            <div v-else class="product-delivery">
              {{ product.delivery }}
            </div>

          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation/>
        <Pagination
            :paginateByItemsToShow="true"
        />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>

.product-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  justify-content: flex-start;
}

.product-img {
  width: 100%;
  height: 210px;
  object-fit: contain;
  margin-bottom: 16px;
  display: block;
}

.product-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.product-price {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.product-code {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #8b8b8b;
}

.product-title {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.3rem;
  margin-bottom: 8px;
}

.product-stock{
  padding: 6px 14px;
  border-radius: 12px;
  margin-top: auto;
  font-size: 1.1rem;
  color: #ffffff;
  background: linear-gradient(47deg, #00bb2f -15%, #1f9aab 100%);
}

.product-delivery {
  margin-top: auto;
  font-size: 1.1rem;
  color: #4a4a4a;
}

:deep(.carousel__pagination){
  margin: -3rem;
  transform: translateX(-5%);
}

:deep(.carousel__pagination-button) {
  width: 8px;
  height: 8px;
  margin: 0 .5rem;
  border-radius: 100%;
  background: #e6e6e6;
}

:deep(.carousel__pagination-button--active) {
  background: #b6b7b9;
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


