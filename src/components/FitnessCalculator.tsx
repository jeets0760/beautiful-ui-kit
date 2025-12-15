import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, Activity, Target, Flame, Heart, Scale } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BMIResult {
  value: number;
  category: string;
  color: string;
  recommendation: string;
  icon: typeof Activity;
  tips: string[];
}

const FitnessCalculator = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateBMI = (): BMIResult => {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const bmiValue = Math.round(bmi * 10) / 10;

    if (bmi < 18.5) {
      return {
        value: bmiValue,
        category: "Underweight",
        color: "from-blue-500 to-cyan-500",
        recommendation: "Focus on building healthy muscle mass with strength training and increased caloric intake.",
        icon: Target,
        tips: [
          "Increase calorie intake with nutrient-dense foods",
          "Focus on strength training to build muscle",
          "Eat more protein-rich foods",
          "Consider our Strength Builder program",
        ],
      };
    } else if (bmi < 25) {
      return {
        value: bmiValue,
        category: "Normal Weight",
        color: "from-emerald-500 to-green-500",
        recommendation: "Great job! Maintain your healthy lifestyle with balanced exercise and nutrition.",
        icon: Heart,
        tips: [
          "Maintain your current balanced routine",
          "Mix cardio with strength training",
          "Stay consistent with healthy eating",
          "Try our Athletic Performance program",
        ],
      };
    } else if (bmi < 30) {
      return {
        value: bmiValue,
        category: "Overweight",
        color: "from-amber-500 to-orange-500",
        recommendation: "Focus on a combination of cardio and strength training with a balanced diet.",
        icon: Flame,
        tips: [
          "Incorporate regular cardio sessions",
          "Reduce processed food intake",
          "Increase daily activity levels",
          "Our Fat Burn Pro program is perfect for you",
        ],
      };
    } else {
      return {
        value: bmiValue,
        category: "Obese",
        color: "from-red-500 to-rose-500",
        recommendation: "Start with low-impact exercises and consult with our trainers for a personalized plan.",
        icon: Activity,
        tips: [
          "Begin with walking and swimming",
          "Focus on sustainable lifestyle changes",
          "Work with a personal trainer",
          "Join our Cardio Endurance program",
        ],
      };
    }
  };

  const result = calculateBMI();
  const bmiPercentage = Math.min(Math.max((result.value - 15) / 25, 0), 1) * 100;

  return (
    <section id="calculator" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 scroll-fade-up ${isVisible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Fitness Assessment
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Calculate Your <span className="text-gradient">BMI</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get personalized fitness recommendations based on your body metrics.
            Start your transformation journey with data-driven insights.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-3xl border border-border p-8 md:p-12 shadow-card">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-fire">
                    <Calculator className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Metrics</h3>
                </div>

                {/* Height Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-muted-foreground">Height</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{height}</span>
                      <span className="text-muted-foreground">cm</span>
                    </div>
                  </div>
                  <Slider
                    value={[height]}
                    onValueChange={(v) => {
                      setHeight(v[0]);
                      setIsCalculated(true);
                    }}
                    min={140}
                    max={220}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>140 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                {/* Weight Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-muted-foreground">Weight</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{weight}</span>
                      <span className="text-muted-foreground">kg</span>
                    </div>
                  </div>
                  <Slider
                    value={[weight]}
                    onValueChange={(v) => {
                      setWeight(v[0]);
                      setIsCalculated(true);
                    }}
                    min={40}
                    max={150}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>40 kg</span>
                    <span>150 kg</span>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${result.color}`}>
                    <Scale className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Your Results</h3>
                </div>

                {/* BMI Display */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${result.color} p-1 animate-pulse-glow`}>
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <span className="text-4xl font-black">{result.value}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                    {result.category}
                  </span>

                  {/* BMI Scale */}
                  <div className="w-full mt-6 space-y-2">
                    <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-red-500 relative overflow-hidden">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg transition-all duration-500"
                        style={{ left: `calc(${bmiPercentage}% - 8px)` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {isCalculated && (
              <div className="mt-10 pt-10 border-t border-border animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <result.icon className={`h-6 w-6`} style={{ color: `hsl(var(--primary))` }} />
                  <h4 className="text-xl font-bold">Personalized Recommendations</h4>
                </div>
                
                <p className="text-muted-foreground mb-6">{result.recommendation}</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {result.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="lg" className="flex-1">
                    Get Your Free Assessment
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    View Recommended Programs
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            BMI is a general indicator and may not reflect individual health status.
            For personalized advice, consult with our certified trainers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FitnessCalculator;