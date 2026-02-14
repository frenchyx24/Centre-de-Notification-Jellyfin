import AnimatedBackground from "@/components/AnimatedBackground";
import NotificationDashboard from "@/components/NotificationDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0A0A1A] relative overflow-x-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 pt-12 pb-20">
        <NotificationDashboard />
      </div>
    </div>
  );
};

export default Index;