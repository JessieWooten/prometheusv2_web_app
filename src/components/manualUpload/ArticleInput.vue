<template lang="html">
  <div class="uploader__input-wrapper">
    <div class="flex">
      <h2 class="uploader__title">Where can we find your article?</h2>
    </div>
    <div class="flex">
      <input  v-validate="'url'" class="uploader__input" type="text" name="url" placeholder="enter url here" v-model="inputUrl">
    </div>
    <div class="flex">
      <span v-show="errors.has('url')" class="uploader__input-error">{{ errors.first('url') }}</span>
    </div>
    <div class="flex">
      <f7-button
      class="uploader__submit-button flex"
      :class="{'uploader__submit-button__closed': inputUrl.length === 0}"
      fill @click="sendURL">
        <span v-if="!isLoading">send</span>
        <f7-preloader v-else color="white"></f7-preloader>
      </f7-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  },
  methods: {
    sendURL: function() {
      this.$emit('sendURL');
    }
  },
  data: function() {
    return {
      inputUrl: ''
    }
  }
}
</script>

<style lang="css">
</style>
