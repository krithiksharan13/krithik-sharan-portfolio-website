
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-2"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg text-foreground/80 space-y-6 text-center"
        >
          <p>
            Hello! I'm Krithik Sharan, a passionate Data Analyst with 2+ years of expertise in transforming complex data into actionable insights.
          </p>
          <p>
            With a strong background in statistical analysis, data visualization, and machine learning, I help organizations make data-driven decisions that drive growth and innovation.
          </p>
          <p>
            My technical skills include Python, SQL, Tableau, Power BI, and various data analysis tools. I'm constantly learning and adapting to new technologies in the ever-evolving data landscape.
          </p>
          <p>
            When I'm not analyzing data, you might find me gaming, exploring new technologies, or creating content for Youtube.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
