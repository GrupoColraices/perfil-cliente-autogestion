import { Link } from "react-router-dom"

export const CheckboxWithLink = ({ name, link, label, register }) => {
    return (
        <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#2a3f77] w-5 h-8" name={name} {...register(name)} />
            <Link to={link} className="text-gray-500 underline text-sm" target="_blank" >
                {label}
            </Link>
        </div>
    )
}
