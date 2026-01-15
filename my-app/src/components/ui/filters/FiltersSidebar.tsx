import { useState } from "react";
import ArrowIcon from "../../common/ArrowIcon";

interface FiltersSidebarProps {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: string;
  onToggleCategory: (value: string) => void;
  onToggleBrand: (value: string) => void;
  onPriceChange: (value: string) => void;
  onClear: () => void;
}
const categoryOptions = ["Order", "Preorder", "New", "Price"];

const brandOptions = ["Apple", "Samsung", "Xiaomi"];

const priceOptions = [
  { value: "all", label: "Të gjitha" },
  { value: "0-20000", label: "0 – 20,000 Lekë" },
  { value: "20000-50000", label: "20,000 – 50,000 Lekë" },
  { value: "50000-100000", label: "50,000 – 100,000 Lekë" },
  { value: "100000+", label: "100,000+ Lekë" },
];

const FiltersSidebar = ({
  selectedCategories,
  selectedBrands,
  priceRange,
  onToggleCategory,
  onToggleBrand,
  onPriceChange,
  onClear,
}: FiltersSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Header */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white rounded-lg shadow-sm p-4 text-left"
        >
          <h4 className="font-semibold text-lg">Filtrat</h4>
          <ArrowIcon className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter Content */}
      <aside className={`${
        isOpen ? "block" : "hidden"
      } lg:block w-full lg:w-64 p-4 sm:p-6 box-border text-left`}>
        <h4 className="font-semibold text-lg mb-4 hidden lg:block">Filtrat</h4>
      <div className="mb-4">
        <h5 className="font-medium mb-2">Kategoria</h5>
        {categoryOptions.map((category) => (
          <label key={category} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h5 className="font-medium mb-2">Brandet</h5>
        {brandOptions.map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h5 className="font-medium mb-2">Çmimi</h5>
        {priceOptions.map((product) => (
          <label key={product.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={priceRange === product.value}
              onChange={() => onPriceChange(product.value)}
            />
            {product.label}
          </label>
        ))}
      </div>

      <button
        onClick={() => {
          onClear();
          setIsOpen(false);
        }}
        className="w-full bg-gray-200 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
      >
        Pastro Filtrat
      </button>
    </aside>
    </>
  );
};

export default FiltersSidebar;