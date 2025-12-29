import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { AcademicProject } from '@/data/academicProjectsData';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AcademicProjectCardProps extends AcademicProject {}

const AcademicProjectCard = ({
  title,
  emoji,
  tag,
  subtitle,
  developers,
  abstract,
  overview,
  objectives,
  methods,
  tools,
  results,
  futureWork,
  contributors,
  disclaimer,
  githubUrl,
}: AcademicProjectCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem 
          value={title} 
          className="border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 transition-colors [&[data-state=open]>div>.chevron]:rotate-180">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left flex-1">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              </div>
              <Badge 
                variant={tag === 'Undergraduate' ? 'secondary' : 'default'}
                className={tag === 'Postgraduate' ? 'bg-primary/90 text-primary-foreground' : ''}
              >
                {tag}
              </Badge>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-6 pt-2">
              {/* Subtitle */}
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                {subtitle}
              </p>

              {/* Developers */}
              {developers && developers.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Developed by:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {developers.map((dev, idx) => (
                      <li key={idx}>{dev}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Abstract / Overview */}
              {(abstract || overview) && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {abstract ? 'Abstract' : 'Overview'}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {abstract || overview}
                  </p>
                </div>
              )}

              {/* Objectives */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Objectives</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {objectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Methods & Tools */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Methods</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {methods.map((method, idx) => (
                      <li key={idx}>{method}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Results</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>

              {/* Future Work */}
              {futureWork && futureWork.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Future Work</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    {futureWork.map((work, idx) => (
                      <li key={idx}>{work}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contributors */}
              {contributors && contributors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Contributors</h4>
                  <p className="text-sm text-muted-foreground">
                    {contributors.join(' • ')}
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              {disclaimer && (
                <div className="bg-muted/50 rounded-md p-3 border border-border/50">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Disclaimer
                  </h4>
                  <p className="text-xs text-muted-foreground italic">
                    {disclaimer}
                  </p>
                </div>
              )}

              {/* GitHub Link */}
              <div className="pt-2">
                <Button asChild variant="outline" size="sm">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default AcademicProjectCard;
