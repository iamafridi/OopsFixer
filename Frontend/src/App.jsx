import { useState, useEffect } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

function App() {
  // State variables
  // const [code, setCode] = useState('');
  const [code, setCode] = useState(`//Write your code here
    function sum() { return 1 + 1 }`);    
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("system");

  // Effect to handle theme changes
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  // Effect to apply syntax highlighting
  useEffect(() => {
    prism.highlightAll();
  }, []);

  // Function to request code review from API
  async function reviewCode() {
    try {
      setLoading(true);
      setProgress(0);
      
      // Simulate a progress bar animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 5;
          }
          return prev;
        });
      }, 200);

      console.log("Sending request to backend...");
      
      // API request to get code review
      const response = await axios.post("https://backend-beta-olive.vercel.app/ai/get-review", { code });
      console.log("Full API Response:", response.data);
      setReview(response.data.review || "No review received.");
      
      clearInterval(interval);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching review:", error.response ? error.response.data : error);
      setReview("Error fetching review.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 via-gray-400 to-gray-700
 dark:bg-gray-100 flex flex-col items-center justify-between p-4">
      <header className="w-full flex justify-center items-center flex-col px-10">
      <nav className="flex flex-wrap justify-between items-center w-full mb-10 pt-3 px-4 sm:px-6 lg:px-8">
  {/* <img src={logo} alt="logo" className="w-28 object-contain" /> */}

  <a href="/" className="logo_text2 object-contain cyan_gradient uppercase text-lg sm:text-xl md:text-2xl cursor-pointer ">OopsFixer</a>
  
  <div className="flex gap-2 flex-wrap justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0">
    <button
      type="button"
      onClick={() => window.open('https://www.linkedin.com/in/iamafridi/')}
      className="black_btn"
    >
      LinkedIn
    </button>
    <button
      type="button"
      onClick={() => window.open('https://github.com/iamafridi/oopsfixer')}
      className="black_btn"
    >
      GitHub
    </button>
    <button
      type="button"
      onClick={() => window.open('https://iamafrididev.netlify.app')}
      className="black_btn"
    >
      Contact
    </button>
  </div>
</nav>

  <h1 className="head_text">
    Fix Your Code Effortlessly with <br className="max-md:hidden" />
    <span className="cyan_gradient">OopsFixer AI</span>
  </h1>
  <h2 className="desc text-black">
    Your AI-Powered Debugging Assistant. Instantly analyze, detect, and fix errors in your code using OpenAI's cutting-edge technology. Debug smarter with OopsFixer.
  </h2>
</header>

    {/* Navbar */}
    {/* <nav className="w-full text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">OopsFixer</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-blue-400">Home</a></li>
          <li><a href="#" className="hover:text-blue-400">About</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </div>
    </nav>
  
    {/* Header Text */}
    {/* <header className="text-center my-6">
      <h1 className="text-4xl font-bold text-white">Welcome to OopsFixer</h1>
      <p className="text-gray-400">Your AI-powered code reviewer</p>
    </header> *
  
    {/* Main Section */}
    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg ">
      {/* Code Editor Section */}
      <div className="flex flex-col bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-md w-full md:min-w-[24rem]">
        <div className="flex-grow w-full border border-blue-500 rounded-xl overflow-hidden relative">
          {code === '' && (
            <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
              WRITE YOUR CODE HERE FOR A QUICK REVIEW
            </div>
          )}
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: 'Stack,Fira Code, monospace',
              fontSize: 16,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden"
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-black shadow-md w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Review Code"}
        </button>
      </div>
  
      {/* Review Output Section */}
      <div className="bg-gray-800 dark:bg-gray-200 p-6 md:p-8 rounded-lg shadow-md overflow-y-auto w-full relative">
        {review === '' && !loading && (
         <div className="absolute p-2 rounded-xl top-1/3 left-1/2 transform -translate-x-1/2 
         flex justify-center items-center text-gray-400 pointer-events-none font-bold 
         text-[8px] sm:text-[10px] md:text-xs lg:text-xs 
         overflow-hidden text-center break-words max-w-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] 
         leading-tight whitespace-normal">
         YOUR REVIEW WILL APPEAR HERE
       </div>
       
       
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
            {/* Loading Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 px-2">
              <div className="bg-blue-500 h-2 transition-all duration-200" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{progress}%</p>
            <p>Loading review...</p>
          </div>
        ) : (
          <div className="p-10 border border-blue-500 rounded-xl">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        )}
      </div>
    </main>
  
    {/* Footer */}
    <footer className="w-full  text-gray-400 text-center p-1 mt-6">
  <p>
    &copy; 2024 OopsFixer. All rights reserved By  
    <a  
  className="underline ml-2 font-bold text-sm uppercase inline-flex items-center gap-1" 
  href="https://iamafridi-portfolio.netlify.app" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Afridi Akbar Ifty <FiArrowUpRight />
</a>

  </p>
</footer>

  </div>
  
  );
}

