<template>
  <div class="home">
    <div class="col-12 d-flex flex-wrap">
      <!--Calendar-->
      <div class="container mt-5 col-xs-12 col-md-4">  
        <Calendar @dayclick="daySelected" is-expanded /> <!-- :attributes='attrs' -->
        <DatePicker mode="date" :v-model="selectedDate" />
      </div>

      <!--List by states-->
      <div class="container mt-5 col-offset-1 col-xs-12 col-md-4 ">
        <div class="text-center">
          <Breakdown :listado=tareasEnCurso     titulo="En curso"   showKey="enCurso"   :selectedDate=selectedDate   />
          <Breakdown :listado=tareasPendientes  titulo="Pendiente"  showKey="pendiente" :selectedDate=selectedDate   />
          <Breakdown :listado=tareasEsperando   titulo="Esperando"  showKey="esperando" :selectedDate=selectedDate   />
          <Breakdown :listado=tareasCompletas   titulo="Completas"  showKey="completas" :selectedDate=selectedDate   />
        </div>
      </div>
    </div>

    <!--Message-->
    <MessageInfo />

    <!-- Things to do -->
    <div class="col-12 ">
      <div class="container mt-5">  
        <h4 class="text-center">Listado de tareas por dia {{selectedDate}}</h4>
        <ListTask />
      </div>
    </div>
  </div>
</template>

<script>

import {Calendar , Datepicker} from 'v-calendar'
import { useStore } from 'vuex'
import moment from 'moment'
import Breakdown from '../components/Breakdown'
import ListTask from '../components/ListDayTask'
import MessageInfo from '../components/messageInfo'

import { computed, provide, ref } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: {
    Calendar , Datepicker, useStore,
    Breakdown, ListTask , MessageInfo
  },
  setup(){

    //statements
    const store = useStore()
    const selectedDate = ref('')

    store.dispatch('getAllTask')
    store.dispatch('getAllState')
    store.dispatch('getAllHoursAvailables')

    //computed 
    const tareasCompletas = computed(() => {
        return store.getters.getTaskComplete
    })
    const tareasPendientes = computed(() => {
        return store.getters.getTaskSlope
    })
    const tareasEsperando = computed(() => {
        return store.getters.getTaskWaiting
    })
    const tareasEnCurso = computed(() => {
        return store.getters.getTaskInProgress
    })

    //methods   
    const daySelected = (dateClick) => {
      if(dateClick.id !== undefined){
        selectedDate.value = moment(dateClick.id).format('DD-MM-YYYY')        
      }else {
        selectedDate.value = dateClick
      }
      store.dispatch('setDaySelected', selectedDate.value)
      store.dispatch('filterTaskForDay', selectedDate.value)
    }

    provide('daySelected', daySelected)

    /*
    const attrs = [{ 
      key: 'today',
      highlight: true,     
      date: selectedDate.value
    }]
    */

    return {selectedDate, tareasCompletas, tareasPendientes,  tareasEsperando, tareasEnCurso, daySelected }
  }
}
</script>
<style>

  .date-circle {
    background: #ff8080;
  }
  .date-text {
    color: black;
  }
  
</style>
