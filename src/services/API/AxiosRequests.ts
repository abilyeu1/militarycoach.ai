import Axios from "axios";

/**
 * @GET request
 * @Params
 * @endPoint : Url to hit.
 * @Header : Authorization Token.
 */
export const GET: any = async (
  endPoint: string,
  header: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.get(endPoint, {
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error(error);
        reject(error);
      });
  });
};

/**
 * @POST request
 * @Params
 * @BaseUrl : Url to hit.
 * @Header : Authorization Token.
 */
export const POST = async (
  endPoint: string,
  data?: [] | {},
  token = ""
): Promise<any> =>
  new Promise((resolve, reject) => {
    Axios.post(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error("response error", error);
        reject(error);
      });
  });

/**
 * @PUT request
 * @Params
 * @Header : Authorization Token.
 */
export const PUT = async (
  endPoint: string,
  data: [] | {},
  token = ""
): Promise<any> =>
  new Promise((resolve, reject) => {
    Axios.put(endPoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch((error: Error) => {
        console.error({ error });
        reject(error);
      });
  });

/**
 * @DELETE request
 * @Params
 * @Header : Authorization Token.
 */
export const DELETE = async (
  endpoint: string,
  header: string,
  data?: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    Axios.delete(endpoint, {
      data,
      headers: {
        Authorization: `Bearer ${header}`,
      },
    })
      .then((res: any) => {
        if (res) {
          resolve(res.data);
        }
      })
      .catch((error: Error) => {
        reject(error);
        throw error;
      });
  });
};
