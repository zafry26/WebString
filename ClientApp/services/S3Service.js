import { ServiceBase } from "@Core/ServiceBase";
import SessionManager from "@Core/session";

export default class S3Service extends ServiceBase {
    
    async getImage(id) {
        var result = await this.requestJson({
            url: `api/S3Bucket?path=${id}`,
            method: "GET"
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(result.value);
        }

        return result;
    }

    async uploadImage(model) {

        var result = await this.sendFormData({
            url: "api/S3Bucket",
            method: "POST",
            data: model
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }
}