import { useState, useEffect } from 'react';

export default function DailyStats() {
  const [stats, setStats] = useState({ dailyCount: 0, userRank: 0 });

  useEffect(() => {
    // Get today's count from localStorage
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('dailyStats');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.date === today) {
        setStats({ dailyCount: data.count, userRank: data.rank });
      } else {
        // New day, reset
        localStorage.setItem('dailyStats', JSON.stringify({ date: today, count: 0, rank: 0 }));
      }
    } else {
      localStorage.setItem('dailyStats', JSON.stringify({ date: today, count: 0, rank: 0 }));
    }
  }, []);

  const incrementCount = () => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('dailyStats');
    const data = storedData ? JSON.parse(storedData) : { date: today, count: 0, rank: 0 };
    
    const newCount = data.count + 1;
    const newRank = data.rank || newCount;
    
    const updated = { date: today, count: newCount, rank: newRank };
    localStorage.setItem('dailyStats', JSON.stringify(updated));
    setStats({ dailyCount: newCount, userRank: newRank });
  };

  // Expose increment function via ref or context if needed
  useEffect(() => {
    window.incrementDailyStats = incrementCount;
  }, []);

  if (stats.dailyCount === 0) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.2))',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center',
      border: '1px solid rgba(138, 43, 226, 0.3)'
    }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        🎨 Today's Activity
      </div>
      <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
        Today's uses: <strong>{stats.dailyCount}</strong> — You: <strong>#{stats.userRank}</strong>
      </div>
    </div>
  );
}
