interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
}

interface Meal {
    id: number;
    name: string;
    description: string;
}

interface MealWithQuantity {
    meal: Meal;
    quantity: number;
}

export interface ProductWithQuantity {
    product: Product;
    meals: MealWithQuantity[];
    quantity: number;
}

export interface ProductsResponse {
    productsWithQuantity: ProductWithQuantity[];
}