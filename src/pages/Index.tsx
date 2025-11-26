import { MadeWithDyad } from "@/components/made-with-dyad";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A1A] relative">
      <AnimatedBackground />
      
      <div className="text-center z-10 relative p-4">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-300">
          Start building your amazing project here!
        </p>
      </div>
      
      <div className="z-10 relative">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;