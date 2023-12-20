import axios, { AxiosResponse } from "axios";

export const downloadFile = (
  url: string,
  fileName: string
): Promise<Error | undefined> =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((response: AxiosResponse<Blob>) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.setAttribute("download", fileName);
        link.click();
        URL.revokeObjectURL(href);
        resolve(undefined);
      })
      .catch((e) => {
        if (e instanceof Error) {
          reject(e);
        }

        reject(new Error("Unknown error"));
      });
  });
