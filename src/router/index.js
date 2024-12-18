import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'
import welcomeView from '@/views/welcome.vue'
import OverView from '@/views/overview/index.vue'
import EquipmentAnalysis from '@/views/equipment-analysis/index.vue'
import Vibration from '@/views/vibration/index.vue'
import SootblowingEfficiency from '@/views/sootblowing-efficiency/index.vue'
import Availability from '@/views/availability/index.vue'
import DeviceAvailability from '@/views/device-availability/index.vue'

import EnergyPage from '@/views/energy/index.vue'
import Equipment from '@/views/equipment/index.vue'
import Child from '@/views/child.vue'
import Prediction from '@/views/prediction/index.vue'
import BlockingAnalysis from '@/views/blocking-analysis/index.vue'
import Preventive from '@/views/preventive/index.vue'
import PerfectTemperature from '@/views/perfect-temperature/index.vue'
import ComponentsPredictive from '@/views/components-predictive/index.vue'
import Analysis from '@/views/analysis/index.vue'
import Help from '@/views/help/index.vue'
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: welcomeView
    },
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/overview/:deviceType',
      name: 'overview',
      component: OverView,
      props: true
    },
    {
      path: '/overview2/:deviceType',
      name: 'overview2',
      // component: OverView,
      component: EquipmentAnalysis,
      props: true
    },
    
    {
      path: '/vibration/:deviceType',
      name: 'vibration',
      component: Vibration
    },

    {
      path: '/availability/:deviceType',
      name: 'availability',
      component: Availability
    },
    
    {
      path: '/availability2/:deviceType',
      name: 'availability2',
      component: DeviceAvailability
    },
    {
      path: '/energy/:deviceType',
      name: 'energy',
      component: EnergyPage
    },
    {
      path: '/equipment/:deviceType',
      name: 'equipment',
      component: Equipment,
      props: true
    },
    {
      path: '/child/:deviceType/:mode',
      name: 'child',
      component: Child,
      props: true
    },
    {
      path: '/prediction/:deviceType',
      name: 'prediction',
      component: Prediction
    },
    
    {
      path: '/prediction2/:deviceType',
      name: 'prediction2',
      component: BlockingAnalysis
    },
    
    {
      path: '/perfect-temperature/:deviceType',
      name: 'perfect-temperature',
      component: PerfectTemperature,
    },
    {
      path: '/preventive/:deviceType',
      name: 'preventive',
      component: Preventive
    },
    
    {
      path: '/preventive2/:deviceType',
      name: 'preventive2',
      component: ComponentsPredictive
    },
    {
      path: '/analysis/:deviceType',
      name: 'analysis',
      component: Analysis
    },
    {
      path: '/help/:deviceType',
      name: 'help',
      component: Help
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})

export default router
