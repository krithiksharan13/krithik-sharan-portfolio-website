
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

const VisitorCount = () => {
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_total_visitor_count');

        if (error) {
          console.error('Error fetching visitor count:', error);
          return;
        }

        setTotalVisitors(data || 0);
      } catch (error) {
        console.error('Error in visitor count fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-foreground/60">
        <Users className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Loading visitor count...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 text-foreground/60">
      <Users className="h-4 w-4" />
      <span className="text-sm">
        {totalVisitors.toLocaleString()} {totalVisitors === 1 ? 'visitor' : 'visitors'}
      </span>
    </div>
  );
};

export default VisitorCount;
