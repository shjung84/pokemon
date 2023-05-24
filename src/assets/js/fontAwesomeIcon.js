import Vue from "vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faSpinner, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faLink, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faSpinner, faMagnifyingGlass);
library.add(faLink, faRedo, faUndo);
library.add(faTrashAlt);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
