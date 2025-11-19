import { categories } from "@/utils/categories";
import Link from "next/link";

const CategoriesList = ({ search, category }: { search?: string; category?: string }) => {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <div className="flex overflow-x-auto md:overflow-x-visible justify-between w-full gap-4 md:gap-6 py-2 md:py-4
                    snap-x snap-mandatory scroll-px-4 md:scroll-px-0">
      {categories.map((item) => {
        const isActive = item.label === category;
        return (
          <Link key={item.label} href={`/?category=${item.label}${searchTerm}`}>
            <article
              className={`flex flex-col justify-center items-center min-w-[80px] md:min-w-0
                transition-all hover:scale-110 hover:text-primary duration-300
                ${isActive ? "text-primary" : ""}
                snap-start`}
            >
              <item.icon className="text-2xl md:text-3xl" />
              <p className="text-sm md:text-base">{item.label}</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesList;
