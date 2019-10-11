<template>
  <div class="app">
    <div class="loader" v-if="$store.getters['loading']">
      <b-spinner variant="light" label="Text Centered" />
    </div>
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/dashboard">
        <img
          class="navbar-brand-full"
          src="/img/brand/logo.svg"
          width="89"
          height="25"
          alt="CoreUI Logo"
        />
        <img
          class="navbar-brand-minimized"
          src="/img/brand/sygnet.svg"
          width="30"
          height="30"
          alt="CoreUI Logo"
        />
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item :class="nav.class" v-for="(nav, key) in navbar" :key="key">
          <AppHeaderDropdown right no-caret v-if="'children' in nav">
            <template slot="header">
              <img :src="nav.image" :class="nav.class" v-if="nav.image" />
              <i :class="nav.icon" v-if="nav.icon"></i>
              <b-badge pill :variant="nav.badge.variant" v-if="nav.badge">{{ nav.badge.text }}</b-badge>
            </template>
            <template slot="dropdown">
              <div v-for="(dropdown, index) in nav.children" :key="index">
                <b-dropdown-header v-if="dropdown.title" tag="div" :class="dropdown.class">
                  <strong>{{ dropdown.name }}</strong>
                </b-dropdown-header>
                <b-dropdown-item @click="valFunction(dropdown.method)" v-else>
                  <i :class="dropdown.icon" />
                  {{ dropdown.name }}
                  <b-badge
                    v-if="dropdown.badge"
                    :variant="dropdown.badge.variant"
                  >{{ dropdown.badge.text }}</b-badge>
                </b-dropdown-item>
              </div>
            </template>
          </AppHeaderDropdown>
          <i :class="nav.icon" v-else></i>
          <b-badge pill :variant="nav.badge.variant" v-if="nav.badge">{{ nav.badge.text }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
      <AsideToggler class="d-lg-none" mobile />
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="sidebar"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside />
      </AppAside>
    </div>
    <TheFooter fixed>
      <!--footer-->
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import {
  HeaderDropdown as AppHeaderDropdown,
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";

export default {
  name: "DefaultContainer",
  components: {
    AppHeaderDropdown,
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    sidebar() {
      return this.$store.getters["navs/navs"].length
        ? [
            ...new Set(
              this.$store.getters["navs/navs"].find(
                el => el.descripcion === "sidebar"
              ).children
            )
          ]
        : [];
    },
    navbar() {
      return this.$store.getters["navs/navs"].length
        ? [
            ...new Set(
              this.$store.getters["navs/navs"].find(
                el => el.descripcion === "navbar"
              ).children
            )
          ]
        : [];
    }
  },
  methods: {
    valFunction(method) {
      if (method) {
        this[method]();
      }
    },
    logout() {
      this.$store
        .dispatch("login/logout")
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {});
    }
  },
  mounted() {
    //this.$store.dispatch("navs/index");
  }
};
</script>
<style lang="scss">
.app-header .nav-item .nav-link .dropdown-item span.badge {
  position: absolute;
  top: 71%;
  left: 83%;
}
</style>
