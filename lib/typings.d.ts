export type ProductProps = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category: ProductCategoryProps;
  image: string;
};

export interface CartProductProps extends ProductProps {
  itemQty: number;
}

export type ProductCategoryProps = {
  id: number;
  name: string;
  image: string;
};

export type ProductCategoriesProps = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};
