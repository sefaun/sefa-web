<template>
  <div id="ust" class="container mt-5 mb-5">
    <div class="container-fluid">
      <div class="row mb-3">
        <div class="col-3">
          <vs-button
            size="small"
            icon="keyboard_backspace"
            color="primary"
            type="filled"
            @click="geri()"
          >Geri</vs-button>
        </div>
        <div class="col-6"></div>
        <div class="col-3 right">
          <vs-button
            size="small"
            icon="bookmark"
            color="success"
            type="filled"
            @click="ana_sayfa()"
          >Ana Sayfa</vs-button>
        </div>
      </div>
    </div>
    <div class="card card-body">
      <div class="container">
        <div class="row text-center align-items-center justify-content-center">
          <div class="col-12">
            <p style="font-size: 30px; color: deeppink;">{{isim}}</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <p style="font-size: 30px; color: black;">
              Yazar:
              <a style="font-size: 30px; color: deepskyblue;">{{olusturan}}</a>
            </p>
          </div>
          <div class="col-lg-6">
            <p style="font-size: 30px; color: black;">
              Konu:
              <a style="font-size: 30px; color: deepskyblue;">{{konusu}}</a>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <p style="font-size: 18px; color: black;">{{icerigi}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card card-body mt-5">
      <div class="container">
        <div class="row text-center align-items-center justify-content-center">
          <div class="col-12">
            <p style="font-size: 25px; color: deeppink;">YORUM PAYLAŞ</p>
          </div>
        </div>
      </div>
      <hr />

      <div class="row align-items-center justify-content-center">
        <div class="col-lg-12">
          <vs-input class="w-100" label="İsim" v-model="makale_yorum.isim" />
        </div>
      </div>

      <div class="row mt-4 align-items-center justify-content-center">
        <div class="col-lg-12">
          <vs-textarea label="Yorum" v-model="makale_yorum.yorum" />
        </div>
      </div>

      <hr />

      <div class="row text-center align-items-center justify-content-center">
        <div class="col-lg-12 orta">
          <vs-button
            icon="bookmark"
            color="success"
            type="filled"
            @click="makale_yorum_paylas()"
          >Yorum Paylaş</vs-button>
        </div>
      </div>
    </div>
    <div class="card card-body mt-5">
      <div class="container">
        <div class="row text-center align-items-center justify-content-center">
          <div class="col-12">
            <p style="font-size: 25px; color: deeppink;">YORUMLAR</p>
          </div>
        </div>
      </div>
      <hr />
      <div v-if="makale_yorumlarim.length >= 1">
        <div
          class="container-fluid cerceve mt-2"
          v-for="(yorumlar, index) in makale_yorumlarim"
          :key="index"
        >
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-12">
              <p style="font-size: 18px; color: black;">
                Yorum Sahibi:
                <a style="font-size: 20px; color: deeppink;">{{yorumlar.isim}}</a>
              </p>
            </div>
          </div>

          <div class="row align-items-center justify-content-center">
            <div class="col-lg-12">
              <p style="font-size: 18px; color: black;">
                Yorum:
                <a style="font-size: 20px; color: deepskyblue;">{{yorumlar.yorum}}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container">
        <div class="row text-center justify-content-center align-items-center">
          <div class="col-lg-12">
            <p style="font-size: 18px; color: deepskyblue;">Bu Makaleye Henüz Yorum Yapılmadı.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="go-ust">
      <a href="#ust" style="color: deepskyblue; outline: none;">
        <vs-button radius color="danger" type="gradient" icon="keyboard_arrow_up"></vs-button>
      </a>
    </div>
  </div>
</template>

<script>
import makale_info from "./servisler/makale";
import makale_yorumlari from "./servisler/makale_yorum";
import makale_yorum from "./servisler/makale_yorum";

export default {
  data() {
    return {
      makale_detaylari: "",
      olusturan: "",
      isim: "",
      konusu: "",
      icerigi: "",
      makale_yorum: {
        isim: "",
        yorum: ""
      },
      makale_yorumlarim: ""
    };
  },
  methods: {
    makale_detay_al() {
      makale_info
        .getmakale_detayi(this.$store.state.makale_idsi)
        .then(response => {
          response.data.forEach(element => {
            this.olusturan = element.makale_olusturan;
            this.isim = element.makale_ismi;
            this.konusu = element.makale_konusu;
            this.icerigi = element.makale_icerik;
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Makale Yüklenemedi !",
            text: "Tekrar Deneyiniz !",
            color: "danger",
            position: "top-right"
          });
        });
    },
    makale_yorum_paylas() {
      if (this.makale_yorum.isim != "" && this.makale_yorum.yorum != "") {
        makale_yorumlari
          .addmakale_yorum(this.$store.state.makale_idsi, this.makale_yorum)
          .then(response => {
            this.makale_yorum_al();
            this.$vs.notify({
              title: "Makaleye Yorum Paylaşıldı !",
              text:
                "Sayın" +
                " " +
                this.makale_yorum.isim +
                " " +
                "Değerli Yorumlarınız İçin Teşekkürler !",
              color: "success",
              position: "top-right"
            });
          })
          .catch(err => {
            this.$vs.notify({
              title: "Makaleye Yorum Paylaşılamadı !",
              text: "Tekrar Deneyiniz !",
              color: "danger",
              position: "top-right"
            });
          });
      } else {
        this.$vs.notify({
          title: "Makaleye Yorum Paylaşılamadı !",
          text: "İsminizi ve Yorumunuzu Yazdığınızdan Emin Olunuz !",
          color: "danger",
          position: "top-right"
        });
      }
    },
    makale_yorum_al() {
      makale_yorumlari
        .getmakale_yorum(this.$store.state.makale_idsi)
        .then(response => {
          this.makale_yorumlarim = response.data;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Makale Yorumları Yüklenmedi !",
            text: "İnternet Bağlantınızı Kontrol Ediniz !",
            color: "danger",
            position: "top-right"
          });
        });
    },
    ana_sayfa() {
      this.$router.push("/");
    },
    geri() {
      this.$router.push("/makaleler");
    }
  },
  created() {
    this.makale_detay_al();
    this.makale_yorum_al();
  }
};
</script>

<style>
.orta {
  display: flex !important;
  justify-content: center !important;
}

.right {
  display: flex !important;
  justify-content: right !important;
}

.cerceve {
  border-radius: 10px;
  border: 1px solid lightgrey;
}

.go-ust {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90000000;
}
</style>