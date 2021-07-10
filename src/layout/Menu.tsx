import { computed, defineComponent, unref, watch } from 'vue';
import './index.less';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import logoWhite from '@/assets/image/logo_white.png';
import logoFujfu from '@/assets/image/logo_fujfu.png';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const { currentRoute } = useRouter();
    const sidebarState = computed(() => store.getters['app/sidebarState']);
    const permissionRoutes = computed(() => {
      return store.getters['permission/permissionRoutes'];
    });
    function selectMenu(key: any) {
      const router = unref(permissionRoutes);
      let name = '';
      function navTitle(path: string, routerARR: any) {
        for (let i = 0; i < routerARR.length; i += 1) {
          if (routerARR[i].path === path || routerARR[i].children) {
            if (routerARR[i].path === path) {
              name = routerARR[i].meta.title;
              break;
            }
            navTitle(path, routerARR[i].children);
          }
        }
        return name;
      }
      store.dispatch('tabs/addTab', {
        title: navTitle(key.path, router),
        path: key.path,
      });
    }
    watch(
      () => currentRoute.value,
      (val: object) => {
        selectMenu(val);
      },
      { immediate: true }
    );
    function renderMenuItem(menuList?: any, index = 1) {
      if (!menuList) return false;
      return menuList.map((menu: any, _index: number) => {
        if (!menu) return null;
        if (!menu.children || !menu.meta.showChildren) {
          return (
            <el-menu-item index={menu.path}>
              {{
                default: () => menu.meta.icon && <i class={menu.meta.icon} />,
                title: () => <span>{menu.meta.title}</span>,
              }}
            </el-menu-item>
          );
        }
        return (
          <el-submenu index={`${index}-${_index}`}>
            {{
              title: () => (
                <>
                  {menu.meta.icon && <i class={menu.meta.icon} />}
                  <span>{menu.meta.title}</span>
                </>
              ),
              default: () => renderMenuItem(menu.children, _index),
            }}
          </el-submenu>
        );
      });
    }
    function renderMenu() {
      return (
        <el-menu
          select={selectMenu}
          router
          collapse={!unref(sidebarState)}
          class="outer-menu"
          default-active={route.path}
        >
          <div class="logo">
            <img
              src={!unref(sidebarState) ? logoFujfu : logoWhite}
              width={!unref(sidebarState) ? '40' : '160'}
              alt="logo"
            />
          </div>
          {renderMenuItem(unref(permissionRoutes), 0)}
        </el-menu>
      );
    }
    return () => renderMenu();
  },
});
