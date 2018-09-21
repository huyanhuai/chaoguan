<template>
  <div class="Pictureconfiguration">
    <h2>首页banner配置</h2>
    <div class="banner">
      <!-- <div class="card"> -->
        <Card>
        <Form :label-width="80">
          <Upload action="//jsonplaceholder.typicode.com/posts/" type="drag"
                  :before-upload="handleUpload1">
            <div style="padding: 20px; width: 375px; height: 180px" v-if="bannerform1.img == null">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="bannerform1.img != null" :src="Imgjpg(bannerform1.img)" style="width: 375px; height: 180px">
          </Upload>
          <FormItem label="标题">
            <Input v-model="bannerform1.title  " placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="H5地址">
            <Input v-model="bannerform1.linkUrl" placeholder="请输入H5地址"></Input>
          </FormItem>
          <FormItem label="类型">
            <Input v-model="bannerform1.type" placeholder="请输入类型"></Input>
          </FormItem>
          <FormItem label="产品ID">
            <Input v-model="bannerform1.param" placeholder="请输入产品ID"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="bannerform1.detail" type="textarea"></Input>
          </FormItem>
          <div>
            <Button type="success" @click="Editpicture('bannerform1')" long>保存</Button>
          </div>
        </Form>
        </Card>
        <!-- </div> -->
        <!-- <div class="card"> -->
        <Card>
        <Form :label-width="80">
          <Upload action="//jsonplaceholder.typicode.com/posts/" type="drag"
                  :before-upload="handleUpload2">
            <div style="padding: 20px 0; width: 375px; height: 180px" v-if="bannerform2.img == null">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="bannerform2.img != null" :src="Imgjpg(bannerform2.img)" style="width: 375px; height: 180px">
          </Upload>
          <FormItem label="标题">
            <Input v-model="bannerform2.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="H5地址">
            <Input v-model="bannerform2.linkUrl" placeholder="请输入H5地址"></Input>
          </FormItem>
          <FormItem label="类型">
            <Input v-model="bannerform2.type" placeholder="请输入类型"></Input>
          </FormItem>
          <FormItem label="产品ID">
            <Input v-model="bannerform2.param" placeholder="请输入产品ID"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="bannerform2.detail" type="textarea"></Input>
          </FormItem>
          <div>
            <Button type="success" @click="Editpicture('bannerform2')" long>保存</Button>
          </div>
        </Form>
        <!-- </div> -->
        </Card>
        <Card>
        <!-- <div class="card"> -->
        <Form :label-width="80">
          <Upload action="//jsonplaceholder.typicode.com/posts/" type="drag"
                  :before-upload="handleUpload3" >
            <div style="padding: 20px 0; width: 375px; height: 180px" v-if="bannerform3.img == null">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="bannerform3.img != null" :src="Imgjpg(bannerform3.img)" style="width: 375px; height: 180px">
          </Upload>
          <FormItem label="标题">
            <Input v-model="bannerform3.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="H5地址">
            <Input v-model="bannerform3.linkUrl" placeholder="请输入H5地址"></Input>
          </FormItem>
          <FormItem label="类型">
            <Input v-model="bannerform3.type" placeholder="请输入类型"></Input>
          </FormItem>
          <FormItem label="产品ID">
            <Input v-model="bannerform3.param" placeholder="请输入产品ID"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="bannerform3.detail" type="textarea"></Input>
          </FormItem>
          <div>
            <Button type="success" @click="Editpicture('bannerform3')" long>保存</Button>
          </div>
        </Form>
        <!-- </div> -->
        </Card>
    </div>
    <h2 style="margin-top:10px;">首页广告图片</h2>
    <div class="advertising">
      <Card>
        <p>商城客户端</p>
        <Form :label-width="80">
          <Upload action="//jsonplaceholder.typicode.com/posts/" type="drag"
                  :before-upload="advertisingUpdate">
            <div style="padding: 20px 0; width: 375px; height: 180px" v-if="advertising.img == null">
              <Icon type="ios-cloud-upload" size="80" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="advertising.img != null" :src="Imgjpg(advertising.img)" style="width: 375px; height: 180px">
          </Upload>
          <FormItem label="标题">
            <Input v-model="advertising.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="H5地址">
            <Input v-model="advertising.linkUrl" placeholder="请输入H5地址"></Input>
          </FormItem>
          <FormItem label="类型">
            <Input v-model="advertising.type" placeholder="请输入类型"></Input>
          </FormItem>
          <FormItem label="产品ID">
            <Input v-model="advertising.param" placeholder="请输入产品ID"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="advertising.detail" type="textarea"></Input>
          </FormItem>
          <div>
            <Button type="success" @click="Editpicture('advertising')" long>保存</Button>
          </div>
        </Form>
      </Card>
      <Card>
        <p>商家客户端</p>
        <Form :label-width="80">
          <Upload action="//jsonplaceholder.typicode.com/posts/" type="drag"
                  :before-upload="businessAdvertisingUpdate">
            <div style="padding: 20px 0; width: 375px; height: 180px" v-if="businessAdvertising.img == null">
              <Icon type="ios-cloud-upload" size="80" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="businessAdvertising.img != null" :src="Imgjpg(businessAdvertising.img)" style="width: 375px; height: 180px">
          </Upload>
          <FormItem label="标题">
            <Input v-model="businessAdvertising.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="H5地址">
            <Input v-model="businessAdvertising.linkUrl" placeholder="请输入H5地址"></Input>
          </FormItem>
          <FormItem label="类型">
            <Input v-model="businessAdvertising.type" placeholder="请输入类型"></Input>
          </FormItem>
          <FormItem label="产品ID">
            <Input v-model="businessAdvertising.param" placeholder="请输入产品ID"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="businessAdvertising.detail" type="textarea"></Input>
          </FormItem>
          <div>
            <Button type="success" @click="Editpicture('businessAdvertising')" long>保存</Button>
          </div>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        advertising: {
          isShow: true,
          detail: "",
          type: "",
          linkUrl: "",
          img: null,
          param: null,
          exhibitionId: ""
        },
        businessAdvertising: {
          isShow: true,
          detail: "",
          type: "",
          linkUrl: "",
          img: null,
          param: null,
          exhibitionId: ""
        },
        bannerform1: {
          isShow: true,
          detail: "",
          type: "",
          linkUrl: "",
          img: null,
          param: null,
          exhibitionId: ""
        },
        bannerform2: {
          isShow: true,
          detail: "",
          type: "",
          linkUrl: "",
          img: null,
          param: null,
          exhibitionId: ""
        },
        bannerform3: {
          isShow: true,
          detail: "",
          type: "",
          linkUrl: "",
          img: null,
          param: null,
          exhibitionId: ""
        }
      };
    },
    methods: {
      Imgjpg(url) {
        return this.imgUrl + url + ".jpg";
      },
      advertisingUpdate(file) {
        let data = new FormData();
        data.append("banner_img", file);
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/exhibition/uploadBannerImg`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.advertising.img = res.data;
            }
          })
          .catch(err => {
          });

        return false;
      },
      businessAdvertisingUpdate(file) {
        let data = new FormData();
        data.append("banner_img", file);
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/exhibition/uploadBannerImg`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.businessAdvertising.img = res.data;
            }
          })
          .catch(err => {
          });

        return false;
      },
      handleUpload1(file) {
        let data = new FormData();
        data.append("banner_img", file);
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/exhibition/uploadBannerImg`, data)
          .then(res => {
            if (res.errorCode == 200) {
              this.bannerform1.img = res.data;
            }
          })
          .catch(err => {
          });

        return false;
      },
      handleUpload2(file) {
        let data = new FormData();
        data.append("banner_img", file);
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/exhibition/uploadBannerImg`, data)
          .then(res => {
            if (res.errorCode == 200) {
              this.bannerform2.img = res.data;
            }
          })
          .catch(err => {
          });
        return false;
      },
      handleUpload3(file) {
        let data = new FormData();
        data.append("banner_img", file);
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/exhibition/uploadBannerImg`, data)
          .then(res => {
            if (res.errorCode == 200) {
              this.bannerform3.img = res.data;
            }
          })
          .catch(err => {
          });
        return false;
      },
      Editpicture(name) {
        let data = this[name];
        this.axios
          .post(
            `${this.AjaxUrl}/ty_manage/exhibition/update`,
            this.qs.stringify(data)
          )
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.message);
              this.$Message.success(res.message);
            } else {
              this.$Message.error(res.message);
            }
          })
          .catch(err => {
          });
      }
    },
    mounted() {
      this.axios
        .get(`${this.AjaxUrl}/ty_manage/exhibition/getBanner`, {
          params: {
            site: "CLIENT_BANNER"
          }
        })
        .then(res => {
          var {title, detail, type, linkUrl, param, img, exhibitionId} = res.data[0];
          this.bannerform1.title = title;
          this.bannerform1.detail = detail;
          this.bannerform1.type = type;
          this.bannerform1.linkUrl = linkUrl;
          this.bannerform1.param = param;
          this.bannerform1.exhibitionId = exhibitionId;
          this.bannerform1.img = img;
          var {title, detail, type, linkUrl, param, img, exhibitionId} = res.data[1];
          this.bannerform2.title = title;
          this.bannerform2.detail = detail;
          this.bannerform2.type = type;
          this.bannerform2.linkUrl = linkUrl;
          this.bannerform2.param = param;
          this.bannerform2.exhibitionId = exhibitionId;
          this.bannerform2.img = img;
          var {title, detail, type, linkUrl, param, img, exhibitionId} = res.data[2];
          this.bannerform3.title = title;
          this.bannerform3.detail = detail;
          this.bannerform3.type = type;
          this.bannerform3.linkUrl = linkUrl;
          this.bannerform3.param = param;
          this.bannerform3.exhibitionId = exhibitionId;
          this.bannerform3.img = img;
        })
        .catch(err => {
          console.log(err);
        });

      this.axios
        .get(`${this.AjaxUrl}/ty_manage/exhibition/getBanner`, {
          params: {
            site: "CLIENT_CENTER"
          }
        }).then(res => {
          var {title, detail, type, linkUrl, param, img, exhibitionId} = res.data[0];
          this.advertising.title = title;
          this.advertising.detail = detail;
          this.advertising.type = type;
          this.advertising.linkUrl = linkUrl;
          this.advertising.param = param;
          this.advertising.exhibitionId = exhibitionId;
          this.advertising.img = img;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });

      this.axios
        .get(`${this.AjaxUrl}/ty_manage/exhibition/getBanner`, {
          params: {
            site: "BUSINESS_BANNER"
          }
        }).then(res => {
          var {title, detail, type, linkUrl, param, img, exhibitionId} = res.data[0];
          this.businessAdvertising.title = title;
          this.businessAdvertising.detail = detail;
          this.businessAdvertising.type = type;
          this.businessAdvertising.linkUrl = linkUrl;
          this.businessAdvertising.param = param;
          this.businessAdvertising.exhibitionId = exhibitionId;
          this.businessAdvertising.img = img;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
    }
  };
</script>

<style scoped>
  .advertising {
    /*height: 45%;*/
    padding: 0 14px;
    width: 30%;
    display: flex;
  }

  .advertising > div {
    flex: 1;
    margin: 0 8px;
  }

  .Pictureconfiguration > h2 {
    /*font-size: 16px;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    font: 微软雅黑;
  }

  .Pictureconfiguration {
    /*padding: 0 14px;*/
    padding: 0 20px;
    background: #fff;
    width: 100%;
  }

  .banner {
    /*height: 45%;*/
    display: flex;
    justify-content: center;
    padding: 0 14px;
  }
  .card{
    border: #e0e0e0 1px solid;
    /* padding: 0 5px; */
  }
  .banner > div {
    flex: 1;
    margin: 0 8px;
  }

  .ivu-form-item {
    margin-bottom: 8px;
  }
</style>

