import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "@/utils/categories"
const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {
    const name = "category"
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name} className="capitalize">{name}</Label>
            <Select
                name={name}
                required
                defaultValue={defaultValue || categories[0].label}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.label} value={category.label}>
                            {category.icon && <category.icon className="mr-2 inline-block" />}
                            <span className="capitalize">{category.label}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
export default CategoryInput