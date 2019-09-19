import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CompanyManagement from '@/components/CompanyManagement'
import EmployeesManagement from '@/components/EmployeesManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/companies',
    name: 'CompanyManagement',
    component: CompanyManagement
  },
  {
    path: '/employees',
    name: 'EmployeesManagement',
    component: EmployeesManagement
  }]
})
