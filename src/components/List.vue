<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    taxaJuros: {
        type: Array,
        default: () => []
    }
});

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>

<template>
    <div class="rounded bg-silver p-5">
        <div class="rounded-md bg-white p-5">
            <h1 class="font-bold text-xl py-5">Resultado</h1>
            <div v-if="props.taxaJuros" id="list">
                <div v-for="(item, index) in taxaJuros" class="grid item   border-orange-400 border-b-2">
                    <h1 class="text-center py-2 font-bold">
                        Instituição: <span class="text-orange-600">{{ index }}</span>
                    </h1>

                    <div class="grid grid-cols-4 my-4">
                        <div class="parcelas text-center col-span-1 font-bold">
                            Convênio
                        </div>
                        <div class="taxaJuros text-center col-span-1 font-bold">
                            Parcelas
                        </div>
                        <div class="instituicao text-center col-span-1 font-bold">
                            Juros
                        </div>
                        <div class="convenio text-center col-span-1 font-bold">
                            Valor Parcela
                        </div>
                    </div>

                    <div class="grid grid-cols-4 my-2" v-for="taxa in item">
                        <div class="col-span-1 p-3 text-center">
                            {{ taxa.convenio }}
                        </div>
                        <div class="text-center p-3 col-span-1">
                            {{ taxa.parcelas }}
                        </div>
                        <div class="text-center p-3 col-span-1">
                            {{ taxa.taxa }}
                        </div>
                        <div class="text-center p-3 col-span-1">
                            R$ {{ taxa.valor_parcela }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-bold text-center" v-if="!props.taxaJuros">
                Não há dados encontrados
            </div>
        </div>

    </div>
</template>