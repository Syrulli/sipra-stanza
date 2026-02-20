import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
// import LogoutButton from '../../components/buttons/LogoutButton';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') redirect('/unauthorized');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-6">Welcome, {session.user?.name}</p>
    </div>
  );
}
