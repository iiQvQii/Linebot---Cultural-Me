export default {
  type: 'bubble',
  hero: {
    type: 'image',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
    url: 'https://cultureexpress.taipei/UploadPlugin?file=%2fw6lriPeTD4Ry1335WB01xxqPAYgndf6%2bW7QfMIdjuhlkeE2wrCZ4KPsAmkyFtuG%2fyNsvaIBNO7SRPY0BVNAPy7eBynL4zAKp%2fXHznTRGgY%3d',
    action: {
      type: 'uri',
      uri: 'http://www.artfocus.com.tw/?,817'
    }
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'text',
        text: '【新月．藝文講座】古文明新視野：太陽升起的地方 - 黎凡特',
        wrap: true,
        weight: 'bold',
        size: 'xl'
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '開始時間',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0
          },
          {
            type: 'text',
            text: '2021-12-28',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '結束時間',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0
          },
          {
            type: 'text',
            text: '2022-06-28',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '場次開始時間',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0
          },
          {
            type: 'text',
            text: '2022-06-28',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '場次結束時間',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0
          },
          {
            type: 'text',
            text: '2022-06-28',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '票價',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'none',
            color: '#aaaaaa'
          },
          {
            type: 'text',
            text: '售票',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md',
            color: '#aaaaaa'
          },
          {
            type: 'text',
            text: 'NT$500，或收取〈新月藝術鑑賞券〉1張。',
            wrap: false,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md',
            color: '#aaaaaa'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        contents: [
          {
            type: 'text',
            text: '地點',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            color: '#aaaaaa'
          },
          {
            type: 'text',
            wrap: true,
            weight: 'regular',
            size: 'sm',
            flex: 0,
            margin: 'md',
            text: 'Google Meet',
            color: '#aaaaaa'
          }
        ]
      }
    ]
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        action: {
          type: 'message',
          label: '加到我的收藏❤️',
          text: '已加入收藏'
        }
      }
    ]
  }
}
