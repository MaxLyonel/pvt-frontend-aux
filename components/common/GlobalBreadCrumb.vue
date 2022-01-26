<template>
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
</template>

<script>
import menuItems from '@/menu.json'
export default {
  name: "GlobalBreadCrumb",
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

  methods: {
    getBreadCrumbs() {
      let routeName = this.$route.name
      let mask='/'+routeName.replace('-','/')

      for(let menu of this.menuItems) {
        if(menu.group) {
          for(let submenu of menu.group) {
            if(submenu.href == mask) {
              this.breadCrumbs = menu.title + ' / ' + submenu.title
              break
            }
          }
        } else {
          if(menu.href == mask) {
            this.breadCrumbs = menu.title
            break
          }
        }
      }
      for(let menu of this.menuItems) {
        if(menu.group) {
          for(let submenu of menu.group) {
            if(submenu.href == mask) {
              this.currentRoute = submenu.title
              break
            }
          }
        } else {
          if(menu.href == mask) {
            this.currentRoute = menu.title
            break
          }
        }
      }
    }
  },
};
</script>
