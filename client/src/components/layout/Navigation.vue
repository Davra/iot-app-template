<template>
  <v-navigation-drawer
    :mini-variant="shortView"
    permanent
    app
    width="300"
    :class="['navigation', { 'short-view': shortView }]"
    mini-variant-width="70"
    style="background-color: var(--v-primary-base)"
  >
    <div class="navigation-title">
      <v-app-bar-nav-icon
        class="navigation-icon mr-4"
        @click="shortView = !shortView"
      ></v-app-bar-nav-icon>
      <template v-if="!shortView">
        <div class="navigation-logo">
          <img
            src="@/assets/davra-logo.png"
            height="30px"
            class="mt-2"
          />
        </div>
      </template>
    </div>
    <v-list
      nav
      class="pl-0 pr-0"
    >
      <v-list-item-group v-if="menuItems">
        <template v-for="(menuItem, i) in menuItems">
          <v-list-item
            color="menuItemColor"
            :key="`${i}`"
            class="pl-4 pr-4 rounded-0 menu-item mt-0 mb-0 pt-2 pb-2 list-item"
            active-class="active"
            :disabled="menuItem.disabled"
            :to="menuItem.linkUrl"
          >
            <v-list-item-icon class="list-item-icon">
              <v-icon color="white">{{ menuItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              class="list-item-title txt-body-1"
              v-show="!shortView"
              >{{ menuItem.title }}</v-list-item-title
            >
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div
        class="pa-2"
        v-show="!shortView"
      >
        <v-btn
          block
          class="black--text"
          color="white"
          @click="logout()"
        >
          Logout
        </v-btn>
      </div>
      <div
        class="pa-2"
        v-show="!shortView"
      >
        <a
          href="https://help.davra.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-btn
            block
            color="primary"
          >
            Help
          </v-btn>
        </a>
      </div>
      <div
        class="pa-2"
        v-show="shortView"
      >
        <v-btn
          fab
          small
          class="logout-button mb-4"
          @click="logout()"
        >
          <v-icon class="icon"> mdi-logout </v-icon>
        </v-btn>
        <a
          href="https://help.davra.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-btn
            fab
            small
            class="help-button"
          >
            <v-icon class="icon"> mdi-help-circle </v-icon></v-btn
          ></a
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { getImageUrl } from "@/services/utils.service";
export default {
  data: () => ({
    shortView: false,
    menuItems: [
      {
        title: "Devices",
        name: "Devices",
        icon: "mdi-white-balance-iridescent",
        disabled: false,
        linkUrl: "/devices",
      },
      {
        title: "Rules Engine",
        name: "Rules Engine",
        icon: "mdi-bell",
        disabled: false,
        linkUrl: "/rules-engine",
      },
      {
        title: "Graph Preview",
        name: "Graph Preview",
        icon: "mdi-chart-areaspline",
        disabled: false,
        linkUrl: "/random",
      },
      {
        title: "Map",
        name: "Map",
        icon: "mdi-map",
        disabled: false,
        linkUrl: "/map",
      },
    ],
  }),
  computed: {
    routePath: function () {
      return this.$router.currentRoute.path;
    },
  },
  methods: {
    getImageUrl,
    logout() {
      window.location.href = "/logout";
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 5px 10px 15px;
  background-color: var(--v-primary-base);

  .navigation-title {
    flex-shrink: 0;
    height: 46px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 20px;

    .navigation-logo {
      filter: brightness(0) invert(1);
      width: 176px;
      height: 44px;
    }

    .navigation-caption {
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.11px;
      padding: 8px;
      color: white;
    }

    .navigation-icon {
      color: white;
      .v-icon {
        font-size: 35px;
      }
    }
  }
  .list-item {
    &.active {
      .list-item-icon {
        filter: brightness(0) invert(1);
      }

      .list-item-content {
        color: grey !important;
      }
    }

    .list-item-content {
      font-size: 14px;
      line-height: 16px;
      color: white !important;
    }
    .list-item-title {
      color: white !important;
    }
  }

  &.short-view {
    .navigation-title {
      padding-left: 0;
    }

    .v-list--nav {
      padding-left: 0;
      padding-right: 0;
    }

    .list-item {
      padding: 0;

      .list-item-icon {
        margin: auto;
      }
    }
  }

  .list-item-group {
    color: white !important;
  }
  .list-item-group-content {
    color: white !important;
  }
}
</style>
