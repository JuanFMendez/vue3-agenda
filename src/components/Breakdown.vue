<template>
  <div class="container ">
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between " :class="selectColor(showKey)"  @click="showList(showKey)">
                <strong>{{titulo}}</strong>
                <span class="badge bg-white text-black rounded-pill">{{listado.length}}</span>           
            </li>   
            <div v-if="show" class="container m-1">                 
                <ul v-for="element in listado" :key="element.id" class="list-group h6 "  role="button" >                        
                    <li class="list-group-item border border-white container rounded border" :class="selectColor(showKey)"  @click="seleccinarFecha(element.dia)">                                                     
                        <div class="row">
                            <small class="col-xs-12 col-lg-4">{{element.dia}} </small> 
                            <small class="col-xs-12 col-lg-8 text-center">{{element.tarea.nombre}} </small>
                        </div>
                    </li>                        
                </ul>
            </div>
        </ul>
    </div>    
</template>

<script>
import {  inject, ref } from '@vue/runtime-core';
export default {

props: ['listado', 'titulo', 'showKey','selectedDate' ],
    setup(props){    
        //statements
        const show = ref(false)

        //methods
        const daySelected = inject('daySelected')
        const showList = (key) => {
            if(props.showKey === key){
                if(show.value){
                    show.value = false
                } else {
                    show.value = true
                }
            }
        }
        const seleccinarFecha = (day) => {
            daySelected(day)
        }
        const selectColor = (key) => {

            if("completas" === key ){
                return "bgComplete"
            } else if("pendiente" === key){
                return "bgPendiente"
            } else if("esperando" === key){
                return "bgEsperando"
            }else if("enCurso" === key){
                return "bgEnCurso"
            }
        }

        return {show, showList, seleccinarFecha, selectColor  }
    }

}
</script>

<style>
    .bgComplete {                
        background-color: #8ebd99;
    }
    .bgPendiente {
        background-color:#F9E79F ;
    }
    .bgEsperando {
        background-color: #95A5A6;
    }
    .bgEnCurso {
        background-color: #caebe2 ;
    }
</style>