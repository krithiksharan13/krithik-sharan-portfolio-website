
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import VisitorCount from '@/components/VisitorCount';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { educationData } from '@/data/educationData';
import { projects } from '@/data/projectsData';

const SectionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className={`py-16 md:py-20 ${className}`}
    >
        {children}
    </motion.section>
);

const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
    </div>
);

const Index = () => {
  const featuredProjects = projects.slice(0, 3);
  return (
    <div>
      <Hero />
      
      <SectionWrapper className="bg-card/20">
        <div className="container mx-auto px-4">
            <SectionHeader title="About Me" />
            <div className="max-w-3xl mx-auto text-center text-lg text-foreground/80 space-y-4 mb-8">
                <p>
                    Hello! I'm Krithik Sharan, a passionate Data Analyst with 2+ years of expertise in transforming complex data into actionable insights.
                </p>
                <p>
                    With a strong background in statistical analysis, data visualization, and machine learning, I help organizations make data-driven decisions that drive growth and innovation.
                </p>
            </div>
            <div className="text-center">
                <RouterLink to="/about">
                    <Button variant="secondary">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </RouterLink>
            </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="container mx-auto px-4">
            <SectionHeader title="Latest Experience" />
            <div className="max-w-3xl mx-auto text-center text-lg text-foreground/80 space-y-4 mb-8">
                <h3 className="text-2xl font-semibold text-primary">Data Analyst-BI Developer</h3>
                <p className="font-medium text-xl">Radiant Ventures | November 2024 - September 2025</p>
                <p>
                  Led data analysis initiatives across multiple departments, developed interactive dashboards, and implemented machine learning models to predict the Risk Factor of Investment.
                </p>
            </div>
            <div className="text-center">
                <RouterLink to="/experience">
                    <Button variant="secondary">
                        View All Experience <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </RouterLink>
            </div>
        </div>
      </SectionWrapper>
      
      <SectionWrapper className="bg-card/20">
        <div className="container mx-auto px-4">
            <SectionHeader title="Education" />
            <div className="max-w-3xl mx-auto text-lg text-foreground/80 space-y-8 mb-8">
              {educationData.map((edu, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-primary">{edu.institution}</h3>
                  <p className="font-medium text-foreground/70">{edu.location}</p>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-foreground/80">{edu.grade}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
                <RouterLink to="/education">
                    <Button variant="secondary">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </RouterLink>
            </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
          <div className="container mx-auto px-4">
            <SectionHeader title="Featured Projects" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
            <div className="text-center">
              <RouterLink to="/portfolio">
                <Button variant="secondary">
                  View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RouterLink>
            </div>
          </div>
      </SectionWrapper>

      <SectionWrapper className="bg-card/20">
        <div className="container mx-auto px-4 text-center">
            <SectionHeader title="Get In Touch" />
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-8">
                I'm always open to discussing new projects and opportunities. Let's connect!
            </p>
            <RouterLink to="/contact">
                <Button size="lg">Contact Me</Button>
            </RouterLink>
            <div className="mt-6">
                <VisitorCount />
            </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Index;
