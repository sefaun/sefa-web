<template>
  <div class="sayfa">
    <div class="container">
      <div class="card card-body">
        <div class="row justify-content-center text-center align-items-center">
          <div class="col-12">
            <p class="basliklar">Giriş Yap</p>
          </div>
        </div>
        <hr />
        <div class="row mb-3 justify-content-center align-items-center">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <vs-input class="w-100" label="E-Mail Adresi" v-model="obj.admin" />
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row mb-3 justify-content-center align-items-center">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <vs-input class="w-100" type="password" label="Şifre" v-model="obj.admin_password" />
          </div>
          <div class="col-md-4"></div>
        </div>
        <hr />
        <div class="row justify-content-center align-items-center">
          <div class="col-md-4 orta order-3 order-lg-1">
            <vs-button
              icon="keyboard_backspace"
              color="primary"
              type="filled"
              class="mt-2"
              @click="geri()"
            >Geri</vs-button>
          </div>
          <div class="col-md-4 orta order-1 order-lg-2">
            <vs-button
              icon="done"
              color="success"
              type="filled"
              class="mt-2"
              @click="giris()"
            >Giriş Yap</vs-button>
          </div>
          <div class="col-md-4 orta order-2 order-lg-3">
            <vs-button
              icon="person_add"
              color="success"
              type="filled"
              class="mt-2"
              @click="talep()"
            >Üyelik Talebi Oluştur</vs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import giris_yap from "./servisler/giris";

export default {
  data() {
    return {
      obj: {
        admin: "",
        admin_password: ""
      }
    };
  },
  methods: {
    giris() {
      if ((this.obj.admin != "", this.obj.admin_password != "")) {
        this.$vs.loading({
          type: "material"
        });
        giris_yap
          .giris(this.obj)
          .then(async response => {
            localStorage.setItem("token", response.data.token);
            this.$store.state.token = response.data.token;
            this.$vs.notify({
              title: "Giriş Başarılı !",
              text: "Sefaun.com'a Hoş Geldiniz !",
              color: "success",
              position: "top-right"
            });
            this.$vs.loading.close();
            window.location.href = "/";
            //this.$router.push("/");
          })
          .catch(err => {
            this.$vs.notify({
              title: "Giriş Başarısız !",
              text: "E-Mail Adresinizi ve Şifrenizi Kontrol Ediniz !",
              color: "danger",
              position: "top-right"
            });
            this.$vs.loading.close();
          });
      } else {
        this.$vs.notify({
          title: "Giriş Başarısız !",
          text: "E-Mail Adresinizi ve Şifrenizi Kontrol Ediniz !",
          color: "danger",
          position: "top-right"
        });
      }
    },
    talep() {
      this.$router.push("/kayit");
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