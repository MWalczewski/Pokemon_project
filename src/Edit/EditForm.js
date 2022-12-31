import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledButton } from "../MaterialUI/MaterialUI";
import "./EditForm.css";

const EditForm = ({ pokemon, setPokemonToEdit }) => {
  const initialValues = {
    name: `${pokemon.name}`,
    base_experience: `${pokemon.base_experience}`,
    weight: `${pokemon.weight}`,
    height: `${pokemon.height}`,
    abilities: pokemon.abilities,
    id: pokemon.id,
  };

  const pokemonValidationSchema = yup.object().shape({
    name: yup.string().required("Pokemon name is required!"),
    base_experience: yup
      .number("Only numbers are allowed!")
      .positive("No negative numbers allowed.")
      .required("Pokemon's base EXP is required!"),
    weight: yup
      .number("Only numbers are allowed!")
      .positive("No negative numbers allowed.")
      .required("Pokemon's weight is required!"),
    height: yup
      .number("Only numbers are allowed!")
      .positive("No negative numbers allowed.")
      .required("Pokemon's  height is required!"),
  });

  const notifyPokemonAdded = () => {
    toast.success("New Pokemon added to Pokedex!");
  };

  const handleCreatePokemon = (values) => {
    const { name, base_experience, weight, height, abilities, id } = values;
    const pokemon = {
      name,
      base_experience,
      weight,
      height,
      abilities,
      id,
    };
    fetch("http://localhost:8000/pokemons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    })
      .then(() => {
        console.log("nowy pokemon został dodany do pokedexa: ", pokemon);
      })
      .then(notifyPokemonAdded())
      .then(setPokemonToEdit(""));
  };

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={pokemonValidationSchema}
          onSubmit={handleCreatePokemon}
        >
          {(formik) => {
            return (
              <Form className="edit-form">
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" />
                <Field
                  type="text"
                  id="base_experience"
                  name="base_experience"
                />
                <ErrorMessage name="base_experience" />
                <Field type="text" id="weight" name="weight" />
                <ErrorMessage name="weight" />
                <Field type="text" id="height" name="height" />
                <ErrorMessage name="height" />
                <StyledButton
                  variant="outlined"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  SUBMIT
                </StyledButton>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default EditForm;
