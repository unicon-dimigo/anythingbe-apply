<script>
import axios from 'axios'
import * as firebase from 'firebase'
import MTopButton from '../components/MTopButton.vue'
const app = firebase.initializeApp({
  apiKey: 'AIzaSyAEHtOGwMS8TW-J66WcTGxEdXYs9tLQTBc',
  authDomain: 'anythingbe-b7762.firebaseapp.com',
  databaseURL: 'https://anythingbe-b7762.firebaseio.com',
  projectId: 'anythingbe-b7762',
  storageBucket: 'anythingbe-b7762.appspot.com',
  messagingSenderId: '303973701796',
  appId: '1:303973701796:web:d833a37596fad8d7c06e31',
  measurementId: 'G-9MNLXZBJDH'
})
const database = app.database()

export default {
  name: 'app',
  components: { MTopButton },
  data () {
    return {
      agree: false,
      form: {
        name: '',
        gender: '남자',
        birth: {
          year: null,
          month: null,
          day: null
        },
        email: null,
        phone: null,
        youtubeId: '',
        category: {
          game: false,
          eat: false,
          entertain: false,
          life: false,
          beauty: false,
          hobby: false,
          etc: null
        },
        platform: {
          youtube: '',
          twitch: false,
          africa: false,
          facebook: false,
          instagram: false,
          tiktok: false,
          etc: false
        }
      },
      channel: {
        title: null,
        subscribers: null,
        thumbnail: null
      },
      etcTemp: false
    }
  },
  methods: {
    async signInGoogle () {
      const googleUser = await this.$gAuth.signIn()
      const { access_token: accessToken } = googleUser.wc
      const url = `https://www.googleapis.com/youtube/v3/channels/?mine=true&part=id,snippet,statistics&access_token=${accessToken}`
      const { data } = await axios.get(url)
      this.form.youtubeId = data.items[0].id
      this.channel.title = data.items[0].snippet.title
      this.channel.thumbnail = data.items[0].snippet.thumbnails.default.url
      this.channel.subscribers = data.items[0].statistics.subscriberCount
    },
    toggle (platform) {
      if (this.form.platform[platform] === false) {
        this.form.platform[platform] = ''
      } else {
        this.form.platform[platform] = false
      }
    },
    koreanCategory (category) {
      return {
        game: '게임',
        eat: '먹방',
        entertain: '예능',
        life: '일상',
        beauty: '뷰티',
        hobby: '취미',
        etc: '기타'
      }[category]
    },
    async submit () {
      if (!this.agree) {
        alert('개인정보 처리 방침에 동의하여야 지원이 가능합니다.')
        return
      }
      await database
        .ref(`forms/${this.form.name}-${this.form.youtubeId}`)
        .set(this.form)
      this.$router.push('/success')
    },
    openLink (link) {
      window.open(link)
    }
  },
  computed: {
    youtubeLink () {
      return `https://www.youtube.com/channel/${this.form.youtubeId}`
    },
    years () {
      let years = []
      for (let i = 1950; i <= 2018; ++i) {
        years = [...years, i]
      }
      return years
    },
    months () {
      let months = []
      for (let i = 1; i <= 12; ++i) {
        months = [...months, i]
      }
      return months
    },
    days () {
      let days = []
      for (let i = 1; i <= 31; ++i) {
        days = [...days, i]
      }
      return days
    }
  }
}
</script>

