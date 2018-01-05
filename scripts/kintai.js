// Description:
//   勤怠の入力出力ができます
// Commands:
//   ボット名 create 名前  =>自分の名前を登録
//   ボット名 set_atwork 名前 => 出勤時間を登録できます
//   ボット名 set_leavework 名前 => 退勤時間を登録できます
//   ボット名 show_kintai 名前 => 自分の勤怠を確認できます

'use strict'

require('date-utils');
const kintai = require('kintai')

module.exports = (robot) => {
  // user登録
  robot.respond(/create (.+)/i, (msg) => {
    const username = msg.match[1].trim();
    let result = kintai.set_name(username)
    msg.send(result)
  });

  robot.respond(/set_atwork (.+) (.+) (.+)/i, (msg) => {
    const username = msg.match[1].trim();
    let worktime = msg.match[2].trim();
    let workcontent = msg.match[3].trim();
    // let trimData = workData.match(/[^\s]+/g)
    let dt = new Date();
    let formatted = dt.toFormat("YYYY/MM/DD");

    const data = {time: worktime, content: workcontent, datetime: formatted }

    // .match(/[^\s]+/g)
    // データをいじってそのデータをset_atworkの引数に入れる
    // kintai.set_atwork(username, workData)
    // この段階で data = {time: 値, content: 内容, datetime: 時間  }
    // というものが必要

    kintai.set_atwork(username, data)

    msg.send("lets 貢献！")
    // msg.send('出勤が登録されました。今日も頑張りましょう')
  });

  robot.respond(/set_leavework (.+) (.+) (.+)/i, (msg) => {
    const username = msg.match[1].trim();
    let worktime = msg.match[2].trim();
    let workcontent = msg.match[3].trim();

    let dt = new Date();
    let formatted = dt.toFormat("YYYY/MM/DD");

    const data = {time: worktime, content: workcontent, datetime: formatted }
    // .match(/[^\s]+/g)
    kintai.set_leavework(username, data)
    msg.send('退勤が登録されました。お疲れ様でした。')
  });

  robot.respond(/show_kintai (.+)/i, (msg) => {
    const username = msg.match[1].trim();
    let result = ''
    let work = kintai.show_kintai(username)
    if (work.length < 1) {
      result = "出勤表はありません"
    } else {
      work.map(d => {
        result += "出勤時間: "
        result += d.time
        result += "\n"
        result += "勤務内容: "
        result += d.content
        result += "\n"
        result += "登録日: "
        result += d.datetime
        result += "\n"
      })
    }

    // for ( data of work ) {
    //   result += "出勤時間: \n"
    //   result += data.time
    //   result += "勤務内容: \n"
    //   result += data.content
    //   result += "登録日: \n"
    //   result += data.datetime
    //   result += "\n"
    // }

    msg.send(result)
    // msg.send('出勤時間: ' + atwork[0].time + '\n' + '勤務内容: ' + atwork[0].content + '\n' + '登録日: ' + atwork[0].datetime)
  })
}
