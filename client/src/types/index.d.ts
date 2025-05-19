export type Cupcake = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

export type CupcakeArray = Cupcake[];

export type Accessory = {
  id: number;
  slug: string;
  name: string;
};

export type AccessoryArray = Accessory[];
