import React from 'react'

export const AddButton = ({ fields, append, text, customClass, defaultValues }) => {
    return (
        <div className={`form-group add__button ${customClass}`}>
            <button
                className=""
                type={'button'}
                disabled={fields.length < 5 ? false : true}
                onClick={() => {
                    append(defaultValues)
                }}
            >
                {text}
                <img width={20} height={20} src="assets/icons/plus-circle.svg" />
            </button>
        </div>
    )
}
