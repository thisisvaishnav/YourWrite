import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface ResultProps {
  onRestart: () => void;
}

export function Result({ onRestart }: ResultProps) {
  const scores = [
    { name: "Technical Depth", score: 85, color: "bg-emerald-500" },
    { name: "Communication", score: 90, color: "bg-emerald-500" },
    { name: "Problem Solving", score: 78, color: "bg-amber-500" }
  ];

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full shadow-md border-border bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto my-2 p-2 bg-emerald-500/10 text-emerald-500 rounded-full w-fit">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Interview Evaluation</CardTitle>
          <CardDescription>
            Here is a breakdown of your simulated technical interview performance.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Scores list */}
          <div className="space-y-4">
            {scores.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.score}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Feedback section */}
          <div className="p-4 bg-muted/40 border border-border/50 rounded-lg space-y-2">
            <h4 className="text-sm font-semibold text-foreground">AI Feedback & Insights</h4>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="h-3 w-3 shrink-0 text-emerald-500 mt-0.5" />
                <span>Great articulation of architectural challenges and database bottlenecks.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="h-3 w-3 shrink-0 text-emerald-500 mt-0.5" />
                <span>Consider elaborating more on horizontal scaling options next time.</span>
              </li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-2">
          <Button onClick={onRestart} className="w-full">
            Restart Assessment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
