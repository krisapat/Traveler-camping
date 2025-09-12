import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const TextAreaInput = ({ name, Labeltext, defaultValue }:
    { name: string, Labeltext?: string, defaultValue?: string }) => {
    return (
        <div className="flex flex-col gap-2 mb-2">
            <Label htmlFor={name} className="capitalize">{Labeltext || name}</Label>
            <Textarea
                id={name}
                name={name}
                rows={5}
                placeholder={defaultValue}
                required
            />
        </div>
    )
}
export default TextAreaInput