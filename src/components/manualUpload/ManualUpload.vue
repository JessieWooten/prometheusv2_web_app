<template lang="html">
  <div class="">
    <f7-pages>
      <f7-page>
        <div class="editor">
          <form class="editor__form">
            <label class="editor__title__manual" for="">Title</label>
            <input class="editor__input" type="text" name="" v-model="title">
            <label class="editor__title__manual" for="">Author</label>
            <input class="editor__input" type="text" name="" v-model="author">
            <label class="editor__title__manual" for="">URL</label>
            <input class="editor__input" type="text" name="" v-model="url">
            <label class="editor__title__manual" for="">Source</label>
            <input class="editor__input" type="text" name="" v-model="source">
            <!-- <label class="editor__title" for="">Date</label>
            <input class="editor__input" type="text" name="" v-model="publishedAt"> -->
            <label class="editor__title__manual" for="image">Image Link</label>
            <input class="editor__input" type="text" name="" v-model="urlToImage">
            <label class="editor__title__manual" for="">Description</label>
            <textarea class="editor__textarea">{{description}}</textarea>
          </form>
          <Keywords :keywords="keywords"></Keywords>
          <Companies :companies="companies"></Companies>
          <div class="editor__preview-article">
            <Article :article="previewArticle"></Article>
          </div>
          <div class="editor__submit-button-wrapper">
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
//import fb from '../firebase'
export default {
  components: {
    Keywords,
    Companies,
    Article
  },
  computed: {
    date: function () {
      return moment().utc().format()
    },
    charsLeft(state) {
      return 70 - state.description.length;
    },
    objectID: function(){
      return encodeURIComponent(this.source.split(' ').join('').toLowerCase() + "-" + this.title.split(' ').join('').toLowerCase());
    },
    isFormFilled: function () {
      return (
        this.objectID.length >= 1 &&
        this.author.length >= 1 &&
        this.source.length >= 1 &&
        this.url.length >= 1 &&
        this.description.length >= 1 &&
        this.topic.length > 0 &&
        this.company.length > 0
      )
    },
    isTopicSelected: function(){
      return (this.topic.length>0)
    },
    isCompanySelected: function(){
      return (this.company.length>0)
    },
    sourcePush: function() {
      return encodeURIComponent(this.source.toLowerCase().split(' ').filter( x => x !== "").join('-'));
    },
    titlePush: function() {
      return this.title.trim();
    },
    authorPush: function() {
      return this.author.trim();
    },
    previewArticle: function() {
      return {
        urlToImage: this.urlToImage,
        url:this.url,
        source: this.source,
        publishedAt: this.date,
        title: this.title,
        recommend: this.recommended,
      }
    }
  },
  methods: {
    removeTopic(topic, id){
      let index = this.topic.indexOf(topic);
      this.topic.splice(index, 1);
      document.getElementById(id).checked=false;
    },
    toggleSelect(select){
      if(select == "topic"){
        if(this.topicToggle == true){
          this.topicToggle = false;
        }else{
          this.topicToggle = true
        }
      }else{
        if(this.companyToggle == true){
          this.companyToggle = false;
        }else{
          this.companyToggle = true;
        }

      }
    },
    guidPart() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    addArticle(e) {
      e.preventDefault();
      let objectIDHolder = this.objectID;
      let companyHolder = this.company;
      if(this.company.length == 1){
        fb.database().ref(companyHolder[0]).child(objectIDHolder + "-" + this.guidPart()).set({
          publishedAt: this.date,
          author: this.authorPush,
          source: this.sourcePush,
          title: this.titlePush,
          url: this.url,
          urlToImage: this.urlToImage,
          description: this.description,
          topic: this.topic,
          objectID: this.objectID,
          recommended: this.recommended
        }).then(() => {
          this.$swal({
            title: 'Success!',
            text: 'Your article was submitted',
            type: 'success'
          })
        })
        .catch(err => {
          console.log('Error', err);
        })
      }else{
        for(let i = 0; i <= this.company.length; i++){
          fb.database().ref(companyHolder[i]).child(objectIDHolder + "-" + this.guidPart()).set({
            publishedAt: this.date,
            author: this.authorPush,
            source: this.sourcePush,
            title: this.titlePush,
            url: this.url,
            urlToImage: this.urlToImage,
            description: this.description,
            topic: this.topic,
            objectID: this.objectID,
            recommended: this.recommended
        }).then(() => {
          this.$swal({
            title: 'Success!',
            text: 'Your article was submitted',
            type: 'success'
          })
        })
        .catch(err => {
          console.log('Error', err);
        })
      }
    }
      this.clearInputFields();
    },
    clearInputFields() {
      this.date = '';
      this.author = '';
      this.source = '';
      this.title = '';
      this.url = '';
      this.urlToImage = '';
      this.description = '';
      this.topic = [];
      this.company = [];
      this.recommended = false;
    }
  },
  data(){
    return {
      keywords: ['a', 'b', 'c'],
      companies:['me', 'myself','I'],
      topicToggle: true,
      companyToggle: true,
      //articlesRef: fb.database().ref('articles'),
      title: '',
      author: '',
      source: '',
      url: '',
      urlToImage: '',
      description: '',
      topic: [],
      company: [],
      recommended: false
    }
  }
}
</script>
