import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";

const MainHttpService = () => {

  const _API_GET_URL = 'https://api.pik.ru/v2/offer';
  const _API_POST_URL = 'https://strapi.pik.ru';

  const tryParseJson = async (data: any) => {
    try {
      return await JSON.parse(data);
    } catch (error: any) {
      console.error('*---tryParseJson', error);
      return data;
    }
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
        const response: AxiosResponse<TOfferSpecial[], any> = await axios.get(
            `${_API_GET_URL}/special?types=1,2&locations=2,3`
          );
        const parseData = tryParseJson(response.data);
        return parseData;
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          handleErrors(error)
        } else {
          console.error('*---receiveOfferSpecial', error);
        }
      }
    },
    sendFrontTest: async (data: TSendFrontText) => {
      try {
        const response: AxiosResponse<TFrontTest, any> = await axios.post(
          `${_API_POST_URL}/front-tests`
        , data);
        const parseData = tryParseJson(response.data);
        return parseData;
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          handleErrors(error)
        } else {
          console.error('*---sendFrontTest', error);
        }
      }
    },
  }
};

export default MainHttpService();
