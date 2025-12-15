import { Instagram, Twitter, Linkedin } from "lucide-react";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";

const Trainers = () => {
  const trainers = [
    {
      name: "Marcus Johnson",
      role: "Strength & Conditioning",
      image: trainer1,
      specialties: ["Powerlifting", "Olympic Lifting", "Sports Performance"],
      experience: "12+ years",
      socials: { instagram: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "Sarah Mitchell",
      role: "HIIT & Cardio Specialist",
      image: trainer2,
      specialties: ["HIIT", "Fat Loss", "Nutrition Coaching"],
      experience: "8+ years",
      socials: { instagram: "#", twitter: "#", linkedin: "#" },
    },
    {
      name: "David Chen",
      role: "Bodybuilding Coach",
      image: trainer3,
      specialties: ["Hypertrophy", "Contest Prep", "Posing"],
      experience: "15+ years",
      socials: { instagram: "#", twitter: "#", linkedin: "#" },
    },
  ];

  return (
    <section id="trainers" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Expert Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet Your <span className="text-gradient">Trainers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our certified professionals are dedicated to helping you achieve your fitness goals
            with personalized attention and proven methods.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group relative bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover-lift"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <a
                    href={trainer.socials.instagram}
                    className="p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={trainer.socials.twitter}
                    className="p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={trainer.socials.linkedin}
                    className="p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{trainer.name}</h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {trainer.experience}
                  </span>
                </div>
                <p className="text-primary font-medium mb-4">{trainer.role}</p>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;