// "use client"
// import { SignInButton, SignUpButton } from "@clerk/nextjs";
// import { SignIn } from "@clerk/nextjs";
// import React, { useState } from "react";
// import { useSignIn } from "@clerk/nextjs";

// export default function Page() {
//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { signIn } = useSignIn();

//   const handleSignIn = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!signIn) {
//       setError("SignIn is not available");
//       return;
//     }

//     try {
//       await signIn.create({
//         identifier: emailAddress,
//         password,
//       });
//     } catch (err) {
//       setError("Failed to sign in. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           {/* <img className="mx-auto h-12 w-auto" src="" alt="Aging Residence" /> */}
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">
//             Aging Residence
//           </h2>
          
//           <h4 className="mt-6 text-center text-xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h4>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{" "}
//             <SignUpButton>
//               <a className="font-medium cursor-pointer text-teal-600 hover:text-teal-500">
//                 sign up for an account
//               </a>
//             </SignUpButton>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
//           <input type="hidden" name="remember" value="true" />
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={emailAddress}
//                 onChange={(e) => setEmailAddress(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember_me"
//                 name="remember_me"
//                 type="checkbox"
//                 className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor="remember_me"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-teal-600 hover:text-teal-500"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
        <SignIn />
    </div>
  );
}

