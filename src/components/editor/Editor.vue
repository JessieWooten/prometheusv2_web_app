<template lang="html">
  <div>
    <f7-actions id="editor" :opened="isEditorOpened">
    <!-- Actions Group -->
    <f7-actions-group class="editor__wrapper">
      <!-- Actions Label -->
      <f7-actions-label class="editor__header">Article Editor</f7-actions-label>
      <v-touch v-on:swipedown="closeEditor">
        <div class="editor__close__wrapper" @click="closeEditor">
          <span class="editor__close">+</span>
        </div>
        <div class="flex">
        <form class="editor__form">
          <div class="editor__article-card"
               :style="{'background-image': `url(${editArticle.urlToImage})`}"
            >
            <!-- Article info -->
             <div class="nc-article-card__contents" style="width: 95%;">
               <textarea id="editor-title" class="editor__title" v-model="editArticle.title" v-on:keydown.enter="unfocusInput('editor-title')"></textarea>
               <section class="editor__article-card__details flex">
                 <input id="source" class="editor__source" type="text" placeholder="Source" v-model="editArticle.source" v-on:keydown.enter="unfocusInput('source')">
                 <input id="edit-date" class="editor__publishedAt" type="text" placeholder="Date" v-model="editArticle.publishedAt" v-on:keydown.enter="unfocusInput('edit-date')">
                 <!-- <p>{{article.source}}</p><p>{{article.publishedAt}}</p> -->
               </section>
             </div>
          </div>
          <div class="flex">
            <div class="editor__input-wrapper">
              <div class="flex">
                <i class="fa fa-desktop editor__icon" aria-hidden="true"></i>
                <input id="edit-url" class="editor__input" type="text" placeholder="Article URL" v-model="editArticle.url" v-on:keydown.enter="unfocusInput('edit-url')">
              </div>
              <div class="flex">
                <i class="fa fa-picture-o editor__icon" aria-hidden="true"></i>
                <input id="edit-img" class="editor__input" type="text" placeholder="Image URL" v-model="editArticle.urlToImage" v-on:keydown.enter="unfocusInput('edit-img')">
              </div>
              <div class="flex" style="justify-content:flex-start;">
                <!-- <i class="fa fa-picture-o editor__icon" aria-hidden="true"></i> -->
                <input id="edit-author" class="editor__input-author" type="text" placeholder="Author" v-model="editArticle.author" v-on:keydown.enter="unfocusInput('edit-author')">
              </div>
              <div class="flex">

                <textarea id="edit-description" class="editor__input__description" v-model="editArticle.description"></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </v-touch>
        <f7-button class="editor__button" @click="updateArticle">done</f7-button>
    </f7-actions-group>
    <!-- Another Group -->
  </f7-actions>

  </div>
</template>

<script>
import VueTouch from 'vue-touch'
export default {
  props: {
    isEditorOpened: Boolean,
    article: Object
  },
  computed:{
    editArticle: function() {
      return this.article ? this.article : {title:'',author:'',source:'',url:'',urlToImage:'',description:'',publishedAt:''}
    }
  },
  methods: {
    closeEditor: function() {
      window.f7.closeModal();
      let self = this;
      setTimeout(function(){self.$emit("closeEditor") }, 300);
    },
    editorClosed(){
      alert("closed")
    },
    unfocusInput(id){
      document.getElementById(id).blur();
    },
    updateArticle: function(){
      this.$emit('updateArticle', {
        title:this.editArticle.title,
        author:this.editArticle.author,
        source:this.editArticle.source,
        url:this.editArticle.url,
        urlToImage:this.editArticle.urlToImage,
        description:this.editArticle.description,
        publishedAt:this.editArticle.publishedAt})
      this.closeEditor()
    }
  },
  data: function() {
    return {
    //   title: this.article.title,
    //   author: this.article.author,
    //   source: this.article.source,
    //   url: this.article.url,
    //   urlToImage: this.article.urlToImage,
    //   description: this.article.description,
    //   publishedAt: this.article.publishedAt
    }
  }
}
</script>
