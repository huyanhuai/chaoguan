<template>
    <div class="ProductTagConfig">
        <h2>酒店设施</h2><br>
        <div class="itemList">
            <h3>酒店服务</h3>
            <Tag v-for="(item , index) of count[1]" :key="index" :name="item.hotelItemId" closable @on-close="handleClose2(1,index)">{{ item.itemName }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(1)">添加标签</Button><br>
        </div>
        <div class="itemList">
            <h3>休闲娱乐</h3>
            <Tag v-for="(item , index) of count[2]" :key="index" :name="item.hotelItemId" closable @on-close="handleClose2(2,index)">{{ item.itemName }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(2)">添加标签</Button><br>
        </div>
        <div class="itemList">
            <h3>基础设施</h3>
            <Tag v-for="(item , index) of count[3]" :key="index" :name="item.hotelItemId" closable @on-close="handleClose2(3,index)">{{ item.itemName }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(3)">添加标签</Button><br>
        </div>

        <!-- 弹框 -->
        <Modal
        v-model="modal1"
        title="新增">
        <Form label-position="left" :label-width="90">
            <FormItem label="设施/服务名称" >
                <Input style="width:220px" v-model="itemName" placeholder="请输入设施/服务名称"></Input>
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
            itemName: "",
            subLoading: false,
            type: null
        }
    },
    methods: {
        cancel () {
            this.modal1 = false;
            this.itemName = "";
            this.type = null;
        },
        //查询列表
        getList() {
            let data = {};
            data.pageNum = this.pageNum;
            this.axios.get(`${this.AjaxUrl}/ty_manage/hotel/item/get`, )
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
            if(this.itemName == "" || this.itemName == null){
                this.$Message.error("请填写设施/服务名称！");
                return false;
            }
            this.subLoading = true;
            let data = {};
            data.itemType = this.type;
            data.itemName = this.itemName;
            this.axios.post(`${this.AjaxUrl}/ty_manage/hotel/item/insert`,
                this.qs.stringify(data)
            )
            .then(res => {
                if (res.errorCode === 200) {
                    this.$Message.success(res.message);
                    this.subLoading = false;
                    this.modal1 = false;
                    this.getList();
                    this.itemName = "";
                    this.type = null;
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
        handleAdd (type) {
            // if (this.count[type].length) {
                this.modal1 = true;
            // } else {
            //     this.count[type].push(0);
            // }
            this.type = type;
        },
        //删除
        handleClose2 (num,index) {
            this.$Modal.confirm({
                title: "警告",
                content: "<p>确认删除该标签吗？</p>",
                onOk: () => {
                let url = `${this.AjaxUrl}/ty_manage/hotel/item/delete`;
                let data = {};
                data.hotelItemId = this.count[num][index].hotelItemId;
                console.log(data.hotelItemId);
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
        }
    },
    mounted () {
        this.getList();
    }
}
</script>
<style>
.ProductTagConfig{
    /* background: #fff;
    padding: 0 20px; */
}
.itemList{
    margin-top:10px;
}
</style>
