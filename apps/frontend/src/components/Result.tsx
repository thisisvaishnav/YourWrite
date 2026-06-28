import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, ChevronRight, Award, Brain, Compass, Sparkles, RefreshCw } from "lucide-react";
import { DonutGauge } from "./charts/DonutGauge";
import { RadarChart } from "./charts/RadarChart";

interface ResultProps {
  onRestart: () => void;
}

interface MetricDetail {
  name: string;
  score: number;
  color: string;
  strength: string;
  advice: string;
}

export function Result({ onRestart }: ResultProps) {
  const [activeMetric, setActiveMetric] = useState<string>("Technical Depth");

  const metrics: MetricDetail[] = [
    {
      name: "Technical Depth",
      score: 85,
      color: "bg-emerald-500",
      strength: "Strong articulation of database index mechanics, caching strategies, and concurrency control.",
      advice: "Try describing concrete memory management profiling tools (e.g. Chrome DevTools, Go pprof) you used to detect bottlenecks in past projects."
    },
    {
      name: "Communication",
      score: 90,
      color: "bg-emerald-500",
      strength: "Highly structured explanation using precise engineering terminology. Excellent response sequencing.",
      advice: "Ensure you clearly align technical choices back to the business domain or product impact when explaining tradeoffs."
    },
    {
      name: "Problem Solving",
      score: 78,
      color: "bg-amber-500",
      strength: "Logical systematic breakdown of the complex bugs and step-by-step trace approach.",
      advice: "State space/time complexity tradeoffs (Big O notation) upfront when evaluating alternative algorithms."
    },
    {
      name: "Coding Speed",
      score: 82,
      color: "bg-emerald-500",
      strength: "High clarity in initial scaffolding steps and efficient pseudocoding of layout layers.",
      advice: "Practice dry-running edge cases (null values, boundary sizes) before submitting code to reduce cycle iterations."
    },
    {
      name: "Architecture",
      score: 75,
      color: "bg-amber-500",
      strength: "Good understanding of component boundaries, API payloads, and clean routing splits.",
      advice: "Elaborate more on horizontal scaling options, caching layers, CDN distributions, and DB replicas under peak load."
    }
  ];

  const overallScore = Math.round(metrics.reduce((acc, curr) => acc + curr.score, 0) / metrics.length);
  const activeDetail = metrics.find((m) => m.name === activeMetric) || metrics[0]!;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col items-center text-center space-y-2 p-6 bg-card border rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
        
        <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full w-fit animate-fade-in">
          <CheckCircle2 className="h-8 w-8 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
          Evaluation Complete
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Your profile analysis and technical answers have been processed by our AI agent. See your breakdown below.
        </p>
      </div>

      {/* Main Grid: Visuals vs Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Column 1: Performance Visualizations (Donut & Radar) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Card className="shadow-sm border-border bg-card/60 backdrop-blur-md overflow-hidden flex flex-col items-center p-6 text-center">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Match Indicators
            </h3>
            
            <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center gap-8 w-full">
              <DonutGauge value={overallScore} size={150} label="Job Match" />
              
              <div className="border-t sm:border-t-0 sm:border-l md:border-l-0 md:border-t border-border/60 w-full sm:w-px md:w-full h-px sm:h-20 md:h-px my-2 sm:my-0 md:my-2" />
              
              <RadarChart 
                data={metrics.map(m => ({ name: m.name, score: m.score }))} 
                size={220}
                activeKey={activeMetric}
                onActiveKeyChange={setActiveMetric}
              />
            </div>
            
            <span className="text-[10px] text-muted-foreground mt-4 italic">
              * Click axes or points on the radar to inspect details.
            </span>
          </Card>
        </div>

        {/* Column 2: Detailed Breakdown & Feedback */}
        <div className="md:col-span-7 flex flex-col">
          <Card className="flex-1 shadow-sm border-border bg-card/60 backdrop-blur-md flex flex-col justify-between">
            <CardHeader className="border-b pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Dimension Breakdown
                </CardTitle>
                <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                  {activeDetail.score}%
                </div>
              </div>
              <CardDescription>
                Detailed assessment and recommended learning plan.
              </CardDescription>
            </CardHeader>

            <CardContent className="py-6 space-y-6 flex-1">
              {/* Category selector pill tabs */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {metrics.map((m) => {
                  const isActive = m.name === activeMetric;
                  return (
                    <button
                      key={m.name}
                      onClick={() => setActiveMetric(m.name)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted/50 hover:bg-muted text-muted-foreground border-transparent"
                      }`}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>

              {/* Active Metric Score Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>{activeDetail.name} Rating</span>
                  <span>{activeDetail.score} / 100</span>
                </div>
                <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-primary rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${activeDetail.score}%` }}
                  />
                </div>
              </div>

              {/* Strengths */}
              <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  Key Strengths
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {activeDetail.strength}
                </p>
              </div>

              {/* Areas of growth / AI recommendation */}
              <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/20 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center gap-1.5">
                  <Compass className="h-4 w-4" />
                  Actionable Recommendations
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {activeDetail.advice}
                </p>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4 flex gap-3">
              <Button onClick={onRestart} className="w-full flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Restart Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

