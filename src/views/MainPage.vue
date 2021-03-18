<template>

  <!--<div class="md-layout md-gutter md-alignment-center">-->
  <div>
    <!--選題-->
    <div class="md-layout md-size-90">
      <div class="md-layout">
        <div class="md-layout-item" style="justify-content: flex-end;">

          <md-button class="md-raised button-style pink" @click="select()">選題開始</md-button>

        </div>

        <div class="md-layout-item item-right-style">
          <label>題目中譯:</label> <b>{{chinese_translate}}</b>
        </div>

        <div class="md-layout-item item-right-style">
          <b style="color: red">{{part_of_speech}}</b>
        </div>

      </div>
    </div>

    <!--輸入-->
    <div>
      <div class="md-layout">
        <div class="md-layout-item " style="justify-content: flex-end;">

          <span>請輸入英譯:</span>
          <md-input type="text" v-model="english_translate" name="en_msg"></md-input>

        </div>

        <div class="md-layout-item">
          <md-button class="md-raised button-style pink" @click="answer()" v-if='showAnswer'>解答
          </md-button>
        </div>

        <div class="md-layout-item">
          <md-button class="md-raised button-style pink" @click="tip()"
                     :class="{pink: isClickAnswer, gray: !isClickAnswer || !chinese_translate}"
                     :disabled="!isClickAnswer || !chinese_translate">提示
          </md-button>
        </div>

        <!--送出後的彈窗-->
        <div>

          <md-dialog-alert
            :md-active.sync="right_answer_alert"
            md-content="Right answer"
            md-confirm-text="Cool!"/>

          <md-dialog-alert
            :md-active.sync="wrong_answer_alert"
            md-title="Wrong"
            md-content="Wrong answer!"/>
        </div>

        <div class="md-layout-item">
          <md-button class="md-raised md-accent button-style pink"
                     :class="{pink: isClickAnswer, gray: !isClickAnswer || !english_translate}"
                     @click="send()" :disabled="!isClickAnswer || !english_translate">送出
          </md-button>
        </div>

        <div class="md-layout-item">
          <md-button class="md-raised button-style pink" @click="cooperation()">合作洽談</md-button>
        </div>

        <!--合作洽談後的彈窗-->
        <div>

          <md-dialog-prompt
            :md-active.sync="cooperation_active"
            v-model="cooperation_value"
            md-title="Memo"
            md-input-maxlength="50"
            md-input-placeholder="Type your content"
            md-confirm-text="Done"/>
        </div>

      </div>
    </div>

    <!--內容-->
    <div class="md-layout">
      <!--<md-content class="md-primary">-->

      <md-list>
        <md-subheader>內容</md-subheader>
        <md-list-item v-for="(value) in content_object">

          <span class="md-list-item-text">{{value.name}} : {{value.content}}</span>

        </md-list-item>
      </md-list>

      <!--</md-content>-->

    </div>

    <!--統計-->
    <div class="md-layout">

      <md-list>
        <md-subheader>統計</md-subheader>

        <md-list-item v-for="(value) in statistics_object">

          <span class="md-list-item-text">{{value.name}} : {{value.cnt}}</span>

        </md-list-item>
      </md-list>

    </div>

    <!--設定-->
    <div class="md-layout">

      <md-dialog :md-active.sync="showSettingDialog">
        <md-dialog-title>Settings</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="設定">
            <div class="md-layout-item">
              <md-checkbox v-model="accept_show_one_week_ckx" value="2">只出現近一星期題案</md-checkbox>
            </div>

          </md-tab>

          <md-tab md-label="出題標準">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-checkbox v-model="accept_show_ckx" value="1">允許出現</md-checkbox>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-select v-model="accept_show_count" name="accept_show" id="accept_show"
                             :disabled="!accept_show_ckx" >
                    <md-option :value="item" v-for='(item) in accept_count_list' style="text-align: center"> {{item}}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item">
                <span>次的題目</span>
              </div>

            </div>
            <div class="md-layout">

              <div class="md-layout-item">
                <md-checkbox v-model="accept_error_ckx" value="0">允許答錯</md-checkbox>

              </div>

              <div class="md-layout-item">
                <md-field>
                  <md-select v-model="accept_error_count" name="accept_error" id="accept_error"
                             :disabled="!accept_error_ckx">
                    <md-option :value="item" v-for='(item) in accept_count_list'> {{item}}
                    </md-option>
                  </md-select>
                </md-field>

              </div>

              <div class="md-layout-item">
                <span>次的題目</span>
              </div>

            </div>

          </md-tab>

        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showSettingDialog = false">取消</md-button>
          <md-button class="md-primary" @click="showSettingDialog = false">設定送出</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-button class="md-primary md-raised" @click="setting()">設定</md-button>

    </div>

    <!--隱藏按鈕-->
    <!--<div class="md-layout">-->
    <!--<md-button class="md-raised" @click="hide()">hide</md-button>-->
    <!--</div>-->

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
      accept_count_list: [],
      isSelect: 0,
      isClickAnswer: true,
      isSend: 0,
      isWrong: true,
      accept_show_ckx: false,
      accept_error_ckx: false,
      accept_show_one_week_ckx: false,
      showAnswer: false,
      cooperation_active: false,
      cooperation_value: null,
      right_answer_alert: false,
      wrong_answer_alert: false,
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
      accept_show_count: 1,
      accept_error_count: 1
    }
  },
  created: function () {
    this.accept_count_list = Array.from({ length: 10 }, (_, i) => i + 1)
  },
  methods: {
    select () {
      // 題目及詞性資料
      this.questionChineseTranslateList = ['小販', '叫賣者']
      this.part_of_speech = '名詞'

      // 統計資料
      for (const so in this.statistics_object) {
        this.statistics_object[so].cnt = 1
      }

      this.chinese_translate = this.questionChineseTranslateList.join(';')

      this.isSelect = 1

      if (this.isSelect) {
        this.showAnswer = false
        this.isClickAnswer = true
        this.english_translate = ''
        this.content_object.example.content = ''
        this.content_object.source.content = ''
        this.content_object.note.content = ''
      }
    },
    tip () {
      this.answer_word = 'vendor'

      this.english_translate = this.answer_word[0] + '*'.repeat(this.answer_word.length - 1)
    },
    send () {
      if (this.isWrong) {
        this.statistics_object.error_cnt.cnt++
        this.showAnswer = true
        this.wrong_answer_alert = true
      } else {
        this.statistics_object.right_cnt.cnt++
        this.right_answer_alert = true

        this.content_object.example.content = 'Vendors are busy attracting the attention of children.'

        this.content_object.source.content = 'http://www.google.com.tw'

        this.content_object.note.content = 'note'
      }
    },
    answer () {
      this.english_translate = this.answer_word

      this.isClickAnswer = false

      this.content_object.example.content = 'Vendors are busy attracting the attention of children.'

      this.content_object.source.content = 'http://www.google.com.tw'

      this.content_object.note.content = 'note'
    },
    setting () {
      this.showSettingDialog = true
    },
    cooperation () {
      this.cooperation_active = true
    }

  },
  computed: {}
}
</script>

<style lang="scss" scoped>

  @import "~vue-material/src/components/MdAnimation/variables";

  .md-layout-item {
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    transition: .3s $md-transition-stand-timing;
    padding: 0px 0px 10px 10px;

    &:after {
      /*width: 100%;*/
      /*height: 100%;*/
      display: flex;
      background: md-get-palette-color(purple, 200);
      content: " ";

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

  .gray {
    background-color: #b5b5b5 !important;
    color: #fff !important;
  }

  .button-style {
    height: 40px;
    margin: 0 0 0 20px !important;
    border-radius: 4px;
    min-width: 100px;
  }

  .item-right-style {
    justify-content: flex-start;
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
    width: 50%;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
    list-style-type: none;
  }

  .md-dialog /deep/ .md-dialog-container {
    max-width: 768px;
  }

  input[type="text"] {
    border-radius: 5px;
    border: 1px solid #999999;
    padding: 0 10px;
    font-size: 18px;
  }

</style>