export default App;

// import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// function App() {
//   // State variables
//   const [code, setCode] = useState(`function sum() { return 1 + 1 }`);
//   const [review, setReview] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [theme, setTheme] = useState("system");

//   // Effect to handle theme changes
//   useEffect(() => {
//     if (theme === "light") {
//       document.documentElement.classList.remove("dark");
//     } else if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     }
//   }, [theme]);

//   // Effect to apply syntax highlighting
//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   // Function to request code review from API
//   async function reviewCode() {
//     try {
//       setLoading(true);
//       setProgress(0);
      
//       // Simulate a progress bar animation
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev < 90) {
//             return prev + 5;
//           }
//           return prev;
//         });
//       }, 200);

//       console.log("Sending request to backend...");
      
//       // API request to get code review
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       console.log("Full API Response:", response.data);
//       setReview(response.data.review || "No review received.");
      
//       clearInterval(interval);
//       setProgress(100);
//     } catch (error) {
//       console.error("Error fetching review:", error.response ? error.response.data : error);
//       setReview("Error fetching review.");
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//         setProgress(0);
//       }, 1000);
//     }
//   }

//   return (
//     <div className="min-h-screen w-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center p-4">
//     <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-lg">
//       {/* Code Editor Section */}
//       <div className="flex flex-col bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-md w-full md:min-w-[24rem]">
//         <div className="flex-grow w-full overflow-hidden relative">
//           {code === '' && (
//             <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
//               WRITE YOUR CODE HERE FOR A QUICK REVIEW
//             </div>
//           )}
//           <Editor
//             value={code}
//             onValueChange={setCode}
//             highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//             padding={10}
//             style={{
//               fontFamily: 'Fira Code, monospace',
//               fontSize: 16,
//               whiteSpace: "pre-wrap",
//               wordBreak: "break-word",
//               overflowWrap: "break-word",
//               width: "100%",
//               maxWidth: "100%",
//               overflow: "hidden"
//             }}
//           />
//         </div>
//         <button
//           onClick={reviewCode}
//           className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-black shadow-md w-full"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Review Code"}
//         </button>
//       </div>

//       {/* Review Output Section */}
//       <div className="bg-gray-800 dark:bg-gray-200 p-6 md:p-8 rounded-lg shadow-md overflow-y-auto w-full">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
//             {/* Loading Spinner */}
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             {/* Progress Bar */}
//             <div className="w-full bg-gray-700 rounded-full h-2 px-2">
//               <div className="bg-blue-500 h-2 transition-all duration-200" style={{ width: `${progress}%` }}></div>
//             </div>
//             <p>{progress}%</p>
//             <p>Loading review...</p>
//           </div>
//         ) : (
//           <div className="p-10">
//             <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//           </div>
//         )}
//       </div>
//     </main>
//   </div>
//   );
// }

// export default App;


// import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [code, setCode] = useState(`function sum() { return 1 + 1 }`);
//   const [review, setReview] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [theme, setTheme] = useState("system");

//   // Update theme based on selection
//   useEffect(() => {
//     if (theme === "light") {
//       document.documentElement.classList.remove("dark");
//     } else if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       // System theme: check the OS preference
//       if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     }
//   }, [theme]);

//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     try {
//       setLoading(true);
//       setProgress(0);

//       // Start a timer to simulate progress (increments until 90%)
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev < 90) {
//             return prev + 5; // Increment by 5% every 200ms
//           }
//           return prev;
//         });
//       }, 200);

//       console.log("Sending request to backend...");
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       console.log("Full API Response:", response.data);
//       setReview(response.data.review || "No review received.");

//       clearInterval(interval);
//       setProgress(100); // Set progress to 100% once API call finishes
//     } catch (error) {
//       console.error("Error fetching review:", error.response ? error.response.data : error);
//       setReview("Error fetching review.");
//     } finally {
//       // Keep 100% visible for a moment before hiding the loading state
//       setTimeout(() => {
//         setLoading(false);
//         setProgress(0);
//       }, 1000);
//     }
//   }

//   return (
//     <div className="min-h-screen w-full bg-gray-900 dark:bg-gray-100 transition-colors duration-300">
//       {/* Header with Theme Toggle
//       <header className="max-w-6xl mx-auto p-4 flex justify-end">
//         <select
//           value={theme}
//           onChange={(e) => setTheme(e.target.value)}
//           className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded p-2"
//         >
//           <option value="system">System</option>
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//         </select>
//       </header> */}

//       <main className="grid border grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl mx-auto bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-lg">
//         {/* Code Editor Section */}
//         <div className="flex flex-col bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-md w-full md:min-w-[24rem]">
//           <div className="flex-grow w-full overflow-hidden">
//             <Editor
//               value={code}
//               onValueChange={setCode}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: 'Fira Code, monospace',
//                 fontSize: 16,
//                 whiteSpace: "pre-wrap",
//                 wordBreak: "break-word",
//                 overflowWrap: "break-word",
//                 width: "100%",
//                 maxWidth: "100%",
//                 overflow: "hidden"
//               }}
//             />
//           </div>
//           <button
//             onClick={reviewCode}
//             className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-black shadow-md w-full"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Review Code"}
//           </button>
//         </div>

//         {/* Review Output Section */}
//         <div className="bg-gray-800 dark:bg-gray-200 p-4 md:p-6 rounded-lg shadow-md overflow-y-auto w-full">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
//               {/* Spinner */}
//               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               {/* Determinate Progress Bar with padding/margin */}
//               <div className="w-full bg-gray-700 rounded-full h-2 px-2">
//                 <div className="bg-blue-500 h-2 transition-all duration-200" style={{ width: `${progress}%` }}></div>
//               </div>
//               <p>{progress}%</p>
//               <p>Loading review...</p>
//             </div>
//           ) : (
//             <div className="p-8">
//               <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


// import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [code, setCode] = useState(`function sum() { return 1 + 1 }`);
//   const [review, setReview] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     try {
//       setLoading(true);
//       setProgress(0);

//       // Start a timer to simulate progress (increments until 90%)
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev < 90) {
//             return prev + 5; // Increment by 5% every 200ms
//           }
//           return prev;
//         });
//       }, 200);

//       console.log("Sending request to backend...");
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       console.log("Full API Response:", response.data);
//       setReview(response.data.review || "No review received.");

//       clearInterval(interval);
//       setProgress(100); // Set progress to 100% once API call finishes
//     } catch (error) {
//       console.error("Error fetching review:", error.response ? error.response.data : error);
//       setReview("Error fetching review.");
//     } finally {
//       // Keep 100% visible for a moment before hiding the loading state
//       setTimeout(() => {
//         setLoading(false);
//         setProgress(0);
//       }, 1000);
//     }
//   }

//   return (
//     <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg min-h-screen">
//   {/* Code Editor Section */}
//   <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md w-full md:min-w-[24rem]">
//     <div className="flex-grow w-full overflow-hidden">
//       <Editor
//         value={code}
//         onValueChange={setCode}
//         highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//         padding={10}
//         style={{
//           fontFamily: 'Fira Code, monospace',
//           fontSize: 16,
//           whiteSpace: "pre-wrap",
//           wordBreak: "break-word",
//           overflowWrap: "break-word",
//           width: "100%",
//           maxWidth: "100%",
//           overflow: "hidden"
//         }}
//       />
//     </div>
//     <button
//       onClick={reviewCode}
//       className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-black shadow-md w-full"
//       disabled={loading}
//     >
//       {loading ? "Loading..." : "Review Code"}
//     </button>
//   </div>

//   {/* Review Output Section */}
//   <div className="bg-gray-800 p-4  md:p-6 rounded-lg shadow-md overflow-y-auto w-full">
//     {loading ? (
//       <div className="flex flex-col items-center justify-center h-full space-y-4">
//         {/* Spinner */}
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         {/* Determinate Progress Bar */} 
//         <div className="w-full bg-gray-700 rounded-full h-2">
//           <div className="bg-blue-500 h-2 transition-all duration-200" style={{ width: `${progress}%` }}></div>
//         </div>
//         <p>{progress}%</p>
//         <p>Loading review...</p>
//       </div>
//     ) : (
//      <div className='p-8 '>
//        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//      </div>
//     )}
//   </div>
// </main>

//     // <main className="grid  grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg min-h-screen">
//     //   {/* Code Editor Section */}
//     //   <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-md">
//     //     <div className="flex-grow  overflow-hidden">
//     //       <Editor
//     //         value={code}
//     //         onValueChange={setCode}
//     //         highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//     //         padding={10}
//     //         style={{
//     //           fontFamily: 'Fira Code, monospace',
//     //           fontSize: 16,
//     //           whiteSpace: "pre-wrap",
//     //           wordBreak: "break-word",
//     //           overflowWrap: "break-word",
//     //           width: "100%",
//     //           maxWidth: "100%",
//     //           overflow: "hidden"
//     //         }}
//     //       />
//     //     </div>
//     //     <button
//     //       onClick={reviewCode}
//     //       className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-black shadow-md w-full"
//     //       disabled={loading}
//     //     >
//     //       {loading ? "Loading..." : "Review Code"}
//     //     </button>
//     //   </div>

//     //   {/* Review Output Section */}
//     //   <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md overflow-y-auto w-full">
//     //     {loading ? (
//     //       <div className="flex flex-col items-center justify-center h-full space-y-4">
//     //         {/* Spinner */}
//     //         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     //         {/* Determinate Progress Bar */} 
//     //         <div className="w-full bg-gray-700 rounded-full h-2">
//     //           <div className="bg-blue-500 h-2 mb-10 transition-all duration-200" style={{ width: `${progress}%` }}></div>
//     //         </div>
//     //         <p className='mt-5'>{progress}%</p>
            
//     //         <p>Loading review...</p>
//     //       </div>
//     //     ) : (
//     //       <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//     //     )}
//     //   </div>
//     // </main>
//   );
// }

// export default App;


// import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [code, setCode] = useState(`function sum() { return 1 + 1 }`);
//   const [review, setReview] = useState('');

//   useEffect(() => {
//     prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     try {
//       console.log("Sending request to backend...");
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       console.log("Full API Response:", response.data);
//       setReview(response.data.review || "No review received.");
//     } catch (error) {
//       console.error("Error fetching review:", error.response ? error.response.data : error);
//       setReview("Error fetching review.");
//     }
//   }

//   return (
//     <main>
//       <div className="left">
//         <div className="code">
//         <Editor
//   value={code}
//   onValueChange={setCode}
//   highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//   padding={10}
//   style={{
//     fontFamily: 'Fira Code, monospace',
//     fontSize: 16,
//     whiteSpace: "pre-wrap",
//     wordBreak: "break-word",
//     overflowWrap: "break-word"
//   }}
// />

//           {/* <Editor
//             value={code}
//             onValueChange={setCode}
//             highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//             padding={10}
//             style={{ fontFamily: 'Fira Code, monospace', fontSize: 16 }}
//           /> */}
//         </div>
//         <button onClick={reviewCode} className="review">Review Code</button>
//       </div>
//       <div className="right">
//         <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
//       </div>
//     </main>
//   );
// }

// export default App;



// import { useState, useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
// import prism from "prismjs"
// import Markdown from "react-markdown"
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios'
// import './App.css'

// function App() {
//   const [ count, setCount ] = useState(0)
//   const [ code, setCode ] = useState(` function sum() {
//   return 1 + 1
// }`)

//   const [ review, setReview ] = useState(``)

//   useEffect(() => {
//     prism.highlightAll()
//   }, [])

//   // async function reviewCode() {
//   //   const response = await axios.post('http://localhost:3000/ai/get-review', { code })
//   //   setReview(response.data)
//   // }


//   // anothe try 


//   // async function reviewCode() {
//   //   try {
//   //     const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//   //     setReview(response.data.review || "No response received.");
//   //   } catch (error) {
//   //     console.error("Error fetching review:", error);
//   //     setReview("Error fetching review.");
//   //   }
//   // }

//   // another approach

//   async function reviewCode() {
//     try {
//       console.log("Sending request to backend...");
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
  
//       console.log("Full API Response:", response.data); // Log full response
//       setReview(response.data.review || "No review received."); // Ensure correct field
//     } catch (error) {
//       console.error("Error fetching review:", error.response ? error.response.data : error);
//       setReview("Error fetching review.");
//     }
//   }
  

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={code => setCode(code)}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%"
//               }}
//             />
//           </div>
//           <div
//             onClick={reviewCode}
//             className="review">Review</div>
//         </div>
//         <div className="right">
//           <Markdown

//             rehypePlugins={[ rehypeHighlight ]}

//           >{review}</Markdown>
//         </div>
//       </main>
//     </>
//   )
// }



// export default App