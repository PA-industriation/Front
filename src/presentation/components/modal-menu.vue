<script setup>
import categoriesData from '../../../data/categories.json'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const categories = ref(categoriesData)
const isOpen = ref(false)
const activeCategory = ref(null)
let clearTimeoutId = null

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function setActiveCategory(category) {
  if (clearTimeoutId) {
    clearTimeout(clearTimeoutId)
    clearTimeoutId = null
  }
  activeCategory.value = category
}

function clearActiveCategoryWithDelay() {
  // Запускаем задержку на скрытие
  clearTimeoutId = setTimeout(() => {
    activeCategory.value = null
  }, 150)
}

function cancelClearActiveCategory() {
  if (clearTimeoutId) {
    clearTimeout(clearTimeoutId)
    clearTimeoutId = null
  }
}

function handleClickOutside(event) {
  const menu = document.querySelector('.header__catalog-menu')
  const button = document.querySelector('.catalog-menu__button')
  if (
      isOpen.value &&
      menu &&
      !menu.contains(event.target) &&
      button &&
      !button.contains(event.target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

defineExpose({ toggleMenu })

</script>

<template>
  <Transition name="slide">
    <div class="header__catalog-menu" v-show="isOpen">
      <div
          class="catalog-menu__columns"
          :class="{ 'catalog-menu__columns--compact': !activeCategory }"
      >
        <!-- Левая колонка -->
        <nav class="catalog-menu__nav">
          <ul class="catalog-menu__list">
            <li
                v-for="category in categories"
                :key="category.id"
                class="catalog-menu__item"
                :class="{ 'active': activeCategory && activeCategory.id === category.id }"
                :data-id="category.id"
                @mouseenter="setActiveCategory(category)"
            >
              <a :href="category.url" class="catalog-menu__link">
                <img
                    :src="`https://industriation.ru/image/catalog/categories-icons/${category.id}.svg`"
                    :alt="category.name"
                    class="catalog-menu__icon"
                >
                {{ category.name }}
                <span class="icon-right"></span>
              </a>
            </li>
          </ul>
        </nav>
        <!-- Средняя и правая колонки только при наведении -->
        <template v-if="activeCategory">
          <!-- Средняя колонка -->
          <div class="catalog-menu__details">
            <div class="catalog-menu__details-title">
              {{ activeCategory.name }}
            </div>
            <ul
                v-if="activeCategory.children && activeCategory.children.length"
                class="catalog-menu__sublist"
            >
              <li
                  v-for="child in activeCategory.children"
                  :key="child.url"
                  class="catalog-menu__subitem"
              >
                <a :href="child.url" class="catalog-menu__subitem-link">
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </div>
          <!-- Правая колонка -->
          <div
              v-if="activeCategory.top && activeCategory.top.length"
              class="catalog-menu__top-cards"
          >
            <div
                v-for="(top, idx) in activeCategory.top"
                :key="top.name"
                class="catalog-menu__top-card"
                :class="[
                `card-bg-${idx % 4}`,
                { 'catalog-menu__top-card--small': !top.in_stock && !top.price }
              ]"
            >
              <div class="catalog-menu__top-name">{{ top.name }}</div>
              <img v-if="top.img" :src="top.img" class="catalog-menu__top-img" alt="" />
              <div v-if="top.in_stock || top.price" class="catalog-menu__top-meta">
                <span v-if="top.in_stock" class="catalog-menu__top-stock">В наличии</span>
                <span v-if="top.price" class="catalog-menu__top-price">{{ top.price }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-show="isOpen" class="catalog-menu__overlay"></div>
  </Transition>
</template>



<style>
/* =========================
   Анимации появления/исчезновения
   ========================= */
/* Анимация сдвига для меню */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
/* Анимация плавного появления/исчезновения */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

/* =========================
   Оверлей меню каталога
   ========================= */
.catalog-menu__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.32);
  z-index: 99;
  transition: opacity 0.3s;
  pointer-events: auto;
}

/* =========================
   Основная обертка меню каталога
   ========================= */
.header__catalog-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 25px;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

/* =========================
   Сетка колонок меню каталога
   ========================= */
.catalog-menu__columns {
  display: flex;
  height: 100%;
  width: 1000px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Компактный режим — только левая колонка */
.catalog-menu__columns--compact {
  max-width: 395px;
}

/* =========================
   Левая колонка (Навигация)
   ========================= */
.catalog-menu__nav {
  width: 395px;
  min-width: 395px;
  max-width: 395px;
  flex: 0 0 395px;
  padding-right: 0;
}
.catalog-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.catalog-menu__item {
  margin-bottom: 4px;
}
/* Активный пункт меню */
.catalog-menu__item.active .catalog-menu__link {
  color: #1A75FF;
  font-weight: 600;
  background: #f3f8ff;
}
.catalog-menu__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 0;
  color: #2B2D33;
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}
.catalog-menu__link:hover {
  color: #1A75FF;
  background: #f3f8ff;
}
/* Иконка слева от названия */
.catalog-menu__icon {
  width: 2.9rem;
  height: 2.9rem;
  flex-shrink: 0;
}
/* Стрелочка справа */
.icon-right {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 1rem;
  display: block;
  background: url('data:image/svg+xml;utf8,<svg ...>') no-repeat center;
  background-size: contain;
}
/* Анимация поворота стрелки для активного пункта */
.catalog-menu__item.active .icon-right {
  transform: rotate(-90deg);
  transition: transform 0.2s;
}

/* =========================
   Средняя колонка (Детали)
   ========================= */
.catalog-menu__details {
  width: 395px;
  padding: 0 15px 0 35px ;
  display: flex;
  flex-direction: column;
}
.catalog-menu__details-title {
  font-weight: 600;
  font-size: 18px;
  margin-top: 8px;
}
.catalog-menu__sublist {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.catalog-menu__subitem {
  color: #8b8b8b;
  font-size: 16px;
  margin-top: 2rem;
  border-radius: 6px;
  transition: background 0.15s;
  cursor: pointer;
}
.catalog-menu__subitem:hover {
  background: #f3f8ff;
  color: #1A75FF;
}

/* =========================
   Правая колонка (Топ-товары)
   ========================= */
.catalog-menu__top-cards {
  width: 210px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-right: 18px;
  margin-top: 8px;
}

/* ---- Карточка топ-товара ---- */
.catalog-menu__top-card {
  position: relative;
  border-radius: 16px;
  min-width: 210px;
  min-height: 280px;
  height: 140px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow: hidden;
  background: linear-gradient(135deg, #c471f5 0%, #fa71cd 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18px 0 0 0;
  transition: min-height 0.2s, height 0.2s, padding 0.2s;
}

/* ---- Маленькая карточка (если нет цены и статуса) ---- */
.catalog-menu__top-card--small {
  min-height: 70px;
  height: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  align-items: center;
  justify-content: center;
}
.catalog-menu__top-card--small .catalog-menu__top-name {
  margin: 0 0 0 60px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  line-height: 1.2;
}
.catalog-menu__top-card--small .catalog-menu__top-img {
  position: absolute;
  left: -20px;
  top: -10px;
  width: 100px;
  height: 100px;
}
/* ---- Цветовые варианты карточек ---- */
.catalog-menu__top-card.card-bg-1 {
  background: linear-gradient(45deg, #006064 0%, #028a90 100%);
}
.catalog-menu__top-card.card-bg-2 {
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
}
.catalog-menu__top-card.card-bg-3 {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
}

/* ---- Название товара ---- */
.catalog-menu__top-name {
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  margin-left: 1rem;
  line-height: 1.2;
  z-index: 2;
  text-shadow: 0 2px 8px rgba(0,0,0,0.13);
  position: relative;
}

/* ---- Картинка товара ---- */
.catalog-menu__top-img {
  position: absolute;
  right: -50px;
  top: 50px;
  max-width: 220px;
  max-height: 280px;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
}

/* ---- Блок с ценой и статусом ---- */
.catalog-menu__top-meta {
  position: absolute;
  left: 0;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  z-index: 3;
}

/* ---- Статус "В наличии" ---- */
.catalog-menu__top-stock {
  background: linear-gradient(47deg, #00bb2f -15%, #1f9aab 100%);
  color: #fff;
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  width: max-content;
}

/* ---- Цена ---- */
.catalog-menu__top-price {
  background: linear-gradient(47deg, #fcb410 -15%, #ff4d77 100%);
  color: #fff;
  border-radius: 0 6px 6px 0;
  font-weight: 700;
  font-size: 15px;
  padding: 4px 14px;
  width: max-content;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
</style>


