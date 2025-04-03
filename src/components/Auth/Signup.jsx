import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase'; // Import initialized app
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc'; // Colorful Google logo

export function Signup() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const auth = getAuth(app); // Initialize auth
      const provider = new GoogleAuthProvider(); // Create provider
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Button onClick={handleGoogleSignup}>
      <FcGoogle className="w-4 h-4 mr-2" />
      Sign up with Google
    </Button>
  );
}