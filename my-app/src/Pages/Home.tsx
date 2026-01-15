import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/ui/filters/FiltersSidebar";
import ProductGrid from "../components/ui/products/ProductGrid";
import mockData from "../../public/productData/mock.json";
import Layout from "../components/layout/Layout";
import { filterProducts } from "../components/utils/filteredProducts";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  category: string;
}

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const priceRange = (searchParams.get("price") || "all") as string;
  const selectedBrands =
    searchParams.get("brands")?.split(",").filter(Boolean) || [];

  useEffect(() => {
    setProducts(mockData as Product[]);
  }, []);

  const filteredProducts = filterProducts(products, {
    searchTerm,
    selectedCategories,
    selectedBrands,
    priceRange,
  });

  return (
    
      <Layout>
        <main className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kërko produktet..."
              className="w-full max-w-xl mx-auto rounded-md border px-4 py-2"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
            <FiltersSidebar setSearchTerm={setSearchTerm} />
            <ProductGrid products={filteredProducts} />
          </div>
        </main>
      </Layout>
    
  );
};

export default Home;