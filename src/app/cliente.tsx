import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';



const ClientePage: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Client Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <main>
        <p>Welcome to the Client Dashboard</p>
      </main>
    </div>
  );
};

export default ClientePage;