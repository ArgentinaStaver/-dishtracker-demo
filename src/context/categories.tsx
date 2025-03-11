import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { CategoryModel } from "../data-models/Category/CategoryModel";
import { getCategories } from "../api/categoriesApi";

export const CategoriesContext = createContext<{
  categories: CategoryModel[],
  refetchCategories: () => void;
}>({ categories: [], refetchCategories: () => { } });

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const fetchCategories = () => getCategories()
    .then((response) => setCategories(response.data.categories))
    .catch(() => toast.error('Error fetching categories'));

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, refetchCategories: fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
