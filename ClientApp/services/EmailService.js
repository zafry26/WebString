import { ServiceBase } from "@Core/ServiceBase";

export default class EmailService extends ServiceBase {

    async sendEmail(model) {
        var result = await this.requestJson({
            url: "/api/Email",
            method: "POST",
            data: model
        });
        return result;
    }
}