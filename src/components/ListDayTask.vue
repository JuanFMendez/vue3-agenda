<template>
    <!-- List task for day -->
    <table class="table tableSpacing ">
        <thead>
            <tr>
                <th class="d-none d-md-block">Horas</th>
                <th>Tarea</th>
                <th class="d-none d-md-block">Descripcion</th>
                <th>Estado</th>
                <th></th>        
            </tr>
        </thead>
        <tbody v-if="taskForDay.length > 0">                        
            <tr class=" border border-white " :class="selectColor(task.estado)" v-for="task in taskForDay" :key="task.id">
                <td class="rounded-left d-none d-md-table-cell ">
                    <span v-for="(hour, index) in task.horas" :key="index" class="p-1">
                        <div role="button" disabled class="btn btn-outline-light text-dark btn-sm">
                            {{hour}}     
                        </div>
                    </span>                    
                </td> 
                <td>{{task.nombre}}</td>
                <td class="d-none d-md-table-cell">{{task.descripcion}}</td>
                <td>{{task.estado}}</td>
                <td class="rounded-right text-center">
                    <button  class="btn btn-outline-light text-dark btn-sm" @click="editTask(task)">
                        <i class="bi bi-pencil-square "></i>
                    </button>
                </td>
            </tr>            
        </tbody>
        <tbody v-else>
            <tr class="text-center">
                <td colspan="5"> - Selecciona un dia - </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'

export default {
    setup(){

        //statemets
        const store = useStore();

        //computed
        const taskForDay = computed(() => {
            const task = store.getters.getTaskDay
            const taskForDay = []
             Object.entries(task).forEach(([keyDia, dia]) => {
                 taskForDay.push(task[keyDia])
             })
             return taskForDay
        })

        //methods
        const editTask = (tarea) => {
            store.dispatch('setDaySelected', tarea.dia)
            store.dispatch('setTask', tarea)          
        }
        const selectColor = (key) => {

            if("Completa" === key ){
                return "bgComplete"
            }
            if("Pendiente" === key){
                return "bgPendiente"
            } 
            if("Esperando" === key){
                return "bgEsperando"
            }
            if("En curso" === key){
                return "bgEnCurso"
            }
        }

        return {taskForDay, editTask, selectColor}
    }
}
</script>

<style>
    [role="button"].btn {
        cursor: default; 
    }

    .tableSpacing {
        border-collapse: separate;
        border-spacing:0 2px;
    }   
</style>