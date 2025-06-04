import { deleteItemArray } from "../services/deleteItemArray";

export const RemoveButton = ({ fields, remove, index, text, customClass, disable, options: { typeRegister } }) => {
  const id = typeRegister && typeRegister.data?.[index]?.id;
  return (
    <div className={`form-group remove__button ${customClass}`}>
      <button
        type={"button"}
        disabled={disable}
        onClick={() => {
          id && deleteItemArray(id, typeRegister?.name);
          remove(index);
        }}
      >
        {text}
        <img width={20} height={20} src="assets/icons/less-circle.svg" />
      </button>
    </div>
  )
}
