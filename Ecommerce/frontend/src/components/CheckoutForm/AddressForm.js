import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import FormInput from "./CustomTextField";
const AddressForm = ({ next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  // const [shippingOptions, setShippingOptions] = useState([]);
  // const [shippingOption, setShippingOption] = useState("");
  const countries = Object.entries(shippingCountries).map(
    ([code, { country, iso3 }]) => ({
      id: code,
      label: country,
      code: iso3,
    })
  );
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, city]) => ({
      id: code,
      label: city,
    })
  );

  // const methods = useForm();
  const methods = useForm();
  const onSubmit = (data) => {
    next({ ...data, shippingCountry, shippingSubdivision });
  };

  const fetchShippingCountries = async () => {
    const countriesAPI = await fetch(
      "https://countriesnow.space/api/v0.1/countries/"
    );

    const { data } = await countriesAPI.json();
    setShippingCountries(data);
    setShippingCountry(data[0].country);
  };
  const fetchCitiesShippingCountries = async (shippingCountry) => {
    const CountryData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: shippingCountry,
      }),
    };
    const fetchData = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      CountryData
    );
    const { data } = await fetchData.json();
    setShippingSubdivisions(data);
    setShippingSubdivision(data[0]);
  };
  useEffect(() => {
    fetchShippingCountries();
  }, []);
  useEffect(() => {
    if (shippingCountry) fetchCitiesShippingCountries(shippingCountry);
  }, [shippingCountry]);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {/* <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <NestedInput />
          <input type="submit" />
        </form>
      </FormProvider> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP / Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                label="Country"
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem value={country.label}>{country.label}</MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                label="City"
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => {
                  return (
                    <MenuItem value={subdivision.label}>
                      {subdivision.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" varaint="outlined">
              Back to cart
            </Button>
            <Button type="submit" varaint="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
// function NestedInput() {
//   const { register } = useFormContext(); // retrieve all hook methods
//   return <input {...register("test")} />;
// }

export default AddressForm;
