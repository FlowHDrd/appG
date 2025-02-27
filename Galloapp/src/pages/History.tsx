import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Check, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { useBetsStore } from '../store/betsStore';

const History: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { bets, isLoading, fetchUserBets } = useBetsStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchUserBets();
  }, [isAuthenticated, navigate, fetchUserBets]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Historial de Apuestas</h1>
          <Clock className="h-6 w-6 text-red-600" />
        </div>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Mis Apuestas</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {bets.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gallo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Potencial
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bets.map((bet) => (
                        <tr key={bet.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(bet.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">${bet.amount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Gallo {bet.selectedCock}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600">${bet.potentialWin}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {bet.status === 'pending' ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pendiente
                              </span>
                            ) : bet.status === 'won' ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                <Check className="h-4 w-4 mr-1" />
                                Ganada
                              </span>
                            ) : (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                <X className="h-4 w-4 mr-1" />
                                Perdida
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No tienes apuestas realizadas</p>
                    <p className="text-sm mt-2">Realiza tu primera apuesta para comenzar</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Total Apostado</p>
              <p className="text-2xl font-bold text-gray-800">
                ${bets.reduce((sum, bet) => sum + bet.amount, 0)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Ganancias</p>
              <p className="text-2xl font-bold text-green-600">
                ${bets.filter(bet => bet.status === 'won').reduce((sum, bet) => sum + bet.potentialWin, 0)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-500">Apuestas Ganadas</p>
              <p className="text-2xl font-bold text-gray-800">
                {bets.filter(bet => bet.status === 'won').length} / {bets.length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default History;