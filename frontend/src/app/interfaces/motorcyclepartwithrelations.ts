import { Category } from "../interfaces/category";
import { Marca } from "../interfaces/marca";

import { Provider } from "../interfaces/provider";

import { MotorcyclePart } from "../class/motorcyclepart";


export interface MotorcyclePartWithRelations extends MotorcyclePart {
    brand: Marca;
    category: Category;
    provider: Provider;
  }