<template>
  <Toolbar
    v-if="!isExporting"
    class="actions ignore-export"
    :class="{ noPagination: !moreThanOneEntry }"
  >
    <template v-slot:left>
      <Button
        icon="pi pi-chevron-left"
        class="p-button-secondary"
        @click="handlePagination('prev')"
        v-if="moreThanOneEntry"
        :disabled="activeIndex === 0"
      />
      <Button
        icon="pi pi-chevron-right"
        class="p-button-secondary p-ml-2"
        @click="handlePagination('next')"
        v-if="moreThanOneEntry"
        :disabled="activeIndex >= journal.entries.length - 1"
      />
    </template>
    <template v-slot:right>
      <div class="buttons p-d-flex p-align-center">
        <ExportJournal :active-index="activeIndex" :entries="journal" />
        <Button
          v-if="moreThanOneEntry"
          @click="removeCurrentEntry"
          icon="pi pi-trash"
          class="p-button-danger p-ml-2"
        />
      </div>
    </template>
  </Toolbar>
</template>
<script lang="ts">
import ExportJournal from "@/render/app/journal/ExportJournal.vue";
import { useJournal } from "@/render/app/journal/useJournal/useJournal";
import { useJournalExport } from "@/render/app/journal/useJournalExport";
import { computed } from "vue";

export default {
  name: "JournalToolbar",
  components: { ExportJournal },
  setup() {
    const {
      journal,
      loading,
      activeIndex,
      removeEntries,
      removeCurrentEntry,
    } = useJournal();

    const { isExporting } = useJournalExport();

    const moreThanOneEntry = computed(() => journal.entries.length > 1);

    const handlePagination = (action: "prev" | "next") => {
      if (action === "prev") {
        activeIndex.value = activeIndex.value - 1;

        return;
      }

      activeIndex.value = activeIndex.value + 1;
    };

    return {
      journal,
      loading,
      activeIndex,
      handlePagination,
      moreThanOneEntry,
      removeEntries,
      removeCurrentEntry,
      isExporting,
    };
  },
};
</script>
<style scoped lang="scss">
.actions {
  display: flex;
}

.actions {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
