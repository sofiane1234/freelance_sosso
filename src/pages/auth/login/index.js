import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Title from "@/components/UI/Title";
import React from "react";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div>
      <Title title="Connexion" Level="h2" />
      <form>
        <Input
          name="email"
          type="email"
          label="Adresse Email"
          placeholder="Veuillez entrer votre adresse email"
          required={true}
          value={email}
          onChange={setEmail.email}
        />

        <Input
          name="password"
          type="password"
          label="Mot de Passe"
          placeholder="Veuillez entrer votre mot de passe"
          required={true}
          value={password}
          onChange={setPassword.password}
        />
        <Button type="submit" title="Se Connecter" className="btn__secondary" />
      </form>
    </div>
  );
};

export default Index;
