interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  category: string;
}

interface FilterOptions {
  searchTerm: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: string;
}

export const filterProducts = (
  products: Product[],
  filters: FilterOptions
): Product[] => {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());

    const matchesCategory =
      !filters.selectedCategories.length ||
      filters.selectedCategories.includes(product.category);

    const matchesBrand =
      !filters.selectedBrands.length ||
      filters.selectedBrands.includes(product.brand);

    const matchesPrice =
      filters.priceRange === "all" ||
      (filters.priceRange === "0-20000" && product.price <= 20000) ||
      (filters.priceRange === "20000-50000" &&
        product.price > 20000 &&
        product.price <= 50000) ||
      (filters.priceRange === "50000-100000" &&
        product.price > 50000 &&
        product.price <= 100000) ||
      (filters.priceRange === "100000+" && product.price > 100000);

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });
};