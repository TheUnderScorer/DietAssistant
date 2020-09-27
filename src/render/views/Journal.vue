<template>
  <div v-if="loading">
    Loading...
  </div>
  <JournalEntry
    v-if="!loading"
    @update="handleUpdate"
    :value="journal.entries[0]"
  />
</template>

<script lang="ts">
import { useJournal } from "@/render/app/journal/useJournal";
import JournalEntry from "@/render/app/journal/JournalEntry.vue";
import { JournalEntry as JournalEntryType } from "@/shared/features/journal/types";

export default {
  components: { JournalEntry },
  setup() {
    const { journal, loading } = useJournal();

    const handleUpdate = <Key extends keyof JournalEntryType>(
      key: Key,
      value: JournalEntryType[Key]
    ) => {
      journal.entries[0][key] = value;
    };

    return {
      journal,
      handleUpdate,
      loading
    };
  }
};
</script>

<style scoped lang="scss">
body {
  font-family: "Raleway", sans-serif;
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
</style>
