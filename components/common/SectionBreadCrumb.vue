<template>

    <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <v-row>
            <v-col cols="12" class="pa-0">
              {{ breadCrumbs }}
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-icon>mdi-arrow-right-bold-box</v-icon>
              {{ currentRoute }}
            </v-col>
          </v-row>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import menuItems from '@/menu.json'
import { mapGetters } from "vuex";
export default {
  name: "SectionBreadCrumb",
  components: {},
  props: {},
  data() {
    return {
      menuItems: menuItems,
      rolesPermissionsItems: [],
      breadCrumbs: '',
      currentRoute: '',
    };
  },
  async created() {
    this.getBreadCrumbs();
    console.log(this.$route.name)
  },
  computed: {
   // ...mapGetters(["rolePermissionSelected"]),
  },
  methods: {
    getBreadCrumbs() {
      let routeName = this.$route.name
      for(let menu of this.menuItems) {
        if(menu.group) {
          for(let submenu of menu.group) {
            if(submenu.href == routeName) {
              this.breadCrumbs = menu.title + ' / ' + submenu.title
              break
            }
          }
        } else {
          if(menu.href == routeName) {
            this.breadCrumbs = menu.title
            break
          }
        }
      }
      for(let menu of this.menuItems) {
        if(menu.group) {
          for(let submenu of menu.group) {
            if(submenu.href == routeName) {
              this.currentRoute = submenu.title
              break
            }
          }
        } else {
          if(menu.href == routeName) {
            this.currentRoute = menu.title
            break
          }
        }
      }
    }
  },
};
</script>
