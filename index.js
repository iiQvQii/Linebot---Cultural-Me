import 'dotenv/config'
import linebot from 'linebot'
import schedule from 'node-schedule'
import data from './data.js'

data.fetchData()

schedule.scheduleJob('0 0 * * *', () => {
  data.fetchData()
})

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('查 ')) {
      data.searchIncludes(event)
    } else if (event.message.text === '查講座' ||
      event.message.text === '查展覽' ||
      event.message.text === '查表演藝術' ||
      event.message.text === '查電影') {
      data.searchCategory(event)
    } else if (event.message.text === '什麼都有就是沒錢' ||
      event.message.text === '免費') {
      data.searchFree(event)
    } else if (event.message.text.startsWith('地點 ')) {
      data.searchArea(event)
    } else if (event.message.text.startsWith('📍顯示位置 ')) {
      data.showDistance(event)
    } else if (event.message.text === '離我最近') {
      data.showLocation(event)
    } else if (event.message.text.startsWith('⭐️加入收藏 ')) {
      data.collect(event)
    } else if (event.message.text.startsWith('💔移除收藏 ')) {
      data.delCollect(event)
    } else if (event.message.text === '查詢收藏') {
      data.showCollect(event)
    } else if (event.message.text === '搜尋規則') {
      event.reply({ type: 'text', text: '⭐️搜尋規則:\n➡️1. 由活動名稱搜尋\n「查 達文西的notebook」可搜尋活動名稱包含「達文西的notebook」的活動。(注意有空白)\n➡️2. 由活動地點搜尋\n「地點 臺北市」可搜尋位於臺北市的活動，只支援縣市查詢至多顯示12筆。(注意有空白)\n➡️3. 由活動類型搜尋\n「查展覽」可搜尋所有分類為展覽的活動，隨機顯示12筆。\n總共有四種分類: 展覽、講座、表演藝術、電影。\n➡️4. 搜尋免費\n輸入「免費」或「什麼都有就是沒錢」可顯示隨機12筆免費文藝活動。\n➡️5. 離我最近\n 輸入「離我最近」可顯示附近5公里內活動，至多12筆。' })
    } else {
      event.reply([{ type: 'text', text: '很抱歉我不知道你說什麼' }, {
        type: 'sticker',
        packageId: '6632',
        stickerId: '11825375'
      }])
    }
  } else if (event.message.type === 'location') {
    data.showNearby(event)
  }
})

// 上雲端之後如果執行環境有PORT的話，就執行PORT。
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動了不要急')
})
