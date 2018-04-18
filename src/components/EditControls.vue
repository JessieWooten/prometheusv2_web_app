<template lang="html">
  <div class="edit__container">
    <div class="edit-button__wrapper">
      <f7-fab v-if="isEdited" color="white" class="edit-button" @click="revertEdits">
        <i class="fa fa-repeat edit__revert-button__icon" aria-hidden="true"></i>
      </f7-fab>
    </div>
    <div class="edit-button__wrapper">
      <f7-fab color="white" class="edit-button" @click="launchEditor">
        <i class="fa fa-pencil edit-button__icon" aria-hidden="true"></i>
      </f7-fab>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    isEdited: Boolean
  },
  methods:{
    launchEditor: function() {
      this.$emit('launchEditor')
    },
    revertEdits: function() {
      this.$emit('revertEdits')
    }
  }
}
</script>
