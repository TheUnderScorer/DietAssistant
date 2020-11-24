<template>
  <div class="journal-container">
    <div v-if="loading"><FullPageLoader /></div>
    <div v-if="isExporting">
      <FullPageLoader message="Exporting..." />
    </div>
    <div v-if="!loading">
      <JournalToolbar />
      <JournalEntry
        class="journal-entry"
        :class="{ 'is-exporting': isExporting }"
        @update="handleUpdate"
        :value="journal.entries[activeIndex]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useJournal } from "@/render/app/journal/useJournal/useJournal";
import JournalEntry from "@/render/app/journal/JournalEntry.vue";
import { JournalEntry as JournalEntryType } from "@/shared/features/journal/types";
import { useJournalExport } from "@/render/app/journal/useJournalExport";
import FullPageLoader from "@/render/ui/molecules/FullPageLoader.vue";
import JournalToolbar from "@/render/app/journal/JournalToolbar.vue";
import { reactive } from "vue";

export default {
  components: { JournalToolbar, FullPageLoader, JournalEntry },
  setup() {
    const { journal, loading, activeIndex, activeEntry } = useJournal();

    const { isExporting } = useJournalExport();

    const handleUpdate = <Key extends keyof JournalEntryType>(
      key: Key,
      value: JournalEntryType[Key]
    ) => {
      const newEntry = {
        ...activeEntry.value,
        [key]: value,
      };

      journal.entries[activeIndex.value] = reactive(newEntry);
    };

    return {
      journal,
      handleUpdate,
      loading,
      activeIndex,
      isExporting,
    };
  },
};
</script>

<style scoped lang="scss">
.journal-container {
  overflow: auto;
  height: 100%;
  position: relative;
}

.wrapper {
  padding-left: 20px;
  padding-right: 20px;
}

.main {
  min-height: 100vh;
  z-index: 2;
  position: relative;
  margin-top: 40px;
  padding-top: 80px;
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}

hr.separator {
  height: 5px;
  background-color: #4f4c4c;
  opacity: 1;
}

.title {
  width: 100%;
  text-align: center;
  font-family: "Playfair Display", serif;
  letter-spacing: 9px;
  margin-bottom: 20px;
}

.export-container {
  margin-top: 15px;
}

.actions,
.buttons {
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

.actions.noPagination {
  justify-content: center;
}

.buttons {
  justify-content: center;
}

.journal-entry {
  padding-bottom: 1.2rem;

  &:not(.is-exporting) {
    padding-top: 3rem;
  }
}
</style>
