import "styles/globals.css";
import { Form } from "./components/Form";
import { useState } from "react";
import { Interview } from "./components/Interview";
import { Result } from "./components/Result";
import { Toaster } from "./components/ui/sonner";

export function App() {
  const [page, setPage] = useState<"Form" | "Interview" | "Result">("Form");

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {page === "Form" && <Form onStart={() => setPage("Interview")} />}
      {page === "Interview" && <Interview onComplete={() => setPage("Result")} />}
      {page === "Result" && <Result onRestart={() => setPage("Form")} />}
      <Toaster />
    </div>
  );
}



