import SearchButton from './index.vue';

SearchButton.install = function (Vue) {
  Vue.component(SearchButton.name, SearchButton);
};

export default SearchButton;
