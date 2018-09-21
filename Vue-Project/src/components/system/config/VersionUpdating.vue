<template>
    <div class="Push">
        <Button style="margin-bottom:10px;" type="primary" @click="add">创建版本</Button>
        <Modal
            v-model="modal1"
            title="title">
            <Form label-position="left" :label-width="85">
                <FormItem label="版本号" >
                    <Input style="width:200px" v-model="versions.versionNumber"></Input>
                </FormItem>
                <FormItem label="类型">
                    <Select style="width:200px" v-model="versions.updateType" >
                        <Option  value="IOS" key="0"> ios </Option>
                        <Option  value="ANDROID" key="1"> Android </Option>
                    </Select>
                </FormItem>
                <FormItem label="下载链接" v-if="versions.updateType == 'ANDROID'">
                    <Input v-model="downloadUrl" ></Input>
                </FormItem>
                <FormItem label="更新内容" >
                    <Input v-model="versions.updateContent" type="textarea" :rows="4" ></Input>
                </FormItem>
                <FormItem label="是否强制更新">
                    <Select style="width:200px" v-model="versions.isCompulsoryUpdate" >
                        <Option  value="1" key="1"> 是 </Option>
                        <Option  value="0" key="0"> 否 </Option>
                    </Select>
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
                title: "创建版本",
                columns1: [
                    {
                        title: '版本号',
                        key: 'versionNumber',
                        width: 150,
                        align: "center"
                    },
                    {
                        title: '类型',
                        key: 'updateType',
                        width: 150,
                        align: "center",
                         render: (h, params) => {
                            let text;
                            if (params.row.updateType == "IOS") {
                                text = "ios";
                            } else if(params.row.updateType == "ANDROID"){
                                text = "Android";
                            }
                            return h("div", [
                                h("strong", text)
                            ]);
                        }
                    },
                    {
                        title: '下载链接',
                        key: 'downloadUrl',
                        align: "center"
                    },
                    {
                        title: '更新内容',
                        key: 'updateContent',
                        align: "center"
                    },
                    {
                        title: '是否强制更新',
                        key: 'isCompulsoryUpdate',
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            let text;
                            if (params.row.isCompulsoryUpdate == "1") {
                                text = "是";
                            } else if(params.row.isCompulsoryUpdate == "0"){
                                text = "否";
                            }
                            return h("div", [
                                h("strong", text)
                            ]);
                        }
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
                    {
                        title: "操作",
                        key: "userName",
                        align: "center",
                        width: 150,
                        render: (h, params) => {
                        return h('div', [
                            h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                this.edit(params.index)
                                }
                            }
                            }, "编辑")
                        ])
                        }
                    }
                ],
                tableData: [],
                formLeft: "",
                versions: {
                    versionNumber: "",
                    updateType: "IOS",
                    isCompulsoryUpdate: "0",
                    updateContent: "",
                },
                downloadUrl: "",
                updateVersionId: "",
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
            // 新建modal
            add() {
                this.modal1 = true;
                this.subLoading = false;
                this.empty();
                this.title = "创建版本";
            },
            // 编辑modal
            edit(index) {
                this.modal1 = true;
                this.subLoading = false;
                this.empty();
                this.title = "编辑版本";
                let {
                    versionNumber,
                    updateType,
                    isCompulsoryUpdate,
                    updateContent,
                    downloadUrl,
                    updateVersionId
                } = this.tableData[index];
                this.updateVersionId = updateVersionId;
                this.versions.versionNumber = versionNumber;
                this.versions.updateType = updateType;
                this.versions.isCompulsoryUpdate = isCompulsoryUpdate.toString();
                this.versions.updateContent = updateContent;
                this.downloadUrl = downloadUrl;
            },
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
                this.axios.get(`${this.AjaxUrl}/ty_manage/update/version/getList`, {
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

            //更新提交
            subPush() {
                let data = {};
                data = this.versions;
                let url = "";
                if(this.updateVersionId != "" && this.updateVersionId != null){
                    url = `${this.AjaxUrl}/ty_manage/update/version/update`;
                    data.updateVersionId = this.updateVersionId;
                }else{
                    url = `${this.AjaxUrl}/ty_manage/update/version/insert`;
                }
                if(this.versions.updateType == "ANDROID") {
                    data.downloadUrl = this.downloadUrl;
                }
                for (let key in this.versions) {
                    if (this.versions[key] == "") {
                        this.error("所有内容都必须填写!");
                        return false;
                    }
                }
                this.subLoading = true;
                this.axios.post(url,this.qs.stringify(data)
                )
                .then(res => {
                    if (res.errorCode === 200) {
                        this.$Message.success(res.message);
                        this.modal1 = false;
                        this.loading = true;
                        this.getList();
                        this.empty();
                    } else {
                        this.subLoading = false;
                        this.$Message.error(res.message);
                    }
                })
                .catch(err => {
                    this.subLoading = false;
                    console.log(err);
                });
            },
            //清空
            empty() {
                this.versions.versionNumber = "";
                this.versions.updateType = "IOS";
                this.versions.isCompulsoryUpdate = "0";
                this.versions.updateContent = "";
                this.updateVersionId = "";
                this.downloadUrl = "";
            }
        },
        mounted () {
            this.getList();
        }
    }
</script>
