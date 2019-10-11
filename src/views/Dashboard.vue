<template>
  <div class="animated fadeIn">
    <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Agendar cita</strong>
              <div class="card-header-actions">
                <a href="https://bootstrap-vue.js.org/docs/components/breadcrumb" class="card-header-action" rel="noreferrer noopener" target="_blank">
                  <!--small class="text-muted">docs</small-->
                </a>
              </div>
            </div>
            <!--b-breadcrumb :items="items"/-->
            <b-form-group
              label="Select small"
              label-for="basicSelectSm"
              :label-cols="3"
              >
              <b-form-select id="basicSelectSm"
                size="sm"
                :plain="true"
                :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                value="Please select">
              </b-form-select>
            </b-form-group>    
          </b-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { Callout } from '@coreui/vue'

export default {
  name: 'dashboard',  
  data: function () {
    return {
      
    }
  },
  computed: {
    ...mapGetters({        
        'prestacion': 'prestacion/prestacion'
      })
  },
  methods: {
    getPrestacion () {
      this.$store.dispatch('index', {endpoint: 'abono', params: {codigo: obligacion_id}})
            .then((response) => {
                if (response.datos.length > 0){
                    this.$store.dispatch('abonos/refresh_abonos', response.datos)
                } else {
                    this.$notify({
                        title: 'Advertencia!',
                        type: 'warning',
                        content: 'No se encontraron abonos con el código dado',
                    })
                }
            })
            .catch(() => {
                this.$notify({
                    title: 'Advertencia!',
                    type: 'danger',
                    content: 'Se ha presentado un error realizando su consulta',
                })
            })      
    }
  }
  mounted() {

  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
