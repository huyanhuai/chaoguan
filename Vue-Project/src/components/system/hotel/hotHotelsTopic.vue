<template>
<!-- 热门酒店配置 -->
  <div class="HotTopicCategoryConfig">
    <Form :label-width="80" style="padding-top:20px;">
      <div class="FormItem">
        <div style="text-align:right;margin-bottom:10px;">
          <Button type="primary" icon="plus" @click="addModelShow">新增</Button>
        </div>
      </div>
    </Form>
    <Table style="margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
    <Page width="100%" @on-change="pageTurn" :total="total" show-elevator style="text-align:right"></Page>

    <Modal v-model="addShow" title="新增">
      <Form :model="addData" ref="addForm" :rules="ruleValidate" :label-width="90">
        <FormItem label="icon图片" prop="iconUrl">
          <Upload :action="this.AjaxUrl + '/ty_manage/home/upload'"
                  :before-upload="addUploadBefore"
                  style="width: 100px; height: 100px"
                  type="drag">
            <div style="padding: 20px 0; width: 100px; height: 100px" v-if="this.PictureImg == null">
              <Icon type="ios-cloud-upload" size="50" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="this.PictureImg != null" :src="Imgjpg()" :alt="addData.subjectName"
                 style="width: 100px; height: 100px">
          </Upload>
        </FormItem>
         <FormItem label="酒店名称" prop="typeName">
          <Select v-model="addData.hotelId" clearable filterable>
            <Option v-for="item in hotelList" :value="item.hotelId" :key="item.hotelId" >{{ item.hotelName }} <span style="float:right;color:#A9A9A9;">{{item.hotelCode}}</span> </Option>
          </Select>
        </FormItem>
        <FormItem label="专题名称" prop="typeName">
          <Input v-model="addData.subjectName" placeholder="请输入专题分类名称"></Input>
        </FormItem>
        <FormItem label="副标题" prop="typeDetail">
          <Input type="text" v-model="addData.subjectTitle" placeholder="请输入副标题"></Input>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <InputNumber :max="99" :min="1" v-model="addData.sort"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="addCancel('addForm')">取消</Button>
        <Button type="primary" size="large" :loading="addLoading" @click="add('addForm')">确认</Button>
      </div>
    </Modal>

    <Modal v-model="editShow" title="编辑">
      <Form :model="editData" ref="editForm" :rules="ruleValidate" :label-width="90">
        <FormItem label="icon图片" prop="iconUrl">
          <Upload :action="this.AjaxUrl + '/ty_manage/home/upload'"
                  :before-upload="editUploadBefore"
                  style="width: 100px; height: 100px"
                  type="drag">
            <div style="padding: 20px 0; width: 100px; height: 100px" v-if="this.editData.pictureUrl == null">
              <Icon type="ios-cloud-upload" size="50" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="this.editData.pictureUrl != null" :src="this.imgUrl + this.editData.pictureUrl + '.jpg'"
                 :alt="editData.subjectName"
                 style="width: 100px; height: 100px">
          </Upload>
        </FormItem>
        <FormItem label="酒店名称" prop="typeName">
          <Select v-model="editData.hotelId" clearable filterable>
            <Option v-for="item in hotelList" :value="item.hotelId" :key="item.hotelId" >{{ item.hotelName }} <span style="float:right;color:#A9A9A9;">{{item.hotelCode}}</span> </Option>
          </Select>
        </FormItem>
        <FormItem label="专题名称" prop="typeName">
          <Input v-model="editData.subjectName" placeholder="请输入类型名称"></Input>
        </FormItem>
        <FormItem label="副标题" prop="typeDetail">
          <Input type="text" v-model="editData.subjectTitle" placeholder="请输入副标题"></Input>
        </FormItem>
        <FormItem label="排序" prop="sort">
          <InputNumber :max="99" :min="1" v-model="editData.sort"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="editCancel('addForm')">取消</Button>
        <Button type="primary" size="large" :loading="editLoading" @click="edit('editForm')">确认</Button>
      </div>
    </Modal>
    <!-- 删除专题 -->
    <Modal v-model="deleteShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认要删除 < {{ deleteFlag.subjectName }} > 吗?</p>
        <p>删除后将移除该列表下的所有商品！</p>
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
        hotelList: [],
        loading: true,
        queryParam: {
          pageNum: 1,
        },
        PictureImg: null,
        ruleValidate: {
          hotelId: [
            {required: true, message: '酒店名称不能为空', trigger: 'blur'}
          ],
          subjectName: [
            {required: true, message: '类型名称不能为空', trigger: 'blur'}
          ],
          pictureUrl: [
            {required: true, message: '请上传icon图片', trigger: 'blur'}
          ],
          sort: [
            {required: true, type: 'number', message: '排序不能为空', trigger: 'blur'}
          ]
        },
        total: 0,
        tableData: [],
        addShow: false,
        addLoading: false,
        editShow: false,
        editLoading: false,
        deleteShow: false,
        delLoading: false,
        deleteFlag: {
          hotelSubjectId: null,
          subjectName: null
        },
        editData: {
          hotelSubjectId: null,
          hotelId: null,
          subjectName: null,
          pictureUrl: null,
          subjectTitle: null,
          sort: null,
        },
        addData: {
          hotelId: null,
          subjectName: null,
          pictureUrl: null,
          subjectTitle: null,
          sort: 1,
        },
        iconUrl: null,
        TableTop: [
          {
            title: "ID",
            key: "hotelSubjectId",
            width: 80,
            align: "center"
          },
          {
            title: "图片",
            key: "pictureUrl",
            align: "center",
            render: (h, params) => {
              return h('div', [
                h("img", {
                  attrs: {
                    src: this.imgUrl + params.row.pictureUrl + "_small.jpg",
                  },
                  style: {
                    width: '50px',
                    height: '50px'
                  }
                })
              ]);
            }
          },
          {
            title: "专题名称",
            key: "subjectName",
            align: "center"
          },
          {
            title: "副标题",
            key: "subjectTitle",
            align: "center"
          },
          {
            title: "排序",
            key: "sort",
            align: "center"
          },
          {
            title: "创建时间",
            key: "createTime",
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
                // h('Button', {
                //   props: {
                //     type: 'error',
                //     size: 'small',
                //     shape: 'circle',
                //     icon: 'trash-a'
                //   },
                //   style: {
                //     marginRight: '5px'
                //   },
                //   on: {
                //     click: () => {
                //       this.deleteModelShow(params.row)
                //     }
                //   }
                // }),
              ])
            }
          }
        ],
      };
    },
    methods: {
      Imgjpg() {
        return this.PictureImg === null ? this.imgUrl + this.editData.iconUrl + '.jpg' : this.PictureImg;
      },
    //   酒店列表
    Comfort() {
        this.axios.get(`${this.AjaxUrl}/ty_manage/hotel/getAllList`, {
            params: {
            }
        })
        .then(res => {
            if(res.errorCode == 200){
                this.hotelList = res.data;
            }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
        this.axios.get(`${this.AjaxUrl}/ty_manage/hotel/subject/getList`, this.qs.stringify(data))
        .then(res => {
          this.tableData = res.data;
          this.total = res.data.total;
        })
        .catch(err => {
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
      addCancel(name) {
        this.$refs[name].resetFields();
        this.addShow = false;
      },
      /**
       * 新增专题
       */
      add(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios.post(`${this.AjaxUrl}/ty_manage/hotel/subject/insert`,
              this.qs.stringify(this.addData)
            ).then(res => {
              if (res.errorCode === 200) {
                this.$Message.info("新增成功");
                this.getList();
                /*恢复默认值*/
                this.addData.subjectName=null;
                this.PictureImg=null;
                this.addData.subjectTitle=null;
                this.addData.sort=1;

                this.addShow = false;
              } else {
                this.$Message.error("新增失败");
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      /**
       * 编辑model
       * @param e
       */
      editModelShow(e) {
        // console.log(e)
         this.editData.hotelId = e.hotelId;
        this.editData.hotelSubjectId = e.hotelSubjectId;
        this.editData.subjectName = e.subjectName;
        this.editData.pictureUrl = e.pictureUrl;
        this.editData.subjectTitle = e.subjectTitle;
        this.editData.sort = e.sort;
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
        this.axios.post(`${this.AjaxUrl}/ty_manage/hotel/subject/update`,
          this.qs.stringify(this.editData)
        ).then(res => {
          if (res.errorCode === 200) {
            this.$Message.info("编辑成功");
            this.getList();
            this.editShow = false;
          }
        }).catch(err => {
          this.$Message.error("编辑失败");
        });
      },
      deleteModelShow(e) {
        this.deleteFlag.subjectId = e.subjectId;
        this.deleteFlag.subjectName = e.subjectName;
        this.deleteShow = true;
      },
      del() {
        this.delLoading = true;
        console.log(this.deleteFlag.subjectId);
        this.axios.post(`${this.AjaxUrl}/ty_manage/subject/delete`,
          this.qs.stringify({subjectId: this.deleteFlag.subjectId})
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
      },
    //   上传图片
      addUploadBefore(file) {
        let reader = new FileReader();
        let _this = this;
        let data = new FormData();
        data.append("file", file);
        data.append("path", "hotConfig");
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/home/upload`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.addData.pictureUrl = res.data;
            }
          }).catch(err => {
        });

        reader.readAsDataURL(file);
        reader.onload = function (e) {
          _this.PictureImg = this.result;
        };
        return false;
      },
      editUploadBefore(file) {
        let reader = new FileReader();
        let _this = this;
        let data = new FormData();
        data.append("file", file);
        data.append("path", "hotConfig");
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/home/upload`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.editData.pictureUrl = res.data;
            }
          }).catch(err => {
        });

        reader.readAsDataURL(file);
        reader.onload = function (e) {
          _this.PictureImg = this.result;
        };
        return false;
      },
    },
    mounted() {
      this.Comfort();
      this.getList();
    }
  };
</script>

<style scoped>
  .HotTopicCategoryConfig {
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

