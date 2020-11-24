<template>
  <div class="table-container">
    <Dialog
      modal
      dismissableMask
      class="text-center paste-ingredients-dialog"
      header="Paste ingredients"
      v-model:visible="modalVisible"
    >
      <textarea v-model="modalValue" class="dialog-textarea">
 Paste ingredients here... </textarea
      >
      <Button @click="handlePaste" :disabled="!modalValue" class="p-mt-3">
        Import
      </Button>
    </Dialog>
    <table>
      <thead>
        <tr>
          <th>Godzina</th>
          <th>Posiłek i/lub napój</th>
          <th>Z jakich produktów składał się posiłek?</th>
          <th>Miary domowe/gramaturowe</th>
          <th>Miejsce posiłku</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in value" :key="index">
          <td>
            <input
              type="time"
              class="food-time"
              :value="item.hour"
              @blur="handleChange(index, 'hour', $event)"
            />
          </td>
          <td>
            <Textarea
              :value="item.foodOrDrink"
              @update="handleChange(index, 'foodOrDrink', $event)"
            >
            </Textarea>
          </td>
          <td>
            <div class="p-d-flex p-align-center">
              <Textarea
                class="flex-grow-1"
                :value="item.products"
                @update="handleChange(index, 'products', $event)"
              ></Textarea>
              <div class="p-d-flex p-flex-column p-ml-2 ignore-export">
                <Button
                  @click="toggleModal(index)"
                  icon="pi pi-copy"
                  class="p-button-secondary"
                />
              </div>
            </div>
          </td>
          <td>
            <Textarea
              :value="item.units"
              @update="handleChange(index, 'units', $event)"
            ></Textarea>
          </td>
          <td>
            <Textarea
              :value="item.place"
              @update="handleChange(index, 'place', $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { FoodEntry } from "@/shared/features/journal/types";
import { SetupContext, ref } from "vue";
import Textarea from "@/render/ui/atoms/Textarea.vue";

interface FoodEntriesTableProps {
  value: FoodEntry[];
}

export default {
  components: { Textarea },
  props: {
    value: Array,
  },
  emits: ["update"],
  setup(props: FoodEntriesTableProps, { emit }: SetupContext) {
    const modalVisible = ref(false);
    const modalVisibleIndex = ref(0);

    const modalValue = ref("");

    const toggleModal = (index: number) => {
      modalVisible.value = !modalVisible.value;
      modalVisibleIndex.value = index;
    };

    const handleChange = (row: number, key: string, event: InputEvent) => {
      const target = event.target as HTMLInputElement;

      emit("update", row, key, target.value);
    };

    const clearProductsUnits = (index: number) => {
      emit("update", index, "products", "");
      emit("update", index, "units", "");
    };

    const handlePaste = () => {
      if (!modalValue.value) {
        return;
      }

      let { products = "", units = "" } = props.value[modalVisibleIndex.value];

      const mappedValues = modalValue.value
        .trim()
        .split("\n")
        .reduce(
          (acc, val) => {
            const regex = /^(\D*)(.*)$/gm;
            const match = regex.exec(val)?.filter((matchValue) => matchValue);

            if (match) {
              const [, products, units] = match;

              if (products) {
                acc.products.push(`- ${products.replace(/-/g, "")}`);
                acc.units.push(`- ${units ?? "0"}`);
              }
            }

            return acc;
          },
          {
            products: [] as string[],
            units: [] as string[],
          }
        );

      products = mappedValues.products.join("\n");
      units = mappedValues.units.join("\n");

      emit("update", modalVisibleIndex.value, "products", products);
      emit("update", modalVisibleIndex.value, "units", units);

      modalValue.value = "";
      modalVisible.value = false;
    };

    return {
      handleChange,
      modalVisible,
      toggleModal,
      modalValue,
      modalVisibleIndex,
      handlePaste,
      clearProductsUnits,
    };
  },
};
</script>

<style lang="scss">
.editable {
  width: 100%;
  min-height: 40px;
  height: auto;
}

table {
  margin-top: 60px;
}

th {
  font-weight: normal;
  text-transform: uppercase;
  padding: 0 30px 20px;
  letter-spacing: 5px;
  font-size: 13px;
}

td:not(:first-child) {
  border-left: 5px solid #4f4c4c;
  padding-left: 15px;
}

.dialog-textarea {
  min-height: 100px;
  max-height: 400px;
  background: white;
}

.paste-ingredients-dialog {
  min-width: 500px;
}

.textarea-component {
  min-height: 100px !important;
}
</style>
