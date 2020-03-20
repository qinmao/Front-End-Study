/**
 * H5数字滚动效果
 * @class DigitRoll
 * @desc 没有任何依赖, 只兼容webkit内核, 主要用于H5页面. 组件本身没有css, 如果需要修改默认样式 可以添加css样式修饰.
 * @param {object} opts 实例化参数
 * @param {string} opts.container 容器选择器 selector
 * @param {toNum} opts.from 初始值，小数请初始化传入一个小数
 * @example
    HTML:
    <div id="num-roll"></div>
 * @example
 js:
 var r1=new DigitRoll({
     container:'#num-roll',
     startNum:123
 });
*/
class DigitRoll {
    constructor(opts) {
        this.container = document.querySelector(opts.container); //容器
        if (!this.container) {
            throw Error('no container');
        }
        // 父容器的样式初始化
        this.container.style.display = 'flex'
        this.container.style.justifyContent = 'center'
        this.container.style.overflow = 'hidden';
        this.rollHeight = parseInt(getComputedStyle(this.container).height); //容器高度 也用于滚动单位距离

        if (this.rollHeight < 1) {//只有容器的高度是必选样式  如果没有设置 那就给一个默认的
            this.container.style.height = '20px';
            this.rollHeight = 20;
        }
        this.startNum = opts.startNum || 0 // 默认为0 

        let numStrArr = [...this.startNum.toString()]

        this.init(numStrArr);
    }
    init(numStrArr) {
        let innerHtml = '';
        numStrArr.forEach(item => {
            innerHtml += '<ul class="num" style="height:100%;line-height:' + this.rollHeight + 'px"><li>' + item + '</li></ul>';
        })
        this.container.innerHTML = innerHtml;
    }
    roll(toNum) {
        let toNumStrArr = [...toNum.toString()],
            startNumStrArr = [...this.startNum.toString()]
        // 初始值与目标值数量不等
        let length = toNumStrArr.length - startNumStrArr.length
        if (length < 0) {
            // 1. 目标值小于初始值的长度 
            // 减去多余长度滚动的dom
            startNumStrArr.splice(0, Math.abs(length))
            this.init(startNumStrArr)
            // 
        } else if (length > 0) {
            // 2. 目标值大于初始值的长度 
            // 增加 多余长度的滚动的dom(补0)
            for (let index = 0; index < length; index++) {
                startNumStrArr.unshift('0')
            }
            this.init(startNumStrArr)

        } else {
            // 3. 目标值初始值长度相等
        }
        this.startNum = toNum
        const numNodes = Array.from(this.container.querySelectorAll('.num'))
        numNodes.forEach((item, index) => {
            // 小数点不处理
            if(toNumStrArr[index]=='.'){
                return
            }
            let currentNum = parseInt(item.querySelector('li:last-child').innerHTML),
                goalNum = parseInt(toNumStrArr[index]), //目标数字
                gapNum = 0,
                gapStr = '';
            if (currentNum == goalNum) { //数字没变 不处理
                return;
            } else if (currentNum < goalNum) { // 比如数字从1到3   
                gapNum = goalNum - currentNum;
                for (let j = currentNum; j < goalNum + 1; j++) {
                    gapStr += '<li>' + j + '</li>'
                }
            } else {// 比如 数字从6到5  因为所有情况都是从下往上滚动 所以如果是6到5的话 要滚动9个数字
                gapNum = 10 - currentNum + goalNum;
                // 生成-->当前滚到9，在从0滚动当前数字
                for (let j = currentNum; j < 10; j++) {
                    gapStr += '<li>' + j + '</li>'
                }
                for (let j = 0; j < goalNum + 1; j++) {
                    gapStr += '<li>' + j + '</li>'
                }
            }
            item.style.cssText += '-webkit-transition-duration:0s;-webkit-transform:translateY(0)';//重置位置
            item.innerHTML = gapStr;
            setTimeout(() => {
                item.style.cssText += '-webkit-transition-duration:1s;-webkit-transform:translateY(-' + this.rollHeight * gapNum + 'px)';
            }, 50)
        })
    }
}
export default DigitRoll