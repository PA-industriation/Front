import { createApp } from 'vue'
import CatalogMenu from '../src/presentation/components/modal-menu.vue';

(() => {

    /*
   * INIT
   */

    const app = createApp(CatalogMenu);
    const vm = app.mount('#catalog-app')

    document.getElementById('external-catalog-btn').onclick = function () {
        if (vm.toggleMenu) vm.toggleMenu()
    }
})();