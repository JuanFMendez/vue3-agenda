<template>

  <!-- modal to confirm operation -->
  <div class="modal-backdrop">
    <div class="modal middleScreen">
      
      <!-- title -->
      <header class="modalHeader">
        <slot name="header">
          {{tituloTexto}}
        </slot>
      </header>

      <section class="modalBody">
        <!-- body -->
        <slot name="body">
            <ul class="noStyleList">
                <li>TAREA : {{tarea.nombre}} </li>
                <li>DIA : {{tarea.dia}}</li>
                <li>ESTADO : {{tarea.estado}} </li>
            </ul>
        </slot>
       </section> 

       <footer class="modalFooter col-12">
         <!-- buttons to operate -->
          <div class="col-12 col-lg-4">
            <button type="button" class="btn bgBtnDelete text-white w-100" @click="deleteTask" aria-label="Eliminar">
              Eliminar
            </button>
          </div>
          <div class="col-0 col-lg-1"></div>
          <div class="col-12 col-lg-4">
            <button type="button" class="btn bgBtnCancel text-white mt-2 w-100" @click="close" aria-label="Cancelar">
              Cancelar
            </button>
          <div class="col-0 col-lg-1"></div>
          </div>
        </footer>      
    </div>
  </div>

</template>

<script>

import { ref } from '@vue/reactivity'
import { computed, inject } from '@vue/runtime-core'

export default {

  props:['tarea'],
  setup(props){
    
    //statemets
    const tituloTexto = ref('¿Estás seguro de querer eliminar la siguiente tarea?')

    //computed
    const tarea = computed(() =>{
        return props.tarea
    })

    //methods
    const close = inject('closeModal')
    const deleteTask = inject('deleteTask')

    return {tituloTexto, close ,deleteTask ,tarea}  
  }

}
</script>

<style>
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    max-width: 50% !important;
    max-height: 30% !important;
    
  }
  .modal-backdrop {
       background-color: rgba(0, 0, 0, 0.3);
  }
  .middleScreen {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .modalHeader{
      text-align: center !important;
      padding: 1rem 1rem;
      border-bottom: 1px solid #dee2e6;
  }
  .modalBody {
    text-align: center;
    flex: 1 1 auto;
    padding: 1rem;
  }
  .noStyleList{
    list-style: none;
  }
  .modalFooter{
      flex-wrap: wrap;
      align-items: center;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;
      display: flex;
      justify-content: center;
  }

</style>