import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Bell, DollarSign } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { useMatchesStore } from '../store/matchesStore';
import { useBetsStore } from '../store/betsStore';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { matches, isLoading: matchesLoading, fetchMatches } = useMatchesStore();
  const { placeBet } = useBetsStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    fetchMatches();
  }, [isAuthenticated, navigate, fetchMatches]);
  
  const handlePlaceBet = async (matchId: number, cockNumber: 1 | 2, odds: number) => {
    if (!user) return;
    
    // For demo purposes, we'll use a fixed amount
    const amount = 100;
    
    try {
      await placeBet(matchId, amount, cockNumber, odds);
      alert(`Apuesta de $${amount} realizada con éxito!`);
    } catch (error) {
      alert('Error al realizar la apuesta');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Balance and Stats Section */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Saldo y Estadísticas</h2>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Saldo</p>
              <p className="text-xl font-bold text-gray-800">${user?.balance || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Invertido</p>
              <p className="text-xl font-bold text-gray-800">${user?.totalInvested || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Ganancias</p>
              <p className="text-xl font-bold text-green-600">${user?.totalEarnings || 0}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Cockfights Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">VS Gallos</h2>
            <Button variant="outline" size="sm" onClick={() => fetchMatches()}>
              Actualizar
            </Button>
          </div>
          
          {matchesLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        {formatDate(match.startTime)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        match.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        match.status === 'live' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {match.status === 'upcoming' ? 'Próximo' :
                         match.status === 'live' ? 'EN VIVO' :
                         'Finalizado'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-gray-800">{match.cock1}</p>
                        <p className="text-sm text-gray-500">Cuota: {match.odds1.toFixed(2)}</p>
                        {match.status !== 'finished' && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => handlePlaceBet(match.id, 1, match.odds1)}
                            disabled={match.status === 'finished'}
                          >
                            Apostar
                          </Button>
                        )}
                        {match.status === 'finished' && match.winner === 1 && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Ganador
                          </span>
                        )}
                      </div>
                      
                      <div className="mx-4 text-center">
                        <span className="text-xl font-bold text-red-600">VS</span>
                      </div>
                      
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-gray-800">{match.cock2}</p>
                        <p className="text-sm text-gray-500">Cuota: {match.odds2.toFixed(2)}</p>
                        {match.status !== 'finished' && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => handlePlaceBet(match.id, 2, match.odds2)}
                            disabled={match.status === 'finished'}
                          >
                            Apostar
                          </Button>
                        )}
                        {match.status === 'finished' && match.winner === 2 && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Ganador
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              {matches.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No hay peleas disponibles en este momento
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Platform News Section */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Noticias de Plataforma</h2>
            <Bell className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-medium text-gray-800">¡Nueva función de interés compuesto!</p>
                <p className="text-sm text-gray-600">Ahora puedes ganar intereses sobre tus depósitos inactivos.</p>
                <p className="text-xs text-gray-500 mt-1">Hace 2 días</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-medium text-gray-800">Actualización de la plataforma</p>
                <p className="text-sm text-gray-600">Hemos mejorado la velocidad y estabilidad del sistema.</p>
                <p className="text-xs text-gray-500 mt-1">Hace 5 días</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-medium text-gray-800">Programa de referidos mejorado</p>
                <p className="text-sm text-gray-600">Ahora ganas más por cada referido que traigas a la plataforma.</p>
                <p className="text-xs text-gray-500 mt-1">Hace 1 semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;