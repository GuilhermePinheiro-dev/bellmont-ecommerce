export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    images: string[],
    sizes: string[],
    categoryId: number,
    slug: string,
    stock: number,
    active: boolean,
    color: string[],
}