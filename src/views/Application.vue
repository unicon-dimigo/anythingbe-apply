<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      form: {
        name: '',
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
          twitch: null,
          africa: null,
          facebook: null,
          instagram: null,
          tiktok: null
        }
      }
    }
  },
  methods: {
    async signInGoogle () {
      const googleUser = await this.$gAuth.signIn()
      const { access_token: accessToken } = googleUser.wc
      const url = `https://www.googleapis.com/youtube/v3/channels/?mine=true&part=id&access_token=${accessToken}`
      const { data } = await axios.get(url)
      this.form.youtubeId = data.items[0].id
    }
  },
  computed: {
    youtubeLink () {
      return `https://www.youtube.com/channel/${this.form.youtubeId}`
    }
  }
}
</script>

<template>
  <div class="container">
    <img class="app__title" src="../assets/Title.svg">
    <img class="app__logo" src="../assets/Logo.svg">
    <div class="form">
      <div class="form-small">
        <div class="app__field">
          <span class="app__field__label">이름</span>
          <input
            class="app__field__input"
            placeholder="실명을 작성해 주세요."
          />
        </div>

        <div class="app__field">
          <span class="app__field__label">생년원일</span>
          <input type="date">
        </div>

        <div class="app__field">
          <span class="app__field__label">E-mail</span>
          <input
            class="app__field__input"
            placeholder="이메일 주소를 작성해 주세요."
          />
        </div>

        <div class="app__field">
          <span class="app__field__label">전화번호</span>
          <input
            class="app__field__input"
            placeholder="전화번호를 작성해 주세요."
          />
        </div>

        <div class="app__field">
          <span class="app__field__label">유튜브 운영 채널</span>
          <button
            v-if="youtubeId !== ''"
            @click="signInGoogle"
          >
            구글로 로그인
          </button>
          <span v-else>{{ youtubeLink }}</span>
        </div>

        <div class="app__field">
          <span class="app__field__label">YouTube 외에 추가로 운영 중인 플랫폼</span>
        </div>
      </div>

      <div class="form-big">
        <div class="app__field">
          <span class="app__field__label">자기소개</span>
          <textarea
            class="app__field__input app__field__input-tf"
            placeholder="anythingBE 가입을 위한 자기소개서를 자유롭게 입력해 주세요."
          />
        </div>

        <div class="app__field">
          <span class="app__field__label">개인정보 수집 및 이용약관 동의</span>
          <div class="app__field__privacy">
            anythingBE는 크리에이터 지원시 아래와 같이 개인정보를 수집 및 이용하고 있습니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여 주십시오. 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만 동의를 거부하는 경우 크리에이터 지원 신청 서비스가 제한될 수 있습니다.
            <br><br>
            1. 수집하는 개인정보
            · 필수항목 : 이름, 성별, 생년월일, 전화번호(휴대전화번호), 이메일 주소, 유튜브 채널 주소
            · 선택항목 : 유튜브 외 추가 운영 중인 플랫폼 관련 정보
            <br><br>
            2. 개인정보의 수집 및 이용 목적
            anythingBE는 크리에이터로 지원하는 지원자의 지원 의사를 확인하고 본인 확인을 하기 위해 개인정보를 수집 및 이용합니다. 크리에이터 중복 지원을 방지하고 서비스를 부정 이용하는 것을 방지하기 위해 개인정보를 수집 및 이용하며, 크리에이터 지원 심사 및 지원 심사 결과 안내, 기타 각종 안내사항이나 고지사항을 전달하기 위해 개인정보를 수집 및 이용합니다. 또한 추후 발생할 수 있는 분쟁 등을 위하여 개인정보를 보유합니다.
            <br><br>
            3. 개인정보 보유기간
            anythingBE는 지원자가 개인정보 수집 및 이용에 동의한 날로부터 1년간 개인정보를 보유합니다. 위 1년의 기간은 크리에이터 지원자의 지원 의사 확인 및 심사, 모니터링을 위한 기간입니다. 또한 회사는 개인정보보호법령 등에 따라 특별히 보유하여야 할 필요가 있는 경우에는 법령상 기간을 준수하여 보유하고 있습니다.
            <br><br>
            4. 개인정보의 파기
            회사는 지원자가 개인정보 수집 및 이용에 동의한 날로부터 1년간 개인정보를 보유합니다. 위 1년의 기간은 크리에이터 지원자의 지원 의사 확인 및 심사, 모니터링을 위한 기간입니다. 또한 회사는 개인정보보호법령 등에 따라 특별히 보유하여야 할 필요가 있는 경우에는 법령상 기간을 준수하여 보유하고 있습니다.
          </div>
        </div>

        <button class="app__field__button">크리에이터 지원하기</button>
      </div>
      <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container { margin: 20px 200px; }

.app {
  &__title {
    height: 16rem;
  }

  &__logo {
    position: absolute;
    z-index: -1;
    height: 1000px;
    top: -250px;
    right: 0;
  }

  &__field {
    width: 100%;

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
        width: 100%;
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
      width: 100%;
    }

    &__helper {
      font-size: 0.8rem;
    }
  }
}

.form {
  z-index: 1;
  width: 100%;
  box-shadow:
    0 10px 16px 0 rgba(0,0,0,0.2),
    0 6px 20px 0 rgba(0,0,0,0.19) !important;
  border-radius: 50px;
  min-height: 100vh;
  padding: 10rem;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: 200px;

  &-small {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 50px 40px;
  }

  &-big {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 50px 0px;
  }
}
</style>
