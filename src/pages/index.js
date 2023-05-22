import Input from "@/components/UI/Input";
import Title from "@/components/UI/Title";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState()

  return (
    <>
      <Title Level="h1" title="Freelance Sosso"/>
      <Title Level="h2" title="Homepage"/>
      <Button type="submit" title="Creer une compagnie" className="btn__secondary" />
      <Button type="submit" title="Creer une freelance" className="btn__secondary" />
      <Title Level="h4" title="Liste de freelances"/>

      
    </>
  )
}