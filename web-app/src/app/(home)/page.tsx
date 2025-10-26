import { GenerationsList } from "@/components/GenerationsList";
import GenerationForm from "./components/GenerationForm";


export default function HomePage() {
 
  return (
      <div className=" bg-var-primary h-screen flex justify-center items-center px-10 pt-30 mb-30">
        <div className=" w-full flex flex-col gap-10">
          <h1 className="text-4xl font-medium text-center">Generate Image</h1>
          <div className="flex  gap-10 ">
            <GenerationForm className="flex-1" />
            <GenerationsList className="flex-1" />
          </div>
        </div>
      </div>
  );
}
