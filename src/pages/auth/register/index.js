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

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/register",
    method: "POST",
    body: userForm,
    token: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userType") {
      setUserForm({
        ...userForm,
        [name]: value === "FREELANCE" ? "FREELANCE" : "COMPANY",
      });
    } else if (name.startsWith("address.")) {
      setUserForm({
        ...userForm,
        address: {
          ...userForm.address,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setUserForm({
        ...userForm,
        [name]: value,
      });
    }
    console.log("user : ", userForm);
  };

  useEffect(() => {
    console.log("data : ", data);
    if (data && data.success) {
      if (userForm.userType === "FREELANCE") {
        router.push("/auth/register/freelance");
      } else if (userForm.userType === "COMPANY") {
        router.push("/auth/register/company");
      }
      localStorage.setItem("token", data.token);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = fetchData();
    if (data && data.success) {
      setClickError(false);
      console.log("data : ", data);
      console.log(data.token);
    } else {
      console.log(error)
    }
  };
  if (loading) return <Loading />;
  if (error) {
    error.message = error.message;
  }

  return (
    <>
      <Title title="Inscription" Level="h2" />
      <form onSubmit={handleSubmit}>
        <div styles="row">
          <div styles="col">
            <Input
              name="firstName"
              label="Firstname:"
              type="text"
              placeholder="Entrez votre prenom"
              onChange={handleChange}
              value={userForm.firstName}
              required
            />
            <Input
              name="lastName"
              label="Lastname:"
              type="text"
              placeholder="Entrez votre nom"
              onChange={handleChange}
              value={userForm.lastName}
              required
            />
            <Input
              name="email"
              label="E-mail:"
              type="email"
              placeholder="Entrez votre Adresse email"
              onChange={handleChange}
              value={userForm.email}
              required
            />
            <Input
              name="password"
              label="Password:"
              type="password"
              placeholder="Entrez votre password"
              onChange={handleChange}
              value={userForm.password}
              required
            />
            <Input
              name="phone"
              label="Tel:"
              type="text"
              placeholder="Entrez votre numero de telephone"
              onChange={handleChange}
              value={userForm.phone}
              required
            />
            <Input
              name="address.city"
              label="City:"
              type="text"
              placeholder="Entrez votre Ville"
              onChange={handleChange}
              value={userForm.address.city}
              required
            />
            <Input
              name="address.zipCode"
              label="ZIP Code:"
              type="text"
              placeholder="Entrez votre Code Postal"
              onChange={handleChange}
              value={userForm.address.zipCode}
              required
            />
            <Input
              name="address.street"
              label="Street:"
              type="text"
              placeholder="Entrez votre rue"
              onChange={handleChange}
              value={userForm.address.street}
              required
            />
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
                required
              />
              <Input
                name="userType"
                data-content="Company"
                type="radio"
                onChange={handleChange}
                value="COMPANY"
                label="COMPANY"
                checked={userForm.userType == "COMPANY"}
                required
              />
            </div>
            {userForm.userType == "FREELANCE" && (
              <>
                <Input
                  name="freelance.rate"
                  label="Montant:"
                  type="text"
                  onChange={handleChange}
                  value={formFreelance.rate}
                  required
                />
                <Input
                  name="freelance.yearOfExperience"
                  label="Experiences (ans):"
                  type="text"
                  onChange={handleChange}
                  value={formFreelance.yearOfExperience}
                  required
                />
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
                  required
                />
                <Input
                  name="company.status"
                  label="Status: "
                  type="text"
                  placeholder="SAS, SASU, SARL, EURL, SA"
                  onChange={handleChange}
                  value={formCompany.status}
                  required
                />
                <Input
                  name="company.siret"
                  label="SIRET:"
                  type="text"
                  onChange={handleChange}
                  value={formCompany.siret}
                  required
                />
                <Input
                  name="company.address.city"
                  label="City:"
                  type="text"
                  placeholder="New York"
                  onChange={handleChange}
                  value={formCompany.address.city}
                  required
                />
                <Input
                  name="company.address.zipCode"
                  label="ZIP Code:"
                  type="text"
                  placeholder="Entrez le Code Postal (Company)"
                  onChange={handleChange}
                  value={formCompany.address.zipCode}
                  required
                />
                <Input
                  name="company.address.street"
                  label="Street:"
                  type="text"
                  placeholder="9, av. George Carlos"
                  onChange={handleChange}
                  value={formCompany.address.street}
                  required
                />
              </>
            )}
          </div>
        </div>

        <Button type="submit" title="S'inscrire" className="btn__secondary" />
      </form>
    </>
  );
};

export default Index;
