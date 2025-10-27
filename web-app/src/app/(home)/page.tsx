import GenerationsList from "@/components/GenerationsList";
import GenerationForm from "./components/GenerationForm";

export default function HomePage() {
  return (
    <div className="bg-var-primary min-h-screen px-3 md:px-22 py-10 md:py-9">
      <div className=" w-full flex flex-col   gap-3 md:gap-10">
        <h1 className="text-2xl md:text-4xl font-normal text-center">Generate Image</h1>
        <div className="flex flex-col md:flex-row gap-10 max-h-[600px]">
          <GenerationForm className="md:w-1/2 " />
          <GenerationsList className="md:w-1/2 " />
        </div>
      </div>
    </div>
  );
}
