<template>
    <v-dialog v-model="clockDialog" class="pa-0" fullscreen>
        <v-card height="100vh">
            <v-card class="d-flex w-100 h-100 align-center justify-center" color="black">
                <video autoplay muted id="videoId" :key="firtsLink" v-playback-rate="rate" style="height: 100%">
                    <source :src="firtsLink" type="video/mp4" />
                </video>
                <video autoplay muted id="videoId" :key="secondLink" style="height: 100%">
                    <source :src="secondLink" type="video/mp4" />
                </video>
                <video autoplay muted id="videoId" :key="thirdLink" style="height: 100%; margin-left: -2px">
                    <source :src="thirdLink" type="video/mp4" />
                </video>
                <video autoplay muted id="videoId" :key="fourLink" style="height: 100vh">
                    <source :src="fourLink" type="video/mp4" />
                </video>
            </v-card>
        </v-card>
    </v-dialog>
</template>

<script setup>

</script>

<style setup></style>