
export const Header = ({title = "Perfil del cliente"}) => {
    return (

        <header className="mb-10">
            <div className="p-8 w-full">
                
                    <img style={{
                        margin:'0 auto',
                        width:'400px',
                        height:'auto'
                    }} src="/assets/colraices_logo.svg" alt="Logo Colraices" />
            
            </div>

            <h1 className='title mb-10'>{title}</h1>

        </header>


    )
}
