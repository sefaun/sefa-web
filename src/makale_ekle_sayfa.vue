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
            <p style="font-size: 30px; color: deeppink;">MAKALE PAYLAŞ</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <vs-input class="w-100" label="Yazar:" v-model="makale.makale_olusturan" />
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <vs-input class="w-100" label="Makale İsmi: " v-model="makale.makale_ismi" />
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <vs-input class="w-100" label="Makale Konusu:" v-model="makale.makale_konusu" />
        </div>
        <div class="col-lg-2"></div>
      </div>
      <div class="row mt-3 justify-content-center align-items-center">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">İçerik</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="makale.makale_icerik"
              rows="20"
            ></textarea>
          </div>
        </div>
        <div class="col-lg-2"></div>
      </div>
      <hr />
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-2"></div>
        <div class="col-lg-8 orta">
          <vs-button
            icon="queue"
            color="success"
            type="filled"
            class="mt-2"
            @click="makale_paylas()"
          >Paylaş</vs-button>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import makale_info from "./servisler/makale";

export default {
  data() {
    return {
      makale: {
        makale_olusturan: "",
        makale_ismi: "",
        makale_konusu: "",
        makale_icerik: ""
      }
    };
  },
  methods: {
    makale_paylas() {
      if (
        this.makale.makale_olusturan != "" &&
        this.makale.makale_ismi != "" &&
        this.makale.makale_konusu != "" &&
        this.makale.makale_icerik != ""
      ) {
        makale_info
          .addmakale(this.makale)
          .then(response => {
            this.$vs.notify({
              title: "Makale Paylaşıldı !",
              text: "",
              color: "success",
              position: "top-right"
            });
            this.$router.push("/");
          })
          .catch(err => {
            this.$vs.notify({
              title: "Makale Paylaşılamadı !",
              text: "Siteye Giriş Yapınız !",
              color: "danger",
              position: "top-right"
            });
          });
      } else {
        this.$vs.notify({
          title: "Makale Paylaşılamadı !",
          text: "Boş Yer Bırakmayınız !",
          color: "danger",
          position: "top-right"
        });
      }
    },
    ana_sayfa() {
      this.$router.push("/");
    },
    geri() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.basliklar {
  font-size: 30px;
}

.orta {
  display: flex !important;
  justify-content: center !important;
}

.right {
  display: flex !important;
  justify-content: right !important;
}
</style>