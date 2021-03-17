<!--<template lang="pug">-->

<!--    h1 {{ $t('error.error404') }}-->
<!--    a(v-if="isRegister" class="button" @click="RegisterAvailable") {{ $t('login.registerNow') }}-->
<!--    a(v-if="isRegister" class="button" @click="getTopic") {{ $t('login.registerNow') }}-->
<!--    //- loading-->
<!--    .loadingMask(v-if="loading")-->
<!--      .iconFram-->
<!--      h1 {{ "ERROR #404" }}-->
<!--        i.el-icon-loading-->
<!--        span.txt.pl-5 {{ loadingTxt }}-->
<!--</template>-->

<template lang="pug">
  div
    h1 aaa
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
  computed: {
  },
  created () {
  },
  methods: {
    // 註冊
    RegisterAvailable () {
    },
    getTopic () {
    },
    saveUserinfoAndCdn (data) {
    },
    loginRemember (account, password) {
    }
  },
  beforeDestroy () {

  }
}

</script>
