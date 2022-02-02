<template>
  
    <div data-toggle="buttons">
        <label v-for="(item, index) in hoursAvailables" :key="index" class="btn btn-outline-light text-dark borderColor m-1">
            
            <!-- Hours not available -->
            <div v-if="!isAvailable(item)">
                <input type="checkbox" checked @click="addHours(item)" disabled/> {{ item }} 
            </div>
            
            <!-- Hours available and checked -->
            <div v-else-if="isChecked(item)">
                <input type="checkbox" checked @click="addHours(item)" /> {{ item }} 
            </div>
            <!-- Hours available -->
            <div v-else>
                <input type="checkbox"  @click="addHours(item)" /> {{ item }} 
            </div>
            
        </label>        
    </div>
    
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex';
export default {

setup(){

    //statements
    const store = useStore() 
    
    const hoursAvailables = store.getters.getHoursAvailables     
    const hoursSelected = ref([])

    //computed
    const block = computed(() => {
        return store.getters.getHoursBloqued
    })
    const tarea = computed(() => { 
        const tarea = store.getters.getTask       
        hoursSelected.value =  tarea.horas
        return tarea
    })

    //methods
    const addHours = (clickHour) =>{
        const find = hoursSelected.value.find(hora => clickHour == hora);
        if(find !== undefined){           
            for(let i=0; i< hoursSelected.value.length; i++){
                if(clickHour === hoursSelected.value[i]){
                    hoursSelected.value.splice(i,1);
                }
            }
        } else {
            hoursSelected.value.push(clickHour)
        }
        store.dispatch('setHoursSelected', hoursSelected.value )
    }
    const isAvailable = (hora) => {
        const ret = true;
        for(let i=0; i< block.value.length; i++){
            let horas = block.value[i].horas
            for(let y=0; y< horas.length; y++ ){
                if(hora === horas[y] && block.value[i].id !== tarea.value.id){
                    return false
                }
            }
        }

        return ret;
    }
    const isChecked = (hora) =>{
        const ret = false;
        for(let i=0; i< tarea.value.horas.length ; i++){
            if(tarea.value.horas[i] === hora){
                return true
            }
        }
        return ret;
    } 

    return { hoursAvailables, hoursSelected, tarea ,addHours, isChecked, isAvailable }
}

}
</script>

<style>
.borderColor{
    border-color : silver;
}
</style>