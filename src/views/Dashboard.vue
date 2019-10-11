<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12">
        <b-card header-tag="header" footer-tag="footer">
          <div slot="header">
            <i class="fa fa-align-justify"></i>
            <strong>Agendar cita</strong>
            <div class="card-header-actions">
              <a
                href="https://bootstrap-vue.js.org/docs/components/breadcrumb"
                class="card-header-action"
                rel="noreferrer noopener"
                target="_blank"
              >
                <!--small class="text-muted">docs</small-->
              </a>
            </div>
          </div>
          <!--b-breadcrumb :items="items"/-->
          <b-form-group label="Sedes" label-for="basicSelectSm" :label-cols="3">
            <b-form-select
              id="basicSelectSm"
              size="sm"
              :plain="true"
              :options="sedes"
              v-model="sede"
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Prestaciones" label-for="basicSelectSm" :label-cols="3">
            <b-form-select
              id="basicSelectSm"
              size="sm"
              :plain="true"
              :options="prestaciones"
              v-model="prestacion"
            ></b-form-select>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Callout } from "@coreui/vue";
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  data: function() {
    return {
      sede: null,
      prestacion: null
    };
  },
  computed: {
    sedes() {
      return [
        ...new Set(
          this.$store.getters["sede/sedes"].map(sede => {
            return { value: sede.id, text: sede.nombre };
          })
        )
      ];
    },
    prestaciones() {
      let prestacion = this.$store.getters["sede/sedes"].filter(
        sede => sede.id == this.sede
      )[0];

      return prestacion
        ? [
            ...new Set(
              prestacion.prestacion.map(prestacion => {
                return { value: prestacion.id, text: prestacion.nombre };
              })
            )
          ]
        : [];
    }
  },
  methods: {
    getPrestacion() {
      this.$store
        .dispatch("prestacion/index")
        .then(response => {})
        .catch(() => {});
    },
    getSede() {
      this.$store
        .dispatch("sede/index")
        .then(response => {})
        .catch(() => {});
    }
  },
  mounted() {
    this.getSede();
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
