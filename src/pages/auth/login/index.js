import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/userContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";
import Loading from "@/components/UI/Loading";

const Index = () => {
  const router = useRouter();

  const { login } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const [token, setToken] = useState();

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/login",
    method: "POST",
    body: userForm,
    token: null,
  });
  const {
    data: user,
    error: userError,
    loading: userLoading,
    fetchData: fetchDataUser,
  } = useFetch({ url: "/user", method: "GET", body: null, token: token });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
  }, [data]);

  useEffect(() => {
    fetchDataUser();
    if (user.success) {
      login({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
      });
      router.push("/");
    }
  }, [token, user]);

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Login" Level="h1" />
      <form onSubmit={(e) => submitLogin(e)}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Saisissez votre email"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Saisissez votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button type="submit" title="Se connecter" className="btn__secondary" />
      </form>
    </>
  );
};

export default Index;
