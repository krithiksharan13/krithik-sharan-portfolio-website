import ProjectCard from '../components/ProjectCard';
import HackathonProjectCard from '../components/HackathonProjectCard';
import AcademicProjectCard from '../components/AcademicProjectCard';
import { motion } from 'framer-motion';
import { projects } from '@/data/projectsData';
import { hackathonProjects } from '@/data/hackathonProjectsData';
import { academicProjects } from '@/data/academicProjectsData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Portfolio = () => {
  return (
    <div className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Portfolio</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>

        {/* Hackathon Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Hackathon Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hackathonProjects.map((project) => (
            <HackathonProjectCard key={project.title} {...project} />
          ))}
        </motion.div>

        {/* Academic Projects Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold">📘 Academic Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {academicProjects.map((project) => (
            <AcademicProjectCard key={project.title} {...project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
