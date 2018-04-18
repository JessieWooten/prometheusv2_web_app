<template>
  <div>
    <div class="description__container">
      <p class="description__text" :class="{'description__text-long':  article.description ? article.description.length > 180 : true }">
        <span class="description__text-author">{{article.author}}</span>
        {{article.description}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object
  }
}
</script>
