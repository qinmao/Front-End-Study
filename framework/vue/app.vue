<template>
    <div class='page-wrap'>
        <fieldset class="inline-net">
            <legend>1.公安网用</legend>
            <h4 style="margin-top:10px;">匹配参数：MAC/IMSI</h4>
            <h5 style="margin-top:10px;">数据日期：2019-11-30</h5>
            <div class="data-wrap">
                <div class="d-title">
                    <h5>MAC({{mac.length}})</h5>
                    <h5>IMSI({{imsi.length}})</h5>
                </div>
                <div style="display:flex;">
                    <ul class="item-wrap">
                        <li v-for="(item,index) in mac" :key="index"><span>{{index+1}}.</span> {{item}}</li>
                    </ul>
                    <ul class="item-wrap">
                        <li v-for="(item,index) in mac" :key="index"><span>{{index+1}}.</span> {{item}}</li>
                    </ul>
                </div>

            </div>
            <div class="btn-wrap">
                <div class="btn">
                    获取参数
                </div>
                <div class="btn">
                    回传数据
                </div>
            </div>

        </fieldset>
        <fieldset class="out-net">
            <legend>2.专网用</legend>
            <h5 style="margin-top:10px;">一、自动化案件申请</h5>
            <div id="upload-file">
                请把案件来源说明（pdf文件）拖入该区域，完成申请流程
            </div>
            <h5 style="margin-top:10px;">二、审批完成后，匹配数据</h5>
            <div class="get-process">
                <ul class="pro">
                    <dt style="margin-bottom:10px;">数据匹配中...</dt>
                    <li v-for="(item,index) in realIds" :key="index">
                        <span>{{index+1}}.</span>
                        <span>MAC: {{item.mac}}</span>
                        <!-- <span>IMSI:{{item.imsi}}</span>  -->
                        <span class="succ">成功</span>
                    </li>
                </ul>
            </div>
            <div class="btn-wrap">
                <div class="btn">
                    开始匹配
                </div>
                <div class="btn">
                    查看数据
                </div>
            </div>
        </fieldset>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mac: ['08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',
                    '08-23-B2-8F-6B-E4',

                ],
                imsi: ['08-23-B2-8F-6B-E4'],
                realIds: [{
                        mac: '08-23-B2-8F-6B-E4',
                        phone: '18600522464',
                        idNum: '341111111111'
                    },
                    {
                        mac: '08-23-B2-8F-6B-E4',
                        phone: '18600522464',
                        idNum: '341111111111'
                    }
                ]
            }
        },
        mounted() {
            this.dropFile()
        },
        methods: {
            dropFile() {
                let holder = document.getElementById('upload-file');
                holder.ondragover = function () {
                    return false;
                };
                holder.ondragleave = holder.ondragend = function () {
                    return false;
                };
                holder.ondrop = function (e) {
                    e.preventDefault();
                    console.log(e)
                    // var file = e.dataTransfer.files[0];
                    // fs.readFile(file.path, 'utf8', function (err, data) {
                    //     holder.textContent = data;
                    // });
                    return false;
                };
            }
        },
    }
</script>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .body {
        height: 100%;
        height: 100%;
    }

    li {
        list-style: none;
    }

    .page-wrap {
        display: flex;
        justify-content: center;
    }

    fieldset {
        width: 40%;
        padding: 0 20px;
    }

    fieldset:first-of-type {
        margin-right: 20px;
    }

    .data-wrap {
        margin-top: 20px;
        min-height: 400px;
        border: 0.5px solid black;
    }

    .d-title {
        display: flex;
        justify-items: center;
        border-bottom: 1px solid black;
    }

    .d-title h5 {
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .d-title h5:first-of-type {
        border-right: 1px solid black;
    }

    .item-wrap {
        max-height: 450px;
        width: 50%;
        border-right: .5px solid black;
        overflow-y: scroll;
    }

    .item-wrap li {
        color: grey;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-bottom: 1px solid black;
    }

    .item-wrap li span {
        color: black;
        margin-right: 4px;
    }

    .btn-wrap {
        margin: 30px 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid blue;
        background-color: blue;
        color: #fff;
        border-radius: 10px;
        cursor: pointer;
    }

    .btn:first-child {
        margin-right: 180px;
    }

    .btn-get:hover {
        opacity: .8;
    }

    #upload-file {
        margin: 0 auto;
        margin-top: 10px;
        width: 500px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        opacity: .6;
        border: 1px solid black;
    }

    .get-process {
        margin-top: 20px;
        margin-left: 30px;
        padding-left: 20px;
        padding-top: 10px;
        width: 500px;
        height: 330px;
        max-height: 500px;
        overflow-y: scroll;
        border: 1px solid grey;
    }

    .pro li {
        border-bottom: 1px solid grey;
        height: 40px;
        line-height: 40px;
    }

    .pro li span {
        margin-right: 10px;
    }

    .pro li .succ {
        color: green;
    }

    .pro li .err {
        color: red;
    }
</style>