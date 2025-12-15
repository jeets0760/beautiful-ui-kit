import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dumbbell,
  LogOut,
  User,
  Flame,
  Heart,
  Zap,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  sessions: string;
  icon: string;
  color: string;
  price: number;
}

interface Enrollment {
  id: string;
  program_id: string;
  status: string;
  enrolled_at: string;
}

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Dumbbell,
  Heart,
  Zap,
};

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch programs
      const { data: programsData, error: programsError } = await supabase
        .from("programs")
        .select("*");

      if (programsError) throw programsError;
      setPrograms(programsData || []);

      // Fetch user enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from("user_enrollments")
        .select("*")
        .eq("user_id", user!.id);

      if (enrollmentsError) throw enrollmentsError;
      setEnrollments(enrollmentsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error loading data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (programId: string) => {
    if (!user) return;
    setEnrollingId(programId);

    try {
      const { error } = await supabase.from("user_enrollments").insert({
        user_id: user.id,
        program_id: programId,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already enrolled",
            description: "You are already enrolled in this program.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully enrolled!",
          description: "You have been enrolled in the program.",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      toast({
        title: "Enrollment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setEnrollingId(null);
    }
  };

  const handleUnenroll = async (programId: string) => {
    if (!user) return;
    setEnrollingId(programId);

    try {
      const { error } = await supabase
        .from("user_enrollments")
        .delete()
        .eq("user_id", user.id)
        .eq("program_id", programId);

      if (error) throw error;

      toast({
        title: "Unenrolled",
        description: "You have been removed from the program.",
      });
      fetchData();
    } catch (error) {
      console.error("Error unenrolling:", error);
      toast({
        title: "Failed to unenroll",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setEnrollingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isEnrolled = (programId: string) => {
    return enrollments.some((e) => e.program_id === programId);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-fire">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Personal<span className="text-gradient">Trainerz</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-fire flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="hidden md:inline text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient">{user?.user_metadata?.full_name || "Champion"}</span>!
          </h1>
          <p className="text-muted-foreground">
            Manage your fitness programs and track your progress.
          </p>
        </div>

        {/* My Programs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">My Programs</h2>
          {enrollments.length === 0 ? (
            <div className="bg-gradient-card rounded-2xl border border-border p-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No programs yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your fitness journey by enrolling in a program below.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs
                .filter((p) => isEnrolled(p.id))
                .map((program) => {
                  const Icon = iconMap[program.icon] || Flame;
                  return (
                    <div
                      key={program.id}
                      className="bg-gradient-card rounded-2xl border border-primary/50 p-6 relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                          Enrolled
                        </div>
                      </div>
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${program.color} mb-4`}>
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                      <div className="flex gap-2 mb-6">
                        <span className="px-2 py-1 rounded-full bg-secondary text-xs">{program.duration}</span>
                        <span className="px-2 py-1 rounded-full bg-secondary text-xs">{program.sessions}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleUnenroll(program.id)}
                        disabled={enrollingId === program.id}
                      >
                        {enrollingId === program.id ? "Processing..." : "Unenroll"}
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
        </section>

        {/* Available Programs */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Available Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => {
              const Icon = iconMap[program.icon] || Flame;
              const enrolled = isEnrolled(program.id);

              return (
                <div
                  key={program.id}
                  className={`bg-gradient-card rounded-2xl border p-6 transition-all duration-300 hover-lift ${
                    enrolled ? "border-primary/50" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${program.color} mb-4`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{program.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs">{program.duration}</span>
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs">{program.sessions}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${program.price}</span>
                  </div>
                  <Button
                    variant={enrolled ? "outline" : "hero"}
                    size="sm"
                    className="w-full"
                    onClick={() => enrolled ? handleUnenroll(program.id) : handleEnroll(program.id)}
                    disabled={enrollingId === program.id}
                  >
                    {enrollingId === program.id
                      ? "Processing..."
                      : enrolled
                      ? "Unenroll"
                      : "Enroll Now"}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;