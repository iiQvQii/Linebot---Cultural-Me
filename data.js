import axios from 'axios'
import template from './template.js'
import distance from './distance.js'

let randomArr = []
const dataArr = []
const collectArr = []
// 存資料進陣列
const fetchData = async () => {
  try {
    const { data } = await axios.get('https://cultureexpress.taipei/OpenData/Event/C000003')
    dataArr.push(...data)
  } catch (error) {
    console.log(error, '發生錯誤')
  }
}
// 查 包含
const searchIncludes = (event) => {
  try {
    const text = event.message.text.slice(2)
    const idx = dataArr.filter(item => {
      return item.Caption.includes(text)
    })
    // console.log(idx.length) // idx 是過濾過後的陣列
    if (idx.length <= 12 && idx.length > 0) {
      const bubbles = idx.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        // console.log(activity)
        // console.log('bubbles有執行')
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
    } else if (idx.length > 12) {
      event.reply([
        { type: 'text', text: '這個關鍵字找到的筆數有點多...' },
        { type: 'text', text: '請參考搜尋規則，換個關鍵字看看。' }
      ])
    } else if (idx.length === 0) {
      event.reply([
        { type: 'text', text: '查無資料，再接再厲。' }
      ])
    }
  } catch (error) {
    console.log(error, '發生錯誤')
  }
}

// 查展覽 查講座 查表演藝術 查電影 (隨機取出8個)
const searchCategory = (event) => {
  try {
    const text = event.message.text.slice(1)
    const idx = dataArr.filter(item => {
      return item.Category.includes(text)
    })
    // 取隨機8筆放進陣列，回覆後清空
    for (let i = 0; i < 12; i++) {
      const random = Math.round(Math.random() * idx.length)
      randomArr.push(idx[random])
    }
    // console.log(randomArr.length, 'randomArr.length')
    if (randomArr.length === 12) {
      const bubbles = randomArr.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        // console.log(randomArr)
        // console.log('bubbles有執行')
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
      randomArr = []
    }
  } catch (error) {
    console.log(error, '發生錯誤')
  }
}

// 查免費
const searchFree = (event) => {
  try {
    const idx = dataArr.filter((item) => {
      return item.TicketType === '免費'
    })
    // 取隨機8筆放進陣列，回覆後清空
    for (let i = 0; i < 12; i++) {
      const random = Math.round(Math.random() * idx.length)
      randomArr.push(idx[random])
    }
    // console.log(randomArr.length, 'randomArr.length')
    if (randomArr.length === 12) {
      const bubbles = randomArr.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        // console.log(randomArr)
        // console.log('bubbles有執行')
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
      randomArr = []
    }
  } catch (error) {
    console.log(error, 'searchFree錯誤')
  }
}

// 查縣市
const searchArea = (event) => {
  try {
    const text = event.message.text.slice(3)
    const idx = dataArr.filter(item => {
      return (item.City !== null) && (item.City.includes(text))
    })
    // <=12有幾筆顯示幾筆，不隨機
    if (idx.length <= 12) {
      // console.log(idx.length, 'idx.length')
      const bubbles = idx.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
      // 大於12取隨機12筆放進陣列，回覆後清空
    } else if (idx.length > 12) {
      for (let i = 0; i < 12; i++) {
        const random = Math.round(Math.random() * idx.length)
        randomArr.push(idx[random])
      }
      // console.log(randomArr.length)
      const bubbles = randomArr.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
      randomArr = []
    } else {
      event.reply([
        {
          type: 'text', text: '該地區查無資料，或檢查是否有錯字？\n小叮嚀：我只看得懂繁體字‼️'
        }
      ])
    }
  } catch (error) {
    console.log(error, 'searchArea錯誤')
  }
}

// 查位置訊息
const showDistance = (event) => {
  try {
    const text = event.message.text.slice(7)
    const idx = dataArr.filter(item => {
      return item.Caption.includes(text)
    })
    // console.log(idx.length, idx)
    if (idx[0].Latitude && idx[0].Longitude) {
      event.reply([
        {
          type: 'location',
          title: 'location',
          address: (idx[0].City + idx[0].Area) || ('地址'),
          latitude: idx[0].Latitude,
          longitude: idx[0].Longitude
        }
      ])
    } else {
      event.reply([
        {
          type: 'text',
          text: '此筆資料無位置訊息，請點選圖片至網站查詢詳細資訊。'
        }
      ])
    }
  } catch (error) {
    console.log(error)
  }
}

