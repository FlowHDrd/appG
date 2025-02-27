import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, isLoading, error, isAuthenticated, clearError } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Clear any previous errors
    clearError();
  }, [isAuthenticated, navigate, clearError]);
  
  const validate = (): boolean => {
    const newErrors: {
      username?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!username.trim()) {
      newErrors.username = 'El usuario es requerido';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      await register(username, phone, password);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Gamepad2 className="h-16 w-16 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Apuestas de Gallos</h2>
          <p className="mt-2 text-sm text-gray-600">
            Crea una cuenta para comenzar
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              <Input
                id="username"
                name="username"
                type="text"
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                autoComplete="username"
                required
              />
              
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                autoComplete="tel"
                required
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                autoComplete="new-password"
                required
              />
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                Registrarse
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600">¿Ya tienes una cuenta? </span>
                <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
                  Inicia Sesión
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;