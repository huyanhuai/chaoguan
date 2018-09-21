<template>
    <div class="ProductCategoryList">
        <Button style="margin-bottom:10px;" icon="plus" type="primary" @click="add">新增</Button>
        <Modal
            v-model="modal1"
            title="新增">
            <p slot="header">{{title}}</p>
            <Form label-position="left" :label-width="80">
                <FormItem label="名称" >
                    <Input style="width:200px" v-model="addList.categoryName" placeholder="请输入名称"></Input>
                </FormItem>
                <FormItem label="排序" >
                    <!-- <Input style="width:200px" v-model="addList.sort"></Input> -->
                    <InputNumber style="width:200px" v-model="addList.sort"></InputNumber>
                </FormItem>
                <FormItem label="备注"  >
                    <Input v-model="addList.remark" type="textarea" :rows="4" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="subLoading"  @click="addProduct">确认</Button>
            </div>
        </Modal>
        <Table border :columns="columns1" :data="tableData" :loading="loading"></Table>
        <div style="textAlign:right;margin-top:10px">
             <Page   :total.sync="Size"  :current.sync="pageNum"  :pageSize="pageSize"    show-elevator></Page>
         </div>
    </div>
</template>

<script>
import {getDate0} from "../../../js/public";
export default {
    data () {
            return {
                modal1: false,
                loading: false,
                subLoading: false,
                pageNum: 1,
                pageSize: 10,
                Size: 0,
                title: "新增商品类目",
                addList:{
                    categoryName: "",
                    sort: 0,
                    remark: ""
                },
                productCategoryId: "",
                columns1: [
                    {
                        title: 'ID',
                        key: 'productCategoryId',
                        width: 150,
                        align: "center"
                    },
                    {
                        title: '名称',
                        key: 'categoryName',
                        width: 150,
                        align: "center",
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        align: "center",
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        width: 150,
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
                    {
                        title: "操作",
                        key: "userName",
                        align: "center",
                        width: 200,
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
                                this.editProduct(params.index)
                                }
                            }
                            }, "编辑"),
                            h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                this.deleteProduct(params.index)
                                }
                            }
                            }, "删除")
                        ])
                        }
                    }
                ],
                tableData: [],
            }
    },  
    methods: {
        add () {
            this.modal1 = true;
            this.empty();
            // this.$Message.info('Clicked ok');
        },
        cancel () {
            this.modal1 = false;
            // this.$Message.info('Clicked cancel');
        },
        //查询列表
        getList() {
            let data = {};
            data.pageNum = this.pageNum;
            this.axios.get(`${this.AjaxUrl}/ty_manage/product/category/getList`, {
                params: data
            })
            .then(res => {
                if (res.errorCode === 200) {
                this.tableData = res.data;
                // this.Size = res.data.total;
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
        //新增
        addProduct() {
            let data = {};
            data = this.addList;
            if(this.addList.categoryName == "" || this.addList.categoryName == null){
                this.$Message.error("名称不能为空");
                return false
            }
            let url = "";
            if (this.productCategoryId != "") {
                url = `${this.AjaxUrl}/ty_manage/product/category/update`;
                data.productCategoryId = this.productCategoryId;
            } else {
                url = `${this.AjaxUrl}/ty_manage/product/category/insert`;
            }
            this.subLoading = true;
            this.axios.post(url,this.qs.stringify(data))
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
        //编辑
        editProduct(index) {
            this.modal1 = true;
            this.title = "编辑"
            let {
                productCategoryId,
                categoryName,	
                sort,	
                remark
            } = this.tableData[index];
            this.productCategoryId = productCategoryId;
            this.addList.categoryName = categoryName;
            this.addList.sort = sort;
            this.addList.remark = remark;
            console.log(this.productCategoryId);
        },
        //删除
        deleteProduct(index) {
            this.$Modal.confirm({
                title: "警告",
                content: "<p>确认删除该商品吗？</p>",
                onOk: () => {
                let url = `${this.AjaxUrl}/ty_manage/product/category/delete`;
                let data = {};
                data.productCategoryId = this.tableData[index].productCategoryId;
                console.log(data.productCategoryId);
                this.axios
                    .post(url, this.qs.stringify(data))
                    .then(res => {
                    if(res.errorCode == 200){
                        this.$Message.success("操作成功！");
                        this.getList();
                    }else{
                        this.$Message.error("删除失败！");
                    }
                    })
                    .catch(err => {});
                },
                onCancel: () => {
                // this.$Message.info("Clicked cancel");
                }
            });
        },
        //清空
        empty() {
            this.addList.categoryName = "";
            this.addList.sort = 0;
            this.addList.remark = "";
            this.productCategoryId = "";
        }
    },
    mounted() {
        this.getList();
    }      

}
</script>

<style>

</style>

