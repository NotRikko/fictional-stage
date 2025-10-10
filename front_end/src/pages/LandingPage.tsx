import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen">
      <img
        src="https://i.redd.it/qjwutpau2fhe1.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter brightness-45"
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full h-full">
        <h1 className="text-white text-6xl font-bold">Fictional Stage</h1>
        <button
          onClick={() => navigate("/round")}
          className="px-4 py-2 bg-white/20 border border-white rounded-lg text-white text-3xl font-bold hover:bg-white/30 transition"
        >
          Enter
        </button>
      </div>
    </div>
  );
}