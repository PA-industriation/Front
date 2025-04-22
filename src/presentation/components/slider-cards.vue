<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const products = [
  {
    id: 1,
    title: 'Стандартный пневмоцилиндр Naval Pneumatics DSBC-80-200-PPV-A-N3',
    price: '14 392 ₽',
    code: '1021104',
    img: 'https://industriation.ru/image/cache/catalog/categories-png/1135-category-280x280.webp',
    stock: null,
    delivery: 'Срок поставки уточняйте у менеджера'
  },
  // ... добавьте остальные товары
]
</script>

<template>
  <Carousel :items-to-show="3" :wrap-around="false" :snap-align="'start'" :mouse-drag="true" :breakpoints="{
    1024: { itemsToShow: 3 },
    768: { itemsToShow: 2 },
    480: { itemsToShow: 1 }
  }">
    <Slide v-for="product in products" :key="product.id">
      <div class="product-card">
        <img :src="product.img" :alt="product.title" class="product-img">
        <div class="product-info">
          <div class="product-price">{{ product.price }}</div>
          <div class="product-code">Артикул: {{ product.code }}</div>
          <div class="product-title">{{ product.title }}</div>
          <div v-if="product.stock" class="product-stock">{{ product.stock }}</div>
          <div class="product-delivery">{{ product.delivery }}</div>
        </div>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>


<style scoped>
.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 18px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 320px;
}

.product-img {
  width: 100%;
  max-width: 160px;
  margin: 0 auto 12px auto;
  display: block;
}

.product-info {
  width: 100%;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.product-code {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.product-title {
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.product-stock {
  display: inline-block;
  background: #19c37d;
  color: #fff;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.98rem;
  margin-bottom: 6px;
}

.product-delivery {
  color: #888;
  font-size: 0.95rem;
}

</style>