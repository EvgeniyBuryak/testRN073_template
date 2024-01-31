
declare var __DEV__: boolean;
declare module '*.json' {
  const value: { [key: string]: any };
  export default value;
}
// declare module "react-hook-form";

type TOfferSpecial = {
    id: number,
    url: string,
    title: string,
    text: string,
    mobile: string,
    mobileApp: null,
    desktop: string,
    video: null,
    metadata: null,
};

type TFrontTest = {
	id: number,
	user: null,
	order: null,
	published_at: string,
	created_at: string,
	updated_at: string,
};

type TOverviewPhoto = {
  id_attachments: number;
  filename: string;
  content: string;
};
