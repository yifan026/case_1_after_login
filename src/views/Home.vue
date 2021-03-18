<!--<template>-->
<!--<div class="table">-->
<!--<h1 class='md-display-1'>Текущий месяц: {{ currentMonthName() }}</h1>-->
<!--<md-field>-->
<!--<label>Сколько вы хотите получить</label>-->
<!--<md-input v-model.number='salaryTotal' type="number"></md-input>-->
<!--</md-field>-->
<!--<md-field>-->
<!--<label>Ставка в час</label>-->
<!--<md-input v-model.number='salaryPerHour' type="number"></md-input>-->
<!--</md-field>-->
<!--<h2 class='md-headline'>Количество рабочих дней: {{ getNumberOfWorkingDays }}</h2>-->
<!--<h3 class='md-title'>Уже отработано: {{getAllreadyWorkedHours}} ч. / {{getAllreadyWorkedDays}} д.</h3>-->
<!--<h3 class='md-title'>Текущий заработок: {{ currentSalary }} руб.</h3>-->
<!--<md-table v-model="array" md-card class='table'>-->
<!--<md-table-toolbar>-->
<!--<h1 class="md-title">График на месяц {{ currentMonthName() }}</h1>-->
<!--</md-table-toolbar>-->

<!--<md-table-row class='aaa' slot="md-table-row" slot-scope="{ item }">-->
<!--<md-table-cell md-label="Число">{{ item.day }}</md-table-cell>-->
<!--<md-table-cell md-label="День недели">{{ item.weekdayName | capitalize }}</md-table-cell>-->
<!--<md-table-cell md-label="Работаем?">-->
<!--<md-checkbox v-model="item.isWorkday"-->
<!--:disabled='item.allreadyWorked !== null && item.allreadyWorked !== ""'></md-checkbox>-->
<!--</md-table-cell>-->
<!--<md-table-cell md-label="Среднее значение" class='highlight'>-->
<!--<span v-show='item.isWorkday && !item.allreadyWorked'>{{1}}-->
<!--</span>-->
<!--</md-table-cell>-->
<!--<md-table-cell md-label="Отработано">-->
<!--<md-field>-->
<!--<label>Часов отработано</label>-->
<!--<md-input @input="changeCheckbox(item)" type="text" v-model.number="item.allreadyWorked"></md-input>-->
<!--</md-field>-->
<!--</md-table-cell>-->
<!--</md-table-row>-->
<!--</md-table>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--name: 'Table',-->
<!--data () {-->
<!--return {-->
<!--salaryTotal: 50000,-->
<!--salaryPerHour: 250,-->
<!--currentMonthName () {-->
<!--return 'Jun' // "Jun."-->
<!--},-->
<!--currentMonth: () => 1,-->
<!--currentYear: () => 1,-->
<!--gridColumns: [-->
<!--'Число',-->
<!--'День недели',-->
<!--'Работаем?',-->
<!--'Среднее значение',-->
<!--'Отработано'-->
<!--],-->
<!--getNumberOfDays () {-->
<!--return 1-->
<!--},-->
<!--array: [],-->
<!--initial: 'строка'-->
<!--}-->
<!--},-->
<!--computed: {-->
<!--getFirstWeekdayOfMonth () {-->
<!--return 1-->
<!--},-->
<!--getNumberOfWorkingDays () {-->
<!--let numberOfWorkingDays = 0-->
<!--this.array.forEach(function (object) {-->
<!--if (object.isWorkday) numberOfWorkingDays++-->
<!--})-->

<!--return numberOfWorkingDays-->
<!--},-->
<!--getAllreadyWorkedHours () {-->
<!--let allreadyWorkedHours = 0-->
<!--this.array.forEach(function (object) {-->
<!--if (object.allreadyWorked > 0) {-->
<!--allreadyWorkedHours += object.allreadyWorked-->
<!--}-->
<!--})-->

<!--return allreadyWorkedHours-->
<!--},-->
<!--getAllreadyWorkedDays () {-->
<!--let allreadyWorkedDays = 0-->
<!--this.array.forEach(function (object) {-->
<!--if (object.allreadyWorked > 0) {-->
<!--allreadyWorkedDays++-->
<!--}-->
<!--})-->

<!--return allreadyWorkedDays-->
<!--},-->
<!--currentSalary () {-->
<!--return this.getAllreadyWorkedHours * this.salaryPerHour-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--changeCheckbox (object) {-->
<!--if (this.array[object.day - 1].allreadyWorked > 0) {-->
<!--this.array[object.day - 1].isWorkday = true-->
<!--} else {-->
<!--this.array[object.day - 1].allreadyWorked = ''-->
<!--this.array[object.day - 1].isWorkday = false-->
<!--}-->
<!--}-->
<!--},-->
<!--mounted () {-->
<!--if (localStorage.getItem('array')) { this.array = JSON.parse(localStorage.getItem('array')) }-->
<!--if (localStorage.getItem('salaryTotal')) { this.salaryTotal = JSON.parse(localStorage.getItem('salaryTotal')) }-->
<!--if (localStorage.getItem('salaryPerHour')) {-->
<!--this.salaryPerHour = JSON.parse(-->
<!--localStorage.getItem('salaryPerHour')-->
<!--)-->
<!--}-->
<!--},-->
<!--watch: {-->
<!--array: {-->
<!--handler () {-->
<!--localStorage.setItem('array', JSON.stringify(this.array))-->
<!--},-->
<!--deep: true-->
<!--},-->
<!--salaryTotal: {-->
<!--handler () {-->
<!--localStorage.setItem(-->
<!--'salaryTotal',-->
<!--JSON.stringify(this.salaryTotal)-->
<!--)-->
<!--},-->
<!--deep: true-->
<!--},-->
<!--salaryPerHour: {-->
<!--handler () {-->
<!--localStorage.setItem(-->
<!--'salaryPerHour',-->
<!--JSON.stringify(this.salaryPerHour)-->
<!--)-->
<!--},-->
<!--deep: true-->
<!--}-->
<!--},-->
<!--created () {-->
<!--const days = this.getNumberOfDays()-->
<!--for (let i = 1; i <= days; i++) {-->
<!--const weekday = 1-->
<!--const m = 1-->
<!--const weekdayName = m.format('dddd')-->
<!--const weekend = !!(weekday === 6 || weekday === 7)-->
<!--const dayObject = {}-->
<!--dayObject.day = i-->
<!--dayObject.weekday = weekday-->
<!--dayObject.weekdayName = weekdayName-->
<!--dayObject.isWorkday = !weekend-->
<!--dayObject.allreadyWorked = null-->
<!--this.array.push(dayObject)-->
<!--}-->

<!--return this.array-->
<!--},-->
<!--filters: {-->
<!--capitalize (str) {-->
<!--return str.charAt(0).toUpperCase() + str.slice(1)-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped lang='scss'>-->
<!--.table {-->
<!--max-width: 1200px;-->
<!--margin: 0 auto;-->
<!--td {-->
<!--font-size: 16px;-->
<!--}-->

<!--.narrow {-->
<!--width: 50px;-->
<!--}-->

<!--.highlight {-->
<!--font-weight: 700;-->
<!--}-->

<!--label {-->
<!--font-size: 14px;-->
<!--}-->

<!--input {-->
<!--font-size: 14px;-->
<!--}-->
<!--}-->
<!--</style>-->
<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="vertical">Vertical</label>
          <md-select id="vertical" v-model="vertical">
            <md-option value="top">Top</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="bottom">Bottom</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="horizontal">Horizontal</label>
          <md-select id="horizontal" v-model="horizontal">
            <md-option value="left">Left</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="right">Right</md-option>
            <md-option value="space-around">Space Around</md-option>
            <md-option value="space-between">Space Between</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="example">
      <div class="md-layout md-gutter" :class="`md-alignment-${vertical}-${horizontal}`">
        <div class="md-layout-item md-size-25">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>

        <div class="md-layout-item md-size-25">
          <span>Repellat praesentium quasi ipsa totam, delectus aperiam deleniti, voluptates inventore.</span>
        </div>

        <div class="md-layout-item md-size-25">
          <span>Excepturi natus dolorem maxime.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutHorizontalAlignment',
  data: () => ({
    horizontal: null,
    vertical: null
  })
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/src/components/MdAnimation/variables";
  @import "~vue-material/dist/theme/engine";

  .md-layout {
    transition: .3s $md-transition-stand-timing;
  }

  .example .md-layout-item {
    min-height: 40px;
    transition: .3s $md-transition-stand-timing;

    span {
      width: 100%;
      height: 100%;
      padding: 8px;
      display: block;
      background: md-get-palette-color(blue, 200);
    }
  }
</style>
