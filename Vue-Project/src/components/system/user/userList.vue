<template>
  <div class="UserList">
     <Form :label-width="80" style="padding-top:20px;">
        <div class="FormItem">
            <!-- <FormItem label="用户名" class="FormItem_inp">
                <Input v-model="Inquire.userName" placeholder="请输入用户名或昵称" clearable style="width:300px"></Input>
            </FormItem> -->
            <FormItem label="手机号" class="FormItem_inp">
                <Input v-model="Inquire.mobile" placeholder="请输入手机号" clearable style="width:300px"></Input>
            </FormItem>
            <FormItem label="设备来源" class="FormItem_inp">
                <Select v-model="Inquire.deviceSource" clearable style="width:300px">
                    <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </div>
        <div class="FormItem">
            <FormItem label="是否代理商" class="FormItem_inp">
              <Select v-model="Inquire.isAgent" clearable style="width:300px">
                <Option v-for="item in isAgentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="是否业务员" class="FormItem_inp">
              <Select v-model="Inquire.isSale" clearable style="width:300px">
                <Option v-for="item in isSaleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
        </div>
       </Form>
        <div style="text-align:center;margin-bottom:10px;">
            <Button type="success" @click="search">搜索</Button>
        </div>
    <Table  style="margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
    <Page  width="100%"   @on-change="chang" :total="total" show-elevator style="text-align:right"></Page>
  </div>
</template>
<script>
import {getDate} from "../../../js/public";
export default {
  data() {
    return {
      loading: false,
      Inquire: {
        pageNum: 1,
        userName: "",
        mobile: "",
        deviceSource: "",
        isAgent: null,
        isSale: null
      },
      total: 0,
      sourceList: [
        // {
        //   value: "SMS",
        //   label: "手机号"
        // },
        // {
        //   value: "WECHAT",
        //   label: "微信"
        // },
        // {
        //   value: "QQ",
        //   label: "QQ"
        // },
        {
          value: "IOS",
          label: "iOS"
        },
        {
          value: "WECHAT_PUBLIC",
          label: "公众号"
        }
      ],
      isAgentList: [
        {
          value: 1,
          label: "只看代理商"
        },
        {
          value: 0,
          label: "不看代理商"
        }
      ],
      isSaleList: [
        {
          value: 1,
          label: "只看业务员"
        },
        {
          value: 0,
          label: "不看业务员"
        }
      ],
      tableData: [],
      TableTop: [
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          width: 120,
          fixed: "left"
        },
        {
          title: "昵称",
          key: "nickName",
          align: "center"
        },
        {
          title: "头像",
          key: "legalRepresentativeMobile",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Avatar", {
                props: {
                  src: this.imgUrl + params.row.headImg + '.jpg'
                }
              })
            ]);
          }
        },
        {
          title: "性别",
          key: "sex",
          width: 100,
          align: "center",
          render: (h, params) => {
            let text = "";
            let incon = "";
            let color = "";
            switch (params.row.sex) {
              case 0:
                text = "未知";
                incon = "transgender";
                break;
              case 1:
                text = "男";
                incon = "male";
                color = "#3eb2dd";
                break;
              case 2:
                text = "女";
                incon = "female";
                color = "#dd55b7";
                break;
            }
            return h("div", [
              h("Icon", {
                props: {
                  type: incon,
                  color: color
                }
              }),
              h("strong", text)
            ]);
          }
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        },
        {
          title: "是否代理商",
          key: "isAgent",
          align: "center",
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.isAgent == 0) {
              text = "否";
            } else {
              text = "是";
              color = "green"
            }
            return h("div", [
              h("Icon", {
                props: {
                  type: "person",
                  color: color
                }
              }),
              h("strong", 
                {style: {
                    color: color
                  }},text)
            ]);
          }
        },
        {
          title: "是否业务员",
          key: "isSale",
          align: "center",
          render: (h, params) => {
            let text = "";
            let color = "";
            if (params.row.isSale == 0) {
              text = "否";
            } else {
              text = "是";
              color = "green"
            }
            return h("div", [
              h("Icon", {
                props: {
                  type: "person",
                  color: color
                }
              }),
              h("strong",
              {style: {
                    color: color
                  }}, text)
            ]);
          }
        },
        {
          title: "设备来源",
          key: "deviceSource",
          width: 150,
          align: "center",
          render: (h, params) => {
            let text = "";
            if(params.row.deviceSource == "WECHAT_PUBLIC") {
              text = "公众号";
            }else if(params.row.deviceSource == "IOS"){
              text = "iOS";
            }else if(params.row.deviceSource == "WEB"){
              text = "web"
            }
            // switch (params.row.source) {
            //   case "SMS":
            //     text = "iOS";
            //     break;
            //   case "WECHAT":
            //     text = "微信";
            //     break;
            //   case "QQ":
            //     text = "QQ";
            //     break;
            //   case "WECHAT_PUBLIC":
            //     text = "公众号";
            //     break;io
            // }
            return h("div", [h("strong", text)]);
          }
        },
        {
          title: "注册时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
          return h("div", [
              h("strong", getDate(params.row.createTime))
          ]);
          }
        },
      ]
    };
  },
  methods: {
    detailed(index) {
      this.$Modal.success({
        title: "查看图片",
        content: `
        <p>旅行社营业许可证</p>
        <p><img src="${
          this.tableData[index].travelAgencyLicenceImgurl
        }.jpg"/></p>
        <p>营业执照图片</p>
        <p><img src="${this.tableData[index].businessLicenseImgurl}.jpg"/></p>
        <p>身份证正面</p>
        <p><img src="${this.tableData[index].identityCardFrontImgurl}.jpg"/></p>
        <p>身份证反面</p>
        <p><img src="${
          this.tableData[index].identityCardReverseImgurl
        }.jpg"/></p>
        `,
        onOk: () => {
          //this.$Message.info("Clicked ok");
        },
        onCancel: () => {
          //this.$Message.info("Clicked cancel");
        }
      });
    },
    chang(pageNum) {
      this.Inquire.pageNum = pageNum;
      this.Comfort();
    },
    // 搜索
    search() {
      this.Inquire.pageNum = 1;
      this.Comfort();
    },
    Comfort() {
      this.loading = true;
      let data = this.Inquire;
      this.axios
        .get(`${this.AjaxUrl}/ty_manage/user/getList`, {
          params: data
        })
        .then(res => {
          if (res.errorCode === 200) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.$Message.error(res.message);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  },
  mounted() {
    this.Comfort();
  }
};
</script>

<style scoped>
.UserList {
  background: #fff;
  padding: 0 20px;
}
.FormItem {
  display: flex;
}

.FormItem_inp {
  flex: 1;
}
</style>

