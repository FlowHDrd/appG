import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Link as LinkIcon, Copy } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useReferralsStore } from '../store/referralsStore';

const Team: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { referrals, totalEarnings, isLoading, fetchReferrals } = useReferralsStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchReferrals();
  }, [isAuthenticated, navigate, fetchReferrals]);
  
  const copyReferralLink = () => {
    if (!user?.referralCode) return;
    
    const referralLink = `https://apuestas-de-gallos.com/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert('Enlace de referido copiado al portapapeles');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Mi Equipo</h1>
          <Users className="h-6 w-6 text-red-600" />
        </div>
        
        {/* Referral Link Card */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Enlace de Referido</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <LinkIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 truncate">
                  https://apuestas-de-gallos.com/register?ref={user?.referralCode || 'CODIGO'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyReferralLink}
                className="flex-shrink-0"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copiar
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>Comparte este enlace con tus amigos y gana el 5% de sus apuestas.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Earnings Summary Card */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Resumen de Ganancias</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500">Total de Referidos</p>
                <p className="text-2xl font-bold text-gray-800">{referrals.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <p className="text-sm text-gray-500">Ganancias Totales</p>
                <p className="text-2xl font-bold text-green-600">${totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Referrals List */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Mis Referidos</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {referrals.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Registro
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ganancias
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referrals.map((referral) => (
                        <tr key={referral.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{referral.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{formatDate(referral.joinDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600">${referral.earnings}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aún no tienes referidos</p>
                    <p className="text-sm mt-2">Comparte tu enlace para comenzar a ganar</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Team;