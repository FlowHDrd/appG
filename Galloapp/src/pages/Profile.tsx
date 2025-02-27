import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Upload, DollarSign, Lock, Award, Settings } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Depósito de $${depositAmount} solicitado. Pendiente de validación.`);
    setDepositAmount('');
    setIsDepositModalOpen(false);
  };
  
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Retiro de $${withdrawAmount} solicitado. Pendiente de validación.`);
    setWithdrawAmount('');
    setIsWithdrawModalOpen(false);
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
          <User className="h-6 w-6 text-red-600" />
        </div>
        
        {/* Profile Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img
                  src={user.profilePicture || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"}
                  alt={user.username}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full">
                  <Upload size={16} />
                </button>
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
                <p className="text-sm text-gray-500">Miembro desde Enero 2025</p>
                {user.isVip && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                    <Award className="h-3 w-3 mr-1" />
                    VIP
                  </span>
                )}
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto text-center">
                <p className="text-sm text-gray-500">Saldo Disponible</p>
                <p className="text-2xl font-bold text-gray-800">${user.balance}</p>
                <div className="mt-2 flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => setIsDepositModalOpen(true)}
                  >
                    Recargar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsWithdrawModalOpen(true)}
                  >
                    Retirar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Settings */}
        <Card>
          <CardHeader className="flex items-center">
            <Settings className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Configuración de Cuenta</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">Cambiar Contraseña</p>
                  <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso</p>
                </div>
                <Button variant="outline" size="sm">
                  <Lock className="h-4 w-4 mr-1" />
                  Cambiar
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">Validar Nombre</p>
                  <p className="text-sm text-gray-500">Verifica tu identidad para retiros</p>
                </div>
                <Button variant="outline" size="sm">Validar</Button>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">Contraseña de Retiro</p>
                  <p className="text-sm text-gray-500">Añade una capa extra de seguridad</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* VIP Center */}
        <Card>
          <CardHeader className="flex items-center">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Centro VIP</h2>
          </CardHeader>
          <CardContent>
            {user.isVip ? (
              <div className="space-y-4">
                <p className="text-gray-700">Disfruta de tus beneficios exclusivos como miembro VIP:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Retiros prioritarios</li>
                  <li>Atención al cliente 24/7</li>
                  <li>Cuotas mejoradas en apuestas</li>
                  <li>Bonificaciones exclusivas</li>
                  <li>Acceso a eventos especiales</li>
                </ul>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-700 mb-4">Conviértete en miembro VIP para acceder a beneficios exclusivos</p>
                <Button>Actualizar a VIP</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* My Rewards */}
        <Card>
          <CardHeader className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Mi Recompensa</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Interés Compuesto Acumulado</p>
                  <p className="text-xl font-bold text-green-600">$45.20</p>
                </div>
                <Button size="sm">Reclamar</Button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Tus fondos inactivos generan un 0.5% de interés diario</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recargar Cuenta</h3>
              <form onSubmit={handleDeposit}>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Monto a Depositar ($)"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="10"
                    required
                  />
                  <div className="text-sm text-gray-500">
                    <p>Métodos de pago disponibles:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Transferencia Bancaria</li>
                      <li>Tarjeta de Crédito/Débito</li>
                      <li>Billeteras Electrónicas</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDepositModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Continuar</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Retirar Efectivo</h3>
              <form onSubmit={handleWithdraw}>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Monto a Retirar ($)"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    min="10"
                    max={user.balance.toString()}
                    required
                  />
                  <div className="text-sm text-gray-500">
                    <p>Información importante:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>Comisión por retiro: 2%</li>
                      <li>Tiempo de procesamiento: 24-48 horas</li>
                      <li>Monto mínimo: $10</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsWithdrawModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Solicitar Retiro</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;