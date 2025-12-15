import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "49",
      period: "month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Access to gym facilities",
        "2 personal training sessions",
        "Basic nutrition guide",
        "Mobile app access",
        "Community forum access",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "99",
      period: "month",
      description: "Most popular choice for serious fitness enthusiasts",
      features: [
        "Everything in Starter",
        "8 personal training sessions",
        "Custom meal planning",
        "Progress tracking",
        "24/7 trainer support",
        "Group class access",
        "Sauna & spa access",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "199",
      period: "month",
      description: "Ultimate package for maximum results",
      features: [
        "Everything in Pro",
        "Unlimited training sessions",
        "1-on-1 nutrition coaching",
        "Weekly body composition",
        "Priority booking",
        "Recovery treatments",
        "Exclusive events access",
        "Premium gear package",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Membership Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Invest in Your <span className="text-gradient">Health</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your goals. All plans include access to our state-of-the-art
            facilities and expert guidance.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-card rounded-2xl p-8 border transition-all duration-500 hover-lift ${
                plan.popular
                  ? "border-primary shadow-glow scale-105 md:scale-110"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-fire text-sm font-semibold text-primary-foreground">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-muted-foreground">$</span>
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include a 7-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;