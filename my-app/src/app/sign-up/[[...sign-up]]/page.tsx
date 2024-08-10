// "use client";
// import {
//   SignInButton,
//   ClerkProvider,
//   useSignUp,
//   RedirectToSignIn,
// } from "@clerk/nextjs";
// import React, { useState, useEffect } from "react";

// export default function Page() {
//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { isLoaded, signUp } = useSignUp();

//   useEffect(() => {
//     console.log('Clerk loaded:', isLoaded);
//   }, [isLoaded]);

//   const handleSignUp = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     setError("");

//     if (!isLoaded || !signUp) {
//       setError("Sign up is not available at the moment. Please try again later.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await signUp.create({
//         emailAddress,
//         password,
//         firstName: name,
//         unsafeMetadata: {
//           organization,
//         },
//       });

//       console.log('SignUp result:', result);

//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code",
//       });

//       setLoading(false);
//       alert("Sign up successful. Please check your email for verification.");
//     } catch (err: any) {
//       console.error('SignUp error:', err);
//       setError("Failed to sign up. Please check your details.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">
//             Aging Residence
//           </h2>
//           <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
//             Sign up for an account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{" "}
//             <SignInButton>
//               <a className="font-medium cursor-pointer text-teal-600 hover:text-teal-500">
//                 sign in to your account
//               </a>
//             </SignInButton>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="name" className="sr-only">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
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
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="organization" className="sr-only">
//                 Organization
//               </label>
//               <input
//                 id="organization"
//                 name="organization"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
//                 placeholder="Organization"
//                 value={organization}
//                 onChange={(e) => setOrganization(e.target.value)}
//               />
//             </div>
//           </div>

//           {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={loading}
//             >
//               {loading ? 'Signing up...' : 'Sign up'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
        <SignUp />
    </div>
  );
}
