<template>
  <div class="management">
    <div class="col-12 d-flex flex-wrap">

      <!-- calendar -->  
      <div class="container mt-5 col-xs-12 col-md-4">
          <Calendar is-expanded @dayclick="daySelected" />
          <DatePicker mode="date" v-model="selectedDate"/>
          
          <div v-if="showAlert" class="container">    
            <div class="text-center mt-3 mb-2 alert alert-warning" role="alert">
              {{textAlert}}
            </div>        
          </div> 
      </div>

      <!--Hours-->
      <div class="mt-4 col-12 text-center d-flex justify-content-center">
         <div class="col-10 col-md-4">
          <HoursAvailables />
        </div>
      </div>

      <!--Form-->
      <div class="mt-4 col-12 d-flex justify-content-center">
        <div class="col-md-4">
          <FormTask />
        </div>
      </div>
     
    </div>
  </div>
</template>


<script>

import {Calendar , Datepicker} from 'v-calendar'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/runtime-core'
import moment from 'moment'

import FormTask from '../components/FormTask.vue'
import HoursAvailables from '../components/HoursAvailables.vue'

export default {
  name: 'Management',
  components: {
    Calendar , Datepicker, useStore,
    FormTask , HoursAvailables
  },
  setup(){

    const store = useStore()

    //statements    
    const showAlert = ref(false);
    const textAlert = 'La tarea ya está asignada a un dia'

    //computed
    const tarea = computed(() => {
      return store.getters.getTask
    })
    const selectedDate = computed(() => {
      return store.getters.getDaySelected
    })

    //mehtods
    store.dispatch('getHoursOcupped', selectedDate )

    const daySelected = (dateClick) => { 
      if(tarea.value.id === null){
        //clickar en calendario con generacion de nueva tarea
        const formatDay = moment(dateClick.id).format('DD-MM-YYYY') 
        store.dispatch('setDaySelected', formatDay)
        store.dispatch('filterTaskForDay', formatDay)
        store.dispatch('getHoursOcupped', selectedDate )
      } else {
        //clickar en calendario con edicion de tarea
        showAlert.value = true
        setTimeout(() => {
          showAlert.value = false
        }, 5000);
      }     
    }
    if(tarea.value.id === null){
      daySelected(selectedDate)
    }
    
    
   
    return {selectedDate, textAlert, showAlert, daySelected}
  }
}
</script>

<style>

 .bgBody{
    background-color: #D0D3D4;
  }

</style>