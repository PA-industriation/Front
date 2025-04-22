import { createApp } from 'vue';
import CatalogMenu from '../src/presentation/components/modal-menu.vue';
import SliderCards from './presentation/components/slider-cards.vue';
import SliderCategories from './presentation/components/slider-categories.vue';

// Универсальная функция для монтирования компонентов
function mountComponent(component, selector) {
    const app = createApp(component);
    return app.mount(selector);
}

// Монтируем компоненты
const catalogVm = mountComponent(CatalogMenu, '#catalog-app');
document.getElementById('external-catalog-btn').onclick = () => {
    if (catalogVm.toggleMenu) catalogVm.toggleMenu();
};

mountComponent(SliderCards, '#slider-cards');
mountComponent(SliderCategories, '#slider-categories');
