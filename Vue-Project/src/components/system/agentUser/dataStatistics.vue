<template>
  <div class="AgentList">
    <Spin size="large" fix v-show="spinShow"></Spin>
    <big-img v-if="bigImg" @clickit="viewImg" :imgSrc="bigImgSrc"></big-img>
    <div v-show="totalData ">
      <h3 style="padding: 10px 0;">代理商店铺数据统计： </h3>
      <Table style="margin-bottom:8px;" border :loading="dataLoading" :columns="TableTop" :data="tableData"></Table>
      <Page width="100%" @on-change="chang" :total="total" :current.sync="Inquire.pageNum" :pageSize="pageSize" show-elevator style="text-align:right"></Page>
    </div>
    <div v-show="everydayData">
      <Button type="info" style="margin:5px 0;" @click="back" >返回</Button>
      <h3 style="padding: 10px 0;">代理商名称：{{agentUserName}} </h3>
      <Table style="margin-bottom:8px;" border :columns="dayTop" :data="dayData"></Table>
      <Page width="100%" :total="dayTotal" :current.sync="pageNum" :pageSize="pageSize" show-elevator style="text-align:right"></Page>
    </div>
  </div>
</template>
<script>
  import BigImg from '../../module/BigImg.vue';
  import {getDate,shm,getDate0} from "../../../js/public";
  export default {
    data() {
      return {
        totalData: true,
        everydayData: false,
        dataLoading: false,
        infoShow: false,
        spinShow: false,
        bigImg: false,
        Inquire: {
          pageNum: 1,
        },
        pageNum: 1,
        agentUserName: "",
        agentCountId: "",
        total: 0,
        dayTotal: 0,
        pageSize: 10,
        tableData: [],
        TableTop: [
          {
            title: "代理商名称",
            key: "agentUserName",
            align: "center",
            width: 135,
            fixed: "left",
          },
          {
            title: "店铺浏览次数",
            key: "pvCount",
            align: "center"
          },
          {
            title: "海报分享次数",
            key: "sharePosterCount",
            align: "center"
          },
          {
            title: "链接分享次数",
            key: "shareLinkCount",
            align: "center"
          },
          {
            title: "个人海报二维码分享次数",
            key: "sharePosterCodeCount",
            align: "center"
          },
          {
            title: "线下布局地址",
            key: "userAddress",
            align: "center"
          },
          {
            title: "大海报桌牌投放数量",
            key: "bigPosterCount",
            align: "center"
          },
          {
            title: "小海报桌牌投放数量",
            key: "smallPosterCount",
            align: "center"
          },
          {
            title: "详情",
            key: "legal",
            // width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.getEverydayData(params.row.agentCountId,params.row.agentUserName);
                      }
                    }
                  },
                  "每日统计"
                ),
              ]);
            }
          },
        ],
        dayData: [],
        dayTop: [
          {
            title: "日期",
            key: "countDate",
            align: "center",
            width: 135,
            fixed: "left",
            render: (h, par) => {
              return h("div", [
                  h("strong", getDate(par.row.countDate))
              ]);
            }
          },
          {
            title: "店铺浏览次数",
            key: "pvCount",
            align: "center"
          },
          {
            title: "海报分享次数",
            key: "sharePosterCount",
            align: "center"
          },
          {
            title: "链接分享次数",
            key: "shareLinkCount",
            align: "center"
          },
          {
            title: "个人海报二维码分享次数",
            key: "sharePosterCodeCount",
            align: "center"
          },
        ],
      };
    },
    watch: {
      "pageNum": {
      handel: function(val, oval) {
        this.getEverydayData(this.agentCountId,this.agentUserName);
      },
      deep: true
    }
    },
    methods: {
      // 分页
      chang(pageNum) {
        this.Inquire.pageNum = pageNum;
        this.Comfort();
      },
      // 列表
      Comfort() {
        this.dataLoading = true;
        let data = {};
        data.pageNum = this.Inquire.pageNum;
        data.pageSize = this.pageSize;
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/agent/count/agentCountRank`,this.qs.stringify(data))
          .then(res => {
            if (res.errorCode === 200) {
              this.tableData = res.data.list;
              this.total = res.data.total;
            } else {
              this.$Message.error(res.message);
            }
            this.dataLoading = false;
          })
          .catch(err => {
            console.log(err);
            this.dataLoading = false;
          });
      },
      // 日数据
      getEverydayData(agentCountId,agentUserName) {
        this.everydayData = true;
        this.totalData = false;
        this.agentCountId = agentCountId
        this.agentUserName = agentUserName;
        let data = {};
        data.agentCountId = this.agentCountId;
        data.pageNum = this.pageNum;
        data.pageSize = this.pageSize;
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/agent/count/day/getListByAgentCountId`,this.qs.stringify(data))
          .then(res => {
            if (res.errorCode === 200) {
              this.dayData = res.data.list;
              this.dayTotal = res.data.total;
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      back() {
        this.everydayData = false;
        this.totalData = true;
      },
      viewImg(){
        this.bigImg = false;
      },
    },
    mounted() {
      this.Comfort();
    },
    components: {
      'big-img':BigImg,      
    },
  };
</script>

<style scoped>
  .AgentList {
    background: #fff;
    padding: 0 20px;
  }

  .FormItem {
    display: flex;
  }

  .FormItem_inp {
    flex: 1;
  }

  .imgInfo {
    max-width: 300px;
  }

  .datalist {
    display: flex;
  }

  .datalist p {
    flex: 1;
    margin-bottom: 8px;
  }

  .datalist p img {
    padding: 0 10px;
    width: 100%;
  }
</style>


