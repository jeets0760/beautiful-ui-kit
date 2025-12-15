import { Flame, Dumbbell, Heart, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Programs = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  const programs = [
    {
      icon: Flame,
      title: "Fat Burn Pro",
      description: "High-intensity interval training designed to maximize calorie burn and boost metabolism.",
      duration: "8 Weeks",
      sessions: "24 Sessions",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Dumbbell,
      title: "Strength Builder",
      description: "Progressive resistance training to build lean muscle mass and increase overall strength.",
      duration: "12 Weeks",
      sessions: "36 Sessions",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Heart,
      title: "Cardio Endurance",
      description: "Cardiovascular conditioning to improve stamina, heart health, and overall fitness.",
      duration: "6 Weeks",
      sessions: "18 Sessions",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Zap,
      title: "Athletic Performance",
      description: "Sport-specific training to enhance speed, agility, and competitive edge.",
      duration: "10 Weeks",
      sessions: "30 Sessions",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section id="programs" className="py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 scroll-fade-up ${headerVisible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your <span className="text-gradient">Training Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert-designed programs tailored to your fitness goals. Whether you want to lose weight,
            build muscle, or improve performance.
          </p>
        </div>

        {/* Programs Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover-lift overflow-hidden scroll-fade-up stagger-${index + 1} ${gridVisible ? "visible" : ""}`}
            >
              {/* Background glow */}
              <div
                className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${program.color} mb-6 shadow-lg`}
                >
                  <program.icon className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6">{program.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                    {program.sessions}
                  </span>
                </div>

                {/* CTA */}
                <Button variant="outline" className="group-hover:border-primary group-hover:text-primary">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;