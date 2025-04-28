<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import '../../../styles/main.css';
import { ref } from "vue";

defineProps({
  products: {
    type: Array,
    required: true
  }
});

const previewProduct = ref(null)
const previewPosition = ref({ top: 0, left: 0, width: 0, height: 0 })

// Флаги наведения
const isHoveringCard = ref(false)
const isHoveringPreview = ref(false)
let hideTimeout = null

function showPreview(product, event) {
  clearTimeout(hideTimeout)
  isHoveringCard.value = true
  const cardRect = event.currentTarget.getBoundingClientRect()
  previewProduct.value = product
  previewPosition.value = {
    top: cardRect.top + window.scrollY,
    left: cardRect.left + window.scrollX,
    width: cardRect.width,
    height: cardRect.height
  }
}

function onCardMouseOut(event) {
  isHoveringCard.value = false
  hideWithDelay()
}

function onCardMouseEnter() {
  clearTimeout(hideTimeout)
  isHoveringCard.value = true
}

function onPreviewMouseEnter() {
  clearTimeout(hideTimeout)
  isHoveringPreview.value = true
}

function onPreviewMouseLeave() {
  isHoveringPreview.value = false
  hideWithDelay()
}

function hideWithDelay() {
  hideTimeout = setTimeout(() => {
    if (!isHoveringCard.value && !isHoveringPreview.value) {
      hidePreview()
    }
  }, 100)
}

function hidePreview() {
  previewProduct.value = null
}
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
        <div class="product-card"
             @mouseover="showPreview(product, $event)"
             @mouseout="onCardMouseOut"
             @mouseenter="onCardMouseEnter"
        >
          <div class="product-img-container">
            <img :src="product.img" :alt="product.title" class="product-img" />
          </div>
          <div class="product-info">
            <div class="product-price">{{product.price}}</div>
            <div class="product-code">Артикул: {{ product.code }}</div>
            <div class="product-title">{{ product.title }}</div>
            <div class="product-status">
              <div v-if="product.stock > 0" class="product-stock">
                На складе {{ product.stock }} шт
              </div>
              <div v-else class="product-delivery">
                {{ product.delivery }}
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation/>
        <Pagination :paginateByItemsToShow="true" />
      </template>
    </Carousel>
  </div>
  <Teleport to="body">
    <div
        v-if="previewProduct"
        class="product-card product-card--preview"
        :style="{
        position: 'absolute',
        top: previewPosition.top + 'px',
        left: previewPosition.left + 'px',
        width: previewPosition.width + 'px',
        height: 'auto',
        transform: 'scale(1.08)',
        zIndex: 50
      }"
        @mouseenter="onPreviewMouseEnter"
        @mouseleave="onPreviewMouseLeave"
    >
      <div class="product-img-container">
        <img :src="previewProduct.img" :alt="previewProduct.title" class="product-img" />
      </div>
      <div class="product-info">
        <div class="product-price">{{ previewProduct.price }}</div>
        <div class="product-code">Артикул: {{ previewProduct.code }}</div>
        <div class="product-title">{{ previewProduct.title }}</div>
        <div class="product-status">
          <div v-if="previewProduct.stock > 0" class="product-stock">
            На складе {{ previewProduct.stock }} шт
          </div>
          <div v-else class="product-delivery">
            {{ previewProduct.delivery }}
          </div>
        </div>
        <div class="product-action">
          <button class="product-action__cart">В корзина</button>
          <div class="product-action__icons">
            <button class="product-action__comparison"><i class="icon2-compare-2-o"></i></button>
            <button class="product-action__like"><i class="icon-favorite-o"></i></button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

/* ===============================
   Карусель: слайд и элементы управления
   =============================== */

.carousel-wrapper,
.tag-slider {
  position: relative;
}

/* Обёртка одного слайда */
.carousel-slide {
  position: relative;
  height: 100%;
}

/* Стилизация пагинации */
:deep(.carousel__pagination) {
  margin: -3rem;
  transform: translateX(-5%);
}

/* Кнопки пагинации */
:deep(.carousel__pagination-button) {
  width: 8px;
  height: 8px;
  margin: 0 .5rem;
  border-radius: 100%;
  background: #e6e6e6;
}

/* Активная кнопка пагинации */
:deep(.carousel__pagination-button--active) {
  background: #b6b7b9;
}

/* Кнопки навигации (влево/вправо) */
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
  transition: opacity 0.2s, box-shadow 0.2s;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100 !important;
}

/* Показывать кнопки навигации при наведении на слайдер */
.tag-slider:hover :deep(.carousel__prev),
.tag-slider:hover :deep(.carousel__next) {
  opacity: 1;
  pointer-events: auto;
}

/* Иконки внутри кнопок навигации */
:deep(.carousel__prev svg),
:deep(.carousel__next svg) {
  width: 50px;
  height: 50px;
  color: #a1a1a1;
}

/* ===============================
   Карточка товара (основная)
   =============================== */

/* Основной контейнер карточки товара */
.product-card {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  transition:
      box-shadow 0.3s,
      transform 0.3s,
      z-index 0s,
      background 0.3s;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Контейнер для изображения с фиксированной высотой */
.product-img-container {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

/* Эффект увеличения и поднятия карточки при hover/focus */
.product-card:hover,
.product-card:focus {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: #fff;
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.18);
  transform: scale(1.08);
  z-index: 15;
}

/* ===============================
   Карточка товара: превью через Teleport
   =============================== */

/* Превью-карточка, рендерится через Teleport поверх всего */
.product-card--preview {
  box-shadow: 0 0 32px 0 rgba(0,0,0,0.18);
  background: #fff;
  border-radius: 12px;
  transition: none;
  display: flex;
  flex-direction: column;
  z-index: 99;
}

/* ===============================
   Внутренние элементы карточки товара
   =============================== */

/* Изображение товара */
.product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* Контейнер информации о товаре */
.product-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

/* Цена товара */
.product-price {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 8px;
  width: 100%;
  text-align: left;
}

/* Артикул */
.product-code {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #8b8b8b;
  width: 100%;
  text-align: left;
}

/* Название товара */
.product-title {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.3rem;
  margin-bottom: 8px;
  width: 100%;
  text-align: left;
}

/* Контейнер для статуса товара */
.product-status {
  width: 100%;
  margin-top: auto;
  margin-bottom: 8px;
}

/* Бейдж наличия на складе */
.product-stock {
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: #ffffff;
  background: linear-gradient(47deg, #00bb2f -15%, #1f9aab 100%);
  display: inline-block;
}

/* Текст о доставке, если товара нет на складе */
.product-delivery {
  font-size: 1.1rem;
  color: #4a4a4a;
}

/* Кнопки карточки */
.product-action {
  margin-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

/* Кнопка "В корзина" */
.product-action__cart {
  padding: 8px 18px;
  border: none;
  border-radius: 8px;
  background-color: #0099ff;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  height: 34px;
  box-sizing: border-box;
}

.product-action__cart:hover {
  background: #00649f;
}

/* Контейнер для иконок */
.product-action__icons {
  display: flex;
  gap: 8px;
}

/* Кнопки-иконки */
.product-action__comparison,
.product-action__like {
  border: none;
  background: #fff;
  color: #a8a8a8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  font-size: 3rem;
  transition: border-color 0.2s, background 0.2s;
  box-sizing: border-box;
}

.product-action__comparison:hover,
.product-action__like:hover {
  color:#00649f;
}

</style>
