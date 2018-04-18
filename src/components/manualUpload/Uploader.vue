<template>
  <div class="uploader flex" :class="{'uploader-opened': isOpened}">
    <!-- input section -->
    <div class="uploader__input-wrapper">
      <div class="flex">
        <i class="f7-icons uploader__cloud">cloud_upload</i>
      </div>
      <div class="flex">
        <h2 class="uploader__title">Where can we find your article?</h2>
      </div>
      <div class="flex">
        <input  v-validate="'url'" class="uploader__input" type="url" name="url" id="manualURL" placeholder="enter url here" v-model="inputUrl"
          v-on:keydown.enter="sendURL"
        >
      </div>
      <div class="flex uploader__input-error-wrapper">
        <span v-show="errors.has('url')" class="uploader__input-error">{{ errors.first('url') }}</span>
      </div>
      <div class="flex">
        <f7-button
        class="uploader__submit-button flex"
        :class="{'uploader__submit-button__closed': inputUrl.length === 0,
                  'uploader__submit-button__disabled': errors.has('url') || inputUrl.length === 0}"
        fill @click="sendURL">
          <span v-if="!isLoading">send</span>
          <f7-preloader v-else color="white"></f7-preloader>
        </f7-button>
      </div>
      <div class="uploader__error-wrapper">
        <span v-if="wasError" class="uploader__text">
          <i class="f7-icons uploader__error" style="font-size: 18px;">close</i>
          <span class="uploader__error">Bummer!<br></span> There was an error grabbing your article. <br> Please check the link and try again.</span>
      </div>
    </div>
    <v-touch v-on:swipeup="closeUploader" class="uploader__swipe-close"></v-touch>
  </div>
</template>

<script>
import moment from 'moment'
import VueTouch from 'vue-touch'
import Axios from 'axios'
import VeeValidate from 'vee-validate'
import Article from '../Article.vue'
import Companies from '../Companies.vue'
import Keywords from '../Keywords.vue'
export default {
  components: {
    Article,
    Companies,
    Keywords
  },
  props: {
    isOpened: Boolean,
    articleExists: Boolean
  },
  computed: {
    date: function () {
        return moment().utc().format()
      }
  },
  methods: {
    unfocusInput(){
      document.getElementById('manualURL').blur()
    },
    closeUploader: function(){
      if(this.articleExists){
        this.$emit('closeUploader');
      }
    },
    sendURL: function(){
      if(this.inputUrl.trim() === '' || this.errors.has('url')){
        this.unfocusInput();
      }else{
        this.wasError = false;
        this.isLoading = true;
        const data = {
          'x-api-key': this.uploaderApiKey
        }
        const url = 'https://mercury.postlight.com/parser?url=' + this.inputUrl;
        console.log(url);
        let self = this;
        Axios.get(url, { 'headers': data })
        .then((response) => {
        console.log(response.data);
        let article = response.data;
        let upload = {
          title: article.title,
          author: article.author,
          source: article.domain,
          publishedAt: article.date_published ? article.date_published : self.date,
          url: article.url,
          urlToImage: article.lead_image_url,
          description: article.excerpt
        }
        this.isLoading = false;
        this.$emit('manualUpload', upload)
        this.inputUrl = ''
        })
        .catch((error) => {
        console.log(error);
        this.wasError = true;
        this.isLoading = false;
        })
      }
    }
  },
  data: function() {
    return {
      inputUrl: '',
      isLoading: false,
      wasError: false,
      title: '',
      author: '',
      source: '',
      url: '',
      uploaderApiKey: 'M4SkqESEjtBa1qnhj6XGhvgAVHgQBgCI94NiCGoV',
      urlToImage: '',
      description: '',
      publishedAt: '',
      keywords:['tech','heck','beck'],
      companies: ['Center For American Progress', 'Clarity PR', 'Exceptional Wines', 'Extreme Reach', 'Ingram Content Group', 'Time Inc', 'Turner Family Center'],
      recommended: false
    }
  }
}
</script>
