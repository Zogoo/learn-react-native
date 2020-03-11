import axios from "axios";

const API_URL = 'http://localhost:3000';

axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-type": "application/x-www-form-urlencoded",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": API_URL
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // handle error
    switch (error.response.status) {
      case 500:
        window.location = "/500"; //we will redirect user into 503 page
        break;
      default:
        break;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

const Client = {
  HTTP_POST: "post",
  HTTP_GET: "get",
  HTTP_PUT: "put",
  HTTP_PATCH: "patch",
  HTTP_DELETE: "delete",

  axiosClient: axios.create({
    baseURL: API_URL,
    json: true
  }),

  identify(data) {
    return this.request(this.HTTP_POST, "/idp/auth", data);
  },

  password(data) {
    return this.request(this.HTTP_POST, "/idp/password", data);
  },

  otp(data) {
    return this.request(this.HTTP_POST, "/idp/otp", data);
  },

  getMyPage() {
    return this.request(this.HTTP_GET, "/home/my_page");
  },

  getAllMenu() {
    return this.request(this.HTTP_GET, this.restaurantPath(null));
  },

  getMenu(restaurantId, menuId) {
    return this.request(this.HTTP_GET, this.restaurantPath(restaurantId), {
      menu_id: menuId
    });
  },

  addNewMenu(data) {
    return this.request(this.HTTP_PUT, this.restaurantPath(), data);
  },

  updateMenu(menuId, data) {
    return this.request(this.HTTP_PATCH, this.restaurantPath(menuId), data);
  },

  deleteMenu(menuId) {
    return this.request(this.HTTP_DELETE, this.restaurantPath(menuId));
  },

  async request(method, path, data) {
    // TODO: Figure out where should store token
    // let accessToken = await $storage.getAccessToken();

    return this.axiosClient({
      method: method,
      url: path,
      data: data,
      headers: {
        // Authorization: `Bearer: ${accessToken}`,
        Authorization: "Bearer: test",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(req => {
      return req.data;
    });
  },

  restaurantPath(restaurantId) {
    if (restaurantId == null) {
      return `/m/menus`;
    } else {
      return `/m/${restaurantId}/users/menu`;
    }
  }
};

export default Client;
