// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../lib/axios";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormDAta] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormDAta({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axiosInstance.post("/auth/signup", formData);
//       console.log("signup successful ");
//       navigate("/");
//     } catch (err) {
//       console.error("signup error: ", err.message);
//       setError(err.response?.data.message || "something went wrong");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             className="w-full p-2 mb-2 border rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-2 mb-4 border rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             className="w-full p-2 mb-4 border rounded"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             className="w-full p-2 mb-4 border rounded"
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//           >
//             Sign up
//           </button>
//         </form>
//         <p>
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-500 hover:underline cursor-pointer"
//           >
//             Log In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// import {
//   Eye,
//   EyeOff,
//   Loader2,
//   Lock,
//   Mail,
//   MessageSquare,
//   PersonStanding,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { userAuthStore } from "../store/authStore";
// import toast from "react-hot-toast";

// export default function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     password: "",
//   });

//   const { signup, isSigningUp } = userAuthStore();

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("full name is required");
//     if (!formData.username.trim()) return toast.error("username is required");
//     if (!formData.email.trim()) return toast.error("email is required");

//     if (formData.password.length < 6)
//       return toast.error("password length should be greater than 6");

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = validateForm();

//     if (success === true) signup(formData);
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* logo */}
//           <div className="flex flex-col items-center gap-2 group">
//             <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//               <MessageSquare className="size-6 text-primary" />
//             </div>
//             <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//             <p className="text-base-content/60">
//               Get Started with your free account
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Full Name</span>
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="size-5 text-base-content/40" />
//               </div>
//               <input
//                 type="text"
//                 className={`input input-bordered w-full pl-10`}
//                 placeholder="John Doe"
//                 value={formData.fullName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, fullName: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Username</span>
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <PersonStanding className="size-5 text-base-content/40" />
//               </div>
//               <input
//                 type="username"
//                 className={`input input-bordered w-full pl-10`}
//                 placeholder="username"
//                 value={formData.username}
//                 onChange={(e) =>
//                   setFormData({ ...formData, username: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Email</span>
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="size-5 text-base-content/40" />
//               </div>
//               <input
//                 type="email"
//                 className={`input input-bordered w-full pl-10`}
//                 placeholder="youremail@gmail.com"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Password</span>
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="size-5 text-base-content/40" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className={`input input-bordered w-full pl-10`}
//                 placeholder="********"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="size-5 text-base-content/40" />
//                 ) : (
//                   <Eye className="size-5 text-base-content/40" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-full"
//             disabled={isSigningUp}
//           >
//             {isSigningUp ? (
//               <>
//                 <Loader2 className="size-5 animate-spin" />
//                 Loading...
//               </>
//             ) : (
//               "create account"
//             )}
//           </button>
//         </form>

//         <div className="text-center">
//           <p className="text-base-content/60">
//             Already have an account?{" "}
//             <Link to="/login" className="link link-primary">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  PersonStanding,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const { signup, isSigningUp } = userAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");

    if (formData.password.length < 6)
      return toast.error("Password length should be greater than 6");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 border rounded-xl bg-white shadow-lg">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60">
            Get started with your free account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Username</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonStanding className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="youremail@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="********"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-base-content/40" />
                ) : (
                  <Eye className="w-5 h-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full border mt-4"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Already have an account link */}
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}