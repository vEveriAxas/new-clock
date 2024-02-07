<template>
   <v-layout>
      <AppBar />
      <SideBar />
      <v-main :scrollable="true" class="d-flex bg-background w-100" height="100%">
         <v-card class="pb-4 bg-background bh-none" color="background" height="100%" :scrollable="true">
            <v-card class="bg-background pl-4 pr-4" color="background" height="100%" elevation="0" style="
            box-shadow: 0px 4px 26px 1px #d2daea;
            overflow-y: auto;
            height: calc(100vh - 90px);
            padding: 10px;
          ">
               <router-view></router-view>
               <!-- <clocksList></clocksList> -->
               <!-- <clockModal></clockModal> -->
               <!-- <clockInput/> -->
               <!-- <clocksSelect/> -->
               <!-- <userProfileComp></userProfileComp> -->
               <!-- <usersListComp></usersListComp> -->
               <!-- <profileInfoComp /> -->
               <!-- <profileChangeComp /> -->
            </v-card>
         </v-card>
      </v-main>
   </v-layout>
</template>

<script setup>
import AppBar from "../components/AppBars/AppBar.vue";
import SideBar from "../components/SideBars/SideBar.vue";
// import clocksList from '@/components/clocks/clocksList';
// import clockModal from '@/components/clocks/clockModal';
// import clockInput from "@/components/clocks/clockInput.vue";
// import clocksSelect from '@/components/clocks/clocksSelect'
// import userProfileComp from '../components/users/userProfileComp';
// import usersListComp from '../components/users/usersListComp';
// import profileInfoComp from '../components/profile/profileInfo/profileInfoComp.vue';
// import profileChangeComp from '../components/profile/profileChange/profileChangeComp.vue';
</script>
