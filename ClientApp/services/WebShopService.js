import { ServiceBase } from "@Core/ServiceBase";
import SessionManager from "@Core/session";

export default class WebShopService extends ServiceBase {
    
    async getAdmCategories() {
        var result = await this.requestJson({
            url: "api/webshop/admStoreCategories",
            method: "GET"
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }   

    async getStore(id) {
        var result = await this.requestJson({
            url: `api/webshop/store${id !== undefined ? `/${id}` : ''}`,
            method: "GET"
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(result.value);
        }

        return result;
    }

    async addStoreSummary(model) {
        const {storeCategory, storePayment, ...storeSummaryOnly} = model

        var result = await this.requestJson({
            url: "api/webshop/storesummary",
            method: "POST",
            data: storeSummaryOnly
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addStoreCategory(model) {
        var result = await this.requestJson({
            url: "api/webshop/storecategory",
            method: "POST",
            data: model.storeCategories
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addStorePayment(model) {
        var result = await this.requestJson({
            url: "api/webshop/storepayment",
            method: "POST",
            data: model.storePayment
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }   
}