<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>
            Godzina
          </th>
          <th>
            Posiłek i/lub napój
          </th>
          <th>
            Z jakich produktów składał się posiłek?
          </th>
          <th>
            Miary domowe/gramaturowe
          </th>
          <th>
            Miejsce posiłku
          </th>
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
            <Textarea
              :value="item.products"
              @update="handleChange(index, 'products', $event)"
            ></Textarea>
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
            ></Textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { FoodEntry } from "@/shared/features/journal/types";
import { SetupContext } from "vue";
import Textarea from "@/render/ui/atoms/Textarea.vue";

interface FoodEntriesTableProps {
  value: FoodEntry[];
}

export default {
  components: { Textarea },
  props: {
    value: Array
  },
  emits: ["update"],
  setup(props: FoodEntriesTableProps, { emit }: SetupContext) {
    const handleChange = (row: number, key: string, event: InputEvent) => {
      const target = event.target as HTMLInputElement;

      emit("update", row, key, target.value);
    };

    return {
      handleChange
    };
  }
};
</script>

<style scoped lang="scss">
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
</style>
