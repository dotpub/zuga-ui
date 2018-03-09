import Index from '../Index'
import Toast from '../pages/toast'
import Button from '../pages/button'
import Cell from '../pages/cell'
import Checklist from '../pages/checklist'
import ActionSheet from '../pages/actionsheet'
import DateTimePicker from '../pages/datetime-picker'


const route = {
  routes: [
    {
      path: '/', component: Index
    },
    {
      path: '/toast', component: Toast
    },
    {
      path: '/button', component: Button
    },
    {
      path: '/cell', component: Cell
    },
    {
      path: '/checklist', component: Checklist
    },
    {
      path: '/actionsheet', component: ActionSheet
    },
    {
      path: '/datetime-picker', component: DateTimePicker
    },
  ]
};

export default route.routes;
