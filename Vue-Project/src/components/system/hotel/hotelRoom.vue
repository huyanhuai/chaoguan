<template>
    <div>
        <div class="Package" > 
            <div class="packageTop"> {{RoomTitle}}
            <Button @click="closeRoom" style="float:right;border: none;background: #fff; width: 40px;cursor: pointer;outline: none;"> <Icon type="close"></Icon></Button>
            </div>
            <div class="SetMeal" style="padding-top:15px;"> 
                <div class="InputList">
                    <div>
                    <label for="">房间名称</label>
                    <Input style="width: 70%" v-model="hotelRoom.roomName"></Input>
                    </div>
                    <div>
                    <label for="">建筑面积(m²)</label>
                    <Input style="width: 70%" v-model="hotelRoom.floorArea"></Input>
                    </div>
                </div>      
                <div class="InputList">
                    <div>
                        <label for="">最大入驻人数</label>
                        <Input style="width: 70%" v-model="hotelRoom.peopleNum"></Input>
                    </div>
                    <div>
                        <label for="">默认库存</label>
                        <Input v-model="hotelRoom.defaultRepertory"  style="width: 70%"></Input>
                    </div>
                </div>
        
                <div class="InputList" >
                    <div>
                        <label for="">有无窗</label>
                        <Select v-model="hotelRoom.isWindow"  style="width: 70%">
                            <Option  key="0" value="0">无</Option>
                            <Option  key="1" value="1">有</Option>
                        </Select>
                    </div>
                    <div>
                        <label for="">有无wifi</label>
                        <Select v-model="hotelRoom.isWifi"  style="width: 70%">
                            <Option  key="0" value="0">无</Option>
                            <Option  key="1" value="1">有</Option>
                        </Select>
                    </div>
                </div>
                <div class="InputList">
                    <div>
                        <label for="" style="line-height:47px;float:left">房型</label>
                        <Cascader :data="typeSize" v-model="bedTypeArr" style="width: 70%;float:left;"></Cascader>
                    </div>
                    <div>
                        <label for="">房间详情</label>
                        <Input style="width: 70%" v-model="hotelRoom.detail"></Input>
                    </div>
                </div>
                <!-- <div class="InputList">
                    <div>
                        <label for="">房型</label>
                        <Select v-model="hotelRoom.roomType"  style="width: 70%">
                            <Option  key="0" value="KING_SIZE">大床房</Option>
                            <Option  key="1" value="DOUBLE_ROOM">双人房</Option>
                            <Option  key="2" value="FAMILY">家庭房</Option>
                            <Option  key="3" value="LUXURY">豪华套房</Option>
                        </Select>
                    </div>
                    <div>
                    </div>
                </div> -->
                <h3>房间图片 </h3>

                <div v-for="(list,index) of imglist" :key="index" class="imglist demo-upload-list"> 
                    <img :src="smallImg(index)" style="width:100px">
                    <div class="demo-upload-list-cover"> 
                        <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
                    </div>
                </div>
                <Upload  style="display:inline-block" :before-upload="handleUpload" :show-upload-list="false" action="//jsonplaceholder.typicode.com/posts/">
                    <img src="../../../assets/a11.png" style="width:100px;">
                </Upload> 
                <div style="text-align:center;padding:5px 0;margin-top:15px;"> 
                    <Button type="success" @click="subRoom"> 下一步</Button>
                </div>
            <div style="padding:20px 0 0 10px;background:#fff;"> 
             

            <!-- <h3 style="margin-top:15px;">库存设置 </h3> -->
            <div style="display: flex;width:100%;margin-top:10px;">
                
                <!-- <div style="width:410px;">
                    <Calendar ref="Calendar" :markDateMore="arr" v-on:isToday="clickToday" v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
                </div>
                <div style="padding-left:20px;">
                    <p>{{time}}</p>库存：
                        <Input v-model="repertoryNums" style="width: 150px;"></Input>
                        <Button type="success" @click="subRepertory">确定</Button>
                        <div>
                    <p v-for="item in shuju" :value="item" :key="item">{{item}}</p>
                </div> -->
            </div>
            </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import Calendar from '../vue-calendar-component/index.js';
