import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const handleLogin = () => {
    const email = "usuario@exemplo.com";
    const password = "senha123";
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuário logado:", userCredential.user);
      })
      .catch((error) => {
        console.error("Erro ao logar:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
