import { useState, useEffect } from 'react';
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
  const [code, setCode] = useState(`function sum() { return 1 + 1 }`);
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
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
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
    <div className="min-h-screen w-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center p-4">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 max-w-6xl w-full bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-lg">
        {/* Code Editor Section */}
        <div className="flex border border-blue-500 flex-col bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-md w-full md:min-w-[24rem]">
          <div className="flex-grow w-full overflow-hidden">
            <Editor
              value={code}
              onValueChange={setCode}
              placeholder='WRITE YOUR CODE HERE FOR A QUICK REVIEW'
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: 'Fira Code, monospace',
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
        <div className="bg-gray-800 dark:bg-gray-200 p-6 md:p-8 rounded-lg shadow-md overflow-y-auto w-full">
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
            <div className="p-1 h-80 text-left border border-blue-500 rounded-xl"
            aria-placeholder=' Here is your result'
            >
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          )}
        </div>
      </main>
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