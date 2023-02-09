<script setup>
import Multiselect from 'vue-multiselect'
import { getConvenios, getInstituicoes, simular } from '../services/axios';
import { onMounted, toRefs, reactive, defineEmits, ref } from 'vue';

const emit = defineEmits(['emitResultLists',]);

const simulador = reactive({
    parcelas: 0,
    valor_emprestimo: null,
    convenios: [],
    instituicoes: [],
    currentInstituicao: [],
    currentConvenios: [],
});

const { parcelas, valor_emprestimo, convenios, instituicoes, currentInstituicao, currentConvenios } = toRefs(simulador);
const showModal = ref(false);

async function fazerSimulacao() {

    const convenios = simulador.currentConvenios.map((convenio) => convenio.chave) ?? [];
    const instituicoes = simulador.currentInstituicao ?? [];

    if (!simulador.valor_emprestimo) {
        showModal.value = true;
        return;
    }

    const payload = {
        "valor_emprestimo": parseInt(simulador.valor_emprestimo),
        "instituicoes": instituicoes,
        "convenios": convenios,
        "parcelas": simulador.parcelas ?? 0
    }
    emit("emitResultLists", await simular(payload));
}

onMounted(async () => {
    simulador.instituicoes = await getInstituicoes();
    simulador.convenios = await getConvenios();
});

</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>

<template>
    <div>
        <div>
            <div class="md:grid md:grid-cols-1 md:gap-6">

                <div class="md:col-span-1">
                    <form>
                        <div class="shadow sm:overflow-hidden ">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6 h-full">
                                <!-- input valor_emprestimo -->
                                <div class="grid grid-cols-3 gap-6">
                                    <div class="col-span-3">
                                        <label for="company-website"
                                            class="block text-sm font-medium text-gray-700">Valor do
                                            Emprestimo</label>
                                        <div class="mt-1 flex rounded-md shadow-sm">
                                            <span
                                                class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">R$</span>
                                            <input v-model="valor_emprestimo" type="text" name="valor_emprestimo"
                                                id="valor_emprestimo"
                                                class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="R$150,00">
                                        </div>
                                    </div>
                                </div>
                                <!-- FIM input valor_emprestimo -->
                                <div class="grid grid-cols-2 gap-2">
                                    <!-- instituição -->
                                    <div>
                                        <div class="col-span-6">
                                            <label for="convenio"
                                                class="block text-sm font-medium text-gray-700">Intituições</label>
                                            <multiselect v-model="currentInstituicao" :options="instituicoes"
                                                :multiple="false" :close-on-select="false" :clear-on-select="false"
                                                :preserve-search="true" placeholder="Selecione o(s) Convênio(s)"
                                                label="valor" track-by="chave" :preselect-first="true">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length"
                                                        v-show="!isOpen">{{ values.length }}
                                                        options selected</span></template>
                                            </multiselect>

                                        </div>
                                    </div>
                                    <!-- convênio -->
                                    <div>
                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="convenio"
                                                class="block text-sm font-medium text-gray-700">Convênio</label>
                                            <multiselect v-model="currentConvenios" :options="convenios"
                                                :multiple="true" :close-on-select="false" :clear-on-select="false"
                                                :preserve-search="true" placeholder="Selecione o(s) Convênio(s)"
                                                label="valor" track-by="chave" :preselect-first="true">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length"
                                                        v-show="!isOpen">{{ values.length }}
                                                        options selected</span></template>
                                            </multiselect>

                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1">
                                    <!-- parcelas -->
                                    <div>
                                        <div class="col-span-6">
                                            <label for="parcelas"
                                                class="block text-sm font-medium text-gray-700">Parcelas</label>
                                            <input type="number" v-model="parcelas" id="parcelas" name="parcelas"
                                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button @click.prevent="fazerSimulacao"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-green-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Simular</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
    <!-- modal -->
    <div v-if="showModal" class="relative z-10">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <!-- Heroicon name: outline/exclamation-triangle -->
                                <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">{{
                                    "atenção".toUpperCase()
                                }}
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">{{ "Exitem campos a serem preenchidos."}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button @click="showModal = false" type="button"
                            class="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Vou
                            preencher</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>