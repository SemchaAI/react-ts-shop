import { IProduct } from './products';

export interface IForm {
  email: string;
  password: string;
  name: string;
}

export interface IFormType {
  name: string;
}
export interface IFormProduct {
  title: string;
  price: number;
  img: FileList;
  typeId: {
    value: string;
    label: string;
  };
  description: string;
  cnt: number;
  info: IInfo[];
  thumbnails: [
    {
      thumbnail: File | string;
    }
  ];
}

// extends Omit<IProduct, '_id'>
// export interface IProduct {
//   _id: string;
//   title: string;
//   price: number;
//   // rating: number
//   img: string;
//   typeId: string;
//   // brandId: string
//   description: string;
//   cnt: number;
//   info: IInfo[];
//   thumbnails: IThumbnails;
// }
export interface IInfo {
  // _id: string;
  title: string;
  description: string;
  // productId: string;
}
// export interface IThumbnails {
//   _id: string;
//   img: string[];
//   productId: string;
// }
