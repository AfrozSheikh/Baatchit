import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4 sm:p-6 md:p-8">
    <div className="border border-primary/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
      {/* LOGIN FORM SECTION */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
        {/* LOGO */}
        <div className="mb-6 flex items-center justify-start gap-3">
          <ShipWheelIcon className="size-10 text-primary" />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-wider">
            ConnectEra
          </span>
        </div>
  
        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="alert alert-error mb-6 animate-fade-in">
            <span>{error.response.data.message}</span>
          </div>
        )}
  
        <div className="w-full">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-base-content">Welcome Back</h2>
                <p className="text-sm opacity-80 mt-2">
                  Sign in to your account to continue your language journey
                </p>
              </div>
  
              <div className="flex flex-col gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="input input-bordered w-full focus:ring-2 ring-primary/50"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
  
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full focus:ring-2 ring-primary/50"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
  
                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-2 hover:bg-primary/90 transition-colors duration-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
  
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline hover:text-primary/80">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  
      {/* IMAGE SECTION */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
        <div className="max-w-md p-8">
          {/* Illustration */}
          <div className="relative aspect-square max-w-sm mx-auto">
            <img 
              src="/i.png" 
              alt="Language connection illustration" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
  
          <div className="text-center space-y-3 mt-6">
            <h2 className="text-xl font-semibold text-base-content">
              Connect with language partners worldwide
            </h2>
            <p className="opacity-80">
              Practice conversations, make friends, and improve your language skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
export default LoginPage;
