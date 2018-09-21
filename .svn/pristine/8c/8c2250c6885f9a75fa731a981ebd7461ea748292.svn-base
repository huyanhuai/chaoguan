<template>
    <div class="Push">
        <Button style="margin-bottom:10px;" type="primary" @click="modal1 = true">信息推送</Button>
        <Modal
            v-model="modal1"
            title="推送选择">
            <Form label-position="left" :label-width="80">
                <FormItem label="标题" >
                    <Input style="width:200px" v-model="pushList.pushTitle"></Input>
                </FormItem>
                <FormItem label="推送类型">
                    <Select style="width:200px" v-model="pushList.pushType" >
                        <Option  value="PRODUCT" key="0"> 产品 </Option>
                        <Option  value="ACTIVITY" key="1"> 活动 </Option>
                        <Option  value="NOTICE" key="2"> 公告 </Option>
                    </Select>
                </FormItem>
                <FormItem label="H5地址"  v-if="pushList.pushType=='ACTIVITY'" >
                    <Input v-model="pushList.param"></Input>
                </FormItem>
                <FormItem label="产品ID"  v-if="pushList.pushType=='PRODUCT'" >
                    <Input v-model="pushList.param"></Input>
                </FormItem>
                <FormItem label="内容"   v-model="pushList.pushContent">
                    <Input v-model="pushList.pushContent" type="textarea" :rows="4" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="subLoading"  @click="sub">确认</Button>
            </div>
        </Modal>
        <Table border :columns="columns1" :data="tableData" :loading="loading"></Table>
        <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="Size"  :current.sync="pageNum"  :pageSize="pageSize"    show-elevator></Page>
         </div>
         <!-- <Spin size="large" fix v-show="spinShow"></Spin> -->
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
                pageNum: 1,
                pageSize: 10,
                Size: 0,
                pushName: "0",
                columns1: [
                    {
                        title: '标题',
                        key: 'pushTitle',
                        width: 200,
                        align: "center"
                    },
                    {
                        title: '类型',
                        key: 'pushType',
                        width: 150,
                        align: "center",
                         render: (h, params) => {
                            let text;
                            if (params.row.pushType == "PRODUCT") {
                                text = "产品";
                            } else if(params.row.pushType == "ACTIVITY"){
                                text = "活动";
                            } else if(params.row.pushType == "NOTICE"){
                                text = "公告";
                            }
                            return h("div", [
                                h("strong", text)
                            ]);
                        }
                    },
                    {
                        title: 'H5地址/ID',
                        key: 'param',
                        align: "center",
                        render: (h, params) => {
                            let text;
                            if (params.row.pushType == "PRODUCT") {
                                text = params.row.param;
                            } else if(params.row.pushType == "ACTIVITY"){
                                text = params.row.param;
                            } else if(params.row.pushType == "NOTICE"){
                                text = "无";
                            }
                            return h("div", [
                                h("strong", text)
                            ]);
                        }
                    },
                    {
                        title: '内容',
                        key: 'pushContent',
                        align: "center"
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        width: 200,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h("strong", getDate0(params.row.createTime))
                            ]);
                        }
                    },
                ],
                tableData: [],
                formLeft: "",
                pushList: {
                    pushTitle: "",
                    pushType: "PRODUCT",
                    param: "",
                    pushContent: ""
                }
            }
        },
         watch: {
            "pageNum": {
            handler: function(val, oldVal) {
                this.getList();
            },
            deep: true
            }
        },
        methods: {
            sub () {
                this.subPush();
                // this.$Message.info('Clicked ok');
            },
            cancel () {
                this.modal1 = false;
                // this.$Message.info('Clicked cancel');
            },
            /**
             * 查询
             */
            getList() {
                let data = {};
                data.pageNum = this.pageNum;
                this.axios.get(`${this.AjaxUrl}/ty_manage/system/push/getList`, {
                    params: data
                })
                .then(res => {
                    if (res.errorCode === 200) {
                    this.tableData = res.data.list;
                    this.Size = res.data.total;
                    this.loading = false;
                    } else {
                    this.loading = false;
                    this.$Message.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },

            //推送
            subPush() {
                let data = {};
                data = this.pushList;
                if(this.pushList.pushTitle == "" || this.pushList.pushTitle == null){
                    this.$Message.error("标题不能为空");
                    return false
                }
                this.subLoading = true;
                this.axios.post(`${this.AjaxUrl}/ty_manage/system/push/doPush`,
                    this.qs.stringify(data)
                )
                .then(res => {
                    if (res.errorCode === 200) {
                        this.$Message.success(res.message);
                        this.modal1 = false;
                        this.subLoading = false;
                        this.loading = true;
                        this.getList();
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
                this.pushList.pushTitle = "";
                this.pushList.params = "";
                this.pushList.pushContent = "";
            }
        },
        mounted () {
            this.getList();
        }
    }
</script>
