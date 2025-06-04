import { Link } from "react-router-dom";
import { BiShieldX } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";

const Unauthorized = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex justify-center items-center h-screen p-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl flex flex-col max-w-xl shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <BiShieldX className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            No autorizado
          </h1>
          
          <div className="space-y-4 text-gray-600">
            <p className="font-bold">¡Hola!</p>
            <p className="text-lg leading-relaxed">
            Parece que estás intentando acceder a la información de un cliente que no está asignado a tu cuenta.
            </p>
            
            <p className="text-lg leading-relaxed">
            Para garantizar la privacidad y seguridad de nuestros clientes, solo puedes visualizar y editar los registros que has cargado personalmente o aquellos que han sido asignados directamente a ti.
            </p>
            
            <p className="text-lg leading-relaxed">
            Si necesitas acceder a la información de este cliente, por favor solicita la reasignación a tu líder para que se realice el proceso correspondiente.
            </p>
            
            <p className="text-lg leading-relaxed font-medium text-gray-700">
            ¡Gracias por tu comprensión y por contribuir a la protección de los datos de nuestros clientes!
            </p>
          </div>
          
          <Link 
            to="/" 
            className="group flex items-center justify-center gap-2 mt-8 text-white bg-azure-700 hover:bg-azure-800 focus:ring-4 focus:outline-none focus:ring-azure-200 font-medium rounded-xl text-lg px-6 py-3 text-center border border-azure-600 shadow-lg hover:shadow-inner transition-all duration-200"
          >
            <IoArrowBack className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;