import { ServiceBase } from "@Core/ServiceBase";
import SessionManager from "@Core/session";

export default class WebcastService extends ServiceBase {
    
    async getHero(id) {
        var result = await this.requestJson({
            url: `api/webcast/hero${id !== undefined ? `/${id}` : ''}`,
            method: "GET"
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(result.value);
        }

        return result;
    }

    async addHero(model) {
        const {heroSummary, heroEducations, heroExperiences, heroServices, heroPortfolios, heroTechnicals, ...heroOnly} = model

        var result = await this.requestJson({
            url: "api/webcast/hero",
            method: "POST",
            data: heroOnly
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroSummary(model) {
        var result = await this.requestJson({
            url: "api/webcast/herosummary",
            method: "POST",
            data: model.heroSummary
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroEducation(model) {
        var result = await this.requestJson({
            url: "api/webcast/heroeducation",
            method: "POST",
            data: model.heroEducations
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroExperience(model) {
        var result = await this.requestJson({
            url: "api/webcast/heroexperience",
            method: "POST",
            data: model.heroExperiences
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroService(model) {
        var result = await this.requestJson({
            url: "api/webcast/heroservice",
            method: "POST",
            data: model.heroServices
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroPortfolio(model) {
        var result = await this.requestJson({
            url: "api/webcast/heroportfolio",
            method: "POST",
            data: model.heroPortfolios
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }

    async addHeroTechnical(model) {
        var result = await this.requestJson({
            url: "api/webcast/herotechnical",
            method: "POST",
            data: model.heroTechnicals
        });

        if (!result.hasErrors) {
            //SessionManager.setServiceUser(null);
        }

        return result;
    }
}