import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { provinces } from "@/utils/provinces"
const ProvincesInput = ({ defaultValue }: { defaultValue?: string }) => {
    const name = "province"
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name} className="capitalize">{name}</Label>
            <Select
                name={name}
                required
                defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {provinces.map((province) => (
                        <SelectItem key={province.PROVINCE_ID} value={province.PROVINCE_NAME}>
                            <span className="capitalize">{province.PROVINCE_NAME}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
export default ProvincesInput