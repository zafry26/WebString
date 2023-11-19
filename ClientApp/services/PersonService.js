import { ServiceBase } from "@Core/ServiceBase";

export default class PersonService extends ServiceBase {
  async search(term = null) {
    if (term == null) {
      term = "";
    }
    var result = await this.requestJson({
      url: `/api/developer/Search?term=${term}`,
      method: "GET",
    });
    return result;
  }

  async update(model) {
    console.log(model);
    var result = await this.requestJson({
      url: `/api/developer/${model.id}`,
      method: "PATCH",
      data: model,
    });
    return result;
  }

  async delete(id) {
    var result = await this.requestJson({
      url: `/api/developer/${id}`,
      method: "DELETE",
    });
    return result;
  }

  async add(model) {
    var result = await this.requestJson({
      url: "/api/developer/Add",
      method: "POST",
      data: model,
    });
    return result;
  }
}
