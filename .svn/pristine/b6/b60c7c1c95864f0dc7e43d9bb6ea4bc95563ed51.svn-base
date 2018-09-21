<template>
    <div>
        <div>
            <Form :label-width="80" style="padding-top:20px;">
                <div class="FormItem">
                    <FormItem label="订单状态" class="FormItem_inp">
                        <Select v-model="status" clearable style="width:200px;margin-right:5px;">
                            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Button type="success" @click="grabble">搜 索</Button>
                    </FormItem>
                    <!-- <FormItem label="" class="FormItem_inp">
                        <Button type="success" @click="grabble">搜 索</Button>
                    </FormItem> -->
                </div>
            </Form>
        </div>
        <h3>订单列表（西溪印象城极速冰雪世界）：</h3>
        <Table style="margin-bottom:8px;" width="80%" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
        <Page width="100%" @on-change="chang" :total="total" :pageSize="pageSize" show-elevator style="text-align:right"></Page>
    </div>
</template>
<script>
import {getDate,getDate0,formatDate} from "../../../js/public";
  export default {
      data() {
          return {
              loading: false,
              pageNum: 1,
              pageSize: 10,
              total: null,
              status: "",
              statusList: [
                {label: "未付款", value: "NON_PAY"},
                {label: "已取消", value: "CANCEL"},
                {label: "已付款/待验票", value: "PAY_SUCCESS"},
                {label: "退款中", value: "ON_REFUND"},
                {label: "退款成功", value: "REFUND_SUCCESS"},
                {label: "退款失败", value: "REFUND_FAIL"},
                {label: "验票成功/待评价", value: "TICKET_SUCCESS"},
                {label: "已评价", value: "COMMENT_SUCCESS"},
                {label: "智游宝下单失败", value: "ZYB_FAIL"}
              ], 
              tableData: [],
              TableTop: [
                {
                    title: "订单号",
                    key: "orderNo",
                    align: "center"
                },
                {
                    title: "产品名称",
                    key: "productName",
                    align: "center"
                },
                {
                    title: "套餐名称",
                    key: "packageName",
                    align: "center",
                },
                {
                    title: "订单数量",
                    key: "buySum",
                    width: 95,
                    align: "center",
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
                    }
                    return h("div", [
                        h("strong", text)
                    ]);
                    }
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
                    title: "验票码",
                    key: "checkCode",
                    align: "center",
                },
                {
                    title: "用户姓名",
                    key: "realname",
                    // width: 120,
                    align: "center"
                },
                {
                    title: "手机号",
                    key: "customerMobile",
                    // width: 140,
                    align: "center"
                },
                {
                    title: "下单时间",
                    key: "createTime",
                    align: "center",
                    render(h, params) {
                        return h("div", [
                            h("strong", formatDate(params.row.createTime, "yyyy-MM-dd HH:mm"))
                        ]);
                    }
                },
            ],
          }
      },
      methods:{
        chang(pageNum) {
            this.pageNum = pageNum;
            this.getList();
        },
        grabble() {
            this.pageNum = 1;
            this.getList();
        },
        getList() {
            this.loading = true;
            let data = {};
            data.status = this.status;
            data.pageNum = this.pageNum;
            data.payType = "ACTIVITY";
            this.axios
                .get(`${this.AjaxUrl}/ty_manage/order/getList`, {
                    params: data
                })
                .then(res => {
                    if (res.errorCode === 200) {
                        this.loading = false;
                        this.tableData = res.data.list;
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
          this.getList();
      }
  }
</script>