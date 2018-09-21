const getDate = (timestamp) => {
  var time;
  if (timestamp == undefined || timestamp == null) {
    time = new Date();
  } else {
    time = new Date(timestamp);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  if(m < 10){
    m = '0' + m
  }
  if(d < 10){
   d = '0' + d
 }  
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + m + '-' + d
};
//  日期+时分
const dataTime = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  if(m < 10){
    m = '0' + m
  }
  if(d < 10){
   d = '0' + d
 }
  var h = time.getHours();
  var mm = time.getMinutes();
  if(h < 10){
    h = '0' + h
  }
  if(mm < 10){
    mm = '0' + mm
  }
  return y + '-' + m + '-' + d + " " + h + ":" + mm
}

const getDate0 = (timestamp) => {
  var time;
  // if (timestamp == undefined) {
  //   time = new Date();
  // } else {
    time = new Date(timestamp);
  // }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' +s
};

const formatDate = (timestamp, fmt) => {
  if ( timestamp === undefined || timestamp === null || timestamp === '') {
    return '';
  }
  var date = new Date(timestamp);
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for(let k in o){
    let str = o[k]+'';
    if(new RegExp(`(${k})`).test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
};
const shm = (shijianchuo) => {
  var time;
  if (shijianchuo == undefined) {
    time = new Date();
  } else {
    time = new Date(shijianchuo);
  }
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  if(h < 10){
    h = '0' + h
  }
  if(mm < 10){
    mm = '0' + mm
  }
  if(s < 10){
   s = '0' + s
 }
  return h + ":" + mm + ":" + s
}

const hhssmm = (time) => {
  var str = time.split(":");
   var h,mm,s;
   h = str[0];
   mm = str[1];
   s = str[2];
  // time = new Date(time);
  // var h = time.getHours();
  // var mm = time.getMinutes();
  // var s = time.getSeconds();
  return h + ':' + mm + ':' + s
};

const add0 = (m) => {
  return m < 10 ? '0' + m : m
};

function padLeftZero(str){
  return ('00'+str).substr(str.length);
}

function getNowFormatDate() {
  var str = "星期";
  var week = new Date().getDay();
  switch (week) {
    case 0:
      str += "日";
      break;
    case 1:
      str += "一";
      break;
    case 2:
      str += "二";
      break;
    case 3:
      str += "三";
      break;
    case 4:
      str += "四";
      break;
    case 5:
      str += "五";
      break;
    case 6:
      str += "六";
      break;
  }
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    "           " + str + "              " + date.getHours() + seperator2 + date.getMinutes();

  return currentDate;
}


function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

 //减法计算
 const accSub = (arg1,arg2) => {
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  //last modify by deeka
  //动态控制精度长度
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}
//加法计算
const accAdd = (arg1,arg2) => {
 var r1,r2,m;
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 m=Math.pow(10,Math.max(r1,r2));
 return (arg1*m+arg2*m)/m;
}

export {
  getDate,
  getDate0,
  add0,
  formatDate,
  getNowFormatDate,
  withinErrorMargin,
  hhssmm,
  accSub,
  accAdd,
  shm,
  dataTime
}
