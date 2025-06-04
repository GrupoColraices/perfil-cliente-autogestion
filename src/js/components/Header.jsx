
export const Header = ({title = "Perfil del cliente"}) => {
    return (

        <header>
            {/* <div className='logo'>
                <a href="https://colraices.com" target="_blank" rel='noreferrer'>
                    <img src="/assets/colraices_logo.svg" alt="Logo Colraices" />
                </a>
            </div> */}

            <h1 className='title'>{title}</h1>

        </header>


    )
}
