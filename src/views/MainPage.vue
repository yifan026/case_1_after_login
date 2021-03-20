<template>

  <div>
    <!--統計-->
    <div class="md-layout">

      <div class="md-layout-item" style="font-size: 25px">統計</div>

      <div class="md-layout-item item-end-style">
        <md-button class="md-raised button-style pink" @click="cooperation()">合作洽談</md-button>
      </div>
    </div>
    <!--統計內容-->
    <div class="md-layout">
      <div class="md-layout-item" v-for="(value,index) in statistics_object" :key="index">

         <span class="md-list-item-text"
               v-bind:style="[index.includes('answer') ? index.includes('right') ? {color:'blue'}:{color:'red'}:{color:'black'}]">{{value.name }} : {{value.cnt}}</span>

      </div>

    </div>
    <!--選題-->
    <div class="md-layout">

      <div class="md-layout-item">

        <md-button class="md-raised button-style pink" @click="select()">選題開始</md-button>

      </div>
    </div>
    <!--題目中譯-->
    <div class="md-layout">

      <div class="md-layout-item md-size-25">
        <span>題目中譯 : </span>
      </div>
      <div class="md-layout-item item-right-style md-size-60">
        <b>{{chinese_translate}}</b>
      </div>
      <div class="md-layout-item item-center-style md-size-15">
        <b style="color: red">{{part_of_speech}}</b>
      </div>
    </div>
    <!--英譯-->
    <div class="md-layout">
      <div class="md-layout-item">
        <span>請輸入英譯 : </span>
      </div>
    </div>
    <!--輸入英譯-->
    <div class="md-layout">
      <div class="md-layout-item">

        <md-input type="text" v-model="english_translate" name="en_msg" :disabled="!isSelect"></md-input>

      </div>

    </div>
    <!--送出-->
    <div class="md-layout">
      <div class="md-layout-item button-margin">
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
    <!--內容-->
    <div class="md-layout">
      <md-list>
        <md-subheader>內容</md-subheader>
        <md-list-item v-for="(value,index) in content_object" :key="index">

          <div class="md-list-item-text" style="white-space: normal;padding-bottom: 1rem;">

            <span><b>{{value.name}} : </b> {{value.content}}</span>

          </div>

        </md-list-item>
      </md-list>

      <!--</md-content>-->

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
              <div class="md-layout-item md-size-50">
                <md-checkbox v-model="accept_show_ckx" value="1">允許出現</md-checkbox>
              </div>
              <div class="md-layout-item md-size-15">
                <md-field>
                  <md-select v-model="accept_show_count" name="accept_show" id="accept_show"
                             :disabled="!accept_show_ckx">
                    <md-option :value="item" v-for='(item, index) in accept_count_list' :key="index"> {{item}}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item item-end-style">
                <span>次的題目</span>
              </div>

            </div>
            <div class="md-layout ">

              <div class="md-layout-item md-size-50">
                <md-checkbox v-model="accept_error_ckx" value="0">允許答錯</md-checkbox>

              </div>

              <div class="md-layout-item md-size-15">
                <md-field>
                  <md-select v-model="accept_error_count" name="accept_error" id="accept_error"
                             :disabled="!accept_error_ckx">
                    <md-option :value="item" v-for='(item, index) in accept_count_list' :key="index"> {{item}}
                    </md-option>
                  </md-select>
                </md-field>

              </div>

              <div class="md-layout-item item-end-style">
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

      <div class="md-layout">
        <md-button class="md-primary md-raised" @click="setting()">設定</md-button>

        <!--隱藏按鈕-->
        <!--<md-button class="md-raised" @click="hide()">hide</md-button>-->
      </div>

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
        right_answer_cnt: { name: '答對次數', cnt: 0 },
        error_answer_cnt: { name: '答錯次數', cnt: 0 }
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
      this.questionChineseTranslateList = ['小販', '叫賣者', '攤主', '賣主']
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
      // 正確答案資料
      this.answer_word = 'vendor'

      this.english_translate = this.answer_word[0] + '*'.repeat(this.answer_word.length - 1)
    },
    send () {
      // 題目,統計資料及內容,還有判斷答案

      if (this.isWrong) {
        this.statistics_object.error_answer_cnt.cnt++
        this.showAnswer = true
        this.wrong_answer_alert = true
      } else {
        this.statistics_object.right_answer_cnt.cnt++
        this.right_answer_alert = true

        this.content_object.example.content = 'Vendors are busy attracting the attention of children.'

        this.content_object.source.content = 'http://www.google.com.tw'

        this.content_object.note.content = 'note'
      }
    },
    answer () {
      // 內容資料

      this.english_translate = this.answer_word

      this.isClickAnswer = false

      this.content_object.example.content = 'Vendors are busy attracting the attention of children.'

      this.content_object.source.content = 'http://www.google.com.tw'

      this.content_object.note.content = '話說圓音寺橫樑上一隻蜘蛛因聽佛祖講經而有了佛性，一心想修成人形\n' +
          '佛祖有心渡牠，便開口對蜘蛛說：「你即已有靈犀，那我來問你，你認為人生最珍貴的東西是什麼？」\n' +
          '蜘蛛不假思索的回答：「人生最珍貴的東西是得不到。」\n' +
          '佛祖笑笑不再理會牠了。\n' +
          '就此過了一千年，蜘蛛仍舊天天聽禪誦經，盼望有一天能修得人形。\n' +
          '突然有一天一滴甘露滴在蛛網上，看著這一滴晶瑩剔透的露珠，蜘蛛動了凡心。\n' +
          '正當牠慢慢接近露珠時，一陣長風把露珠吹走。\n' +
          '蜘蛛望風長嘆，從此無心向佛，愁容滿面。\n' +
          '此時佛祖又開口問蜘蛛：「你認為人生最珍貴的東西是什麼？」\n' +
          '蜘蛛嘆了一口氣回答：「人生最珍惜的東西是已失去。」\n' +
          '佛祖笑笑說：「好吧，蛛兒，我就讓你到人世去走一遭吧。」\n' +
          '百年轉眼即逝，佛祖再次出現已是蛛兒在人間彌留之時。\n' +
          '佛祖再次提問：「蛛兒，你認為人生最珍貴的東西是什麼？」\n' +
          '此時白髮滿頭的蛛兒才恍然領悟：「人生百年就如長風吹走甘露，一切心中慾望之物皆為鏡像。\n' +
          '最珍貴之物也不過平常之物，而平常之物反倒是最珍貴之物。\n' +
          '願來世我仍能做圓音寺橫樑上的一隻蜘蛛，天天聽禪誦經，唯吾知足。」\n' +
          '「唯吾知足」最早出現在漢朝的古錢幣上面，微妙之處就在於這四個字上、下、左、右共用一個口字，所以後人又稱它「藉口錢」。\n' +
          '而為什麼如此蘊涵禪理的四個字會最早出現在人人夢寐以求、不可或缺的錢幣上呢？\n' +
          '也許這也正是佛祖給出的一個禪機吧。'
    },
    setting () {
      // 設定資料
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

  /*@import "~vue-material/src/components/MdAnimation/variables";*/
  @import "../../public/default.css";
  @import "../../public/vue-material.min.css";

  .md-layout {
    padding: 0px 10px 5px 10px;
  }

  .button-margin {
    /*margin-left: 0px;*/
    /*margin-bottom: 20px;*/
    padding: 0px 0px 0px 0px;
  }

  .md-layout-item {
    height: 30px;
    margin-top: 2px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    /*transition: .3s $md-transition-stand-timing;*/
    /*padding: 0 0 10px 10px;*/

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
    height: 25px;
    margin: 0px 0px 5px 10px !important;
    border-radius: 4px;
    min-width: 100px;
  }

  .item-right-style {
    justify-content: flex-start;
  }

  .item-end-style {
    justify-content: flex-end;
  }

  .item-center-style {
    justify-content: center;
  }

  .md-checkbox {
    display: flex;
  }

  .md-button {
    font-size: 16px;
    text-transform: capitalize !important; /*For Lower case use lowercase*/
  }

  .md-list {
    width: 100%;
    max-width: 100%;
    /*height: 180px;*/
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
    list-style-type: none;
  }

  .md-dialog /deep/ .md-dialog-container {
    /*width: 50%;*/
    max-width: 100%;
  }

  input[type="text"] {
    border-radius: 5px;
    border: 1px solid #999999;
    padding: 0 10px;
    font-size: 18px;
  }

</style>
