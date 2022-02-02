<template>

    <!-- information text of operation -->
    <div v-if="showAlert" class="container">    
      <div class="text-center mt-3 mb-2 alert alert-success" role="alert">
        {{textAlert}}
      </div>        
    </div>     

</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {

    setup(){

        //statemets
        const store = useStore()
        const showAlert = ref(false)
        const textAlert = ref('')
        
        //computed
        const tipo = computed(() => {
            return store.getters.getTipoOperacion
        })
        
        //text to show
        if(tipo.value === 'creacion'){
            textAlert.value = 'Se ha creado la tarea correctamente'
            showAlert.value = true
        } else if(tipo.value === 'edicion'){
            textAlert.value = 'Se ha editado la tarea correctamente'
            showAlert.value = true
        } else if(tipo.value === 'eliminacion'){
            textAlert.value = 'Se ha eliminado la tarea correctamente'
            showAlert.value = true
        } 
        
        //close alert
        if(showAlert.value){            
            setTimeout(() => {
                showAlert.value = false
                store.dispatch('setTypeOperation', '')
            }, 5000);
        }
        
        return { showAlert, textAlert }
    }
}
</script>

<style>

</style>