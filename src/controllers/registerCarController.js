import { apiClient } from "../config/api.config";

class RegisterCarControler {
  static registerCar(data) {
    console.log("@data....", data);
    return new Promise((resolve, reject) => {
      apiClient
        .post("/api/sale", data)
        .then((res) => {
          console.log(res?.data, "@register car res api");
          if (res?.data?.status === "success") {
            resolve(res?.data);
          } else {
            reject(res?.data);
          }
        })
        .catch((err) => {
          console.log("@register car error....", err.response.data);
          reject(err);
        });
    });
  }
}

export default RegisterCarControler;
