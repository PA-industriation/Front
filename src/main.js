import { createApp } from 'vue';
import ModalMenu from './presentation/components/ModalMenu.vue';
import SliderCards from './presentation/components/SliderCards.vue';
import SliderCategories from './presentation/components/SliderCategories.vue';
import CategoryCard from './presentation/components/CategoryCard.vue';
import SliderProductsCard from '../data/productsCards.json';
import SliderCategoriesData from '../data/slider-categories.json';
import SliderProductsCard2 from '../data/productsCards2.json';
import SliderCategoriesData2 from '../data/slider-categories-2.json';
import CatalogCard from '../src/presentation/components/CatalogCard.vue';
import '../styles/main.css';

// Монтируем CategoryCard для каждого контейнера с классом .category-card
document.querySelectorAll('.category-card').forEach(el => {
    const props = {
        href: el.dataset.href,
        title: el.dataset.title,
        imgSrc: el.dataset.imgSrc,
        imgAlt: el.dataset.imgAlt
    };
    createApp(CategoryCard, props).mount(el);
});

// Монтируем SliderCards для каждого контейнера с классом .slider-cards

const el1 = document.getElementById('slider-products-1');
if (el1) {
    createApp(SliderCards, { products: SliderProductsCard }).mount(el1);
}

// Для второго контейнера
const el2 = document.getElementById('slider-products-2');
if (el2) {
    createApp(SliderCards, { products: SliderProductsCard2 }).mount(el2);
}

// Монтируем SliderCategories для каждого контейнера с классом .slider-categories
// Для первого контейнера
const el3 = document.getElementById('slider-categories-1');
if (el3) {
    createApp(SliderCategories, { categories: SliderCategoriesData }).mount(el3);
}

// Для второго контейнера
const el4 = document.getElementById('slider-categories-2');
if (el4) {
    createApp(SliderCategories, { categories: SliderCategoriesData2 }).mount(el4);
}

// ModalMenu
const catalogVm = createApp(ModalMenu).mount('#catalog-app');
document.getElementById('external-catalog-btn').onclick = () => {
    if (catalogVm.toggleMenu) catalogVm.toggleMenu();
};

document.querySelectorAll('.catalog-card').forEach(el => {
    const props = {
        href: el.dataset.href,
        title: el.dataset.title,
        imgSrc: el.dataset.imgSrc,
        imgAlt: el.dataset.imgAlt,
        bgClass: el.dataset.bgClass
    }
    createApp(CatalogCard, props).mount(el)
})