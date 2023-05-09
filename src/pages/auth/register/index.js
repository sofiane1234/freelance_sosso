import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Loading from "@/components/UI/Loading";
import UserContext from "@/context/userContext";
import Notification from "@/components/UI/Notification";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Title from "@/components/UI/Title";

const Index = () => {

  const router = useRouter();
  const { isLogged } = useContext(UserContext);
  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    userType: "FREELANCE",
    address: {
      city: "",
      zipCode: "",
      street: "",
    },
  });

  const [formFreelance, setFormFreelance] = useState({
    rate: "",
    yearOfExperience: "",
  });

  const [formCompany, setFormCompany] = useState({
    name: "",
    status: "",
    siret: "",
    address: {
      city: "",
      zipCode: "",
      street: "",
    },
  });

  const user = useFetch({
    url: "/auth/register",
    method: "POST",
    body: userForm,
    token: null,

  });

  const freelance = useFetch({
    url: "/auth/freelance",
    method: "POST",
    body: formFreelance,
    token: token,
  });

  const company = useFetch({
    url: "/auth/company",
    method: "POST",
    body: formCompany,
    token: token,
  });

  useEffect(() => {
    if (isLogged) router.push("/");
  }, [isLogged, router]);

  useEffect(() => {
    if (user.data.token) {
      localStorage.setItem("token", user.data.token);
      setToken(user.data.token);
    }
  }, [user.data, router]);

  useEffect(() => {
    if (userForm.userType == "FREELANCE" && token != null) {
      freelance.fetchData();
    }
    if (userForm.userType == "COMPANY" && token != null) {
      company.fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (user.error) {
      console.log(`Error: ${user.error.message}`);
    }

    if (freelance.error) {
      console.log(`Error: ${freelance.error.message}`);
    }

    if (company.error) {
      console.log(`Error: ${company.error.message}`);
    }
  }, [user, freelance, company]);

  const handleChange = (event) => {
    if (event.target.name.split(".")[0] == "address") {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
          [event.target.name.split(".")[1]]: event.target.value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name.split(".")[0] == "freelance") {
      setFormFreelance({
        ...formFreelance,
        [event.target.name.split(".")[1]]: event.target.value,
      });
    }

    if (event.target.name.split(".")[0] == "company") {
      if (event.target.name.split(".")[1] == "address") {
        setFormCompany({
          ...formCompany,
          address: {
            ...formCompany.address,
            [event.target.name.split(".")[2]]: event.target.value,
          },
        });
      } else {
        setFormCompany({
          ...formCompany,
          [event.target.name.split(".")[1]]: event.target.value,
        });
      }

      console.log(formCompany);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user.fetchData();
  };

  return (
    <>
    <Title title="Inscription" Level="h2" /><form onSubmit={handleSubmit}>
      <div styles="row">
        <div styles="col">
          <Input
            name="firstName"
            label="Firstname:"
            type="text"
            placeholder="Bob"
            onChange={handleChange}
            value={userForm.firstName}
            required />
          <Input
            name="lastName"
            label="Lastname:"
            type="text"
            placeholder="Martin"
            onChange={handleChange}
            value={userForm.lastName}
            required />
          <Input
            name="email"
            label="E-mail:"
            type="email"
            placeholder="your@email.com"
            onChange={handleChange}
            value={userForm.email}
            required />
          <Input
            name="password"
            label="Password:"
            type="password"
            placeholder="Your password"
            onChange={handleChange}
            value={userForm.password}
            required />
          <Input
            name="phone"
            label="Phone:"
            type="text"
            placeholder=""
            onChange={handleChange}
            value={userForm.phone}
            required />
          <Input
            name="address.city"
            label="City:"
            type="text"
            placeholder="Entrez votre Ville"
            onChange={handleChange}
            value={userForm.address.city}
            required />
          <Input
            name="address.zipCode"
            label="ZIP Code:"
            type="text"
            placeholder="56987"
            onChange={handleChange}
            value={userForm.address.zipCode}
            required />
          <Input
            name="address.street"
            label="Street:"
            type="text"
            placeholder="9, av. George Carlos"
            onChange={handleChange}
            value={userForm.address.street}
            required />
        </div>
        <div styles="col">
          <div styles="row">
            <Input
              name="userType"
              data-content="Freelance"
              type="radio"
              onChange={handleChange}
              value="FREELANCE"
              label="FREELANCE"
              checked={userForm.userType == "FREELANCE"}
              required />
            <Input
              name="userType"
              data-content="Company"
              type="radio"
              onChange={handleChange}
              value="COMPANY"
              label="COMPANY"
              checked={userForm.userType == "COMPANY"}
              required />
          </div>
          {userForm.userType == "FREELANCE" && (
            <>
              <Input
                name="freelance.rate"
                label="Rate:"
                type="text"
                onChange={handleChange}
                value={formFreelance.rate}
                required />
              <Input
                name="freelance.yearOfExperience"
                label="Year of experience:"
                type="text"
                onChange={handleChange}
                value={formFreelance.yearOfExperience}
                required />
            </>
          )}

          {userForm.userType == "COMPANY" && (
            <>
              <Input
                name="company.name"
                label="Name:"
                type="text"
                onChange={handleChange}
                value={formCompany.name}
                required />
              <Input
                name="company.status"
                label="Status: "
                type="text"
                placeholder="SAS, SASU, SARL, EURL, SA"
                onChange={handleChange}
                value={formCompany.status}
                required />
              <Input
                name="company.siret"
                label="SIRET:"
                type="text"
                onChange={handleChange}
                value={formCompany.siret}
                required />
              <Input
                name="company.address.city"
                label="City:"
                type="text"
                placeholder="New York"
                onChange={handleChange}
                value={formCompany.address.city}
                required />
              <Input
                name="company.address.zipCode"
                label="ZIP Code:"
                type="text"
                placeholder="56987"
                onChange={handleChange}
                value={formCompany.address.zipCode}
                required />
              <Input
                name="company.address.street"
                label="Street:"
                type="text"
                placeholder="9, av. George Carlos"
                onChange={handleChange}
                value={formCompany.address.street}
                required />
            </>
          )}
        </div>
      </div>

      <Button type="submit" title="S'inscrire" className="btn__secondary">
        {user.loading || freelance.loading || company.loading ? (
          <Loading />
        ) : (
          "Create account"
        )}
      </Button>
    </form></>
  );
};

export default Index;
