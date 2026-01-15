import { useState } from "react";
import ArrowIcon from "../../../../public/assets/icons/ArrowIcon";
import {
  brandOptions,
  categoryOptions,
  priceOptions,
} from "../../../types/constants";
import { useSearchParams } from "react-router-dom";

interface FiltersSidebarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersSidebar = ({ setSearchTerm }: FiltersSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const selectedBrands =
    searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const priceRange = (searchParams.get("price") || "all") as string;

  const onClear = () => {
    setSearchParams({});
    setSearchTerm("");
  };

  const handleToggle = ({
    type,
    value,
  }: {
    type: "brands" | "categories" | "price";
    value: string;
  }) => {
    if (type === "brands" || type === "categories") {
      const currentParams =
        searchParams.get(type)?.split(",").filter(Boolean) || [];

      let updatedParams: string[];

      if (currentParams.includes(value)) {
        updatedParams = currentParams.filter(
          (currentParam) => currentParam !== value
        );
      } else {
        updatedParams = [...currentParams, value];
      }

      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (updatedParams.length > 0) {
          newParams.set(type, updatedParams.join(","));
        } else {
          newParams.delete(type);
        }
        return newParams;
      });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (value !== "all") {
          newParams.set("price", value);
        } else {
          newParams.delete("price");
        }
        return newParams;
      });
    }
  };

  return (
    <>
      {/* Mobile Filter Header */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white rounded-lg shadow-sm p-4 text-left"
        >
          <h4 className="font-semibold text-lg">Filtrat</h4>
          <ArrowIcon
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter Content */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 p-4 sm:p-6 box-border text-left`}
      >
        <h4 className="font-semibold text-lg mb-4 hidden lg:block">Filtrat</h4>
        <div className="mb-4">
          <h5 className="font-medium mb-2">Kategoria</h5>
          {categoryOptions.map((category) => (
            <label
              key={category.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.value)}
                onChange={() =>
                  handleToggle({ type: "categories", value: category.value })
                }
              />
              {category.label}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">Brandet</h5>
          {brandOptions.map((brand) => (
            <label
              key={brand.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.value)}
                onChange={() =>
                  handleToggle({ type: "brands", value: brand.value })
                }
              />
              {brand.label}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h5 className="font-medium mb-2">Çmimi</h5>
          {priceOptions.map((product) => (
            <label
              key={product.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="radio"
                checked={priceRange === product.value}
                onChange={() =>
                  handleToggle({ type: "price", value: product.value })
                }
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
