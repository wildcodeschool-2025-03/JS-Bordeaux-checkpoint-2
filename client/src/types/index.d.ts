export type Cupcaketype = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

export type Accessorytype = {
  id: number,
  name: string;
}

type CupcakeArray = Cupcake[];
