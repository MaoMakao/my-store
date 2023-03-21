export interface IGuitar {
  category: string;
  id: string | number;
  name: string;
  price: string;
  inStock: boolean;
  str: number;
  tags: string[];
  img: string[];
  sizeImg: string;
  descr: string;
  specs: {
  size: string[];
  general: string[];
  neck: string[];
  profile: string[];
  };
  }