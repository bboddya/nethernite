<template>
  <div>
    <ais-configure :hits-per-page.camel="10" />

    <ais-state-results>
      <p
        slot-scope="{ state: { query }, results: { hits } }"
        v-show="!hits.length"
        val="packages"
      >
        No results found for the query: <q>{{ query }}</q>
      </p>
    </ais-state-results>

    <ais-state-results>
      <div slot-scope="{ results: { hits } }">
        <div
          class="offset-md-2 col-md-8 offset-sm-0 col-sm-12 card mt-3"
          v-for="item in hits"
          :key="item.objectID"
        >
          <div class="card-header">
            <!-- package -->
            <h5
              v-if="item.name"
              class="card-title"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
              @click="
                itemInfo(item), lastPackageVersion(item.name, item.version)
              "
            >
              {{ item.name }}
            </h5>

            <!-- package deprecated -->
            <span v-if="item.deprecated" class="badge bg-danger"
              >deprecated</span
            >
          </div>

          <div class="card-body">
            <div class="card-body__inner">
              <div class="card-body__author">
                <!-- author img -->
                <img
                  v-if="item.owner.avatar"
                  class="item__img"
                  :src="item.owner.avatar"
                />

                <!-- author link -->
                <a
                  v-if="item.owner.link"
                  class="item__link"
                  :href="item.owner.link"
                  target="blank"
                  >{{ item.owner.name }}</a
                >
              </div>

              <!-- version -->
              <span v-if="item.version" class="card-body__badge">
                <img
                  class="card-body__badge-icon"
                  src="@/assets/img/tag.svg"
                  alt="tag"
                />
                {{ item.version }}</span
              >

              <!-- license -->
              <span v-if="item.license" class="card-body__badge">
                <img
                  class="card-body__badge-icon"
                  src="@/assets/img/license.svg"
                  alt="tag"
                />
                {{ item.license }}</span
              >
            </div>

            <div v-if="item.description" class="card-text mt-3 mb-3">
              {{ item.description }}
            </div>

            <div v-if="item.keywords" class="keywords-list">
              <!-- keywords -->
              <span
                class="keywords-list__item"
                v-for="(item, idx) of item.keywords.slice(0, 15)"
                :key="idx"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ais-state-results>
  </div>
</template>

<script>
export default {
  name: "Content",

  data: () => ({
    package: "",
  }),

  methods: {
    // Запись информции выбранного пакета
    itemInfo(item) {
      this.$store.dispatch("addPackage", item);
    },

    lastPackageVersion(name, lastVersion) {
      console.log(lastVersion);
      console.log(name);

      const itemPackage = {
        name: name,
        version: lastVersion,
      };

      this.$store.dispatch("fetchVersions", itemPackage);
    },
  },
};
</script>

<style lang="scss">
</style>