export default {
    components: {
      Calendar
    },
    props: {
        roomDetails: Object,
        index: Number
    },
    data() {
        return {
           RoomShow: true,
           RoomTitle: "编辑房间",
           arr: [
                {
                date: '2018/6/1',
                className: 'mark1'
                },
                {
                date: '2018/6/2',
                className: 'mark1'
                },
                {
                date: '2018/6/13',
                className: 'mark2'
                }
            ],
           time: "",
           repertoryNums: "0",
           shuju: [],
           hotelRoomId: "",
           imglist: [],
           imglistId: [],
           Imgurl: [],
           typeSize: [
                {
                value: 'DOUBLE_ROOM',
                label: '双人房',
                children: [
                    {
                        value: '单人床',
                        label: '单人床',
                        children: [
                            {
                            value: '1.2m',
                            label: '1.2m',
                            },
                            {
                            value: '1.35m',
                            label: '1.35m',
                            },
                        ]
                    },
                ]
                },
                {
                value: 'KING_SIZE',
                label: '大床房',
                children: [
                    {
                        value: '双人床',
                        label: '双人床',
                        children: [
                            {
                            value: '1.5m',
                            label: '1.5m',
                            },
                            {
                            value: '1.8m',
                            label: '1.8m',
                            },
                            {
                            value: '2m',
                            label: '2m',
                            },
                        ]
                    },
                ]
                },
                {
                value: 'FAMILY',
                label: '家庭房',
                children: [
                    {
                        value: '多床',
                        label: '多床',
                        children: [
                            {
                            value: '1.2m',
                            label: '1.2m',
                            },
                            {
                            value: '1.35m',
                            label: '1.35m',
                            },
                            {
                            value: '1.5m',
                            label: '1.5m',
                            },
                            {
                            value: '1.8m',
                            label: '1.8m',
                            },
                            {
                            value: '2m',
                            label: '2m',
                            },
                        ]
                    },
                ]
                },
                {
                value: 'LUXURY',
                label: '豪华套房',
                children: [
                    {
                        value: '多床',
                        label: '多床',
                        children: [
                            {
                            value: '1.2m',
                            label: '1.2m',
                            },
                            {
                            value: '1.35m',
                            label: '1.35m',
                            },
                            {
                            value: '1.5m',
                            label: '1.5m',
                            },
                            {
                            value: '1.8m',
                            label: '1.8m',
                            },
                            {
                            value: '2m',
                            label: '2m',
                            },
                        ]
                    },
                ]
                },
            ],
            bedTypeArr: [],
           hotelRoom: {
                roomName: "",
                floorArea: "",	
                bedType: "",
                peopleNum: "",
                defaultRepertory: "",	
                detail: "",
                isWifi: "1",
                isWindow: "1",
                bedSize: "",
            },  
           amplification: "",
        }
    },
    watch: {
        roomDetails: function(val){
            console.log(this.roomDetails)
            let {
                roomName,
                floorArea,	
                bedType,
                peopleNum,
                defaultRepertory,	
                detail,
                hotelRoomId,
                bedSize,
                isWifi,
                isWindow,
                roomType
            } = this.roomDetails;

            this.hotelRoom.roomName = roomName;
            this.hotelRoom.floorArea = floorArea;
            this.hotelRoom.bedType = bedType;
            this.hotelRoom.peopleNum = peopleNum;
            this.hotelRoom.defaultRepertory = defaultRepertory;
            this.hotelRoom.detail = detail;
            this.hotelRoom.bedSize = bedSize;
            this.hotelRoom.isWifi = isWifi;
            this.hotelRoom.isWindow = isWindow;
            this.bedTypeArr.push(roomType);
            this.bedTypeArr.push(bedType);
            this.bedTypeArr.push(bedSize);
            this.hotelRoom.roomType = roomType;
            
            this.hotelRoomId = hotelRoomId;
            this.time = "";
            this.shuju = [];
            this.repertoryNums = "0";
            let pictureList = this.roomDetails.hotelRoomPictures;
            this.imglist = [];
            this.imglistId = [];
            this.Imgurl = [];
            for (let i of pictureList) {

                this.imglist.push({ url: i.pictureUrl });
                this.imglistId.push({ id: i.hotelRoomPictureId });
                this.Imgurl.push({ url: "" });
            }
            console.log(pictureList);
        }
    },
    methods: {
        closeRoom() {
            this.$emit("close", true);
        },
        // 库存
        subRepertory() {
            if(this.time != ""){
                this.shuju.push(this.time + " 库存：" + this.repertoryNums)
            }else {
                this.error("请选择日期");
                return false
            }
            let data = {};
            data.hotelRoomId = this.hotelRoomId;
            data.rDate = this.time;
            data.repertory = this.repertoryNums;
            this.axios
                .post(`${this.AjaxUrl}/ty_business/hotel/room/repertory/setting`, this.qs.stringify(data))
                .then(res => {
                if (res.errorCode == 200) {
                    this.success(res.message);
                }else{
                    this.error(res.message);
                }
                })
                .catch(err => {
                    this.error(err);
                });
        },
        clickDay(data) {
            console.log('选中了', data); //选中某天
            let time = data.split("/");
            let h = time[0];
            let m = time[1];
            let d = time[2];
            if(m < 10){
                m = "0" + m;
            }
            if(d < 10){
                d = "0" + d;
            }
            this.time = h + "-" + m + "-" + d;  
        },
        clickToday(data) {
            console.log('跳到了本月今天', data); //跳到了本月
        },
        changeDate(data) {
            console.log('左右点击切换月份', data); //左右点击切换月份
        },
        // 编辑提交
        subRoom() {
            let url = "";
            let data = this.hotelRoom;
                url = `${this.AjaxUrl}/ty_manage/hotel/room/update`;
                data.hotelRoomId = this.hotelRoomId;
                data.roomType = this.bedTypeArr[0];
                data.bedType = this.bedTypeArr[1];
                data.bedSize = this.bedTypeArr[2];
            // for (let key in this.hotelRoom) {
            //         if (this.hotelRoom[key] == "") {
            //             this.error("所有内容都必须填写!");
            //             return false;
            //         }
            //     }
            data.hotelId = this.roomDetails.hotelId;
            this.axios
                .post(url,this.qs.stringify(data))
                .then(res => {
                if(res.errorCode == 200){
                    this.success(res.message);
                    this.$emit("close", true);
                    // this.HotelRoomList();
                }else if(res.errorCode == 303){
                    this.error(res.message);
                }else{
                    this.error(res.message);
                }
                
                })
                .catch(err => {
                console.log(err);
                });
        },
        // 查询房间
        checkHotelRoom() {
            let data = {
                params: {
                    hotelId: this.roomDetails.hotelId,
                    hotelRoomId: this.hotelRoomId
                }
            };
            this.axios
                .get(`${this.AjaxUrl}/ty_manage/hotel/room/getList`, data)
                .then(res => {
                if (res.errorCode == 200) {
                    // this.RoomList = res.data;
                    let productPictureList = res.data[this.index].hotelRoomPictures;
                    this.imglist = [];
                    this.imglistId = [];
                    for (let i of productPictureList) {
                        this.imglist.push({ url: i.pictureUrl });
                        this.imglistId.push({ id: i.hotelRoomPictureId });
                    }
                    }else if(res.errorCode == 303){
                        this.error(res.message);
                    }else{
                        this.error(res.message);
                    }
                    })
                .catch(err => {});
        },
        //上传房间图片
        handleUpload(file) {
        var reader = new FileReader();
        var _this = this;
        let data = new FormData();
        data.append("sort", this.imglist.length);
        data.append("hotelId", this.roomDetails.hotelId);
        data.append("hotelRoomId", this.hotelRoomId);
        data.append("hotelRoomPicture", file);
        this.axios
            .post(`${this.AjaxUrl}/ty_manage/hotel/room/picture/upload`,data)
            .then(res => {
            if (res.errorCode == 200) {
                this.imglist.push({ url: res.data });
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                _this.Imgurl.push({ url: this.result });
                };
                this.checkHotelRoom();
            }else{
                this.error(res.message);
            }
            })
            .catch(err => {
            console.log(err);
            });
        },
        smallImg(index) {
        if(this.Imgurl[index].url != "") {
            return this.Imgurl[index].url;
        }else {
            return this.imgUrl + this.imglist[index].url + "_small.jpg";
        }
        },
        //图片放大
        handleView(index) {
        this.visible = true;
        if(this.Imgurl[index].url != "") {
            this.amplification = this.Imgurl[index].url;
        }else {
            this.amplification = this.imgUrl + this.imglist[index].url + "_small.jpg";
        }
        },

        //图片删除
        handleRemove(index) {
        let data = {};
        data.hotelRoomPictureId	 = this.imglistId[index].id;
        this.axios
            .post(
            `${this.AjaxUrl}/ty_manage/hotel/room/picture/delete`,
            this.qs.stringify(data)
            )
            .then(res => {
            if (res.errorCode == 200) {
                console.log(res.message);
                this.imglist.splice(index,1);
                this.Imgurl.splice(index,1);
            }else{
                this.error(res.message);
            }
            })
            .catch(err => {});
        },
        error(text) {
            this.$Message.error(text);
        },
        success(text) {
            this.$Message.success(text);
        },
    }
}
</script>
<style>
.Package {
  position: absolute;
  min-height: 600px;
  width: 70%;
  background: #fff;
  border: 4px solid #eee;
  z-index: 888;
  border-radius: 12px;
  top: 10%;
  left: 15%;
}
.Package label{
    width: 72px;
}
.Package .packageTop {
    font-size: 15px;
    text-indent: 15px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
}
.SetMeal {
  height: 550px;
  overflow: auto;
  padding: 0 10px;
}
.InputList {
  display: flex;
  background: #ffffff;
  justify-content: space-between;
}
.InputList div {
    flex: 1;
    margin: 4px 0;
  }
.InputList div label {
    display: inline-block;
    width: 72px;
    text-align: left;
    margin-left: 5px;
}

.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 10px;
}

.imglist {
  position: relative;
  display: inline-block;
  width: 100px;
}

.san_top {
  margin: 0 10px;
  text-indent: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
