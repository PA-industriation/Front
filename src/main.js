import {createApp} from "vue";
import Header from './presentation/components/Header.vue';

(() => {

    const app = createApp(Header);
    app.mount('#header')
})();