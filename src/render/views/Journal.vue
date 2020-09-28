<template>
  <div :ref="setContainerRef" class="journal-container">
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <JournalEntry
        @update="handleUpdate"
        :value="journal.entries[activeIndex]"
      />
      <div class="export-container">
        <ExportJournal
          :container-ref="containerRef"
          :active-index="activeIndex"
          :entries="journal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useJournal } from "@/render/app/journal/useJournal";
import JournalEntry from "@/render/app/journal/JournalEntry.vue";
import { JournalEntry as JournalEntryType } from "@/shared/features/journal/types";
import ExportJournal from "@/render/app/journal/ExportJournal.vue";
import { useRef } from "@/render/hooks/useRef";

export default {
  components: { ExportJournal, JournalEntry },
  setup() {
    const [containerRef, setContainerRef] = useRef<HTMLElement>();

    const { journal, loading, activeIndex } = useJournal();

    const handleUpdate = <Key extends keyof JournalEntryType>(
      key: Key,
      value: JournalEntryType[Key]
    ) => {
      journal.entries[0][key] = value;
    };

    return {
      journal,
      handleUpdate,
      loading,
      activeIndex,
      containerRef,
      setContainerRef
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
</style>
