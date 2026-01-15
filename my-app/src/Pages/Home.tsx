import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/ui/filters/FiltersSidebar";
import ProductGrid from "../components/ui/products/ProductGrid";
import mockData from "../../productData/mock.json";
import Layout from "../components/ui/layout/Layout";

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategories.length ||
      selectedCategories.includes(product.category);

    const matchesBrand =
      !selectedBrands.length || selectedBrands.includes(product.brand);

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "0-20000" && product.price <= 20000) ||
      (priceRange === "20000-50000" &&
        product.price > 20000 &&
        product.price <= 50000) ||
      (priceRange === "50000-100000" &&
        product.price > 50000 &&
        product.price <= 100000) ||
      (priceRange === "100000+" && product.price > 100000);

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
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
