import inputComp from "./inputComp.vue";
import emailInputComp from "./emailInputComp.vue";
import passwordInputComp from "./passwordInputComp.vue";
import offerFormComp from "./offerFormComp.vue";
import errorMessageComp from './errorMessageComp.vue';

inputComp.compName = "inputComp";
emailInputComp.compName = "emailInputComp";
passwordInputComp.compName = "passwordInputComp";
offerFormComp.compName = "offerFormComp";
errorMessageComp.compName = "errorMessageComp";

export default [
    inputComp, 
    emailInputComp, 
    passwordInputComp, 
    offerFormComp,
    errorMessageComp,
];
