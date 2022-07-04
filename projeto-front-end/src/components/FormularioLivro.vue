<template>
  <q-card v-if="loading && bookId != null" class="text-center">
    <q-card-section>
      <q-spinner-puff color="primary" size="6em" />
      <div class="carregando">CARREGANDO</div>
    </q-card-section>
  </q-card>
  <q-card v-else>
    <q-card-section class="row items-center justify-between">
      <div class="row items-center">
        <q-avatar icon="book" color="primary" text-color="white" />
        <span class="q-ml-sm titulo-formulario">{{
          bookId != null ? editarLivro : novoLivro
        }}</span>
      </div>
      <q-btn @click="deleteLivro" v-if="bookId != null" outline label="EXCLUIR" color="negative" />
    </q-card-section>

    <q-card-section>
      <q-input required filled v-model="nome" label="Titulo" />
      <div class="row q-col-gutter-x-md q-mt-md">
        <q-input required class="col" filled v-model="editora" label="Editora" />
        <q-input required class="col" filled v-model="anoPublicacao" label="Ano de Publicação" />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="CANCELAR" color="grey" v-close-popup />
      <q-btn @click="submit" flat color="primary">
        <div v-if="!loading2">SALVAR</div>
        <q-spinner-puff v-else color="primary" size="1em" />
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.titulo-formulario {
  font-weight: 700;
  color: rgb(109, 109, 109);
  font-size: 18px;
}
.carregando {
  font-size: 16;
  color: rgb(173, 173, 173);
}
</style>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import request from "../utils/request.js";

export default defineComponent({
  name: "FormularioLirvro",
  props: ["id"],
  setup(props) {
    const bookId = computed(() => {
      return props.id;
    });
    const novoLivro = "Adicionar novo livro";
    const editarLivro = "Editar livro";
    let nome = ref("");
    let editora = ref("");
    let anoPublicacao = ref("");
    let loading = ref(false);
    let loading2 = ref(false);
    onMounted(async () => {
      if (bookId.value != null) {
        try {
          loading.value = true;
          const result = await request("get", "/livros", bookId.value);
          nome.value = result.nome;
          editora.value = result.editora;
          anoPublicacao.value = result.anoPublicacao;
          console.log(result);
          loading.value = false;
        } catch (error) {
          loading.value = false;
          console.log(error);
        }
      }
    });
    return {
      bookId,
      novoLivro,
      loading,
      loading2,
      nome,
      editora,
      anoPublicacao,
      editarLivro,
      async submit() {
        if (bookId.value) {
        console.log('AQUIIIIIIIIII');
          try {
            loading2.value = true;
            const result = await request("put", "/livros", {
              id: bookId.value,
              nome: nome.value,
              editora: editora.value,
              anoPublicacao: anoPublicacao.value,
            });
            data.value = result;
            console.log(result);
            loading2.value = false;
          } catch (error) {
            loading2.value = false;
            console.log(error);
          }
          return;
        }
        try {
          loading2.value = true;
          const result = await request("post", "/livros", {
            nome: nome.value,
            editora: editora.value,
            anoPublicacao: anoPublicacao.value,
          });
          data.value = result;
          console.log(result);
          loading2.value = false;
        } catch (error) {
          loading2.value = false;
          console.log(error);
        }
      },
      async deleteLivro() {
        try {
          const result = await request("delete", "/livros", bookId.value);
          data.value = result;
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
});
</script>
