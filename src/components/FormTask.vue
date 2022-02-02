<template>
  <div class="container" >
    
      <!-- Form title -->
      <div class="text-center">
        <div v-if="tarea.id === null || tarea.id ===undefined">
          <h4> Agregar tarea para el dia: <span > {{selectedDate}} </span></h4>
        </div>
        <div v-else>
          <h4> Editar tarea para el dia: <span > {{selectedDate}} </span></h4>
        </div>
      </div>
     
      <div class="row justify-content-center mt-3">
        <form class="col-12">

           <!-- Body form -->
          <input type="hidden" :v-model="tarea.dia = selectedDate">
          <input type="hidden" :v-model="tarea.id = tarea.id">
          <div class="form-floating">
            <input id="nombre" type="text" class="form-control my-2" placeholder="Ingrese nombre de la tarea" v-model="tarea.nombre">
            <label for="nombre">Nombre</label>
          </div>
          <div class="form-floating">
            <input id="descripcion" type="text" class="form-control my-2" placeholder="Ingrese descripcion de la tarea" v-model="tarea.descripcion">
            <label for="descripcion">Descripción </label>
          </div>
          <div class="form-floating">
            <select id="estados" class="form-control form-select my-2" data-dropup-auto="false" v-model="tarea.estado">
              <option value='' selected></option>
              <option v-for="(estado, index) in estados" :key="index" :value="estado" >
                {{estado}}
              </option>
            </select>
            <label for="estados">Estado</label>
          </div>
          
          <!-- Buttons create form -->
          <div class="col-12 text-center " v-if="tarea.id === null || tarea.id ===undefined">
            <button class="btn bgTitle text-white mt-2 col-12 col-md-5 m-1" type="button" :disabled="bloquear" @click="proccessTask(tarea)">
              Procesar
            </button>
            <button class="btn bgBtnCancel text-white mt-2 col-12 col-md-5 m-1" type="button" @click="cancelTask()">
              Cancelar
            </button>
          </div>
          <!-- Buttons edit form -->
          <div v-else class="col-12 text-center">
            <button class="btn bgTitle text-white mt-2 col-12 col-md-10 m-1" type="button" :disabled="bloquear" @click="proccessTask(tarea)">
              Procesar
            </button>
            <button class="btn bgBtnDelete text-white mt-2 col-12 col-md-5 m-1" type="button" @click="showModal()">
              Eliminar
            </button>
            <button class="btn bgBtnCancel text-white mt-2 col-12 col-md-5 m-1" type="button" @click="cancelTask()">
              Cancelar
            </button>
          </div>
   
        </form>
      </div>
  </div>
  
  <!-- Modal to accept operation -->
  <Modal v-show="isModalVisible" @close="closeModal" :tarea=tarea />

</template>

<script>
import { computed, provide, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
import router  from '../router'
import Modal from './modalOperationInfo.vue';

export default {
components:{ Modal },
setup(){

  //statements
  const store = useStore()
  const estados = store.getters.getStates  
  const isModalVisible = ref(false)

  //computed
  const tarea = computed(() => {
    return store.getters.getTask
  })  
  const selectedDate = computed(() => {    
      return store.getters.getDaySelected
  })  
  const bloquear = computed(() => {
    if(tarea.value.nombre == '' || tarea.value.descripcion == '' 
    || tarea.value.dia == '' || tarea.value.horas.length <= 0 
    || tarea.value.estado == ''){
      return true
    } else {
      return false
    }
  })

  //methods
  const showModal = () => {
    isModalVisible.value = true;
  }
  const closeModal = () => {
    isModalVisible.value = false;
  }    
  const proccessTask = (tarea) =>{       
    store.dispatch('saveOrUpdate', tarea)
  }
  const deleteTask = () => {
    store.dispatch('deleteTask', tarea.value)
  }
  const cancelTask = () => {
    router.push('/')
  }

  provide('closeModal', closeModal)
  provide('deleteTask', deleteTask)


  return {selectedDate, estados,tarea,bloquear, isModalVisible, showModal, closeModal ,proccessTask, deleteTask, cancelTask} 

}


}
</script>
