<template>
  <div>
    <div id="num-roll"></div>
    <div style="text-align:center;">{{showData}}</div>
    <button @click="plus">增加</button>
    <button @click="minus">减少</button>
  </div>
</template>
<script>
import DigitRoll from "./numRoll";
export default {
  data() {
    return {
      showData: 1
    };
  },
  mounted() {
    this.rollInstance = new DigitRoll({
      container: "#num-roll",
      startNum: 0.01
    });
  },
  methods: {
    minus() {
      let randnum = this.getRandomNum(1, 9);
      this.showData = this.showData -randnum*this.getRandomNum(1, 9)*100
      this.rollInstance.roll(this.showData);
    },
    plus() {
      let randnum = this.getRandomNum(10, 99);
      this.showData = (this.showData * randnum/10).toFixed(2);
      this.rollInstance.roll(this.showData);
    },
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
  font-size: 40px;
}
#num-roll {
  margin: 80px;
  width: 600px;
  height: 60px;
  border: 1px solid black;
}
button{
  width: 100px;
  height: 40px;
  margin: 100px;
}
</style>

