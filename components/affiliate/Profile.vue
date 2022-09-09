 <template>
  <v-container fluid>
    <v-form>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <v-toolbar-title>DATOS PERSONALES</v-toolbar-title>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.first_name"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Primer Nombre"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.second_name"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Segundo Nombre"
                  >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.last_name"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Apellido Paterno"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.mothers_last_name"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Apellido Materno"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.surname_husband"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Apellido de Casada"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  dense
                  item-text="name"
                  item-value="value"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Género"
                  v-model="affiliate.gender"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.identity_card"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Cédula de Identidad"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  dense
                  item-text="name"
                  item-value="id"
                  label="Ciudad de Expedición"
                  :disabled="!editable"
                  :outlined="editable"
                  v-model="affiliate.city_identity_card_id"
                  >
                </v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  v-model="affiliate.registration"
                  :disabled="!editable"
                  :outlined="editable"
                  label="Matrícula"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5" >
                <v-text-field
                  dense
                  v-model="affiliate.due_date"
                  label="Fecha Vencimiento C.I"
                  hint="Día/Mes/Año"
                  class="purple-input"
                  type="date"
                  :clearable="editable"
                  :readonly="!editable"
                  :outlined="editable "
                  :disabled="!editable "
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-checkbox
                  v-model="affiliate.is_duedate_undefined"
                  :readonly="!editable"
                  :outlined="editable"
                  :disabled="!editable"
                  :label="`Indefinido`"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :error-messages="errors"
                  dense
                  :loading="loading"
                  :items="civil_statuses"
                  item-text="name"
                  item-value="value"
                  label="Estado Civil"
                  v-model="affiliate.civil_status"
                  :readonly="!editable"
                  :outlined="editable "
                  :disabled="!editable "
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  dense
                  v-model="affiliate.birth_date"
                  label="Fecha Nacimiento"
                  hint="Día/Mes/Año"
                  class="purple-input"
                  type="date"
                  :readonly="!editable "
                  :outlined="editable "
                  :disabled="!editable"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :error-messages="errors"
                  dense
                  :loading="loading"
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  label="Ciudad de Nacimiento"
                  v-model="affiliate.city_birth_id"
                  :readonly="!editable "
                  :outlined="editable "
                  :disabled="!editable "
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="6" class="v-card-profile">
          <v-row justify="center">
            <v-col cols="12">
              <v-toolbar-title>INFORMACIÓN POLICIAL</v-toolbar-title>
            </v-col>
            <v-col cols="12" md="6" v-if="!visible">
              <span class="red--text" v-show="(affiliate.death_certificate_number != null && affiliate.death_certificate_number.trim() != '') ||
                  (affiliate.date_death != null && affiliate.date_death.trim() != '') ||
                  (affiliate.reason_death != null && affiliate.reason_death.trim() != '')">
                ** Se tiene registrado datos de fallecimiento del afiliado,
                cambie el estado del afiliado a Fallecido.</span>
            </v-col>
            <v-col cols="12" md="6" v-if="visible">
              <v-text-field
                dense
                v-model="affiliate.date_death"
                label="Fecha Fallecimiento"
                hint="Día/Mes/Año"
                class="purple-input"
                type="date"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="visible">
              <v-text-field
                dense
                v-model="affiliate.death_certificate_number"
                label="N° de Certificado de Defunción"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="visible">
              <v-text-field
                dense
                v-model="affiliate.reason_death"
                label="Causa Fallecimiento"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                dense
                v-model="affiliate.date_entry"
                label="Fecha Ingreso a la Institución Policial"
                hint="Día/Mes/Año"
                class="purple-input"
                type="date"
                :clearable="editable"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                dense
                :error-messages="errors"
                :loading="loading"
                :items="degree"
                item-text="name"
                item-value="id"
                label="Grado"
                name="Grado"
                v-model="affiliate.degree_id"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                dense
                :error-messages="errors"
                :loading="loading"
                :items="category"
                item-text="name"
                item-value="id"
                label="Categoria"
                name="categoria"
                v-model="affiliate.category_id"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :error-messages="errors"
                dense
                :loading="loading"
                :items="unit"
                item-text="name"
                item-value="id"
                label="Unidad"
                v-model="affiliate.unit_id"
                persistent-hint
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                :error-messages="errors"
                dense
                v-model="affiliate.unit_police_description"
                label="Descripcion de Unidad"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                dense
                :error-messages="errors"
                :loading="loading"
                :items="pension_entity"
                item-text="name"
                item-value="id"
                label="Ente Gestor"
                name="Grado"
                v-model="affiliate.pension_entity_id"
                :readonly="!editable "
                :outlined="editable "
                :disabled="!editable "
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                dense
                v-model="affiliate.date_derelict"
                :disabled="!editable "
                label="Fecha Desvinculacion"
                hint="Día/Mes/Año"
                class="purple-input"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: "affiliate-profile",
  props: {
    affiliate: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
