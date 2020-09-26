<template>
  <div class="wrapper">
    <Flower position="top-right" />
    <main class="main">
      <Logo />
      <hr class="separator" />
      <h1 class="title">
        Dzienniczek żywieniowy
      </h1>
      <Box>
        <BoxList>
          <BoxListItem title="Imię nazwisko">
            Paulina Grzanek
          </BoxListItem>
          <BoxListItem title="Wiek">
            21
          </BoxListItem>
          <BoxListItem title="Cel wizyty">
            odchudzanie, dieta pcos
          </BoxListItem>
        </BoxList>
      </Box>
      <BoxSpaceText />
      <Box secondary>
        <BoxList>
          <BoxListItem withInput labelFor="weekDay" title="Dzień tygodnia">
            <input type="text" id="weekDay" />
          </BoxListItem>
          <BoxListItem withInput labelFor="date" title="Data">
            <input type="date" id="date" />
          </BoxListItem>
          <BoxListItem valueClassName="row">
            <BoxListItem
              wrapperComponent="div"
              class="col-sm-6"
              title="Pobudka"
              withInput
              labelFor="wakeTime"
            >
              <input type="time" id="wakeTime" />
            </BoxListItem>
            <BoxListItem
              wrapperComponent="div"
              class="col-sm-6"
              title="Sen"
              withInput
              labelFor="sleepTime"
            >
              <input type="time" id="sleepTime" />
            </BoxListItem>
          </BoxListItem>
          <BoxListItem
            title="Aktywność fizyczna w ciągu dnia"
            withInput
            labelFor="dayActivity"
          >
            <input type="text" id="dayActivity" />
          </BoxListItem>
        </BoxList>
      </Box>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Box from "@/render/ui/atoms/Box.vue";
import Flower from "@/render/ui/atoms/Flower.vue";
import Logo from "@/render/ui/atoms/Logo.vue";
import BoxList from "@/render/ui/atoms/BoxList/BoxList.vue";
import BoxListItem from "@/render/ui/atoms/BoxList/BoxListItem.vue";
import BoxSpaceText from "@/render/app/BoxSpaceText.vue";

@Options({
  components: {
    Box,
    Flower,
    Logo,
    BoxList,
    BoxListItem,
    BoxSpaceText
  }
})
export default class Journal extends Vue {}
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
