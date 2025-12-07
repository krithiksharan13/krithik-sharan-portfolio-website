
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Trophy } from 'lucide-react';

interface HackathonProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  isWinner?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HackathonProjectCard = ({ title, description, githubUrl, liveUrl, isWinner }: HackathonProjectCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group relative">
        {isWinner && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-yellow-500 text-yellow-950 flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              Winner
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="pr-16">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex gap-2">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </a>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="default" className="w-full" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default HackathonProjectCard;
