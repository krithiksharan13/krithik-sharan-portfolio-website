
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  const sessionStartRef = useRef<Date | null>(null);
  const visitorIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    const startTracking = async () => {
      // Generate a visitor ID (browser fingerprint)
      const getVisitorId = () => {
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
          visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_id', visitorId);
        }
        return visitorId;
      };

      // Check if this is a new visitor
      const isNewVisitor = !localStorage.getItem('has_visited');
      if (isNewVisitor) {
        localStorage.setItem('has_visited', 'true');
      }

      visitorIdRef.current = getVisitorId();
      sessionStartRef.current = new Date();

      try {
        // Insert visitor session
        const { data, error } = await supabase
          .from('visitor_sessions')
          .insert({
            visitor_id: visitorIdRef.current,
            page_url: window.location.href,
            is_new_visitor: isNewVisitor,
            session_start: sessionStartRef.current.toISOString(),
          })
          .select('id')
          .maybeSingle();

        if (error) {
          console.error('Error tracking visitor:', error);
          return;
        }

        if (data) {
          sessionIdRef.current = data.id;
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    startTracking();

    // Track session end on page unload
    const handleBeforeUnload = async () => {
      if (sessionIdRef.current && sessionStartRef.current) {
        const timeSpent = Math.floor((Date.now() - sessionStartRef.current.getTime()) / 1000);
        
        try {
          await supabase
            .from('visitor_sessions')
            .update({
              session_end: new Date().toISOString(),
              time_spent_seconds: timeSpent,
            })
            .eq('id', sessionIdRef.current);
        } catch (error) {
          console.error('Error updating session end:', error);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Also call on component unmount
    };
  }, []);
};