<template>
  <div class="container">
    <img class="app__title" src="../assets/Title.svg">
    <img class="app__logo" src="../assets/Logo.svg">
    <div class="app__button-wrapper">
      <m-top-button
        @click="openLink('https://www.notion.so/uhmseohun/ANYTHINGBE-df9156b9c50a4244b82faa17b3659f75')"
      >
        ANYTHING BE?
      </m-top-button>
      <m-top-button
        style="margin-right: 0;"
        @click="openLink('https://www.notion.so/anythingBE-Q-A-5769d50ae405452799e07a0f1400ce10')"
      >
        QnA
      </m-top-button>
    </div>
    <div class="form">
      <div class="form-small">
        <div class="app__field">
          <span class="app__field__label">이름</span>
          <div style="display: flex; align-items: center;">
            <input
              v-model="form.name"
              class="app__field__input"
              placeholder="실명을 작성해 주세요."
              style="width: 50%;"
            />

            <label @click="form.gender = '남자'" style="margin-left: 20px;">남</label>
            <div
              @click="form.gender = '남자'"
              :style="{
                display: 'inline-block',
                margin: '0 5px',
                width: '15px',
                height: '15px',
                background: form.gender === '여자' ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                border: '1px solid #bbbbbb'
              }"
            />

            <label @click="form.gender = '여자'">여</label>
            <div
              @click="form.gender = '여자'"
              :style="{
                display: 'inline-block',
                margin: '0 5px',
                width: '15px',
                height: '15px',
                background: form.gender === '남자' ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                border: '1px solid #bbbbbb'
              }"
            />
          </div>
        </div>

        <div class="app__field">
          <span class="app__field__label">생년월일</span>
          <select
            name="year"
            v-model="form.birth.year"
            class="app__field__input"
            style="width: unset;"
          >
            <option
              :value="year"
              :key="year"
              v-for="year in years"
            >
              {{ year }}
            </option>
          </select>
          년

          <select
            name="month"
            v-model="form.birth.month"
            class="app__field__input"
            style="width: unset;"
          >
            <option
              :value="month"
              :key="month"
              v-for="month in months"
            >
              {{ month }}
            </option>
          </select>
          월

          <select
            name="month"
            v-model="form.birth.day"
            class="app__field__input"
            style="width: unset;"
          >
            <option
              :value="day"
              :key="day"
              v-for="day in days"
            >
              {{ day }}
            </option>
          </select>
          일
        </div>

        <div class="app__field">
          <span class="app__field__label">E-mail</span>
          <input
            type="email"
            v-model="form.email"
            class="app__field__input"
            placeholder="이메일 주소를 작성해 주세요."
          />
        </div>

        <div class="app__field">
          <span class="app__field__label">전화번호</span>
          <input
            @input="form.phone = form.phone.replace('-', '')"
            v-model="form.phone"
            class="app__field__input"
            placeholder="전화번호를 작성해 주세요."
          />
          <span class="app__field__helper">
            * 연락 가능한 전화번호 또는 핸드폰 번호를 작성해 주세요.
          </span>
        </div>

        <div class="app__field">
          <span class="app__field__label">채널 카테고리</span>
          <div class="platform__list">
            <div style="display: flex;">
              <div
                class="platform__item"
                :key="`c-${index}`"
                v-for="(category, index) in Object.keys(form.category).splice(0, 4)"
              >
                <span
                  :style="{
                    margin: index === 0 ? '0' : '0 5px'
                  }"
                >
                  {{ koreanCategory(category) }}
                </span>
                <div
                  @click="form.category[category] = !form.category[category]"
                  :style="{
                    display: 'inline-block',
                    'margin-right': '4px',
                    width: '15px',
                    height: '15px',
                    background: form.category[category] === false ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                    border: '1px solid #bbbbbb'
                  }"
                />
              </div>
            </div>

            <div style="display: flex;">
              <div
                class="platform__item"
                :key="`c-${index}`"
                v-for="(category, index) in Object.keys(form.category).splice(4, 2)"
              >
                <span
                  :style="{
                    margin: index === 0 ? '0' : '0 5px'
                  }"
                >
                  {{ koreanCategory(category) }}
                </span>
                <div
                  @click="form.category[category] = !form.category[category]"
                  :style="{
                    display: 'inline-block',
                    'margin-right': '4px',
                    width: '15px',
                    height: '15px',
                    background: form.category[category] === false ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                    border: '1px solid #bbbbbb'
                  }"
                />
              </div>
              <div class="platform__item">
                <span style="margin: 0 7.5px;">기타</span>
                <div
                  v-show="!etcTemp"
                  @click="etcTemp = !etcTemp"
                  :style="{
                    display: 'inline-block',
                    'margin-right': '4px',
                    'margin-left': '-0.5px',
                    width: '15px',
                    height: '15px',
                    background: etcTemp === false ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                    border: '1px solid #bbbbbb'
                  }"
                />
                <input v-show="etcTemp" v-model="form.category.etc" style="width: 70px;">
              </div>
            </div>

            <span class="app__field__helper">
              운영하고 있는 채널의 주요 카테고리를 해당되는 대로 선택해 주세요.
            </span>
          </div>
        </div>

        <div class="app__field">
          <span class="app__field__label">YouTube 외 추가로 운영 중인 플랫폼</span>
          <div class="platform__list">
            <div
              class="platform__item"
              :key="`p-${index}`"
              v-for="(platform, index) in Object.keys(form.platform)"
              style="display: flex; align-items: center; margin-top: 3px;"
            >
              <span style="min-width: 100px;">{{ platform === 'etc' ? '기타' : platform }}</span>
              <div
                @click="toggle(platform)"
                :style="{
                  'margin-right': '4px',
                  display: 'inline-block',
                  width: '15px',
                  height: '15px',
                  background: form.platform[platform] === false ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                  border: '1px solid #bbbbbb'
                }"
              />
              <input
                v-show="form.platform[platform] !== false"
                v-model="form.platform[platform]"
                placeholder="운영 중인 플랫폼 URL을 작성해 주세요"
                style="margin-left: 15px; width: 230px"
              >
            </div>
          </div>
        </div>

        <div class="app__field">
          <span class="app__field__label">자기소개</span>
          <textarea
            class="app__field__input app__field__input-tf"
            placeholder="anythingBE 가입을 위한 자기소개서를 자유롭게 입력해 주세요. (500자 내외)"
            style="resize: none;"
          />
        </div>

        <div class="app__field" style="margin-bottom: 10px;">
          <span class="app__field__label">개인정보 수집 및 이용약관 동의</span>
          <div class="app__field__privacy">
            ANYTHING BE는 크리에이터 지원시 아래와 같이 개인정보를 수집 및 이용하고 있습니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오. 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만 동의를 거부하는 경우 크리에이터 지원 신청 서비스가 제한될 수 있습니다.
            <br><br>
            1. 수집하는 개인정보<br>
            · 필수항목 : 이름, 성별, 생년월일, 전화번호(휴대전화번호), 이메일 주소, 유튜브 채널 주소<br>
            · 선택항목 : 유튜브 외 추가 운영 중인 플랫폼 관련 정보
            <br><br>
            2. 개인정보의 수집 및 이용 목적<br>
            ANYTHING BE는 크리에이터로 지원하는 지원자의 지원 의사를 확인하고 본인 확인을 하기 위해 개인정보를 수집 및 이용합니다. 크리에이터 중복 지원을 방지하고 서비스를 부정 이용하는 것을 방지하기 위해 개인정보를 수집 및 이용하며, 크리에이터 지원 심사 및 지원 심사 결과 안내, 기타 각종 안내사항이나 고지사항을 전달하기 위해 개인정보를 수집 및 이용합니다. 또한 추후 발생할 수 있는 분쟁 등을 위하여 개인정보를 보유합니다.
            <br><br>
            3. 개인정보 보유기간<br>
            ANYTHING BE는 지원자가 개인정보 수집 및 이용에 동의한 날로부터 1년간 개인정보를 보유합니다. 위 1년의 기간은 크리에이터 지원자의 지원 의사 확인 및 심사, 모니터링을 위한 기간입니다. 또한 회사는 개인정보보호법령 등에 따라 특별히 보유하여야 할 필요가 있는 경우에는 법령상 기간을 준수하여 보유하고 있습니다.
            <br><br>
            4. 개인정보의 파기<br>
            회사는 지원자가 개인정보 수집 및 이용에 동의한 날로부터 1년간 개인정보를 보유합니다. 위 1년의 기간은 크리에이터 지원자의 지원 의사 확인 및 심사, 모니터링을 위한 기간입니다. 또한 회사는 개인정보보호법령 등에 따라 특별히 보유하여야 할 필요가 있는 경우에는 법령상 기간을 준수하여 보유하고 있습니다.
          </div>
          <div class="app__field__helper" style="margin-left: auto; margin-top: 20px; float: right; margin-right: -33px; display: flex; align-items: center; width: 100%;">
            <span style="margin-left: auto;">상기 개인정보 수집 약관에 동의합니다.</span>
            <div
              @click="agree = !agree"
              :style="{
                'margin-left': 'auto',
                display: 'inline-block',
                margin: '0 5px',
                'margin-right': '30px',
                width: '15px',
                height: '15px',
                background: !agree ? 'white' : 'linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%)',
                border: '1px solid #bbbbbb'
              }"
            />
          </div>
        </div>
      </div>

      <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
        <button
          @click="submit"
          class="app__field__button"
        >
          크리에이터 지원하기
        </button>
      </div>
    </div>

    <div style="width: max-content; display: flex; margin-top: 30px;">
      <m-top-button
        @click="openLink('https://www.notion.so/uhmseohun/ANYTHINGBE-df9156b9c50a4244b82faa17b3659f75')"
      >
        ANYTHING BE?
      </m-top-button>
      <m-top-button
        style="margin-right: 0;"
        @click="openLink('https://www.notion.so/anythingBE-Q-A-5769d50ae405452799e07a0f1400ce10')"
      >
        QnA
      </m-top-button>
    </div>
    <div class="display: block" />

    <div style="display: flex; flex-direction: column; margin-right: 10px; margin: 20px 0; color: gray;">
      <span style="font-weight: bold;">Business contact</span>
      <span>partnership.anythingbe@gmail.com</span>
    </div>
    <img style="height: 50px;" src="../assets/flogo.png">
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 20px 10px;
  min-height: 100vh;
  width: calc(100vw - 10px);
}

