import {Category} from "./product.tsx";

export interface meals {
    meals: meal[];
}

export interface meal {
    id: number;
    name: string;
    description: string;
    category: Category;
}

export interface mealWithQuantity {
    meal: meal;
    quantity: number;
}