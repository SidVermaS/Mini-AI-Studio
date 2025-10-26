// 'use client';

// import { useEffect, useState } from 'react';
// import { Toast as ToastType } from '@/app/context/ToastContext';

// interface ToastProps {
//   toast: ToastType;
//   onClose: () => void;
// }

// const toastStyles = {
//   success: 'bg-green-500 text-white',
//   error: 'bg-red-500 text-white',
//   warning: 'bg-yellow-500 text-white',
//   info: 'bg-blue-500 text-white',
// };

// const toastIcons = {
//   success: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//     </svg>
//   ),
//   error: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
//   ),
//   warning: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//     </svg>
//   ),
//   info: (
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
//   ),
// };

// export default function Toast({ toast, onClose }: ToastProps) {
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     if (toast.duration && toast.duration > 0) {
//       const exitTimer = setTimeout(() => {
//         setIsExiting(true);
//       }, toast.duration - 300);

//       return () => clearTimeout(exitTimer);
//     }
//   }, [toast.duration]);

//   const handleClose = () => {
//     setIsExiting(true);
//     setTimeout(() => {
//       onClose();
//     }, 300);
//   };

//   return (
//     <div
//       className={`
//         flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md
//         ${toastStyles[toast.type]}
//         transform transition-all duration-300 ease-in-out
//         ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
//       `}
//       role="alert"
//     >
//       <div className="flex-shrink-0">{toastIcons[toast.type]}</div>
      
//       <div className="flex-1 text-sm font-medium">{toast.message}</div>
      
//       <button
//         onClick={handleClose}
//         className="flex-shrink-0 hover:opacity-75 transition-opacity"
//         aria-label="Close"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//     </div>
//   );
// }