.app {
  &__title {
    height: 10rem;
  }

  &__logo {
    position: absolute;
    z-index: -1;
    height: 100px;
    right: 30px;
    top: 7px;
  }

  &__field {
    width: 100%;

    &__helper {
      color: #757575;
      font-size: 0.7rem;
      display: block;
      margin-top: 5px;
    }

    &__label {
      background: rgb(255,41,108);
      background: linear-gradient(90deg, rgba(255,41,108,1) 0%, rgba(255,159,43,1) 100%);
      padding: 9px 20px;
      border-radius: 30px;
      color: white;
      display: block;
      width: fit-content;
      margin-bottom: 1.5rem;
    }

    &__input {
      background-color: #f1f1f1;
      border-radius: 30px;
      border: 0;
      padding: 9px 20px;
      width: 80%;
      outline: none;

      &-tf {
        width: calc(100% - 40px);
        height: 250px;
        padding: 20px;
        outline: none;
      }
    }

    &__button {
      background-color: #1b14b8;
      width: fit-content;
      color: #ffffff;
      padding: 10px 20px;
      border: 0;
      border-radius: 30px;
      font-size: 1.4rem;
      margin: 0 auto;
      outline: none;
      cursor: pointer;
    }

    &__privacy {
      background-color: #f1f1f1;
      border-radius: 30px;
      border: 0;
      padding: 20px;
      width: calc(100% - 40px);
    }

    &__helper {
      font-size: 0.8rem;
    }
  }

  &__button-wrapper {
    width: fit-content;
    display: flex;
    justify-content: space-between;
    margin-top: -20px;
  }
}

.form {
  z-index: 1;
  width: calc(100% - 20px);
  box-shadow:
    0 10px 16px 0 rgba(0,0,0,0.2),
    0 6px 20px 0 rgba(0,0,0,0.19) !important;
  border-radius: 25px;
  min-height: 100vh;
  padding: 20px ;
  margin-right: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: 30px;

  &-small {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr;
    gap: 20px 40px;
    margin-bottom: 20px;
  }

  &-big {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.6fr 1fr;
    gap: 50px 0px;
  }
}

.google {
  &__button {
    border: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    box-shadow:
      0 5px 8px 0 rgba(0,0,0,0.2),
      0 3px 10px 0 rgba(0,0,0,0.19) !important;
    padding: 15px;
    margin-bottom: 30px;
    cursor: pointer;
    outline: none;
    border-radius: 20px;
  }

  &__logo {
    height: 1.5rem;
    margin-right: 5px;
  }
}
</style>
