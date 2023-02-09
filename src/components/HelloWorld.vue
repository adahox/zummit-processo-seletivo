<script setup>
import { ref } from 'vue';
import FormSimulacao from './FormSimulacao.vue';
import List from './List.vue';
import Header from './Header.vue'

const lista = ref([]);

function setLista(resultado) {
  lista.value = resultado;
}

</script>
<template>
  <div class="bg-slate-200">

    <Header title="Zummit: Processo Seletivo" />
    <FormSimulacao @emitResultLists="setLista" />

    <List :taxaJuros="lista" />
  </div>
</template>