// 加入收藏
const collect = (event) => {
  try {
    const collectStartTime = event.message.text.slice(11, 27)
    const collectName = event.message.text.slice(28)
    // 過濾出這個活動
    const collectThis = dataArr.filter(item => {
      // console.log(item)
      return (item.Caption.includes(collectName)) && (item.SessionStartDate.includes(collectStartTime))
    })
    // 解決重複加入的問題，如果收藏夾已經有就不push
    const idx = collectArr.findIndex(item => {
      return (item.Caption.includes(collectName)) && (item.SessionStartDate.includes(collectStartTime))
    })
    if (idx === -1) {
      collectArr.push(...collectThis)
      event.reply([
        {
          type: 'text', text: '已加入收藏'
        }
      ])
    } else {
      event.reply([
        {
          type: 'text', text: '這個活動已被收藏過了'
        }
      ])
    }
  } catch (error) {
    console.log(error, 'collect錯誤')
  }
}
// 移除收藏
const delCollect = (event) => {
  try {
    const collectStartTime = event.message.text.slice(11, 27)
    const collectName = event.message.text.slice(28)
    // 從收藏arr找到這個活動的index
    const delIndex = collectArr.findIndex(item => {
      // console.log(item)
      return (item.Caption.includes(collectName)) && (item.SessionStartDate.includes(collectStartTime))
    })
    if (delIndex > -1) {
      // console.log(delIndex, 'delIndex')
      // 把delindex解構後從收藏夾移除
      collectArr.splice(delIndex, 1)
      // console.log(collectArr)
      event.reply([
        {
          type: 'text', text: '已從收藏夾移除'
        }
      ])
    } else {
      event.reply([
        {
          type: 'text', text: '無法移除，收藏夾找不到這個活動'
        }
      ])
    }
    // console.log(collectStartTime, collectName, collectThis)
    // console.log(collectArr)
  } catch (error) {
    console.log(error, 'collect錯誤')
  }
}
// 查詢收藏
const showCollect = (event) => {
  try {
    if (collectArr.length > 0) {
      const bubbles = collectArr.map(activity => {
        const bubble = JSON.parse(JSON.stringify(template))
        bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
        bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
        bubble.body.contents[0].text = activity.Caption
        bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
        bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
        bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
        bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
        bubble.body.contents[5].contents[1].text = activity.TicketType
        bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
        bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
        bubble.footer.contents[1].action.label = '💔從我的收藏移除'
        bubble.footer.contents[1].action.text = `💔移除收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
        return bubble
      })
      event.reply([
        {
          type: 'flex',
          altText: '文化快遞',
          contents: {
            type: 'carousel',
            contents: bubbles.slice(0, 12)
          }
        }
      ])
    } else {
      event.reply([
        {
          type: 'text', text: '收藏夾是空的'
        }
      ])
    }
  } catch (error) {
    console.log(error, '發生showCollect錯誤')
  }
}

const showLocation = (event) => {
  event.reply([
    {
      type: 'text',
      text: '等等回覆完要等我找一下喔！'
    },
    {
      type: 'text',
      text: '點擊下方橢圓按鈕告訴我你現在的位置吧！',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'location',
              label: '回覆我的位置訊息'
            }
          }
        ]
      }
    }
  ])
}

let nearArr = []
// 收到使用者位置訊息後，計算距離
const showNearby = (event) => {
  // console.log(event)
  const userLat = event.message.latitude
  const userlong = event.message.longitude
  for (let i = 0; i < dataArr.length; i++) {
    const eventLat = dataArr[i].Latitude
    const eventLong = dataArr[i].Longitude
    const dist = distance(userLat, userlong, eventLat, eventLong, 'K')
    // 如果距離小於五公里
    if (dist <= 5) {
      nearArr.push(dataArr[i])
    }
  }
  if (nearArr.length > 0) {
    const bubbles = nearArr.map(activity => {
      const bubble = JSON.parse(JSON.stringify(template))
      bubble.hero.url = (activity.ImageFile || 'https://raw.githubusercontent.com/iiQvQii/Linebot-Cultural-Me/master/img/logo.png')
      bubble.hero.action.uri = (activity.WebsiteLink || 'https://google.com')
      bubble.body.contents[0].text = activity.Caption
      bubble.body.contents[1].contents[1].text = activity.StartDate.slice(0, 10)
      bubble.body.contents[2].contents[1].text = activity.EndDate.slice(0, 10)
      bubble.body.contents[3].contents[1].text = activity.SessionStartDate.slice(0, 16)
      bubble.body.contents[4].contents[1].text = activity.SessionEndDate.slice(0, 16)
      bubble.body.contents[5].contents[1].text = activity.TicketType
      bubble.body.contents[5].contents[2].text = (activity.TicketPrice || ' ')
      bubble.footer.contents[0].action.text = `📍顯示位置 ${activity.Caption}`
      bubble.footer.contents[1].action.text = `⭐️加入收藏 場次時間${activity.SessionStartDate.slice(0, 16)} ${activity.Caption}`
      return bubble
    })
    event.reply([
      {
        type: 'flex',
        altText: '文化快遞',
        contents: {
          type: 'carousel',
          contents: bubbles.slice(0, 12)
        }
      }
    ])
  } else {
    event.reply([
      {
        type: 'text',
        text: '附近5公里沒有資料'
      }
    ])
  }
  nearArr = []
}

export default {
  fetchData,
  searchIncludes,
  searchCategory,
  searchFree,
  searchArea,
  showDistance,
  collect,
  showCollect,
  delCollect,
  showNearby,
  showLocation
}
