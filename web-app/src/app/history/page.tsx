import GenerationsList from "@/components/GenerationsList";
import GenerationForm from "./components/GenerationForm";

export default function HomePage() {
  return (
    <div className="bg-var-primary min-h-screen px-3 md:px-22  py-16 md:py-17">
      <div className=" w-full flex flex-col   gap-3 md:gap-3">
        <h1 className="text-2xl md:text-4xl font-normal text-center">History</h1>
        <div className="flex justify-center max-h-[600px]">
          <GenerationsList className="md:w-1/2 " />
        </div>
      </div>
    </div>
  );
}
