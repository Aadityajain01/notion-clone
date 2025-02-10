import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse p-4"  >
      <ArrowLeftCircle className="w-10 h-10" />
      <h1  className="font-semibold" >Get Started With Creating A New Document</h1>
    </main>
  );
}
