<template>
  <div class="companies">
    <!-- <p v-for="company in companies">{{company}}</p> -->
    <p class="companies__title">company</p>
    <div class="companies__overflow">
      <form v-for="company in companies" class="companies__wrapper">
        <input v-model="selectedCompanies" :id="convertToId(company)" class="companies__checkbox" type="checkbox" :name="company" :value="company">
        <label class="companies__chip flex" :for="convertToId(company)">{{company}}</label>
      </form>
    </div>
  </div>
</template>

<script>
import dataUpdate from '../event-bus.js'
export default {
  created(){
    dataUpdate.$on('clearSelections', $event => {
      this.selectedCompanies = [];
    })
  },
  props:{
    companies: Array
  },
  watch:{
    selectedCompanies: function(newVal, oldVal){
        dataUpdate.$emit('selectedCompanies', this.selectedCompanies)
    }
  },
  methods:{
    convertToId: function(name) {
      return name.toLowerCase().split(' ').join('-')
    },
    setCompanies(){
      dataUpdate.$emit('selectedCompanies', this.selectedCompanies)
    }
  },
  data: function () {
    return {
      selectedCompanies: []
    }
  }
}
</script>
