<template>
    <div class="ProductTagConfig">
        <h2>商品标签</h2><br>
        <Tag v-for="(item , index) of count" :key="index" :name="item.productTagId" closable @on-close="handleClose2(index)">{{ item.productTagName }}</Tag>
        <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
        <Modal
        v-model="modal1"
        title="新增标签">
        <Form label-position="left" :label-width="80">
            <FormItem label="标签名" >
                <Input style="width:200px" v-model="productTagName" placeholder="请输入标签名"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">取消</Button>
            <Button type="primary" size="large" :loading="subLoading"  @click="addTag">确认</Button>
        </div>
    </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            count: [],
            modal1: false,
            productTagName: "",
            subLoading: false,
        }
    },
    methods: {
        cancel () {
            this.modal1 = false;
            this.productTagName = "";
            // this.$Message.info('Clicked cancel');
        },
        //查询列表
        getList() {
            let data = {};
            data.pageNum = this.pageNum;
            this.axios.get(`${this.AjaxUrl}/ty_manage/product/tag/getList`, {
                params: data
            })
            .then(res => {
                if (res.errorCode === 200) {
                this.count = res.data;
                console.log(this.count)
                } else {
                this.$Message.error(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        //添加
        addTag() {
            if(this.productTagName == "" || this.productTagName == null){
                this.$Message.error("请填写标签名！");
                return false;
            }
            this.subLoading = true;
            let data = {};
            data.productTagName = this.productTagName;
            this.axios.post(`${this.AjaxUrl}/ty_manage/product/tag/insert`,
                this.qs.stringify(data)
            )
            .then(res => {
                if (res.errorCode === 200) {
                    this.$Message.success(res.message);
                    this.subLoading = false;
                    this.modal1 = false;
                    this.getList();
                    this.productTagName = "";
                } else {
                    this.subLoading = false;
                    this.$Message.error(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        //新增标签弹框
        handleAdd () {
            if (this.count.length) {
                this.modal1 = true;
                // this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        //删除
        handleClose2 (index) {
            this.$Modal.confirm({
                title: "警告",
                content: "<p>确认删除该标签吗？</p>",
                onOk: () => {
                let url = `${this.AjaxUrl}/ty_manage/product/tag/delete`;
                let data = {};
                data.productTagId = this.count[index].productTagId;
                console.log(data.productTagId);
                this.axios
                    .post(url, this.qs.stringify(data))
                    .then(res => {
                    if(res.errorCode == 200){
                        this.$Message.success("操作成功！");
                        // this.count.splice(index, 1);
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
            // const index = this.count.indexOf(name);
            // this.count.splice(index, 1);
        }
    },
    mounted () {
        this.getList();
    }
}
</script>