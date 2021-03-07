<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ packageData.name }}
          </h5>

          <!-- package deprecated -->
          <span v-if="packageData.deprecated" class="ms-3 badge bg-danger"
            >deprecated</span
          >

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="card card_border-none mb-3">
            <div class="card-body__inner">
              <div class="card-body__author">
                <!-- author img -->
                <img
                  v-if="packageData.owner.avatar"
                  class="item__img"
                  :src="packageData.owner.avatar"
                />

                <!-- author link -->
                <a
                  v-if="packageData.owner.link"
                  class="item__link"
                  :href="packageData.owner.link"
                  target="blank"
                  >{{ packageData.owner.name }}</a
                >
              </div>

              <!-- version -->
              <span v-if="packageData.version" class="card-body__badge">
                <img
                  class="card-body__badge-icon"
                  src="@/assets/img/tag.svg"
                  alt="tag"
                />
                {{ packageData.version }}</span
              >

              <!-- license -->
              <span v-if="packageData.license" class="card-body__badge">
                <img
                  class="card-body__badge-icon"
                  src="@/assets/img/license.svg"
                  alt="tag"
                />
                {{ packageData.license }}</span
              >

              <div class="card-links">
                <div class=""></div>
                <!-- GitHub link -->
                <a
                  v-if="packageData.repository.url"
                  class="item__link card-links__item me-3"
                  :href="packageData.repository.url"
                  target="blank"
                >
                  <img
                    class="card-links__item-icon"
                    src="@/assets/img/github.svg"
                    alt="icon"
                /></a>

                <!-- Download link -->
                <a
                  class="item__link card-links__item"
                  :href="`https://registry.npmjs.org/${
                    packageData.name
                  }/-/${editName}-${
                    packageVersionValue == null
                      ? packageData.version
                      : packageVersionValue
                  }.tgz`"
                  rel="nofollow"
                  @click="editNamePackage(packageData.name)"
                >
                  <img
                    class="card-links__item-icon"
                    src="@/assets/img/downloading-file.svg"
                    alt="icon"
                /></a>
              </div>
            </div>

            <div v-if="packageData.description" class="card-text mt-3 mb-3">
              {{ packageData.description }}
            </div>

            <!-- Badge link -->
            <div class="card-badge">
              <div>
                Get a badge for your package:
                <img
                  :src="`https://data.jsdelivr.com/v1/package/npm/${packageData.name}/badge`"
                  alt=""
                />
              </div>

              <div class="card-badge__link mt-2">
                [![](https://data.jsdelivr.com/v1/package/npm/{{
                  packageData.name
                }}/badge)](https://www.jsdelivr.com/package/npm/{{
                  packageData.name
                }})
              </div>
            </div>

            <div v-if="packageData.keywords" class="keywords-list mt-3">
              <!-- keywords -->
              <span
                class="keywords-list__item"
                v-for="(item, idx) of packageData.keywords.slice(0, 15)"
                :key="idx"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div class="card card-body modal-body__versions-wrap">
            <div class="modal-body__versions-header mb-3">
              <div class="modal-body__file-default">
                <span v-if="versionData.default"
                  >Default file: {{ versionData.default }}</span
                >
                <span v-else
                  >Sadly, this package doesn't have a default file set.</span
                >
              </div>

              <div class="dropdown">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <template v-if="!packageVersionValue">
                    {{ packageData.version }}
                  </template>

                  <template else>
                    {{ packageVersionValue }}
                  </template>
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li
                    v-for="(value, index, idx) in packageData.versions"
                    :key="idx"
                    class="versions__item"
                  >
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="packageVersion(index)"
                      >{{ index }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="modal-body__versions-inner">
              <div
                v-for="(item, idx) of versionData.files"
                :key="idx"
                class="modal-body__versions"
              >
                <img
                  v-if="item.type == 'directory'"
                  class="card-links__item-icon"
                  src="@/assets/img/folder.svg"
                  alt="icon"
                />
                <img
                  v-else
                  class="card-links__item-icon"
                  src="@/assets/img/document.svg"
                  alt="icon"
                />{{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  data: () => ({
    packageVersionValue: null,
    packageVersionValueDefault: "",
    editName: "",
  }),

  methods: {
    // сохранение выбранной версии в state
    packageVersion(item) {
      this.packageVersionValue = item;

      const itemPackage = {
        name: this.packageData.name,
        version: item,
      };

      this.$store.dispatch("fetchVersions", itemPackage);
    },

    // редактирование нестандартных имен пакета
    editNamePackage(name) {
      this.editName = name.split("/")[1];
      console.log(this.editName);
    },
  },

  computed: {
    // получение данных выбранного пакета
    ...mapGetters(["packageData"]),

    // получение выбранной версии пакета
    ...mapGetters(["versionData"]),

    // async getBadge() {
    //   const res = await fetch(
    //     `https://data.jsdelivr.com/v1/package/npm/jquery/badge?style=rounded`
    //   );

    //   const badge = await res.json();
    //   console.log(badge);
    //   return badge;
    // },
  },
};
</script>

<style scoped lang="scss">
</style>