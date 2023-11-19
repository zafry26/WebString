import * as loginStore from "@Store/loginStore";
import * as personStore from "@Store/personStore";
import * as webcastStore from "@Store/webcastStore";
import * as emailStore from "@Store/emailStore";
import * as webshopService from "@Store/webShopStore";

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    login: loginStore.reducer,
    person: personStore.reducer,
    webcast: webcastStore.reducer,
    sendEmail:emailStore.reducer,
    webshop:webshopService.reducer
};
