import { useEffect, useState, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FiltersSidebar from "../components/ui/filters/FiltersSidebar";
import ProductGrid from "../components/ui/products/ProductGrid";
import AuthModal from "../components/ui/Auth/AuthModal";
import mockData from "../../public/mock.json";
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

type PriceRange =
  | "all"
  | "0-20000"
  | "20000-50000"
  | "50000-100000"
  | "100000+";

const getFilterStateFromURL = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    searchTerm: params.get("search") || "",
    categoryOptions: params.get("categories")?.split(",") || [],
    brandOptions: params.get("brands")?.split(",") || [],
    priceRange: (params.get("price") || "all") as PriceRange,
  };
};

const updateURLWithFilters = (
  search: string,
  categories: string[],
  brands: string[],
  price: PriceRange
) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (categories.length) params.set("categories", categories.join(","));
  if (brands.length) params.set("brands", brands.join(","));
  if (price !== "all") params.set("price", price);

  window.history.replaceState(
    null,
    "",
    params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname
  );
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const initialFilters = getFilterStateFromURL();
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [categories, setCategories] = useState<string[]>(initialFilters.categoryOptions);
  const [brands, setBrands] = useState<string[]>(initialFilters.brandOptions);
  const [priceRange, setPriceRange] = useState<PriceRange>(initialFilters.priceRange);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    setProducts(mockData as Product[]);
  }, []);

    const uniqueCategories = [...new Set(mockData.map((p: Product) => p.category))];
    const uniqueBrands = [...new Set(mockData.map((p: Product) => p.brand))];

    useEffect(() => {
      setAvailableCategories(uniqueCategories);
      setAvailableBrands(uniqueBrands);
    }, []);

  useEffect(() => {
    setIsSearching(true);
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateURLWithFilters(searchTerm, categories, brands, priceRange);
      setIsSearching(false);
    }, 500);
  }, [searchTerm, categories, brands, priceRange]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categories.length || categories.includes(product.category);

    const matchesBrand =
      !brands.length || brands.includes(product.brand);

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "0-20000" && product.price <= 20000) ||
      (priceRange === "20000-50000" && product.price > 20000 && product.price <= 50000) ||
      (priceRange === "50000-100000" && product.price > 50000 && product.price <= 100000) ||
      (priceRange === "100000+" && product.price > 100000);

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <>
      <Layout
        onLoginClick={() => {
          setShowLogin(true);
          setShowSignup(false);
        }}
        onSignupClick={() => {
          setShowSignup(true);
          setShowLogin(false);
        }}
      >

      <AuthModal
        showLogin={showLogin}
        showSignup={showSignup}
        onClose={() => {
          setShowLogin(false);
          setShowSignup(false);
        }}
      />

      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kërko produktet..."
            className="w-full max-w-xl mx-auto rounded-md border px-4 py-2"
          />

          {isSearching && (
            <AiOutlineLoading3Quarters className="mx-auto mt-4 h-8 w-8 animate-spin text-red-500 " />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
          <FiltersSidebar
            categoryOptions={categories}
            brandOptions={brands}
            selectedCategories={categories}
            selectedBrands={brands}
            priceRange={priceRange}
            onToggleCategory={(c) =>
              setCategories((prev) =>
                prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
              )
            }
            onToggleBrand={(b) =>
              setBrands((prev) =>
                prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
              )
            }
            onPriceChange={(p) => setPriceRange(p as PriceRange)}
            onClear={() => {
              setSearchTerm("");
              setCategories([]);
              setBrands([]);
              setPriceRange("all");
            }}
          />

          <ProductGrid products={filteredProducts} />
        </div>
      </main>
      </Layout>
    </>
  );
};

export default Home;
