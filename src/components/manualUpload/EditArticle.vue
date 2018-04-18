<template lang="html">
  <div class="">
    <f7-pages>
      <f7-page>
        <div class="editor">
          <form class="editor__form">
            <label class="editor__title__manual" for="">Title</label>
            <input id="edit-title" class="editor__input" type="text" name="" v-model="title" v-on:keydown.enter="unfocusInput('edit-title')">
            <label class="editor__title__manual" for="">Author</label>
            <input id="edit-author" class="editor__input" type="text" name="" v-model="author" v-on:keydown.enter="unfocusInput('edit-author')">
            <label class="editor__title__manual" for="">URL</label>
            <input id="edit-url" class="editor__input" type="text" name="" v-model="url" v-on:keydown.enter="unfocusInput('edit-url')">
            <label class="editor__title__manual" for="">Source</label>
            <input id="edit-source" class="editor__input" type="text" name="" v-model="source" v-on:keydown.enter="unfocusInput('edit-source')">
            <!-- <label class="editor__title" for="">Date</label>
            <input class="editor__input" type="text" name="" v-model="publishedAt"> -->
            <label class="editor__title__manual" for="image">Image Link</label>
            <input id="edit-img" class="editor__input" type="text" name="" v-model="urlToImage" v-on:keydown.enter="unfocusInput('edit-img')">
            <label class="editor__title__manual" for="">Description</label>
            <textarea id="edit-description" class="editor__textarea">{{description}}</textarea v-on:keydown.enter="unfocusInput('edit-description')">
          </form>
          <Keywords :keywords="keywords"></Keywords>
          <Companies :companies="companies"></Companies>
          <div class="editor__preview-article">
            <Article :article="previewArticle"></Article>
          </div>
          <div class="editor__submit-button-wrapper flex">
            <button fill class="editor__submit-button" type="button" name="button">Submit</button>
          </div>
        </div>
      </f7-page>
    </f7-pages>
  </div>
</template>

<script>
import moment from 'moment'
import Keywords from '../Keywords.vue'
import Companies from '../Companies.vue'
import Article from '../Article.vue'
export default {
  methods:{
    unfocusInput(id){
      document.getElementById(id).blur();
    }
  }
}
</script>
