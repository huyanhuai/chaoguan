<template>
<!-- 景+酒配置 -->
  <div class="productAndHotel">
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
        <FormItem label="类型" prop="type">
          <Select v-model="addData.type" clearable filterable>
            <Option value="SCENIC" key="0" >景点</Option>
            <Option value="HOTEL" key="1" >酒店</Option>
          </Select>
        </FormItem>
        <FormItem label="酒店名称" prop="hotelId" v-if="this.addData.type == 'HOTEL'">
          <Select v-model="addData.hotelId" clearable filterable>
            <Option v-for="item in hotelList" :value="item.hotelId" :key="item.hotelId" >{{ item.hotelName }} <span style="float:right;color:#A9A9A9;">&nbsp;&nbsp;&nbsp; <{{item.enterpriseName}}></span> </Option>
          </Select>
        </FormItem>
        <FormItem label="景区名称" prop="productId" v-else>
          <Select v-model="addData.productId" clearable filterable>
            <Option v-for="item in productList" :value="item.productId" :key="item.productId" >{{ item.productName }} <span style="float:right;color:#A9A9A9;">&nbsp;&nbsp;&nbsp; <{{item.enterpriseName}}></span> </Option>
          </Select>
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

    <!-- 编辑 -->
    <Modal v-model="editShow" title="编辑">
      <Form :model="editData" ref="editForm" :rules="ruleValidate" :label-width="90">
        <FormItem label="类型" prop="type">
          <Select v-model="editData.type" clearable filterable>
            <Option value="SCENIC" key="0" >景点</Option>
            <Option value="HOTEL" key="1" >酒店</Option>
          </Select>
        </FormItem>
        <FormItem label="酒店名称" prop="hotelId" v-if="this.editData.type == 'HOTEL'">
          <Select v-model="editData.hotelId" clearable filterable>
            <Option v-for="item in hotelList" :value="item.hotelId" :key="item.hotelId" >{{ item.hotelName }} <span style="float:right;color:#A9A9A9;">&nbsp;&nbsp;&nbsp; <{{item.enterpriseName}}></span> </Option>
          </Select>
        </FormItem>
        <FormItem label="景区名称" prop="productId" v-else>
          <Select v-model="editData.productId" clearable filterable>
            <Option v-for="item in productList" :value="item.productId" :key="item.productId" >{{ item.productName }} <span style="float:right;color:#A9A9A9;">&nbsp;&nbsp;&nbsp; <{{item.enterpriseName}}></span> </Option>
          </Select>
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
    <!-- 删除 -->
    <Modal v-model="deleteShow" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认要删除吗?</p>
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
        productList: [],
        loading: true,
        queryParam: {
          pageNum: 1,
        },
        ruleValidate: {
        //   hotelId: [
        //     {required: true, message: '酒店名称不能为空', trigger: 'blur'}
        //   ],
        //   productId: [
        //     {required: true, message: '景区名称不能为空', trigger: 'blur'}
        //   ],
          type: [
            {required: true, message: '类型名称不能为空', trigger: 'blur'}
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
          scenicHotelId: null,
          subjectName: null
        },
        editData: {
          scenicHotelId: null,
          hotelId: null,
          productId: null,
          type: "SCENIC",
          sort: null,
        },
        addData: {
          hotelId: null,
          productId: null,
          type: "SCENIC",
          sort: 1,
        },
        iconUrl: null,
        TableTop: [
          {
            title: "ID",
            key: "scenicHotelId",
            width: 80,
            align: "center"
          },
          {
            title: "类型",
            key: "scenicHotelType",
            align: "center",
            render: (h, params) => {
                let text = "";
                if(params.row.scenicHotelType == "HOTEL"){
                    text = "酒店";
                }else if(params.row.scenicHotelType == "SCENIC"){
                    text = "景点"
                }
              return h("div", [
                h("strong", text)
              ]);
            }
          },
          {
            title: "名称",
            key: "productName",
            align: "center",
            render: (h, params) => {
                let text = "";
                if(params.row.productName != "" && params.row.productName != null){
                    text = params.row.productName;
                }else{
                    text = params.row.hotelName;
                }
              return h("div", [
                h("strong", text)
              ]);
            }
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
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    shape: 'circle',
                    icon: 'trash-a'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteModelShow(params.row)
                    }
                  }
                }),
              ])
            }
          }
        ],
      };
    },
    methods: {
    //   酒店列表
    Comfort() {
        this.axios.get(`${this.AjaxUrl}/ty_manage/hotel/getAllList`, {
            params: {
                status: "1",
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
    // 景区列表
    getProduct() {
        this.axios.get(`${this.AjaxUrl}/ty_manage/product/getList`, {
            params: {
                status: "1",
                pageSize: 10000
            }
        })
        .then(res => {
            if(res.errorCode == 200){
                this.productList = res.data.list;
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
       * 查询列表
       */
      getList() {
        this.loading = true;
        let data = this.queryParam;
        this.axios.post(`${this.AjaxUrl}/ty_manage/scenicHotel/getList`, this.qs.stringify(data))
        .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
        this.loading = false;
      },
    //   清空值
    clear(){
        this.addData.hotelId = null;
        this.addData.productId = null;
        this.addData.type = "SCENIC";
        this.addData.sort = 1;
    },
      /**
       * 新增model
       */
      addModelShow() {
        this.addShow = true;
        this.addLoading = false;
        this.clear();
      },
      /**
       * 取消新增
       */
      addCancel(name) {
        this.$refs[name].resetFields();
        this.clear();
        this.addShow = false;
      },
      /**
       * 新增专题
       */
      add(name) {
        let data = {};
        data.scenicHotelType = this.addData.type;
        data.sort = this.addData.sort;
        this.$refs[name].validate((valid) => {
          if (valid) {
              if(this.addData.type == "SCENIC"){
                  if(this.addData.productId == null || this.addData.productId == ""){
                      this.$Message.error("景区名称不能为空");
                      return false
                  }
                  data.scenicHotelProductId = this.addData.productId;
              }else{
                  if(this.addData.hotelId == null || this.addData.hotelId == ""){
                      this.$Message.error("酒店名称不能为空");
                      return false
                  }
                  data.scenicHotelHotelId = this.addData.hotelId;
              }
            this.addLoading = true;
            this.axios.post(`${this.AjaxUrl}/ty_manage/scenicHotel/insert`,
              this.qs.stringify(data)
            ).then(res => {
              if (res.errorCode === 200) {
                this.$Message.info("新增成功");
                this.getList();
                /*恢复默认值*/
                this.clear();
                this.addLoading = false;
                this.addShow = false;
              } else {
                this.addLoading = false;
                this.$Message.error("新增失败");
              }
            }).catch(err => {
              this.addLoading = false;
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
        this.editData.hotelId = e.scenicHotelHotelId;
        this.editData.scenicHotelId  = e.scenicHotelId;
        this.editData.productId = e.scenicHotelProductId;
        this.editData.type = e.scenicHotelType;
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
        let data = {};
        data.scenicHotelType = this.editData.type;
        data.sort = this.editData.sort;
        data.scenicHotelId = this.editData.scenicHotelId;
        if(this.editData.type == "SCENIC"){
            if(this.editData.productId == null || this.editData.productId == ""){
                this.$Message.error("景区名称不能为空");
                return false
            }
            data.scenicHotelProductId = this.editData.productId;
        }else{
            if(this.editData.hotelId == null || this.editData.hotelId == ""){
                this.$Message.error("酒店名称不能为空");
                return false
            }
            data.scenicHotelHotelId = this.editData.hotelId;
        }
        this.axios.post(`${this.AjaxUrl}/ty_manage/scenicHotel/update`,
          this.qs.stringify(data)
        ).then(res => {
          if (res.errorCode === 200) {
            this.$Message.info("编辑成功");
            this.getList();
            this.clear();
            this.editShow = false;
          }
        }).catch(err => {
          this.$Message.error("编辑失败");
        });
      },
    //   删除
      deleteModelShow(e) {
        this.deleteFlag.scenicHotelId = e.scenicHotelId;
        // this.deleteFlag.subjectName = e.subjectName;
        this.deleteShow = true;
      },
      del() {
        this.delLoading = true;
        console.log(this.deleteFlag.scenicHotelId);
        this.axios.post(`${this.AjaxUrl}/ty_manage/scenicHotel/delete`,
          this.qs.stringify({scenicHotelId: this.deleteFlag.scenicHotelId})
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

    },
    mounted() {
      this.Comfort();
      this.getProduct();
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

