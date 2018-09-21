<template>
    <div class="Push">
        <!-- <Button style="margin-bottom:10px;" icon="plus" type="primary" @click="addModel">消息</Button> -->
        <h3>添加消息：</h3><br>
        <div class="notification">
            <Form label-position="left" :label-width="80">
                <FormItem label="产品ID" >
                    <Input style="width:85%" v-model="productId"></Input>
                </FormItem>
                <FormItem label="手机号" >
                    <Input style="width:85%" v-model="mobile"></Input><Button class="addBtn" icon="plus" type="dashed" @click="addMobile"></Button>
                </FormItem>
                <FormItem label="手机号" v-for="(item , index) of mobileList" :key="index">
                    <input style="width:85%" value="" class="inpNum" ref="input1"></input><Button class="addBtn" icon="close" type="dashed" @click="delLine(index)"></Button>
                </FormItem>
            </Form>
            <div style="margin-top:10px;text-align: center;">
                <Button type="primary" size="large" :loading="subLoading"  @click="sub">确认</Button>
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="内容">
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="subLoading"  @click="sub">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {getDate0} from "../../../js/public";
    export default {
        data () {
            return {
                modal1: false,
                spinShow: false,
                loading: true,
                subLoading: false,
                mobile: "",
                productId: "",
                mobileList: [],
                pageNum: 1,
                pageSize: 10,
                Size: 0,
                pushName: "0",
            }
        },
         watch: {
        },
        methods: {
            addModel() {
                this.modal1 = true;
                this.mobileList = [];
                this.mobile = "";
                this.productId = "";
            },
            // 添加
            addMobile() {
                this.mobileList.push("a");
            },
            // 删除
            delLine(index) {
                console.log(index);
                this.mobileList.splice(index,1);
            },
            sub () {
                this.subPush();
            },
            cancel () {
                this.modal1 = false;
                // this.$Message.info('Clicked cancel');
            },

            //推送
            subPush() {
                let data = {};
                let str = "";
                let content = "";
                var inpNum = document.getElementsByClassName("inpNum");
                if(inpNum.length > 0) {
                    for(var i=0; i<inpNum.length; i++){
                        if(inpNum[i].value != "" || inpNum[i].value != null){
                            str += ',' + inpNum[i].value;
                        }
                    }
                    data.phone = this.mobile + str;
                }else {
                    data.phone = this.mobile;
                }
                console.log(this.mobile + str);
                if(this.mobile == "" && this.productId == ""){
                    this.$Message.error("手机号和产品ID不能为空");
                    return false
                }

                data.productId = this.productId;
                this.subLoading = true;
                this.axios
                .post(`${this.AjaxUrl}/ty_manage/activity/sendPhoneMessage`,
                    this.qs.stringify(data)
                )
                .then(res => {
                    if (res.errorCode === 200) {
                        content = res.message;
                        this.$Modal.success({
                            title: "提示",
                            content: content
                        });
                        this.modal1 = false;
                        this.subLoading = false;
                        this.empty();
                    } else {
                        this.subLoading = false;
                        this.$Message.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            //清空
            empty() {
                this.mobile = "";
                this.productId = "";
                this.mobileList = [];
            }
        },
        mounted () {
        }
    }
</script>
<style>
.notification{
    width: 400px;
    /* margin: 0 auto; */
}
.ivu-form-item{
    margin-bottom: 8px !important;
}
.addBtn{
    /* font-size: 15px;
    font-weight: bold; */
    margin-left: 1%;
}
.inpNum {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
</style>

