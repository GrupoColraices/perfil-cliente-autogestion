import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import toast, { Toaster } from "react-hot-toast";

import { Title } from "../components/Title";
import { Loader } from "../components/Loader";
import { PrimaryButton } from "../components/PrimaryButton";
import { Result } from "./Result";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import { dataManagement } from "../helpers/dataManagement";
import { ValidateClient } from "../components/ValidateClient";
import { PersonalData } from "./clients/PersonalData";
import { LaboralData } from "./clients/LaboralData";
import { EconomicData } from "./clients/EconomicData";
import { RequestData } from "./clients/RequestData";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export const Form = () => {
  const {
    dataRegister,
    profiles,
    updateProfiles,
    profile,
    updateProfile,
    result,
    setResult,
  } = useContext(ProfileContext);
  const {
    isAuth: { id },
  } = useContext(AuthContext);
  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      user_id: id,
      "Request.purchase_option": null,
      Employments: [
        {
          company_name: "",
          economic_activity_id: "",
          position: "",
          contract_type_id: "",
          salary: "",
          employment_start_date: "",
          last_employment_entry: null,
          last_employment_exit: null,
          boss_name: "",
          phone_number: "",
          address: "",
          city: "",
          payment_method: "",
          payment_frequency: "",
        },
      ],
      // References: [
      //     {
      //         reference_name: '',
      //         relationship_id: '',
      //         reference_type: '',
      //         address: '',
      //         city: '',
      //         phone_number: '',
      //         telephone_number: '',
      //     },
      // ],
      negative_reports: null,
      paid_in_full: null,
      score: null,
      marital_status_id: null,
      education_level_id: null,
    },
  });
  //     user_id: id,
  //     'Request.purchase_option': null,
  //     'Property.deadline': null,
  //     'Agent.expedition_date': null,
  //     'Coowners[0].incomes': null,
  //     'Property.property_value': null,
  //     Employments: [
  //         {
  //             company_name: '',
  //             economic_activity_id: '',
  //             position: '',
  //             contract_type_id: '',
  //             salary: '',
  //             employment_start_date: '',
  //             last_employment_entry: null,
  //             last_employment_exit: null,
  //             boss_name: '',
  //             phone_number: '',
  //             address: '',
  //             city: '',
  //             payment_method: '',
  //             payment_frequency: '',
  //         },
  //     ],
  //     FinancialExpenses: [
  //         {
  //             entity: '',
  //             expense_value: 0,
  //             expense_type_id: '',
  //             total_amount: 0,
  //             current_balance: 0,
  //         },
  //     ],
  //     Patrimonies: [
  //         {
  //             description: '',
  //             patrimony_type: '',
  //             city: '',
  //             mortgaged: '',
  //             value: 0,
  //         },
  //     ],
  //     // References: [
  //     //     {
  //     //         reference_name: '',
  //     //         relationship_id: '',
  //     //         reference_type: '',
  //     //         address: '',
  //     //         city: '',
  //     //         phone_number: '',
  //     //         telephone_number: '',
  //     //     },
  //     // ],
  //     negative_reports: null,
  //     paid_in_full: null,
  //     score: null,
  //     marital_status_id: null,
  //     education_level_id: null,
  // },
  // States Fields
  const [searchClient, setSearchClient] = useState(true);
  const [getDataClient, setGetDataClient] = useState({});
  const [client, setClient] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Capturar Data
  // const propertyValue = watch('Property.property_value')
  const linking = watch("linkPerson");
  const inmDefinition = watch("Property");
  const typeDebt = watch("typeDebt");
  const typePatrimonies = watch("typePatrimonies");
  const selectApoderado = watch("apoderado");

  // // Variables

  // const isVis = propertyValue > 195000000 ? 'NO VIS' : 'VIS'
  // Fetching data
  useEffect(() => {
    if (profiles?.length > 0) {
      updateProfile(profiles[0]);
      setIsSubmitted(true);
    }
    if (client?.id) {
      const getClients = async () => {
        try {
          const response = await fetch(`${VITE_API_URL}/clients/${client?.id}`);
          const data = await response.json();
          setGetDataClient(data?.data);
          setClient(data?.data);
        } catch (error) {
          console.log("Error");
        }
      };
      getClients();
    }
    if (isSubmitted)
      toast.success(
        "Cliente creado. Haz clic en el botón Editar para modificar.",
        {
          position: "top-center",
          style: {
            maxWidth: "500px",
          },
        }
      );
  }, [profiles, isSubmitted]);
  //onSubmit
  const onSubmit = (register) => {
    console.log(register, "register");
    dataManagement(
      register,
      dataRegister,
      inmDefinition,
      setResult,
      client,
      setClient,
      updateProfiles,
      typeDebt,
      selectApoderado,
      typePatrimonies,
      linking,
      isEdit
    );
  };
  const dataAuthorization = watch("data_authorization");
  const risksAuthorization = watch("risks_authorization");
  const conditionsAuthorization = watch("conditions_authorization");
  const isAllChecked =
    dataAuthorization && risksAuthorization && conditionsAuthorization;
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 4000,
          },
        }}
        reverseOrder={false}
      />
      {searchClient && (
        <div className="container">
          <ValidateClient
            setSearchClient={setSearchClient}
            reset={reset}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
      {!searchClient && (
        <Title
          text={"Información Preliminar"}
          attribute={"title__large information"}
        />
      )}
      {!searchClient && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[95%] mx-auto xl:container"
        >
          <fieldset disabled={isSubmitted}>
            <PersonalData options={{ register, watch, errors }} />
            <LaboralData
              options={{
                register,
                watch,
                control,
                errors,
                readOnly: isSubmitted,
                getDataClient,
              }}
            />
            <EconomicData
              options={{
                register,
                control,
                errors,
                watch,
                readOnly: isSubmitted,
                getDataClient,
              }}
            />
            <RequestData
              options={{
                register,
                control,
                watch,
                errors,
                readOnly: isSubmitted,
                getDataClient,
              }}
            />
            <div className="w-full flex justify-center items-center mb-8">
              <PrimaryButton
                options={{
                  type: "submit",
                  label: "Resultado",
                  // isDisabled: JSON.stringify(data) === JSON.stringify(watch()),
                  isDisabled: !isAllChecked,
                }}
              />
            </div>
            {isSubmitted && (
              <span className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
                Formulario enviado. Haga clic en Editar para modificar.
              </span>
            )}
          </fieldset>
        
        </form>
      )}
      {result ? (
        <Loader />
      ) : (
        Object.keys(profile).length > 0 && <Result clientID={client?.id} />
      )}
    </>
  );
};
