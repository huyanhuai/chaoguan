<template>
  <div class="ProductPackageTypeConfig">
    <Form :label-width="80" style="padding-top:20px;">
      <div class="FormItem">
        <FormItem label="类型名称" class="FormItem_inp">
          <Input v-model="queryParam.authName" clearable placeholder="请输入类型名称"></Input>
        </FormItem>
        <FormItem label="配置编码" class="FormItem_inp">
          <Select v-model="queryParam.packageType" style="width:200px">
            <Option value="SCENIC">景区</Option>
            <Option value="HOTEL">酒店</Option>
          </Select>
        </FormItem>
        <div style="text-align:right;margin-bottom:10px;">
          <Button type="success" @click="getList">搜索</Button>
          <Button type="primary" icon="plus" @click="addModelShow">新增</Button>
        </div>
      </div>
    </Form>
    <Table style="margin-bottom:8px;" border :loading="loading" :columns="TableTop" :data="tableData"></Table>
    <Page width="100%" @on-change="pageTurn" :total="total" show-elevator style="text-align:right"></Page>
    <Modal v-model="addShow" title="新增">
      <Form :model="addData" ref="addForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="icon图片" prop="iconUrl">
          <Upload :action="this.AjaxUrl + '/ty_manage/home/upload'"
                  :before-upload="addUploadBefore"
                  style="width: 100px; height: 100px"
                  type="drag">
            <div style="padding: 20px 0; width: 100px; height: 100px" v-if="this.PictureImg == null">
              <Icon type="ios-cloud-upload" size="50" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="this.PictureImg != null" :src="Imgjpg()" :alt="addData.title"
                 style="width: 100px; height: 100px">
          </Upload>
        </FormItem>
        <FormItem label="类型名称" prop="typeName">
          <Input v-model="addData.typeName" placeholder="请输入类型名称"></Input>
        </FormItem>
        <FormItem label="商品类目" prop="packageType">
          <Select v-model="addData.packageType" style="width:200px">
            <Option value="SCENIC">景区</Option>
            <Option value="HOTEL">酒店</Option>
          </Select>
        </FormItem>
        <FormItem label="类型描述" prop="typeDetail">
          <Input type="text" v-model="addData.typeDetail" placeholder="请输入类型描述"></Input>
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
      <Form :model="editData" ref="editForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="icon图片" prop="iconUrl">
          <Upload :action="this.AjaxUrl + '/ty_manage/home/upload'"
                  :before-upload="editUploadBefore"
                  style="width: 100px; height: 100px"
                  type="drag">
            <div style="padding: 20px 0; width: 100px; height: 100px" v-if="this.editData.iconUrl == null">
              <Icon type="ios-cloud-upload" size="50" style="color: #3399ff"></Icon>
              <p>点击上传图片</p>
            </div>
            <img v-if="this.editData.iconUrl != null" :src="this.imgUrl + this.editData.iconUrl + '.jpg'" :alt="editData.title"
                 style="width: 100px; height: 100px">
          </Upload>
        </FormItem>
        <FormItem label="类型名称" prop="typeName">
          <Input v-model="editData.typeName" placeholder="请输入类型名称"></Input>
        </FormItem>
        <FormItem label="商品类目" prop="packageType">
          <Select v-model="editData.packageType" style="width:200px">
            <Option value="SCENIC">景区</Option>
            <Option value="HOTEL">酒店</Option>
          </Select>
        </FormItem>
        <FormItem label="类型描述" prop="typeDetail">
          <Input type="text" v-model="editData.typeDetail" placeholder="请输入类型描述"></Input>
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
    <Modal v-model="deleteShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认要删除 {{ deleteFlag.typeName }} 吗?</p>
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
        PictureImg: null,
        ruleValidate: {
          typeName: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ],
          packageType: [
            { required: true, message: '请选择商品类目', trigger: 'blur' }
          ],
          iconUrl: [
            { required: true, message: '请上传icon图片', trigger: 'blur' }
          ],
          sort: [
            { required: true, type: 'number', message: '排序不能为空', trigger: 'blur' }
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
          productPackageTypeId: null,
          typeName: null
        },
        editData: {
          productPackageTypeId: null,
          packageType: null,
          typeName: null,
          iconUrl: null,
          typeDetail: null,
          sort: null
        },
        addData: {
          packageType: null,
          typeName: null,
          iconUrl: null,
          typeDetail: null,
          sort: 99
        },
        iconUrl: null,
        TableTop: [
          {
            title: "ID",
            key: "productPackageTypeId",
            width: 50,
            align: "center"
          },
          {
            title: "图片",
            key: "iconUrl",
            width: 90,
            align: "center",
            render: (h, params) => {
              return h('div', [
                h("img", {
                  attrs: {
                    src: this.imgUrl + params.row.iconUrl + "_small.jpg",
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
            title: "类型名称",
            key: "typeName",
            width: 140,
            align: "center"
          },
          {
            title: "商品类目",
            key: "packageType",
            align: "center"
          },
          {
            title: "类型描述",
            key: "typeDetail",
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
      Imgjpg() {
        return this.PictureImg === null ? this.imgUrl + this.editData.iconUrl + '.jpg' : this.PictureImg;
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
        this.axios.get(`${this.AjaxUrl}/ty_manage/product/package/type/getList`, {
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
          console.log(err);
          this.loading = false;
        });
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
       * 新增
       */
      add(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.axios.post(`${this.AjaxUrl}/ty_manage/product/package/type/insert`,
              this.qs.stringify(this.addData)
            ).then(res => {
              if (res.errorCode === 200) {
                this.$Message.info("新增成功");
                this.getList();
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
        this.editData.productPackageTypeId = e.productPackageTypeId;
        this.editData.packageType = e.packageType;
        this.editData.typeName = e.typeName;
        this.editData.iconUrl = e.iconUrl;
        this.editData.typeDetail = e.typeDetail;
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
        this.axios.post(`${this.AjaxUrl}/ty_manage/product/package/type/update`,
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
        this.deleteFlag.productPackageTypeId = e.productPackageTypeId;
        this.deleteFlag.typeName = e.typeName;
        this.deleteShow = true;
      },
      del() {
        this.delLoading = true;
        console.log(this.deleteFlag.productPackageTypeId);
        this.axios.post(`${this.AjaxUrl}/ty_manage/product/package/type/delete`,
          this.qs.stringify({productPackageTypeId: this.deleteFlag.productPackageTypeId})
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
      addUploadBefore(file) {
        let reader = new FileReader();
        let _this = this;
        let data = new FormData();
        data.append("file", file);
        data.append("path", "packageType");
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/home/upload`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.addData.iconUrl = res.data;
            }
          }).catch(err => {});

        reader.readAsDataURL(file);
        reader.onload = function(e) {
          _this.PictureImg = this.result;
        };
        return false;
      },
      editUploadBefore(file) {
        let reader = new FileReader();
        let _this = this;
        let data = new FormData();
        data.append("file", file);
        data.append("path", "packageType");
        this.axios
          .post(`${this.AjaxUrl}/ty_manage/home/upload`, data)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res.data);
              this.editData.iconUrl = res.data;
            }
          }).catch(err => {});

        reader.readAsDataURL(file);
        reader.onload = function(e) {
          _this.PictureImg = this.result;
        };
        return false;
      }
  },
    mounted() {
      this.getList();
    }
  };
</script>

<style scoped>
  .ProductPackageTypeConfig {
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

