// データ構造
// users = [{
//  name: 'tarou',
//  atWork: [
//    { startTime: "10:00",
//      endTime: "19:00",
//      content: "diver, テキスト編集",
//      datetime: "2018/1/5"
//    }
//  ],
//  leaveWork: [
//    { startTime: "10:00",
//      endTime: "19:00",
//      content: "diver",
//      datetime: "2018/1/5"
//    }
//  ]
// }]


'use strict'

// const kintai = new Map()
const users = []
const userData = function(name){
  this.name = name
  this.atWork = []
  this.leaveWork = []
}
// const work = {
//   time: "",
//   content: "",
//   datetime: ""
// }
const work = function() {
  this.time = ""
  this.content = ""
  this.datetime = ""
}

function reset_work(work) {
  work.time = ""
  work.content = ""
  work.datetime = ""
}

function set_name (name) {
  const checkUser = users.filter( user => user.name === name )
  if (checkUser.length < 1) {
    let user;
    user = new userData(name)
    users.push(user)
    return '登録完了しました'
  }
  return 'すでにそのuserは存在します'
}

function set_atwork(name, data) {
  let currentUser = users.filter( user => user.name === name )[0]
  let myAtWork = new work()
  // let myAtWork = work
  myAtWork.time = data.time
  myAtWork.content = data.content
  myAtWork.datetime = data.datetime
  currentUser.atWork.push(myAtWork)
}

function set_leavework(name, data) {
  let currentUser = users.filter( user => user.name === name )[0]
  let myLeaveWork = new work()
  myLeaveWork.time = data.time
  myLeaveWork.content = data.content
  myLeaveWork.datetime = data.datetime
  currentUser.leaveWork.push(myLeaveWork)
}

function show_kintai(name) {
  let currentUser = users.filter( user => user.name === name )[0]

  const leaveWork = currentUser.leaveWork
  // const leavework = currentUser.leaveWork
  return leaveWork

}


module.exports = {
  set_name: set_name,
  set_atwork: set_atwork,
  set_leavework: set_leavework,
  show_kintai: show_kintai
}
