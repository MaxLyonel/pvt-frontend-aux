<template>
    <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="listUser"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import SectionBreadCrumb from '@/components/common/SectionBreadCrumb.vue';
export default {
  name: "MainUsers",
  components: { SectionBreadCrumb },
  props: {},
  data: () => ({
    listUser: [],
    headers: [
      {
        text: "Nombre",
        class: ["normal", "white--text"],
        align: "left",
        value: "first_name",
        width: "15%",
        sortable: true
      },
      {
        text: "Unidad",
        class: ["normal", "white--text"],
        align: "left",
        value: "last_name",
        width: "15%",
        sortable: true
      },
      {
        text: "Cargo",
        class: ["normal", "white--text"],
        align: "left",
        value: "position",
        width: "45%",
        sortable: true
      },
      {
        text: "Usuario",
        class: ["normal", "white--text"],
        align: "left",
        value: "active",
        width: "5%",
        sortable: true
      },
      {
        text: "Estado",
        class: ["normal", "white--text"],
        align: "left",
        value: "active",
        width: "5%",
        sortable: true
      },
      {
        text: "Acción",
        class: ["normal", "white--text"],
        align: "left",
        width: "10%",
        sortable: true
      },
    ],
  }),
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        let res = await this.$axios.get('api/admin/user')
        this.listUser = res.payload.users.data
        console.log(this.listUser)

      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
