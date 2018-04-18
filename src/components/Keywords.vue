<template>
  <div class="keywords">
    <!-- <p v-for="company in companies">{{company}}</p> -->
    <p class="keywords__title">keywords</p>
    <div class="keywords__overflow">
      <form v-for="keyword in keywords" class="keywords__wrapper">
        <input v-model="selectedKeywords" :id="convertToId(keyword)" class="keywords__checkbox" type="checkbox" :name="keyword" :value="keyword">
        <label class="keywords__chip flex" :for="convertToId(keyword)">{{keyword}}</label>
      </form>
    </div>
  </div>
</template>

<script>
import dataUpdate from '../event-bus.js'
export default {
  created(){
    dataUpdate.$on('clearSelections', $event => {
      this.selectedKeywords = [];
    })
  },
  props:{
    keywords: Array
  },
  watch:{
    selectedKeywords: function(newVal, oldVal){
        dataUpdate.$emit('selectedKeywords', this.selectedKeywords)
    }
  },
  methods:{
    convertToId: function(name) {
      return name.toLowerCase().split(' ').join('-')
    },
    setKeywords(){
      dataUpdate.$emit('selectedKeywords', this.selectedKeywords)
    }
  },
  data: function () {
    return {
      selectedKeywords: []
    }
  }
}
</script>
