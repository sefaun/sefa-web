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
            <p style="font-size: 30px; color: deeppink;">MAKALELER</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-4" v-for="(makaleler_geldi, index) in makaleler" :key="index">
            <div @click="makale_detayi(makaleler_geldi.id)" class="kenarlik p-5 mb-4">
              <div class="mb-3">
                <a style="color: black;">Makale Yazarı:</a>
                <a style="color: deeppink;">{{makaleler_geldi.makale_olusturan}}</a>
              </div>
              <div class="mb-3">
                <a style="color: black;">Makale İsmi:</a>
                <a style="color: deeppink;">{{makaleler_geldi.makale_ismi}}</a>
              </div>
              <div class="mb-3">
                <a style="color: black;">Makale Konusu:</a>
                <a style="color:deeppink;">{{makaleler_geldi.makale_konusu}}</a>
              </div>
            </div>
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

export default {
  data() {
    return {
      makaleler: ""
    };
  },
  methods: {
    makale() {
      makale_info
        .getmakale()
        .then(response => {
          this.makaleler = response.data;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Makaleler Alınamadı !",
            text: "İnternet Bağlantınızı Kontrol Ediniz !",
            color: "danger",
            position: "top-right"
          });
        });
    },
    makale_detayi(makale_id) {
      this.$store.state.makale_idsi = makale_id;
      this.$router.push("/makale-detayi");
    },
    ana_sayfa() {
      this.$router.push("/");
    },
    geri() {
      this.$router.push("/");
    }
  },
  created() {
    this.makale();
  }
};
</script>

<style>
.kenarlik {
  border: 1px solid lightgrey;
  background-image: linear-gradient(45deg, rgb(78, 78, 78), rgb(255, 112, 131));
  box-sizing: border-box;
  transition: 0.3s;
}

.kenarlik:hover {
  cursor: pointer;
  box-shadow: 0 0 15px rgb(135, 135, 135);
  scale: 1.04;
}

.right {
  display: flex !important;
  justify-content: right !important;
}

.go-ust {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90000000;
}
</style>