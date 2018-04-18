<template>
  <div>
    <f7-navbar class="flex">
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center class="nav__title">PROMETHEUS</f7-nav-center>
      <f7-nav-right>
        <f7-link v-if="!uploaderOpened" style="opacity:0;"><i class="fa fa-cloud-upload nav__uploader" aria-hidden="true"></i></f7-link>
        <!-- <f7-link v-if="!uploaderOpened" @click="toggleUploader"><i class="fa fa-cloud-upload nav__uploader" aria-hidden="true"></i></f7-link> -->
        <!-- <f7-link v-else closeModal back @click="toggleUploader"><span class="editor__close" style="transform: rotate(45deg); font-weight:300; font-size:2.5em; padding: 5px;">+</span></f7-link> -->
      </f7-nav-right>
    </f7-navbar>
  </div>
</template>

<script>
export default {
  props:{
    uploaderOpened: Boolean
  },
  methods:{
    toggleUploader: function(){
      this.$emit('toggleUploader')
    }
  }
}
</script>
