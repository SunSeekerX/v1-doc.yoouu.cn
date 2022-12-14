# ð Crisp å®¢æ

## â ï¸ è­¦å

**æä»¶å¸åºçææ¡£è§£ææé®é¢ï¼æ¹æ³åè§£ææä¸¢å¤±ï¼ä¾å¦ `on start æ¾å¨ä¸èµ·å°±ä¸è§äº`**

**æ¥çå¨çº¿ææ¡£ï¼**[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/crisp](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/crisp)

## ç®ä»

å®ç½: [https://crisp.chat/en/](https://crisp.chat/en/)

Github: [https://github.com/crisp-im](https://github.com/crisp-im)

æ´å¤æä»¶ï¼[https://doc.yoouu.cn/front-end/uni-app/nativeplugins/](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)

## å¹³å°å¼å®¹æ§

|  Android   |   iOS   |
| :--------: | :-----: |
| 5.0 - 13.0 | 13 - 16 |

## ä½¿ç¨ç¤ºä¾

1. éä¸­åçæä»¶
2. å¨å¯è§ååºåéç½® `websiteId` åæ°
3. ç´æ¥è°ç¨ `onStartCrisp()` å³å¯å¯å¨ã

> 2.0 ä»¥ååªè½åå§åä¸æ¬¡ï¼å®éä¸æ¯ä¸æ­£ç¡®çï¼2.0 ççæ¬ä½¿ç¨ä½éªåå®æ¹ä¿æäºä¸ç´ï¼å¯ä»¥å¨æå»ä¿®æ¹ `websiteId`ï¼å¦ææªè®¾ç½® `websiteId` ä¼åºç°å®åéªéï¼ios æ²¡æååºãåå æ¯å ä¸ºæ²¡åæ³å»å¤æ­æ¯å¦å·²ç»è®¾ç½®äº `websiteId`ãå·²ç»æäºéæ±å¯ä»¥ç¹è¿éæ¥ç: [https://github.com/crisp-im/crisp-sdk-android/issues/138](https://github.com/crisp-im/crisp-sdk-android/issues/138) å¦æå®æ¹åç»­æ¯æäºçè¯ï¼æä¼è·è¿ä¿®æ¹ã

```javascript
const superModuleCrisp = uni.requireNativePlugin('Super-Module-Crisp')

/**
 * åå§å Crisp, 2.0 ä»¥å å¯ä»¥éå¤åå§å
*/
onInitConfigureCrisp() {
  const res = superModuleCrisp.onInitConfigure({
    websiteId: 'YOUR_WEBSITE_ID',
  })
  toast('onInitConfigureCrisp', res)
}

/**
 * å¯å¨ Crisp
*/
onStartCrisp() {
  const res =  superModuleCrisp.onStartCrisp()
  toast('onStartCrisp', res)
}

/**
 * Toast æç¤º
 */
const toast = (title, val) => {
  try {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else {
      val = String(val)
    }
  } catch (e) {
    val = e.message
  } finally {
    uni.showToast({
      icon: 'none',
      title: `${title}: ${val}`,
      duration: 3000,
    })
  }
}

/**
 * å®å¨è¿è¡
 */
const safeRunning = (name, fun) => {
  try {
    fun()
  } catch (e) {
    toast(name, e.message)
  }
}
```

## æ¨¡åæ¹æ³

### onInitConfigure(options): result

åå§å Crispã

- `options` <Object\>
  - `websiteId` <String\> ç½ç« id
- `result` <Object\> æ§è¡è¿åä¿¡æ¯
  - `success` <Boolean\> æä½æ¯å¦æå
  - `code` <Number\> ç¶æç 
    - `200` åå§å Crisp æå!
    - `400` è¯·ä¼ å¥ "websiteId"!
    - `401` è¯·å¿éå¤åå§å!
  - `msg` <String\> è¯·æ±ä¿¡æ¯

### onStartCrisp(options?): result

å¯å¨ Crispã

**è¯·æ³¨æå¨åçæä»¶è®¾ç½®äº `websiteId` æèä¼ å¥ `websiteId` å `isInit` ä¸º `true` æè½å¯å¨æåï¼å¦åå®åä¼éªéï¼ios æ²¡æååºã**

`options` <Object\> å¯å¨åæ°ï¼å¯é

- `isInit` <Boolean\> æ¯å¦è¿è¡åå§å
- `websiteId` <String\> ç½ç« id

`result` <Object\> æ§è¡è¿åä¿¡æ¯

- `success` <Boolean\> æä½æ¯å¦æå
- `code` <Number\> ç¶æç 
  - `200` å¯å¨æå!
- `msg` <String\> è¯·æ±ä¿¡æ¯

### onInvokeCrispFun(options): result

è°ç¨ SDK å¶ä»çæ¹æ³ãios æ¹æ³ååè android sdk æ¹æ³åè°ç¨ãå®æ¹ Android ææ¡£: [https://docs.crisp.chat/guides/chatbox-sdks/android-sdk/](https://docs.crisp.chat/guides/chatbox-sdks/android-sdk/)

`options` <Object\> åæ°

- `name` <String\> æ¹æ³å
- `params` <Object\> æ¹æ³åæ°ï¼æ ¹æ®å®ç½ææ¡£åæ°é¡ºåºè®¾ç½®

`result` <Object\> æ§è¡è¿åä¿¡æ¯

- `success` <Boolean\> æä½æ¯å¦æå
- `code` <Number\> ç¶æç 
  - `200` å¯å¨æå!
  - `400` è¯·ååå§å!
- `msg` <String\> è¯·æ±ä¿¡æ¯

ç¤ºä¾

```javascript
const res = superModuleCrisp.onInvokeCrispFun({
  name,
  params,
})
toast(`onInvokeCrispFun - ${name}`, res)
```

## æéåè¡¨

**Ios**

```
 [
         "NSCameraUsageDescription",
         "NSPhotoLibraryAddUsageDescription"
       ]
```

**Android**

æ 

**æ¬æä»¶ééçæ°æ®ãåéçæå¡å¨å°åãä»¥åæ°æ®ç¨éè¯´æ**

Crisp sdk éç§æ¿ç­ï¼[https://crisp.chat/en/privacy/](https://crisp.chat/en/privacy/)

## æ¼ç¤ºæªå¾

| IOS | Android |
| :-: | :-: |
| <img src="https://static.yoouu.cn/imgs/2021/pic-go/crisp-ios-screenshot.png" alt="ios-screenshot" style="zoom: 25%;" /> | <img src="https://static.yoouu.cn/imgs/2021/pic-go/crisp-android-screenshot.jpeg" alt="android-screenshot" style="zoom: 25%;" /> |

## æµè¯æä»¶ä»£ç 

```html
<template>
  <view class="content">
    <!-- Crisp -->
    <view class="gap"><text>ð Crisp</text></view>
    <!-- åå§å Crisp -->
    <view class="input">
      <input v-model="crisp.websiteId" type="text" placeholder="è¯·è¾å¥ websiteId" />
    </view>
    <button type="primary" @click="onInitConfigureCrisp">åå§å Crisp</button>

    <!-- è®¾ç½® configure -->
    <view class="input">
      <input v-model="crisp.configureWebsiteId" type="text" placeholder="è¯·è¾å¥ websiteId" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'configure',
          params: {
            websiteId: crisp.configureWebsiteId,
          },
        })
      "
      >configure</button
    >

    <!-- setTokenID -->
    <view class="input">
      <input v-model="crisp.tokenID" type="text" placeholder="è¯·è¾å¥ tokenID" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setTokenID',
          params: {
            websiteId: crisp.tokenID,
          },
        })
      "
      >setTokenID</button
    >

    <!-- resetChatSession -->
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'resetChatSession',
        })
      "
      >resetChatSession</button
    >

    <!-- setUserAvatar -->
    <view class="input">
      <input v-model="crisp.avatar" type="text" placeholder="è¯·è¾å¥ avatar" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserAvatar',
          params: {
            avatar: crisp.avatar,
          },
        })
      "
      >setUserAvatar</button
    >

    <!-- setUserCompany -->
    <view class="input">
      <input v-model="crisp.name" type="text" placeholder="è¯·è¾å¥ name" />
    </view>
    <view class="input"> <input v-model="crisp.url" type="text" placeholder="è¯·è¾å¥ url" /> </view>
    <view class="input">
      <input
        v-model="crisp.companyDescription"
        type="text"
        placeholder="è¯·è¾å¥ companyDescription"
      />
    </view>
    <view class="input">
      <input v-model="crisp.employment.role" type="text" placeholder="è¯·è¾å¥ employment.role" />
    </view>
    <view class="input">
      <input v-model="crisp.employment.title" type="text" placeholder="è¯·è¾å¥ employment.title" />
    </view>
    <view class="input">
      <input v-model="crisp.geolocation.city" type="text" placeholder="è¯·è¾å¥ geolocation.city" />
    </view>
    <view class="input">
      <input
        v-model="crisp.geolocation.country"
        type="text"
        placeholder="è¯·è¾å¥ geolocation.country"
      />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserCompany',
          params: {
            name: crisp.name,
            url: crisp.url,
            companyDescription: crisp.companyDescription,
            employment: {
              role: crisp.employment.role,
              title: crisp.employment.title,
            },
            geolocation: {
              city: crisp.geolocation.city,
              country: crisp.geolocation.country,
            },
          },
        })
      "
      >setUserCompany</button
    >

    <!-- è®¾ç½®ç¨æ·é®ç®± -->
    <view class="input">
      <input v-model="crisp.email" type="text" placeholder="è¯·è¾å¥ç¨æ·é®ç®±" />
    </view>
    <button type="primary" @click="onCrispSetUserEmail">è®¾ç½®ç¨æ·é®ç®±</button>

    <!-- setUserNickname -->
    <view class="input">
      <input v-model="crisp.nickname" type="text" placeholder="è¯·è¾å¥ nickname" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserNickname',
          params: {
            nickname: crisp.nickname,
          },
        })
      "
      >setUserNickname</button
    >

    <!-- setUserPhone -->
    <view class="input">
      <input v-model="crisp.phone" type="text" placeholder="è¯·è¾å¥ phone" />
    </view>
    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setUserPhone',
          params: {
            phone: crisp.phone,
          },
        })
      "
      >setUserPhone</button
    >

    <!-- setSessionBool -->
    <view class="input">
      <input
        v-model="crisp.setSessionBool.key"
        type="text"
        placeholder="è¯·è¾å¥ setSessionBool.key"
      />
    </view>
    <view class="input">
      <text>setSessionBool.value</text>
      <u-switch
        v-model="crisp.setSessionBool.value"
        @change="
          (val) => {
            crisp.setSessionBool.value = val
          }
        "
      />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionBool',
          params: {
            key: crisp.setSessionBool.key,
            value: crisp.setSessionBool.value,
          },
        })
      "
      >setSessionBool</button
    >

    <!-- setSessionInt -->
    <view class="input">
      <input v-model="crisp.setSessionInt.key" type="text" placeholder="è¯·è¾å¥ setSessionInt.key" />
    </view>
    <view class="input">
      <input
        v-model="crisp.setSessionInt.value"
        type="text"
        placeholder="è¯·è¾å¥ setSessionInt.value"
      />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionInt',
          params: {
            key: crisp.setSessionInt.key,
            value: crisp.setSessionInt.value,
          },
        })
      "
      >setSessionInt</button
    >

    <!-- setSessionString -->
    <view class="input">
      <input
        v-model="crisp.setSessionString.key"
        type="text"
        placeholder="è¯·è¾å¥ setSessionString.key"
      />
    </view>
    <view class="input">
      <input
        v-model="crisp.setSessionString.value"
        type="text"
        placeholder="è¯·è¾å¥ setSessionString.value"
      />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionString',
          params: {
            key: crisp.setSessionString.key,
            value: crisp.setSessionString.value,
          },
        })
      "
      >setSessionString</button
    >

    <!-- segment -->
    <view class="input">
      <input v-model="crisp.segment" type="text" placeholder="è¯·è¾å¥ segment" />
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'setSessionSegment',
          params: {
            segment: crisp.segment,
          },
        })
      "
      >segment</button
    >

    <!-- pushSessionEvent -->
    <view class="input">
      <input
        v-model="crisp.pushSessionEvent.text"
        type="text"
        placeholder="è¯·è¾å¥ pushSessionEvent.text"
      />
    </view>
    <view class="input" @tap="state.isShowColorPicker = true">
      <text>crisp.pushSessionEvent.color: {{ crisp.pushSessionEvent.color }}</text>
      <!-- <input v-model="crisp.pushSessionEvent.color" disabled type="text" placeholder="è¯·è¾å¥ pushSessionEvent.color" /> -->
    </view>

    <button
      type="primary"
      @click="
        onInvokeCrispFun({
          name: 'pushSessionEvent',
          params: {
            text: crisp.pushSessionEvent.text,
            color: crisp.pushSessionEvent.color,
          },
        })
      "
      >pushSessionEvent</button
    >

    <!-- å¯å¨ Crisp -->
    <view class="input">
      <text>æ¯å¦è®¾ç½® websiteId</text>
      <u-switch
        v-model="crisp.isInit"
        @change="
          (val) => {
            crisp.isInit = val
          }
        "
      />
    </view>
    <button type="primary" @click="onStartCrisp">å¯å¨ Crisp</button>

    <u-picker
      :show="state.isShowColorPicker"
      :defaultIndex="colorIndex"
      @confirm="
        (val) => {
          crisp.pushSessionEvent.color = val.value[0]
          state.isShowColorPicker = false
          colorIndex[0] = val.indexs[0]
        }
      "
      :columns="[['black', 'blue', 'brown', 'green', 'grey', 'orange', 'pink', 'purple', 'red', 'yellow']]"
    />
  </view>
</template>

<script>
  import { toast, safeRunning } from '@/utils'

  // #ifdef APP-PLUS
  const superModuleCrisp = uni.requireNativePlugin('Super-Module-Crisp')
  // #endif

  export default {
    name: 'SuperModuleCrisp',
    data() {
      return {
        state: {
          isShowColorPicker: false,
        },
        colorIndex: [9],

        // Crisp
        crisp: {
          websiteId: '7a30b69a-ec9e-4957-9ffa-b6635d2ba069',
          isInit: false,

          // configure
          configureWebsiteId: '7a30b69a-ec9e-4957-9ffa-b6635d2ba069',

          // setTokenID
          tokenID: '',

          // setUserAvatar
          avatar: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',

          // setUserCompany
          name: 'SunSeekerX å¬å¸',
          url: 'https://yoouu.cn/',
          companyDescription: 'å¤©ä¸ç¬¬ä¸ã',
          employment: {
            role: 'æ»ç»ç',
            title: 'ææ¯æ é¢',
          },
          geolocation: {
            city: 'ä¸æµ·',
            country: 'ä¸­å½',
          },

          // setUserEmail
          email: '1647800606@qq.com',

          // setUserNickname
          nickname: 'ä¸ç¥éèµ·å¥æµç§°',

          // setUserPhone
          phone: '13800000000',

          // setSessionBool
          setSessionBool: {
            key: '',
            value: false,
          },

          // setSessionInt
          setSessionInt: {
            key: '',
            value: 0,
          },

          // setSessionString
          setSessionString: {
            key: '',
            value: '',
          },

          // setSessionSegment
          segment: '',

          // pushSessionEvent
          pushSessionEvent: {
            text: '',
            /*
           @SerializedName("black")
            BLACK,
            @SerializedName("blue")
            BLUE,
            @SerializedName("brown")
            BROWN,
            @SerializedName("green")
            GREEN,
            @SerializedName("grey")
            GREY,
            @SerializedName("orange")
            ORANGE,
            @SerializedName("pink")
            PINK,
            @SerializedName("purple")
            PURPLE,
            @SerializedName("red")
            RED,
            @SerializedName("yellow")
            YELLOW;
           */
            color: 'yellow',
          },
        },
      }
    },
    methods: {
      /**
       * åå§å Crisp
       */
      onInitConfigureCrisp() {
        safeRunning('onInitConfigureCrisp', () => {
          const res = superModuleCrisp.onInitConfigure({
            // 4650b9b7-111f-4548-9e09-94dede5be9ed Cowbitex,
            // 7a30b69a-ec9e-4957-9ffa-b6635d2ba069 sunseekerx,
            websiteId: this.crisp.websiteId,
          })
          toast('onInitConfigureCrisp', res)
        })
      },

      /**
       * å¯å¨ Crisp
       */
      onStartCrisp() {
        safeRunning('onStartCrisp', () => {
          // superModuleCrisp.onStartCrisp()
          const res = superModuleCrisp.onStartCrisp({
            isInit: this.crisp.isInit,
            websiteId: this.crisp.websiteId,
          })
          toast('onStartCrisp', res)
        })
      },

      /**
       * è®¾ç½®ç¨æ·é®ç®±
       */
      onCrispSetUserEmail() {
        safeRunning('onCrispSetUserEmail', () => {
          const res = superModuleCrisp.onInvokeCrispFun({
            name: 'setUserEmail',
            params: {
              email: this.crisp.email,
            },
          })
          toast('onCrispSetUserEmail', res)
        })
      },

      /**
       * onInvokeCrispFun
       */
      onInvokeCrispFun({ name, params }) {
        safeRunning(`onInvokeCrispFun - ${name}`, () => {
          const res = superModuleCrisp.onInvokeCrispFun({
            name,
            params,
          })
          toast(`onInvokeCrispFun - ${name}`, res)
        })
      },
      confirm(e) {
        console.log(e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 12px 24rpx;

    button {
      margin-top: 6px;
      font-size: 16px;
    }

    .gap {
      margin-top: 18px;

      text {
        font-size: 18px;
      }

      &:first-child {
        margin-top: 0;
      }
    }

    .input {
      margin-top: 12px;
      padding: 12rpx 24rpx;
      border: 1px solid #eee;
      color: #333;

      &:first-child {
        margin-top: 0;
      }
    }
  }
</style>
```

## æ´æ°æ¥å¿

### 2.0.0 2022-09-24

**åè½ï¼Featuresï¼**

- ãéè¦ãæ¯æè°ç¨ sdk å¶ä»çæ¹æ³ï¼å·²ç»å¨é¨æ¯æå®æ¹æä¾çæ¹æ³
- ãéè¦ãæ¯æå¯è§åéç½® `websiteId`
- ãéè¦ãæ¯æå¨æä¿®æ¹ `websiteId`
- ãéè¦ãåçº§å°ææ°çå¯ç¨ç sdk çæ¬

- Android ä½¿ç¨ç `sdk` çæ¬ï¼`crisp-sdk-1.0.11.aar`
- Ios ä½¿ç¨ç `sdk` çæ¬ï¼`Crisp_1.6.4.zip`

### 1.0.1

**åè½ï¼Featuresï¼**

1. æ´æ°æä»¶ééæ°æ®è¯´æ

**Bug ä¿®å¤ ï¼Bug Fixesï¼**

### 1.0.0

**åè½ï¼Featuresï¼**

- Android ä½¿ç¨ç `sdk` çæ¬ï¼`crisp-sdk-1.0.7.aar`
- Ios ä½¿ç¨ç `sdk` çæ¬ï¼`Crisp_1.0.14.zip`

**Bug ä¿®å¤ ï¼Bug Fixesï¼**

## é®é¢åé¦

è½ç¶æä»¶å·²ç»ç»è¿å¼åèæµè¯åä½¿ç¨ï¼ä½ä¸æé¤æäºåºæ¯ä¸äº§çé®é¢çå¯è½æ§ï¼å¦éå° `Bug` å¯ä»¥

- å¨è¯è®ºåºçè¨ï¼æ¶å°éç¥é®ä»¶æä¼ç¬¬ä¸æ¬¡æ¶é´æ¥ç
- ææ·»å  `å¾®ä¿¡: sunseekerx` è¿è¡åé¦
- ææ·»å  `QQ: 1647800606` è¿è¡åé¦

## æ´å¤æä»¶

- [å¨çº¿æä»¶ä»ç»](https://doc.yoouu.cn/front-end/uni-app/nativeplugins/)
- [uni-app æä»¶å¸åº](https://ext.dcloud.net.cn/publisher?id=64103)

å¦ææä»¶å®å¶éæ±ï¼ä¹å¯ä»¥èç³»æå¦ã
