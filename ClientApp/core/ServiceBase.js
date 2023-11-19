import Result from "./Result";
import Axios, { AxiosRequestConfig } from "axios";
import { transformUrl } from "domain-wait";
import queryString from "query-string";
import { isNode, showErrors, getNodeProcess, showInfo, showQueryLoader, hideQueryLoader } from "@Utils";
import SessionManager from "./session";
// import { showInfo } from "../utils";

/**
 * Represents base class of the isomorphic service.
 */
export class ServiceBase {

    /**
     * Make request with JSON data.
     * @param opts
     */
    async requestJson(opts) {

    showQueryLoader();

    var axiosResult = null;
    var result = null;

    opts.url = transformUrl(opts.url); // Allow requests also for the Node.

    var processQuery = (url, data) => {
      if (data) {
        return `${url}?${queryString.stringify(data)}`;
      }
      return url;
    };

    let axiosRequestConfig;

    //if (isNode()) {
    const token = SessionManager.getServiceUser();

    // Make SSR requests 'authorized' from the NodeServices to the web server.
    axiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //}

    //If specify, resulted in using api from this domain. If not, use localhost instead
    const baseURL = {
      //baseURL: 'https://zahfizafry.ml'
    };

    axiosRequestConfig = {
      ...axiosRequestConfig,
      ...baseURL,
    };

    try {
      switch (opts.method) {
        case "GET":
          axiosResult = await Axios.get(
            processQuery(opts.url, opts.data),
            axiosRequestConfig
          );
          break;
        case "POST":
          axiosResult = await Axios.post(
            opts.url,
            opts.data,
            axiosRequestConfig
          );
          break;
        case "PUT":
          axiosResult = await Axios.put(
            opts.url,
            opts.data,
            axiosRequestConfig
          );
          break;
        case "PATCH":
          axiosResult = await Axios.patch(
            opts.url,
            opts.data,
            axiosRequestConfig
          );
          break;
        case "DELETE":
          axiosResult = await Axios.delete(
            processQuery(opts.url, opts.data),
            axiosRequestConfig
          );
          break;
      }

      if (axiosResult.status == 401) {
        showErrors("Timeout Session");
        return;
      }

      result = new Result(
        axiosResult.data.value,
        ...(axiosResult.data.errors || "")
      );
    } catch (error) {
      result = new Result(null, error.message);
    }

    if (result.hasErrors) {
        showErrors(...result.errors);
    }
    else{
        //showInfo(result.value);
    }

    hideQueryLoader();

    return result;
  }

  /**
   * Allows you to send files to the server.
   * @param opts
   */
  async sendFormData(opts) {
    let axiosResult = null;
    let result = null;

    const token = SessionManager.getServiceUser();

    opts.url = transformUrl(opts.url); // Allow requests also for Node.

    var axiosOpts = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    //If specify, resulted in using api from this domain. If not, use localhost instead
    const baseURL = {
      //baseURL: 'https://zahfizafry.ml'
    };

    axiosOpts = {
      ...axiosOpts,
      ...baseURL,
    };

    try {
      switch (opts.method) {
        case "POST":
          axiosResult = await Axios.post(opts.url, opts.data, axiosOpts);
          break;
        case "PUT":
          axiosResult = await Axios.put(opts.url, opts.data, axiosOpts);
          break;
        case "PATCH":
          axiosResult = await Axios.patch(opts.url, opts.data, axiosOpts);
          break;
      }
      result = new Result(axiosResult.data.value, ...axiosResult.data.errors);
    } catch (error) {
      result = new Result(null, error.message);
    }

    if (result.hasErrors) {
      showErrors(...result.errors);
    }

    return result;
  }
}
