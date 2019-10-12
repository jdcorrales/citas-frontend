<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12">
        <b-card header-tag="header" footer-tag="footer">
          <div slot="header">
            <!--i class="fa fa-align-justify"></i-->
            <strong>Agendar cita</strong>
          </div>
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
    <b-row>
      <b-col cols="12">
        <b-card header-tag="header" footer-tag="footer">
          <div slot="header">
            <!--i class="fa fa-align-justify"></i-->
            <strong>Agenda</strong>
          </div>
          <div class="row">
            <div class="col-5">
              <div class="fechas items">
                <div
                  class="badge badge-primary text-wrap"
                  v-for="dia in agenda"
                  :key="dia.id"
                  @click="getTurnos(dia.turnos)"
                >{{ dia.fecha }}</div>
              </div>
            </div>
            <div class="col-7">
              <div class="agenda items">
                <button
                  class="btn btn-info"
                  v-for="turno in turnos"
                  :key="turno"
                >{{ turno | moment("h:mm") }}</button>
              </div>
            </div>
          </div>
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
      prestacion: null,
      turnos: []
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
      this.turnos = [];
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
    },
    agenda() {
      let prestacion = this.$store.getters["sede/sedes"].filter(
        sede => sede.id == this.sede
      )[0];

      let agenda =
        prestacion && this.prestacion
          ? prestacion.prestacion.filter(
              prestacion => prestacion.id == this.prestacion
            )[0]
          : null;

      return agenda
        ? [
            ...new Set(
              agenda.disponibilidad.map(dias => {
                return {
                  id: dias.id,
                  fecha: dias.dia,
                  hora_inicial: dias.hora_inicial,
                  hora_final: dias.hora_final,
                  turnos: JSON.parse(dias.intervalos)
                };
              })
            )
          ]
        : [];
    }
  },
  methods: {
    getSede() {
      this.$store
        .dispatch("sede/index")
        .then(response => {})
        .catch(() => {});
    },
    getTurnos(turnos) {
      this.turnos = turnos;
    }
  },
  mounted() {
    this.getSede();
  }
};
</script>

<style lang="scss">
.fechas.items {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
  flex-flow: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 450px;

  .badge {
    width: 23%;
    margin: 0.5px;
  }
}

.agenda.items {
  display: -webkit-box;
  display: -ms-flexbox;
  -ms-flex-flow: wrap;
  flex-flow: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  .btn {
    color: white;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    width: 120px;
    height: 3rem;
    margin: 2px;
  }

  .large-button {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }
}
</style>
