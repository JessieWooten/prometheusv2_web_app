<template>
  <div :class="{'confirm-accept__page':true, 'flex': true,
                'confirm-accept__page-green': isAccepted,
                'confirm-accept__page-red': !isAccepted}"
  >
    <div>
      <div class="flex confirm-accept__check-wrapper">
        <img v-if="isAccepted" class="confirm-accept__check" src="../../../static/images/checkmark.png" alt="">
        <i v-else class="f7-icons confirm-accept__x">close</i>
      </div>
      <p v-if="isAccepted" class="confirm-accept__text">On it's way!</p>
      <p v-else class="confirm-accept__text">Not today internet!</p>
    </div>
    <!-- <div class="confirm-accept__buttons">
      <f7-button class="confirm-accept__button" fill>Send it!</f7-button>
      <f7-button class="confirm-accept__button" fill>Cancel</f7-button>
    </div> -->

  </div>
</template>

<script>
export default {
  props:{
    isAccepted: Boolean
  }
}
</script>

<style lang="css">
</style>
