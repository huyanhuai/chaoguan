<template>
    <div class="first">
        <Table style="min-width:700px;margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
        <Page width="100%" size="small" @on-change="chang" :total="total" show-elevator></Page>
    </div>
</template>
<script>
 import {formatDate} from "../js/public";
  export default {
    data() {
      return {
        loading: false,
        pageNum: 1,
        total: 0,
        tableData: [],
        TableTop: [
          {
            title: "订单编号",
            key: "orderNo",
            minWidth: 120,
            align: "center",
          },
          {
            title: "用户",
            key: "realname",
            minWidth: 80,
            align: "center"
          },
          {
            title: "手机号",
            key: "mobile",
            minWidth: 120,
            align: "center"
          },
          {
            title: "支付时间",
            key: "payTime",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("strong", formatDate(params.row.payTime, "yyyy-MM-dd HH:mm"))
              ]);
            }
          },
          {
            title: "产品名称",
            key: "productName",
            minWidth: 100,
            align: "center"
          },
          {
            title: "套餐名称",
            key: "packageName",
            minWidth: 200,
            align: "center"
          },
        ]
      };
    },
    methods: {
      chang(pageNum) {
        this.pageNum = pageNum;
        this.aglist();
      },
      
      aglist(){
        let data = {};
        data.productId = 325;
        data.pageNum = this.pageNum;
        this.axios
          .post(`http://api.tongyoutrip.com/ty_api/agent/user/info/queryOrderList`,this.qs.stringify(data))
          .then(res => {
            if (res.errorCode === 200) {
                this.tableData = res.data.list;
                this.total = res.data.total;
                console.log(res.data)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    mounted() {
      this.aglist();
    }
  };
</script>
<style>
.first{
    min-width: 700px;
    margin-top: 8px;
}
</style>
