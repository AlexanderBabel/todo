import React, { useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import {
  GENERATE_TOKEN_MUTATION,
  GenerateTokenMutation,
  GenerateTokenMutationVariables,
} from "../gql/mutations";
import { Footer } from "../components/Footer";

function Register() {
  const { setAccount } = useContext(AccountContext);
  const [generateToken, { loading, error }] = useMutation<
    GenerateTokenMutation,
    GenerateTokenMutationVariables
  >(GENERATE_TOKEN_MUTATION, {
    onCompleted,
    onError: () => {},
  });

  function onCreateAccount() {
    generateToken();
  }

  function onCompleted(data: any) {
    setAccount(data.generateToken);
  }

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen p-8">
      <div className="mx-auto lg:w-1/3 md:w-1/2 sm:w-3/4 bg-white shadow-md p-8">
        <p className="pb-6 text-center font-bold text-4xl">Planner</p>
        <p className="text-gray-700 pb-6 text-center">
          Verwalte schnell und einfach deine Aufgaben und spare damit 20% deiner
          Zeit ein.
        </p>
        {error && (
          <div className="border border-red-600 bg-red-200 text-red-600 rounded-md px-4 py-2 mb-6">
            Es ist ein Fehler aufgetreten
          </div>
        )}
        <Button onClick={onCreateAccount} className="w-full" disabled={loading}>
          {loading ? "Warte noch kurz..." : "Jetzt Aufgaben erstellen"}
        </Button>
        <Footer />
      </div>
    </div>
  );
}

export default Register;
