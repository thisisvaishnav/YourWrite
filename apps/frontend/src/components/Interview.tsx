import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

interface InterviewProps {
  onComplete: () => void;
}

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: "Tell us about a challenging repository or project on your GitHub. What was the architecture and how did you resolve technical bottlenecks?"
  },
  {
    id: 2,
    question: "How do you keep up with modern engineering practices, and which frameworks/tools are you most eager to utilize in this role?"
  }
];

export function Interview({ onComplete }: InterviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = SAMPLE_QUESTIONS[currentStep];

  const handleNext = () => {
    if (!answers[currentQuestion.id]?.trim()) {
      toast.error("Please provide an answer before continuing.");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (!answers[currentQuestion.id]?.trim()) {
      toast.error("Please provide an answer before submitting.");
      return;
    }

    setIsSubmitting(true);
    toast.success("Submitting responses...");
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full shadow-md border-border bg-card">
        <CardHeader>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              AI Assessment
            </span>
            <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              Question {currentStep + 1} of {SAMPLE_QUESTIONS.length}
            </span>
          </div>
          <CardTitle className="text-xl font-bold">Technical Interview</CardTitle>
          <CardDescription>
            Provide your response in the field below. Speak to your actual technical experience.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/40 border border-border/50 rounded-lg text-sm font-medium leading-relaxed text-foreground">
            {currentQuestion?.question}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Type your response here..."
              className="min-h-[140px] text-sm"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 border-t pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
          >
            Back
          </Button>

          {currentStep < SAMPLE_QUESTIONS.length - 1 ? (
            <Button onClick={handleNext} disabled={isSubmitting}>
              Next Question
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Evaluating..." : "Submit Answers"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}