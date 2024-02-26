import { defineStore } from "pinia";
import { ref } from 'vue';

const useClocksStore = defineStore("clocksStore", () => {

    const isShowPurchaseWindow = ref(true);

    function closePurchaseWindow() {
        isShowPurchaseWindow.value = false;
    }
    
    function openPurchaseWindow() {
        isShowPurchaseWindow.value = true;
    }

    return {
        // STATE
        isShowPurchaseWindow,

        // ACTIONS
        closePurchaseWindow,
        openPurchaseWindow,
    }
});


export default useClocksStore;