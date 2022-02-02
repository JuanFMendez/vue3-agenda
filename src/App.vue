<template>
  <div id="nav" class="text-center bgTitle p-0 col-12 d-flex justify-content-center">    
      <router-link to="/" class="link">
        <strong>Lista de tareas</strong>
      </router-link>
      <router-link to="/management" class="link">
        <strong>Administrar tareas</strong>
      </router-link>
  </div>
  <router-view/>
</template>

<style>
 
  .link{
    text-decoration: none;
    color : #706747;
    text-transform: uppercase;
    margin : 10px;
  }
  .link:hover{
    color :#f0f0f0;
  }
  .bgTitle{
    background-color: #F5B041;
  }
  .bgBtnDelete{
    background-color: rgb(214, 57, 57);
  }
  .bgBtnCancel{
    background-color: rgb(194, 196, 75);
  }

</style>
