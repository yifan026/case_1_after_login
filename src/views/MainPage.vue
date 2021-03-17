<template>

  <div class="md-layout md-gutter">

    <div class="md-layout-item">
      <!--<md-button class="md-raised button-style pink" @click="greet()">選題開始</md-button>-->

      <md-button class="md-raised button-style pink" @click="select()">選題開始</md-button>
      <!--<h1>{{message}}</h1>-->

      <label>題目中譯:</label>
      <b>{{chinese_translate}}</b>
      <b style="color: red">{{part_of_speech}}</b>
    </div>

    <div class="md-layout-item">
      <label>請輸入英譯:</label>
      <md-input type="text" v-model="english_translate" name="en_msg"></md-input>

      <md-button class="md-raised button-style pink" @click="answer()" v-if='!showAnswer'>解答
      </md-button>

      <md-button class="md-raised button-style pink" @click="tip()">提示</md-button>
      <div>

        <md-dialog-alert
          :md-active.sync="right_anser_alert"
          md-content="Right answer"
          md-confirm-text="Cool!"/>

        <md-dialog-alert
          :md-active.sync="wrong_anser_alert"
          md-title="Wrong"
          md-content="Wrong answer!"/>
      </div>

      <md-button class="md-raised button-style pink" @click="send()">送出</md-button>

      <md-button class="md-raised button-style pink" @click="cooperation()">合作洽談</md-button>

      <!--<md-button class="md-raised button-style pink" @click="hide()">hide</md-button>-->
    </div>

    <div class="md-layout-item">
      <!--<md-content class="md-primary">-->

      <md-list>
        <md-subheader>內容</md-subheader>
        <md-list-item>
          <div v-for="(value) in content_object">

            <span class="md-list-item-text">{{value.name}} : {{value.content}}</span>
          </div>

        </md-list-item>
      </md-list>

      <!--</md-content>-->

    </div>

    <div>

      <md-list>
        <md-subheader>統計</md-subheader>

        <md-list-item>

          <div v-for="(value) in statistics_object">

            <span class="md-list-item-text">{{value.name}} : {{value.cnt}}</span>
          </div>

        </md-list-item>
      </md-list>

    </div>

    <div class="md-layout-item">

      <md-dialog :md-active.sync="showSettingDialog">
        <md-dialog-title>Settings</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="設定">
            <md-checkbox value="1">只出現近一星期題案</md-checkbox>
          </md-tab>

          <md-tab md-label="出題標準">
            <md-checkbox value="1">允許出現</md-checkbox>

              <md-select v-model="accept_show_count" name="accept_show" id="accept_show">
                <md-option :value='i' v-for='i in accept_count_list'>{{i}}</md-option>
              </md-select>
              次的題目

            <md-checkbox value="0">允許答錯</md-checkbox>

            <md-select v-model="accept_error_count" name="accept_error" id="accept_error">
              <md-option :value='i' v-for='i in accept_count_list'>{{i}}</md-option>
            </md-select>
            次的題目

          </md-tab>

        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showSettingDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showSettingDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-button class="md-primary md-raised" @click="setting()">設定</md-button>

    </div>

  </div>

</template>

<script>
export default {
  data: function () {
    return {
      questionChineseTranslateList: [],
      chinese_translate: '',
      part_of_speech: '',
      english_translate: '',
      answer_word: '',
      accept_count_list: [...Array(11).keys()],
      isSelect: 0,
      isSend: 0,
      isWrong: true,
      showAnswer: false,
      right_anser_alert: false,
      wrong_anser_alert: false,
      showSettingDialog: false,
      statistics_object: {
        show_cnt: { name: '出現次數', cnt: 0 },
        right_cnt: { name: '答對次數', cnt: 0 },
        error_cnt: { name: '答錯次數', cnt: 0 }
      },
      content_object: {
        example: { name: '題目例句', content: '' },
        source: { name: '題目出處', content: '' },
        note: { name: '備註', content: '' }
      },
      accept_show_count: 0,
      accept_error_count: 0
    }
  },
  methods: {
    select () {
      this.questionChineseTranslateList = ['小販', '叫賣者']
      this.part_of_speech = '名詞'

      for (const s in this.statistics_object) {
        this.statistics_object[s].cnt = 0
      }

      this.chinese_translate = this.questionChineseTranslateList.join(';')
      this.isSelect = 1
    },
    tip () {
      this.answer_word = 'welcome'

      this.english_translate = this.answer_word[0] + '*'.repeat(this.answer_word.length - 1)
    },
    send () {
      if (this.isWrong) {
        this.statistics_object.error_cnt.cnt++

        this.wrong_anser_alert = true
      } else {
        this.statistics_object.right_cnt.cnt++
        this.right_anser_alert = true
      }

      // return true
    },
    answer () {
      this.english_translate = this.answer_word

      this.content_object.example.content = 'His desires reached.....'

      this.content_object.source.content = 'http://www.google.com.tw'

      this.content_object.note.content = 'note'
    },
    setting () {
      this.showSettingDialog = true
    },
    cooperation () {

    }

  }
}
</script>

<style lang="scss" scoped>

  .md-layout-item {
    height: 100px;

    &:nth-child(1) {
      background: md-get-palette-color(grey, 300);
    }

    &:nth-child(2) {
      background: md-get-palette-color(grey, 400);
    }

    &:nth-child(3) {
      background: md-get-palette-color(grey, 500);
    }
  }

  .md-content {
    width: 200px;
    height: 200px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .pink {
    background-color: #ec006c !important;
    color: #fff !important;
  }

  .button-style {
    height: 50px;
    margin: 0px 0px 0px 20px !important;
    border-radius: 4px;
    min-width: 120px;
  }

  .md-checkbox {
    display: flex;
  }

  .md-button {
    font-size: 16px;
  }

  .md-button {
    text-transform: capitalize !important; /*For Lower case use lowercase*/
  }

  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    /*border: 1px solid rgba(#000, .12);*/
    list-style-type: none;
  }

  .md-dialog /deep/ .md-dialog-container {
    max-width: 768px;
  }

</style>
