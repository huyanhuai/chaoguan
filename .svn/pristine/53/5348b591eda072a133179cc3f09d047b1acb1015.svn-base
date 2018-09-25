<template>
    <div>
        <h3>活动购票（西溪印象城极速冰雪世界）：</h3>
        <Form :label-width="80" style="padding-top:20px;">
            <Row>
                <Col span="8">
                    <FormItem label="购票人姓名" class="FormItem_inp">
                        <Input v-model="realname" placeholder="请输入购票人姓名"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="手机号" class="FormItem_inp">
                        <Input v-model="mobile" placeholder="请输入手机号"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="" class="FormItem_inp">
                        <Button type="success" @click="addmodal">下 单</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <h3>订单：</h3>
        <Table style="margin-bottom:8px;" width="80%" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
        <Page width="100%" @on-change="chang" :total="total" :pageSize="pageSize" show-elevator style="text-align:right"></Page>
        <!-- 产品名称：
        姓名：
        手机号：
        订单编号：
        下单时间： -->
        
        <Modal
            v-model="modal1"
            title="购票">
            <p>购票人： {{realname}} &nbsp;&nbsp;&nbsp;手机号：{{mobile}}</p><br>
            <p>确认是否购票？</p>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" :loading="editLoading" @click="buyTicket">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {getDate,formatDate} from "../../../js/public";
  export default {
      data() {
          return {
              loading: false,
              editLoading: false,
              orderNo: null,
              modal1: false,
              pageNum: 1,
              pageSize: 10,
              total: null,
              realname: "",
              mobile: "",
              tableData: [],
              TableTop: [
                {
                    title: "订单编号",
                    key: "orderNo",
                    align: "center",
                    width: 140,
                    fixed: "left"
                },
                {
                    title: "api类型",
                    key: "apiType",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                    let text = "";
                    switch (params.row.apiType) {
                        case "TONGYOU":
                        text = "同游平台";
                        break;
                        case "ZYB":
                        text = "智游宝";
                        break;
                        default:
                        break;
                    }
                    return h("div", [
                        h("strong", text)
                    ]);
                    }
                },
                {
                    title: "产品名称",
                    key: "productName",
                    width: 180,
                    align: "center"
                },
                {
                    title: "套餐名称",
                    key: "packageName",
                    width: 160,
                    align: "center"
                },
                {
                    title: "用户姓名",
                    key: "realname",
                    width: 120,
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "mobile",
                    width: 140,
                    align: "center"
                },
                {
                    title: "同游验票码",
                    key: "checkCode",
                    width: 100,
                    align: "center"
                },
                {
                    title: "下单时间",
                    key: "createTime",
                    width: 140,
                    align: "center",
                    render: (h, params) => {
                    return h("div", [
                        h("strong", formatDate(params.row.createTime, "yyyy-MM-dd HH:mm"))
                    ]);
                    }
                },
                {
                    title: "订单状态",
                    key: "status",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                    let text = "";
                    switch (params.row.status) {
                        case "NON_PAY":
                        text = "未付款";
                        break;
                        case "CANCEL":
                        text = "已取消";
                        break;
                        case "PAY_SUCCESS":
                        text = "已付款/待验票";
                        break;
                        case "ON_REFUND":
                        text = "退款中";
                        break;
                        case "REFUND_SUCCESS":
                        text = "退款成功";
                        break;
                        case "REFUND_FAIL":
                        text = "退款失败";
                        break;
                        case "TICKET_SUCCESS":
                        text = "验票成功/待评价";
                        break;
                        case "COMMENT_SUCCESS":
                        text = "已评价";
                        break;
                        case "ZYB_FAIL":
                        text = "智游宝下单失败";
                        break;
                        case "INVALID_TICKET":
                        text = "已过期";
                        break;
                    }
                    return h("div", [
                        h("strong", text)
                    ]);
                    }
                },
                {
                    title: "单价",
                    key: "salePrice",
                    width: 100,
                    align: "center"
                },
                {
                    title: "购买数量",
                    key: "buySum",
                    width: 100,
                    align: "center"
                },
                {
                    title: "订单总金额",
                    key: "orderPrice",
                    width: 100,
                    align: "center"
                },
                {
                    title: "支付方式",
                    key: "payType",
                    width: 100,
                    align: "center",
                    render: (h, params) => {
                    let text = "";
                    switch (params.row.payType) {
                        case "ALIPAY":
                        text = "支付宝";
                        break;
                        case "WECHAT":
                        text = "微信";
                        break;
                        case "UNIONPAY":
                        text = "银联";
                        break;
                        case "WECHAT_PUBLIC":
                        text = "公众号";
                        break;
                        case "ACTIVITY":
                        text = "活动";
                        break;
                        default:
                        text = "未支付";
                        break;
                    }
                    return h("div", [
                        h("strong", text)
                    ]);
                    }
                },
                {
                    title: "支付金额",
                    key: "payAmount",
                    width: 100,
                    align: "center"
                },
                
            ],
          }
      },
      methods:{
        chang(pageNum) {
            this.pageNum = pageNum;
            // this.getList();
        },
        cancel() {
            this.modal1 = false;
            this.editLoading = false;
        },
        addmodal() {
            if(this.realname != "" && this.mobile != ""){
                this.modal1 = true;
            }else{
                this.$Message.error("请输入购票人姓名/手机号");
                return false;
            }
            this.editLoading = false;
        },
        buyTicket() {
            this.tableData = [];
            const title = '提示';
            const content = '<h3>下单成功</h3>';
            this.editLoading = true;
            let data = {};
            data.realname = this.realname;
            data.mobile = this.mobile;
            this.axios
                .post(`${this.AjaxUrl}/ty_manage/order/customOrder`, this.qs.stringify(data))
                .then(res => {
                    if (res.errorCode === 200) {
                        this.editLoading = false;
                        this.modal1 = false;
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        this.tableData.push(res.data);
                        this.mobile = "";
                        this.realname = "";
                    } else {
                        this.editLoading = false;
                        this.$Message.error(res.message);
                    }
                })
                .catch(err => {
                    this.editLoading = false;
                    console.log(err);
                });
        }, 
        getList() {
            this.loading = true;
            let data = {};
            data.pageNum = this.pageNum;
            this.axios
                .get(`${this.AjaxUrl}/ty_manage/order/getList`, {
                    params: data
                })
                .then(res => {
                    if (res.errorCode === 200) {
                        this.loading = false;
                        this.tableData = res.data.list;
                        console.log(this.tableData);
                        this.total = res.data.total;
                    } else {
                        this.$Message.error(res.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
      },
      mounted () {
        //   this.getList();
      }
  }
</script>
<style>
/* .activityOrder-1{
    display: flex;
} */
.activityOrder-1 label{
    display: inline-block;
    width: 70px;
    text-align: left;
}
.activityOrder-1 input{
    width: 70%;
}
</style>
