import "styles/globals.css";
import { Form } from "./components/Form";
import { useState } from "react";
import { Interview } from "./components/Interview";
import { Result } from "./components/Result";
import { Toaster } from "./components/ui/sonner";

export function App() {
  const [page, setPage] = useState<"Form" | "Interview" | "Result">("Form");

  const containerClass = page === "Result" 
    ? "w-full max-w-4xl mx-auto p-4 md:p-6" 
    : "w-full max-w-md mx-auto p-4";

  return (
    <div className={containerClass}>
      {page === "Form" && <Form onStart={() => setPage("Interview")} />}
      {page === "Interview" && <Interview onComplete={() => setPage("Result")} />}
      {page === "Result" && <Result onRestart={() => setPage("Form")} />}
      <Toaster />
    </div>
  );
}



