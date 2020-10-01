<template>
  <div class="journal-container">
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <JournalEntry
        @update="handleUpdate"
        :value="journal.entries[activeIndex]"
      />
      <div
        class="actions ignore-export"
        :class="{ noPagination: !showPagination }"
      >
        <button
          @click="handlePagination('prev')"
          v-if="showPagination"
          :disabled="activeIndex === 0"
        >
          Prev
        </button>
        <div class="buttons">
          <ExportJournal :active-index="activeIndex" :entries="journal" />
          <button @click="addEntry">
            Add new entry
          </button>
        </div>
        <button
          @click="handlePagination('next')"
          v-if="showPagination"
          :disabled="activeIndex >= journal.entries.length - 1"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useJournal } from "@/render/app/journal/useJournal";
import JournalEntry from "@/render/app/journal/JournalEntry.vue";
import { JournalEntry as JournalEntryType } from "@/shared/features/journal/types";
import ExportJournal from "@/render/app/journal/ExportJournal.vue";
import { computed } from "vue";

export default {
  components: { ExportJournal, JournalEntry },
  setup() {
    const { journal, loading, activeIndex, addEntry } = useJournal();

    const showPagination = computed(() => journal.entries.length > 1);

    const handleUpdate = <Key extends keyof JournalEntryType>(
      key: Key,
      value: JournalEntryType[Key]
    ) => {
      journal.entries[activeIndex.value][key] = value;
    };

    const handlePagination = (action: "prev" | "next") => {
      if (action === "prev") {
        activeIndex.value = activeIndex.value - 1;

        return;
      }

      activeIndex.value = activeIndex.value + 1;
    };

    return {
      journal,
      handleUpdate,
      loading,
      activeIndex,
      addEntry,
      handlePagination,
      showPagination
    };
  }
};
</script>

<style scoped lang="scss">
.journal-container {
  overflow: auto;
  height: 100%;
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
  justify-content: space-between;
}

.actions.noPagination {
  justify-content: center;
}

.buttons {
  justify-content: center;
}
</style>
