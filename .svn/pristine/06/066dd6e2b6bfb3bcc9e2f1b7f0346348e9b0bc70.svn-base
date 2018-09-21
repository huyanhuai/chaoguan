<template>
  <div class="agentOrder">
    <h3>a5d4a5d45wd</h3>
    <div style="margin-bottom:10px;">
      <h3>春秋航空：</h3>
    </div>
    <Table style="min-width:750px;margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
    <Page width="100%" @on-change="chang" :total="total" show-elevator style="text-align:right"></Page>
  </div>
</template>
<script>
  import {formatDate} from "../../../js/public";
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
            align: "center",
            fixed: "left"
          },
          {
            title: "产品名称",
            key: "productName",
            align: "center"
          },
          {
            title: "套餐名称",
            key: "packageName",
            align: "center"
          },
          {
            title: "支付时间",
            key: "payTime",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("strong", formatDate(params.row.payTime, "yyyy-MM-dd HH:mm"))
              ]);
            }
          },
          {
            title: "用户姓名",
            key: "realname",
            align: "center"
          },
          {
            title: "手机号",
            key: "mobile",
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
        data.productId = 38;
        data.pageNum = this.pageNum;
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/agent/user/info/queryOrderList`,this.qs.stringify(data))
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

<style scoped>
.systemConfig{
    min-width: 750px;
}
</style>
