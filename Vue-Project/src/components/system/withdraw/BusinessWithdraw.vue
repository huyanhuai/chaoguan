<template>
  <div class="BusinessWithdraw">
    <div v-if="!info">
      <Form :label-width="80" style="padding-top:20px;">
        <div class="FormItem">
          <FormItem label="提现单号" class="FormItem_inp">
            <Input v-model="queryParam.withdrawNo" clearable placeholder="请输入企业名称，企业简称，用户名" style="width: 400px;"></Input>
          </FormItem>
          <FormItem label="商家名称" class="FormItem_inp">
            <Input v-model="queryParam.enterpriseName" clearable placeholder="请输入统一社会信用代码" style="width: 400px;"></Input>
          </FormItem>
        </div>
        <div class="FormItem">
          <FormItem label="提现方式" class="FormItem_inp">
            <Select v-model="queryParam.accountType" clearable style="width: 400px;">
              <Option value="ALIPAY">支付宝</Option>
              <Option value="UNIONPAY">银联</Option>
            </Select>
          </FormItem>
          <FormItem label="提现状态" class="FormItem_inp">
            <Select v-model="queryParam.status" clearable style="width: 400px;">
              <Option value="INIT">未审核</Option>
              <Option value="SUCCESS">提现成功</Option>
              <Option value="SUCCESS_ERROR">提现失败</Option>
              <Option value="FAIL">拒绝提现</Option>
            </Select>
          </FormItem>
        </div>
      </Form>
      <div style="text-align:center;margin-bottom:10px;">
        <Button type="success" @click="getList">搜索</Button>
      </div>
      <Table border :loading="loading" :columns="TableTop" :data="tableData"></Table>
      <Page width="100%" :total="total" show-elevator style="text-align:right"></Page>
    </div>
    <!-- 提现信息 -->
    <div v-if="info">
      <h2>提现信息</h2>
      <div class="datalist">
        <strong>提现单号：</strong>
        <p>{{businessWithdrawInfo.withdrawNo}}</p>
        <strong>提现类型：</strong>
        <p v-if="businessWithdrawInfo.accountType == 'ALIPAY'">支付宝</p>
        <p v-if="businessWithdrawInfo.accountType == 'WECHAT'">微信</p>
        <p v-if="businessWithdrawInfo.accountType == 'UNIONPAY'">银联</p>
      </div>
      <div class="datalist">
        <strong>账户名称：</strong>
        <p>{{businessWithdrawInfo.userAccountName}}</p>
        <strong>提现账户：</strong>
        <p>{{businessWithdrawInfo.account}}</p>
      </div>
      <div class="datalist">
        <strong>提现金额：</strong>
        <p style="font-size: 16px; color: red">{{businessWithdrawInfo.amount}} ￥</p>
        <strong>状态：</strong>
        <p>{{businessWithdrawInfo.status}}</p>
      </div>
      <div class="datalist">
        <strong>申请时间：</strong>
        <p>{{businessWithdrawInfo.createTime}}</p>
        <strong>提现时间：</strong>
        <p>{{businessWithdrawInfo.modifyTime}}</p>
      </div>
      <h2>用户信息</h2>
      <div class="datalist">
        <strong>提现单号：</strong>
        <p>{{businessWithdrawInfo.withdrawNo}}</p>
        <strong>企业简称：</strong>
        <p>{{businessWithdrawInfo.enterpriseName}}</p>
      </div>
      <div class="datalist">
        <strong>企业联系人：</strong>
        <p>{{businessWithdrawInfo.corporateContactsName}}</p>
        <strong>企业联系人电话：</strong>
        <p>{{businessWithdrawInfo.corporateContactsMobile}}</p>
      </div>
      <div class="datalist">
        <strong>法人姓名：</strong>
        <p>{{businessWithdrawInfo.legalRepresentativeName}}</p>
        <strong>法人电话：</strong>
        <p>{{businessWithdrawInfo.legalRepresentativeMobile}}</p>
      </div>
      <div class="datalist">
        <strong>企业名称：</strong>
        <p>{{businessWithdrawInfo.enterpriseName}}</p>
        <strong>企业简称：</strong>
        <p>{{businessWithdrawInfo.shortName}}</p>
      </div>
      <div class="datalist">
        <strong>唯一社会信用代码：</strong>
        <p>{{businessWithdrawInfo.socialCreditCode}}</p>
        <strong>注册资本（万元）：</strong>
        <p>{{businessWithdrawInfo.registeredAssets}}</p>
      </div>
      <div class="datalist">
        <strong>身份证：</strong>
        <p>{{businessWithdrawInfo.identityCard}}</p>
        <strong>银行：</strong>
        <p>{{businessWithdrawInfo.savings}}</p>
      </div>
      <div class="datalist">
        <strong>支行：</strong>
        <p>{{businessWithdrawInfo.subbr}}</p>
        <strong>开户账号：</strong>
        <p>{{businessWithdrawInfo.bankAccount}}</p>
      </div>
      <div class="datalist">
        <strong>企业注册时间：</strong>
        <p>{{businessWithdrawInfo.establishmentDate}}</p>
        <strong>具体地址：</strong>
        <p>{{businessWithdrawInfo.specificAddress}}</p>
      </div>
      <h2>账户信息</h2>
      <div class="datalist">
        <strong>账户总金额：</strong>
        <p style="font-size: 16px">{{businessWithdrawInfo.balance}} ￥</p>
      </div>
      <div class="datalist">
        <strong>可用金额：</strong>
        <p style="font-size: 16px">{{businessWithdrawInfo.validBalance}} ￥</p>
      </div>
      <div class="datalist">
        <strong>冻结金额：</strong>
        <p style="font-size: 16px">{{businessWithdrawInfo.freezonBalance}} ￥</p>
      </div>
      <div class="datalist">
        <strong>审核状态：
          <strong v-if="businessWithdrawInfo.status == 'INIT'" style="color: dimgray"><Icon type="help-circled" style="color: dimgray"></Icon>未审核</strong>
          <strong v-if="businessWithdrawInfo.status == 'SUCCESS'" style="color: green"><Icon type="checkmark-circled" style="color: green"></Icon>提现成功</strong>
          <strong v-if="businessWithdrawInfo.status == 'SUCCESS_ERROR'" style="color: red"><Icon type="close-circled" style="color: red"></Icon>提现失败</strong>
          <strong v-if="businessWithdrawInfo.status == 'FAIL'" style="color: red"><Icon type="close-circled" style="color: red"></Icon>审核不通过</strong>
        </strong>
      </div>
      <br>
      <div class="datalist" v-if="businessWithdrawInfo.status != 'INIT'">
        <strong>提现失败原因：</strong>
        <p>{{businessWithdrawInfo.checkMessage}}</p>
      </div>
      <br>
      <div slot="footer">
        <Button type="success" @click="audit('SUCCESS')" v-if="businessWithdrawInfo.status == 'INIT'">审核通过</Button>
        <Button type="error" @click="audit('FAIL')" v-if="businessWithdrawInfo.status == 'INIT'">审核不通过</Button>
        <Button @click="back">返回</Button>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <!--审核通过弹窗-->
    <Modal
      :mask-closable="false"
      v-model="modal1"
      width="500px"
      title="提现确认"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="successBox">
        <p><strong>打款方式：</strong>
            <RadioGroup v-model="accountType">
                <Radio label="ALIPAY" >支付宝</Radio>
                <Radio label="WECHAT">线下微信打款</Radio>
            </RadioGroup>
        </p>
        
        <!-- <p>
          <strong>打款方式：</strong>
          <span v-if="businessWithdrawInfo.accountType == 'ALIPAY'">支付宝</span>
          <span v-if="businessWithdrawInfo.accountType == 'WECHAT'">微信</span>
          <span v-if="businessWithdrawInfo.accountType == 'UNIONPAY'">银联</span>
        </p> -->
        <p><strong>提现金额：</strong><span>￥ {{businessWithdrawInfo.amount}}</span></p> 
        <div v-if="accountType == 'ALIPAY'">
          <p><strong>账户名称：</strong><span> {{businessWithdrawInfo.userAccountName}}</span></p> 
          <p><strong>提现账号：</strong><span>{{businessWithdrawInfo.account}}</span></p> 
        </div>
        
      </div>
    </Modal>
    <!--审核不通过弹窗-->
    <Modal
      :mask-closable="false"
      v-model="modal2"
      width="500px"
      title="提现审核"
      @on-ok="ok"
      @on-cancel="cancel">
      <div>
        <strong>拒绝原因：</strong><Input v-model="businessWithdrawInfo.checkMessage" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请填写拒绝原因"></Input>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {getDate, formatDate} from "../../../js/public";
  import QRCode from '@xkeshi/vue-qrcode'


  export default {
    data: function () {
      return {
        loading: false,
        accountType: "",
        businessWithdrawInfo: {
          // 提现申请信息
          userWithdrawId: null,
          withdrawNo: null,
          userType: null,
          userId: null,
          userAccountId: null,
          userAccountName: null,
          accountType: null,
          account: null,
          amount: null,
          status: null,
          createTime: null,
          modifier: null,
          modifyTime: null,
          // 账户信息
          balance: null,
          validBalance: null,
          freezonBalance: null,
          // 商家用户信息
          businessUserId: null,
          userName: null,
          mobile: null,
          enterpriseName: null,
          socialCreditCode: null,
          legalRepresentativeName: null,
          legalRepresentativeMobile: null,
          identityCard: null
        },
        modal1: false,
        modal2: false,
        info: false,
        bigImg: false,
        bigImgSrc: null,
        auditStatus: null,
        spinShow: false,
        applicationtime: "",
        Registrationtime: "",
        statusList: [
          {label: "初始", value: "INIT"},
          {label: "审核通过", value: "SUCCESS"},
          {label: "审核不通过", value: "FAIL"}
        ],
        TableTop: [
          {
            title: "提现单号",
            key: "withdrawNo",
            align: "center",
          },
          {
            title: "提现方式",
            key: "accountType",
            align: "center",
            render: (h, params) => {
              let text;
              switch (params.row.accountType) {
                case "ALIPAY":
                  text = "支付宝";
                  break;
                case "WECHAT":
                  text = "微信";
                  break;
                case "UNIONPAY":
                  text = "银联";
                  break;
              }
              return h("strong", text)
            }
          },
          {
            title: "账户名",
            key: "userAccountName",
            align: "center",
          },
          {
            title: "提现账户",
            key: "account",
            align: "center",
          },
          {
            title: "提现金额",
            key: "amount",
            align: "center",
          },
          {
            title: "企业名称",
            key: "enterpriseName",
            align: "center",
          },
          {
            title: "企业联系人",
            key: "corporateContactsName",
            width: 140,
            align: "center"
          },
          {
            title: "企业联系人电话",
            key: "corporateContactsMobile",
            align: "center"
          },
          {
            title: "申请时间",
            key: "",
            align: "center",
            render: (h, params) => {
              let text;
              if (params.row.createTime !== null) {
                text = formatDate(params.row.createTime, "yyyy-MM-dd HH:mm")
              } else {
                text = "--"
              }
              return h("strong", text)
            }
          },
          {
            title: "打款时间",
            key: "",
            align: "center",
            render: (h, params) => {
              let text;
              if (params.row.modifyTime !== null) {
                text = formatDate(params.row.modifyTime, "yyyy-MM-dd HH:mm")
              } else {
                text = "--"
              }
              return h("strong", text)
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let text;
              switch (params.row.status) {
                case "INIT":
                  text = "未审核";
                  break;
                case "SUCCESS":
                  text = "提现成功";
                  break;
                case "SUCCESS_ERROR":
                  text = "提现失败";
                  break;
                case "FAIL":
                  text = "拒绝提现";
                  break;
              }
              return h("div", [
                h("strong", text)
              ]);
            }
          },
          {
            title: "操作",
            key: "操作",
            align: "center",
            // minWidth: 200,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.getDetail(params.row.withdrawNo);
                      }
                    }
                  },
                  "获取详情"
                )
              ]);
              // if(params.row.status == "INIT"){
              //   return h("div", [
              //     h(
              //       "Button",
              //       {
              //         props: {
              //           type: "primary",
              //           size: "small"
              //         },
              //         style: {
              //           marginRight: "5px"
              //         },
              //         on: {
              //           click: () => {
              //             this.audit('SUCCESS',params.index);
              //           }
              //         }
              //       },
              //       "审核通过"
              //     ),
              //     h(
              //       "Button",
              //       {
              //         props: {
              //           type: "error",
              //           size: "small"
              //         },
              //         style: {
              //           marginRight: "5px"
              //         },
              //         on: {
              //           click: () => {
              //             this.audit('FAIL',params.index);
              //           }
              //         }
              //       },
              //       "审核不通过"
              //     ),
              //   ]);
              // }
            }
          }
        ],
        tableData: [],
        total: 100,
        queryParam: {
          withdrawNo: null,
          userType: 'BUSINESS',
          userAccountName: null,
          accountType: null,
          account: null,
          status: null,
          userName: null,
          mobile: null,
          enterpriseName: null,
          pageNum: 1,
          pageSize: 10
        }
      };
    },
    watch: {
      applicationtime() {
        if (this.applicationtime[0] != "") {
          console.log(11);
          console.log(this.applicationtime);
          this.queryParam.applyTimeStart = getDate(this.applicationtime[0]);
          this.queryParam.applyTimeEnd = getDate(this.applicationtime[1]);
        }
      },
      Registrationtime() {
        if (this.Registrationtime[0] != "") {
          this.queryParam.registerTimeStart = getDate(this.Registrationtime[0]);
          this.queryParam.registerTimeEnd = getDate(this.Registrationtime[1]);
        }
      }
    },
    methods: {
      audit(e,index) {
        switch(e) {
          case 'SUCCESS':
            this.modal1 = true;
            break;
          case 'FAIL':
            this.modal2 = true;
            break;
          default:
            return;
        }
        this.accountType = "";
        this.auditStatus = e;
        // this.businessWithdrawInfo = this.tableData[index];
      },
      /**
       * 取消
       * @returns {boolean}
       */
      cancel() {
        this.modal1 = false;
        this.modal2 = false;
        this.accountType = "";
      },
      back() {
        this.info = false
      },
      // 商家提现列表
      getList() {
        this.info = false;
        this.loading = true;
        let data = this.queryParam;
        this.axios
          .get(`${this.AjaxUrl}/ty_manage/user/withdraw/getList`, {
            params: data
          }).then(res => {
            if (res.errorCode === 200) {
              this.tableData = res.data.list;
              this.total = res.data.total;
            } else {
              this.$Message.error(res.message);
            }
            this.loading = false;
          }).catch(err => {
            this.loading = false;
          });
      },
      getDetail(withdrawNo) {
        this.spinShow = true;
        this.info = true;
        this.axios
          .get(`${this.AjaxUrl}/ty_manage/user/withdraw/getDetail`, {
            params: {
              withdrawNo: withdrawNo
            }
          }).then(res => {
            if (res.errorCode === 200) {
              this.businessWithdrawInfo = res.data;
            } else {
              this.$Message.error(res.message);
            }
            this.spinShow = false;
          }).catch(err => {
            this.spinShow = false;
          });
      },
      ok() {
        this.spinShow = true;
        // if (this.businessWithdrawInfo.status !== "INIT") {
        //   this.$Message.error("不能重复审核");
        //   return false;
        // }
        let qs = require("qs");
        let data = {};
        let {userWithdrawId, checkMessage, withdrawNo} = this.businessWithdrawInfo;
        data.userWithdrawId = userWithdrawId;
        data.checkMessage = checkMessage;
        data.status = this.auditStatus;

        if (this.auditStatus === "FAIL") {
          if (this.businessWithdrawInfo.checkMessage === "") {
            this.$Message.error("审核备注不能为空！");
            return false;
          }
        }
        let url = "";
        if(this.accountType == "ALIPAY"){
          url = `${this.AjaxUrl}/ty_manage/user/withdraw/audit`;
        }else if(this.accountType == "WECHAT"){
          url = `${this.AjaxUrl}/ty_manage/user/withdraw/auditwx`;
        }
        this.axios.post(url,
            qs.stringify(data)
          ).then(res => {
            if (res.errorCode === 200) {
              this.spinShow = false;
              this.$Message.success(res.message);
              this.modal1 = false;
              this.getList();
              
            } else {
              this.spinShow = false;
              console.log(res);
              this.$Modal.error({
                title: '提现失败',
                content: '<p>' + res.data.subMsg +'</p>',
                onOk: () => {
                  this.getDetail(withdrawNo);
                },
              });
            }
        })
          .catch(err => {
          });
      },
      clickImg(e) {
        this.bigImg = true;
        // 获取当前图片地址
        this.bigImgSrc = this.imgUrl + e + ".jpg";
      },
      viewImg(){
        this.bigImg = false;
      }
    },
    mounted() {
      this.getList();
    }
  };
</script>

<style scoped>
  .BusinessWithdraw {
    background: #fff;
    padding: 0 20px;
  }

  .FormItem {
    display: flex;
  }

  .FormItem_inp {
    flex: 1;
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

  .img {
    max-width: 300px;
  }

  .successBox p{
    padding: 3px 0;
  }
</style>

