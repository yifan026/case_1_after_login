<template lang="pug">
div
  h1 {{ $t('error.error404') }}
  a(v-if="isRegister" class="button" @click="test") {{ $t('login.registerNow') }}
  //- loading
  .loadingMask(v-if="loading")
    .iconFram
    h1 {{ "ERROR #404" }}
      i.el-icon-loading
      span.txt.pl-5 {{ loadingTxt }}
</template>

<script>

export default {
  data () {
    return {
      // 登入表單
      loginForm: {
        name: '', // 帳號
        password: ''
      },
      isAllow: true,
      loadingTxt: 'loading...',
      isRegister: true
    }
  },
  created () {
  },
  methods: {
    closeLoading () {
    },
    test () {
    }
  },
  beforeDestroy () {

  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
