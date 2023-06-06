<template>
    <input type="text" v-model="text" />
    <p>Text: {{ text }}</p>
  
    <input type="checkbox" v-model="checked" />
    <div v-if="checked">The input has been checked!</div>
  
    <select v-model="multiselectValue" multiple>
      <option value="value1"></option>
      <option value="value2"></option>
      <option value="value3"></option>
    </select>
  </template>
  
  <script>
  export default {
    data() {
      return {
        text: '',
        checked: false,
        multiselectValue: []
      }
    }
  }
  </script>
