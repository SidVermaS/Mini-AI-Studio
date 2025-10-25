
import Header from "@/components/Header";
import GenerationForm from "./components/GenerationForm";

export default function HomePage() {  
  return (
   <>
    <Header />
    <div className="bg-var-primary h-screen flex justify-center items-center gap-10 px-10">
      <GenerationForm />

      <GenerationForm />
    </div>
   </>
  );
}