
import { motion } from 'framer-motion';
import ExperienceCard from '@/components/ExperienceCard';
import ExperienceSection from '@/components/ExperienceSection';
import { professionalExperiences } from '@/data/professionalExperience';
import { otherExperiences } from '@/data/otherExperience';
import { minorExperiences } from '@/data/minorExperience';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {professionalExperiences.map((exp, index) => (
            <ExperienceCard key={`prof-${index}`} {...exp} />
          ))}
        </motion.div>

        <ExperienceSection 
          title="Other Experiences" 
          experiences={otherExperiences} 
          keyPrefix="other" 
        />

        <ExperienceSection 
          title="Minor Experiences" 
          experiences={minorExperiences} 
          keyPrefix="minor" 
        />
      </div>
    </section>
  );
};

export default Experience;
