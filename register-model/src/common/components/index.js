import Fcard from './card';
import SearchButton from './searchButton';

const components = [Fcard, SearchButton];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Fcard,
  SearchButton,
};
