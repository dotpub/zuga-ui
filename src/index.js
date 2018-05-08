import Button from './components/Button.vue';
import Cell from './components/Cell.vue';
import HorizontalCell from './components/HorizontalCell.vue';
import Field from './components/Field.vue';
import Popup from './components/Popup.vue';
import Picker from './components/picker/Picker.vue';
import VerticalPicker from './components/picker/VerticalPicker.vue';
import PickerSlot from './components/picker/PickerSlot.vue';
import DateTimePicker from './components/DateTimePicker.vue';
import Rate from './components/Rate.vue';

import Radio from './components/Radio.vue';
import CheckList from './components/CheckList.vue';
import Switch from './components/Switch.vue';

import Swipe from './components/Swipe.vue';
import SwipeItem from './components/SwipeItem.vue';

import ActionSheet from './components/ActionSheet.vue';
import Spinner from './components/spinner/Spinner.vue';

import PopupPicker from './components/PopupPicker.vue';
import InfiniteScroll from './components/infinite-scroll/infinite-scroll';

import Toast from './components/toast';

import Lazyload from 'vue-lazyload'

const version = '1.5.0';
const install = function(Vue, config = {}) {
  if (install.installed) return;

  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(HorizontalCell.name, HorizontalCell);
  Vue.component(Field.name, Field);
  Vue.component(Popup.name, Popup);
  Vue.component(Picker.name, Picker);
  Vue.component(VerticalPicker.name, VerticalPicker);
  Vue.component(Rate.name, Rate);
  Vue.component(Radio.name, Radio);
  Vue.component(CheckList.name, CheckList);
  Vue.component(Switch.name, Switch);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
  Vue.component(ActionSheet.name, ActionSheet);
  Vue.component(Spinner.name, Spinner);
  Vue.component(PopupPicker.name, PopupPicker);
  Vue.component(DateTimePicker.name, DateTimePicker);

  Vue.use(InfiniteScroll);
  Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: require('./assets/images/loading-spin.svg'),
    attempt: 3
  });

  Vue.$toast = Vue.prototype.$toast = Toast;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version,
  Cell,
  HorizontalCell,
  Button,
  Field,
  Popup,
  Picker,
  VerticalPicker,
  PickerSlot,
  DateTimePicker,
  Rate,
  Radio,
  CheckList,
  Switch,
  Swipe,
  SwipeItem,
  ActionSheet,
  PopupPicker,
  Spinner,
  InfiniteScroll,
  Toast
};
