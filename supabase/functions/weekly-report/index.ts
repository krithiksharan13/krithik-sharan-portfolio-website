
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const allowedOrigins = [
  'https://krithik-sharan-portfolio-website.lovable.app',
  'https://id-preview--059d1d4e-8a5c-4503-ba3a-e6ef0654470e.lovable.app',
]

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin')
  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
      'Access-Control-Allow-Credentials': 'true',
    }
  }
  return {
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  }
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting weekly report generation...')

    // Calculate date range for the past week
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    console.log(`Generating report for period: ${startDate.toISOString()} to ${endDate.toISOString()}`)

    // Get visitor data for the past week
    const { data: weeklyVisitors, error: weeklyError } = await supabase
      .from('visitor_sessions')
      .select('visitor_id, is_new_visitor, time_spent_seconds')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    if (weeklyError) {
      console.error('Error fetching weekly visitors:', weeklyError)
      throw weeklyError
    }

    // Get total lifetime visitors
    const { data: allVisitors, error: allError } = await supabase
      .from('visitor_sessions')
      .select('visitor_id')

    if (allError) {
      console.error('Error fetching all visitors:', allError)
      throw allError
    }

    // Calculate metrics
    const uniqueWeeklyVisitors = new Set(weeklyVisitors?.map(v => v.visitor_id) || []).size
    const newVisitorsThisWeek = weeklyVisitors?.filter(v => v.is_new_visitor).length || 0
    const totalLifetimeVisitors = new Set(allVisitors?.map(v => v.visitor_id) || []).size
    
    const validTimeSpent = weeklyVisitors?.filter(v => v.time_spent_seconds && v.time_spent_seconds > 0) || []
    const averageTimeSpent = validTimeSpent.length > 0 
      ? Math.round(validTimeSpent.reduce((sum, v) => sum + v.time_spent_seconds, 0) / validTimeSpent.length)
      : 0

    console.log('Report metrics:', {
      uniqueWeeklyVisitors,
      newVisitorsThisWeek,
      totalLifetimeVisitors,
      averageTimeSpent
    })

    // Save report to database
    const { error: insertError } = await supabase
      .from('weekly_reports')
      .insert({
        report_date: endDate.toISOString().split('T')[0],
        total_visitors_week: uniqueWeeklyVisitors,
        new_visitors_week: newVisitorsThisWeek,
        total_visitors_lifetime: totalLifetimeVisitors,
        average_time_spent_seconds: averageTimeSpent,
      })

    if (insertError) {
      console.error('Error saving report:', insertError)
      throw insertError
    }

    // Format the report for email
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
    }

    const emailBody = `
🚀 Weekly Website Analytics Report
Generated on: ${endDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}

📊 This Week's Performance:
• Total visitors: ${uniqueWeeklyVisitors}
• New visitors: ${newVisitorsThisWeek}
• Average time spent: ${formatTime(averageTimeSpent)}

📈 Lifetime Statistics:
• Total lifetime visitors: ${totalLifetimeVisitors}
• Growth this week: ${newVisitorsThisWeek} new visitors

🎯 Quick Insights:
• ${newVisitorsThisWeek > 0 ? `Great job! You attracted ${newVisitorsThisWeek} new visitor${newVisitorsThisWeek > 1 ? 's' : ''} this week.` : 'Focus on driving more traffic to attract new visitors.'}
• ${averageTimeSpent > 60 ? 'Excellent engagement! Visitors are spending good time on your site.' : 'Consider improving content to increase visitor engagement time.'}

Keep up the great work building your online presence! 💪

---
This automated report is generated every Saturday from your portfolio website analytics.
    `

    console.log('Weekly report generated successfully')
    console.log('Email content:', emailBody)

    // For now, we're logging the email content
    // In a production environment, you would integrate with an email service like Resend
    // Example with Resend:
    /*
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'analytics@yourdomain.com',
          to: ['krithiksharan13@gmail.com'],
          subject: `Weekly Analytics Report - ${endDate.toLocaleDateString()}`,
          text: emailBody,
        }),
      })
      
      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }
    }
    */
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Weekly report generated successfully',
        report: {
          uniqueWeeklyVisitors,
          newVisitorsThisWeek,
          totalLifetimeVisitors,
          averageTimeSpent,
          emailBody
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error: unknown) {
    console.error('Error in weekly report function:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
