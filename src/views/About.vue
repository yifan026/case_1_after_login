<template>

  <div class="about" id="app">
    {{ message }}
  </div>
</template>

<script>
  let app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });
</script>
