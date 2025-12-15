import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Torres",
      role: "Lost 45 lbs in 6 months",
      content:
        "Personal Trainerz completely changed my life. The trainers are incredibly knowledgeable and supportive. I never thought I could achieve these results!",
      rating: 5,
      avatar: "MT",
    },
    {
      name: "Emily Rodriguez",
      role: "Marathon Runner",
      content:
        "The athletic performance program prepared me for my first marathon. The structured training and nutrition advice were game-changers.",
      rating: 5,
      avatar: "ER",
    },
    {
      name: "James Wilson",
      role: "Gained 20 lbs of muscle",
      content:
        "I've tried many gyms, but none compare to Personal Trainerz. The personalized approach and attention to form made all the difference.",
      rating: 5,
      avatar: "JW",
    },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our <span className="text-gradient">Members Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real transformations from real people. Join thousands who have achieved their fitness
            goals with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-8 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-fire flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;