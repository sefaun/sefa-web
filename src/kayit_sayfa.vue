<template>
  <div class="sayfa">
    <div class="container">
      <div class="card card-body">
        <div class="row justify-content-center text-center align-items-center">
          <div class="col-12">
            <p class="basliklar">Kayıt Ol</p>
          </div>
        </div>
        <hr />
        <div class="row mb-3 justify-content-center align-items-center">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <vs-input class="w-100" label="E-Mail Adresi" v-model="kayit.admin" />
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row mb-3 justify-content-center align-items-center">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <vs-input class="w-100" type="password" label="Şifre" v-model="kayit.admin_password" />
          </div>
          <div class="col-md-4"></div>
        </div>
        <hr />
        <div class="row justify-content-center align-items-center">
          <div class="col-md-6 orta order-2 order-lg-1">
            <vs-button
              icon="keyboard_backspace"
              color="primary"
              type="filled"
              class="mt-2"
              @click="geri"
            >Geri</vs-button>
          </div>
          <div class="col-md-6 orta order-1 order-lg-2">
            <vs-button
              icon="person_add"
              color="success"
              type="filled"
              class="mt-2"
              @click="talep_ol"
            >Üyelik Talebi Oluştur</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kayit_talebi from "./servisler/giris";

export default {
  data() {
    return {
      kayit: {
        admin: "",
        admin_password: ""
      }
    };
  },
  methods: {
    talep_ol() {
      if (this.kayit.admin != "" && this.kayit.admin_password != "") {
        this.$vs.loading({
          type: "material"
        });
        kayit_talebi
          .kayit_ol(this.kayit)
          .then(response => {
            this.$vs.notify({
              title: "Kayıt Talebiniz Alındı !",
              text: "",
              color: "success",
              position: "top-right"
            });
            this.$vs.loading.close();
            this.$router.push("/");
          })
          .catch(err => {
            this.$vs.notify({
              title: "Kayıt Talebi Başarısız !",
              text: "E-Mail Adresinizi ve Şifrenizi Kontrol Ediniz !",
              color: "danger",
              position: "top-right"
            });
            this.$vs.loading.close();
          });
      } else {
        this.$vs.notify({
          title: "Kayıt Talebi Başarısız !",
          text: "E-Mail Adresinizi ve Şifrenizi Kontrol Ediniz !",
          color: "danger",
          position: "top-right"
        });
      }
    },
    geri() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.sayfa {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.basliklar {
  font-size: 30px;
}

.orta {
  display: flex !important;
  justify-content: center !important;
}
</style>