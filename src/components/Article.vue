<template>
  <div class="nc-article-card"
       :style="{'background-image': `url(${article.urlToImage})`}"
       >
       <!-- recommended flag -->
       <div @click="toggleRecommend">
         <img v-if="article.recommended" src="../../static/images/newscart-icon.png" alt="recommended" class="nc-recommended-flag">
        <img v-else src="../../static/images/newscart-icon-stroke-white.png" alt="not recommend" class="nc-recommended-flag__stroke">
      </div>
      <!-- Article info -->
       <div class="nc-article-card__contents">
         <h3><a @click="viewArticle" target="_blank" class="external">{{article.title}}</a></h3>
         <section class="nc-article-card__details flex">
           <p>{{article.source}}</p><p>{{article.publishedAt}}</p>
         </section>
       </div>
       <EditControls
         @revertEdits="revertEdits"
         @launchEditor="launchEditor"
         :isEdited="isEdited"
       ></EditControls>
  </div>
</template>

<script>
import EditControls from './EditControls.vue'
export default {
  props: {
    article: Object,
    isEdited: Boolean,
    isRecommended:Boolean
  },
  components: {
    EditControls
  },
  computed:{
  },
  methods:{
    launchEditor: function() {
      this.$emit('launchEditor')
    },
    viewArticle: function(){
      window.app.viewArticle(this.article.url)
    },
    revertEdits: function(){
      this.$emit('revertEdits');
    },
    toggleRecommend: function() {
      this.$emit('toggleRecommend')
    }
  }
}
</script>
