<template>
    <span>Count: {{ count }}</span>
    <button @click="count++">Click me</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
  </script>
