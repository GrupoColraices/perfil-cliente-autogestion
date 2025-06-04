import { deleteItemArray } from "../../services/deleteItemArray";


export const RemoveFieldArray = ({ options: { remove, index, disabled, typeRegister } }) => {
    const id = typeRegister && typeRegister.data?.[index]?.id;
    return (
        <button
            type="button"
            onClick={() => {
                id && deleteItemArray(id, typeRegister?.name);
                remove(index);
            }}
            className={`
flex justify-center items-center gap-1 text-white bg-gold-400 hover:bg-gold-600 focus:ring-4 focus:outline-none focus:ring-azure-200 font-medium rounded-lg text-base w-54 mr-2  px-2 py-[8.8px] max-h-10 ml-2 mt-[19px] text-center border border-white shadow-lg hover:shadow-inner transition-colors ${disabled && 'opacity-40'
                }`}
            disabled={disabled}
        >
            Remover{' '}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    )
}
