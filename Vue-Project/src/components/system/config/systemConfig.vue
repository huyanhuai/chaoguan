<template>
  <div class="systemConfig">
    <Form :label-width="80" style="padding-top:20px;">
      <div class="FormItem">
        <FormItem label="配置名称" class="FormItem_inp">
          <Input v-model="queryParam.configName" clearable placeholder="请输入订单编号"></Input>
        </FormItem>
        <FormItem label="配置编码" class="FormItem_inp">
          <Input v-model="queryParam.configCode" clearable placeholder="请输入商家名称"></Input>
        </FormItem>
        &nbsp;
        <div style="text-align:right;margin-bottom:10px;">
          <Button type="success" @click="getList">搜索</Button>
          <Button type="primary" icon="plus" @click="addModelShow">新增</Button>
        </div>
      </div>
    </Form>
    <Table style="margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
    <Page width="100%" @on-change="pageTurn" :total="total" show-elevator style="text-align:right"></Page>
    <Modal
      v-model="addShow"
      title="新增"
      ok-text="提交"
      cancel-text="取消"
      @on-ok="add"
      @on-cancel="addCancel">
      <Form :model="addData" :label-width="80">
        <FormItem label="配置名称">
          <Input v-model="addData.configName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="配置编码">
          <Input v-model="addData.configCode" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="配置值">
          <Input v-model="addData.configValue" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="含义">
          <Input v-model="addData.configExplain" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="editShow"
      title="编辑"
      ok-text="提交"
      cancel-text="取消"
      @on-ok="edit"
      @on-cancel="editCancel">
      <Form :model="editData" :label-width="80">
        <FormItem label="配置名称">
          <Input v-model="editData.configName" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="配置编码">
          <Input v-model="editData.configCode" placeholder="Enter something..." readonly></Input>
        </FormItem>
        <FormItem label="配置值">
          <Input v-model="editData.configValue" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="含义">
          <Input v-model="editData.configExplain" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="deleteShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认要删除 {{ deleteFlag.configName }} 吗?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="delLoading" @click="del">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {formatDate} from "../../../js/public";

  export default {
    data() {
      return {
        loading: true,
        queryParam: {
          pageNum: 1,
          configName: null,
          configCode: null
        },
        total: 0,
        tableData: [],
        addShow: false,
        editShow: false,
        deleteShow: false,
        delLoading: false,
        deleteFlag: {
          systemConfigId: null,
          configName: null
        },
        editData: {
          systemConfigId: null,
          configName: null,
          configCode: null,
          configValue: null,
          configExplain: null
        },
        addData: {
          configName: null,
          configCode: null,
          configValue: null,
          configExplain: null
        },
        TableTop: [
          {
            title: "ID",
            key: "systemConfigId",
            width: 50,
            align: "center"
          },
          {
            title: "配置名称",
            key: "configName",
            width: 140,
            align: "center"
          },
          {
            title: "配置编码",
            key: "configCode",
            align: "center"
          },
          {
            title: "配置值",
            key: "configValue",
            align: "center"
          },
          {
            title: "含义",
            key: "configExplain",
            align: "center"
          },
          {
            title: "创建时间",
            key: "createTime",
            width: 160,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("strong", formatDate(params.row.createTime, "yyyy-MM-dd HH:mm"))
              ]);
            }
          },
          {
            title: "操作",
            key: "userName",
            align: "center",
            width: 140,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    shape: 'circle',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editModelShow(params.row)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    shape: 'circle',
                    icon: 'trash-a'
                  },
                  on: {
                    click: () => {
                      this.deleteModelShow(params.row)
                    }
                  }
                })
              ])
            }
          }
        ]
      };
    },
    methods: {
      /**
       * 翻页
       * @param pageNum
       */
      pageTurn(pageNum) {
        this.queryParam.pageNum = pageNum;
        this.getList();
      },
      /**
       * 查询
       */
      getList() {
        this.loading = true;
        let data = this.queryParam;
        this.axios.get(`${this.AjaxUrl}/ty_manage/system/config/getList`, {
            params: data
          }).then(res => {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }).catch(err => {
            console.log(err);
          });
        this.loading = false;
      },
      /**
       * 新增model
       */
      addModelShow() {
        this.addShow = true;
      },
      /**
       * 取消新增
       */
      addCancel() {
        this.addShow = false;
      },
      /**
       * 新增
       */
      add() {
        this.axios.post(`${this.AjaxUrl}/ty_manage/system/config/insert`,
          this.qs.stringify(this.addData)
        ).then(res => {
          if (res.errorCode === 200) {
            this.$Message.info("新增成功");
            this.getList();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 编辑model
       * @param e
       */
      editModelShow(e) {
        this.editData.systemConfigId = e.systemConfigId;
        this.editData.configName = e.configName;
        this.editData.configCode = e.configCode;
        this.editData.configValue = e.configValue;
        this.editData.configExplain = e.configExplain;
        this.editShow = true;
      },
      /**
       * 取消编辑
       */
      editCancel() {
        this.editShow = false;
      },
      /**
       * 编辑
       */
      edit() {
        this.axios.post(`${this.AjaxUrl}/ty_manage/system/config/update`,
          this.qs.stringify(this.editData)
        ).then(res => {
          if (res.errorCode === 200) {
            this.$Message.info("编辑成功");
            this.getList();
          }
        }).catch(err => {
          this.$Message.error("编辑失败");
        });
      },
      deleteModelShow(e) {
        this.deleteFlag.systemConfigId = e.systemConfigId;
        this.deleteFlag.configName = e.configName;
        this.deleteShow = true;
      },
      del() {
        this.delLoading = true;
        console.log(this.deleteFlag.systemConfigId);
        this.axios.post(`${this.AjaxUrl}/ty_manage/system/config/delete`,
          this.qs.stringify({systemConfigId: this.deleteFlag.systemConfigId})
        ).then(res => {
          if (res.errorCode === 200) {
            this.$Message.info("删除成功");
            this.getList();
            this.deleteShow = false;
          }
        }).catch(err => {
          this.$Message.error("删除失败");
        });
        this.delLoading = false;
      }
  },
    mounted() {
      this.getList();
    }
  };
</script>

<style scoped>
  .systemConfig {
    background: #fff;
    padding: 0 20px;
  }

  .FormItem {
    display: flex;
  }

  .FormItem_inp {
    width: 300px;
    /*flex: 1;*/
  }
</style>

