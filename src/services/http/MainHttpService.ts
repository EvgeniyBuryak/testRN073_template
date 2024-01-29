import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";

const MainHttpService = () => {

  const _API_GET_URL = 'https://api.pik.ru/v2/offer';
  const _API_POST_URL = 'https://strapi.pik.ru';

  const fetch = async (url: string, config: AxiosRequestConfig | undefined):
    Promise<{ response: Response, body: any }> => {

    const tryParseJson = async (data: string) => {
      try {
        return await JSON.parse(data);
      } catch (error: any) {
        console.error('*---tryParseJson', error);
        return data;
      }
    };

    const requestAxios = await axios.create({ url, ...config || {} });
    const bodyInterceptors = requestAxios.interceptors.response.use(
      response => {
        return tryParseJson(response.data);
      }
    );
    const response = requestAxios.request({});
    
    if (!response) throw response;
    const body = (await response).data;

    // if (response.) {
    //     console.log('response', body, url);
    //     return { response, body };
    // }
  };

  const handleErrors = (error: AxiosError) => {
    if (error.response) {
      console.log('Error data : ' + error.response.data);
      console.log('Error status : ' + error.response.status);
      console.log('Error headers : ' + error.response.headers);
    } else if (error.request) {
      console.log('Error request : ' + error.request);
    } else {
      console.log('Error message : ' + error.message);
    }
    console.log('Error config : ' + JSON.stringify(error.config));
  };

  return {
    receiveOfferSpecial: async () => {
      try {
        const response = await axios.get(`${_API_GET_URL}/special?types=1,2&locations=2,3`);
        return response.data;  
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
            handleErrors(error)
        } else {
            console.error('*---receiveOfferSpecial', error);
        }
      }
    },
    sendTest: async () => {
      try {
        
        const response = await axios.post(`${_API_POST_URL}/front-tests`);
        return response.data;
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
            handleErrors(error)
        } else {
            console.error('*---sendTest', error);
        }
      }
    }
  }
};

export default MainHttpService;
