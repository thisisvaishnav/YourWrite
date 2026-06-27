import { useState } from "react";
import "../../styles/globals.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { Loader2 } from "lucide-react";

interface FormProps {
  onStart: () => void;
}

export function Form({ onStart }: FormProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    if (!githubUrl || !linkedinUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // Clean URLs before sending
      const cleanGithub = githubUrl.trim();
      const cleanLinkedin = linkedinUrl.trim();
      
      await axios.post(`${BACKEND_URL}/api/v1/interview`, {
        githubUrl: cleanGithub,
        linkedinUrl: cleanLinkedin
      });
      
      toast.success("Profile loaded successfully!");
      onStart();
    } catch (error) {
      console.error(error);
      toast.error("Backend offline. Starting interview in demo mode...");
      // Allow proceeding in demo/mock mode even if backend is offline
      setTimeout(() => {
        onStart();
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full shadow-md border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">AI Interview Kickstart</CardTitle>
          <CardDescription>
            Enter your profiles to generate a tailored technical interview based on your background.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile URL</Label>
            <Input
              id="github"
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparing interview...
              </>
            ) : (
              "Start Interview"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}