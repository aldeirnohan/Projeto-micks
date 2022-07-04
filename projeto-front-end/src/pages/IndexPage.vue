<template>
  <q-page :class="!loading ? 'q-mx-md q-my-lg' : 'flex flex-center'">
    <div v-if="loading" class="text-center">
      <q-spinner-puff color="primary" size="10em" />
      <div class="carregando">CARREGANDO</div>
    </div>
    <div v-else>
      <q-input
        color="primary"
        filled
        v-model="filtro"
        label="BUSCAR POR LIVROS"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="parent q-gutter-sm q-mt-md">
        <q-card
          @click="abrirFormulario()"
          class="box text-white flex flex-center"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section class="text-center">
            <img src="~assets/add.png" alt="Icone de adicionar novo livro" />
          </q-card-section>
        </q-card>
        <q-card
          v-for="livro in livrosFiltrados"
          :key="livro"
          @click="abrirFormulario(livro.id)"
          class="box text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ livro.nome }}</div>
          </q-card-section>
          <q-card-section class="text-center">
            <img src="~assets/book.png" alt="Imagem de livro" />
          </q-card-section>
          <q-card-section class="absolute-bottom bg-blue row justify-between">
            <div class="editora">{{ livro.editora }}</div>
            <div class="ano">{{ livro.anoPublicacao }}</div>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="formulario" full-width>
        <formulario-livro :id="selectedId" />
      </q-dialog>
    </div>
  </q-page>
</template>

<style scoped>
.carregando {
  font-size: 20px;
  color: rgb(173, 173, 173);
}

.my-card {
  width: 100%;
  max-width: 250px;
}
.parent {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.box {
  height: 300px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.box:hover {
  transform: scale(1.05);
}

.genero {
  font-weight: 700;
}

.ano {
  font-weight: 700;
}
</style>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import FormularioLivro from "components/FormularioLivro.vue";
import request from "../utils/request.js";

export default defineComponent({
  name: "IndexPage",

  components: {
    FormularioLivro,
  },

  setup() {
    const data = ref([
    ]);

    const livrosFiltrados = computed(() => {
      if (filtro.value) {
        console.log(filtro.value);
        return data.value.filter((item) => {
          return filtro.value
            .toLowerCase()
            .split(" ")
            .every((v) => item.nome.toLowerCase().includes(v));
        });
      } else {
        return data.value;
      }
    });

    const formulario = ref(false);
    let selectedId = ref(null);
    let filtro = ref("");
    let loading = ref(false);
    onMounted(async () => {
      try {
        loading.value = true;
        const result = await request("get", "/livros", null);
        data.value = result;
        console.log(result);
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    });
    return {
      formulario,
      selectedId,
      data,
      livrosFiltrados,
      loading,
      filtro,
      abrirFormulario(value) {
        console.log(value);
        selectedId.value = value;
        formulario.value = !formulario.value;
      },
    };
  },
});
</script>
