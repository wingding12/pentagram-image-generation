(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{4590:(e,t,r)=>{Promise.resolve().then(r.bind(r,8308))},8308:(e,t,r)=>{"use strict";r.d(t,{default:()=>i});var l=r(5155),s=r(2115),a=r(5565);function o(e){let{history:t,onSelectPrompt:r,onDeleteItem:s,onClearHistory:o,onImageClick:i}=e;return(0,l.jsxs)("div",{className:"w-full max-w-2xl mx-auto mt-8",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,l.jsx)("h2",{className:"text-xl font-semibold",children:"Recent Prompts"}),t.length>0&&(0,l.jsx)("button",{onClick:o,className:"text-sm text-red-500 hover:text-red-700",children:"Clear History"})]}),(0,l.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4",children:t.map((e,t)=>(0,l.jsxs)("div",{className:"relative group cursor-pointer",children:[(0,l.jsx)(a.default,{src:e.imageUrl,alt:e.prompt,className:"w-full h-32 object-cover rounded-lg hover:opacity-90",onClick:()=>i(e),width:500,height:500}),(0,l.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity",children:[(0,l.jsx)("p",{className:"text-sm truncate",children:e.prompt}),(0,l.jsxs)("div",{className:"flex justify-between items-center",children:[(0,l.jsx)("p",{className:"text-xs opacity-75",children:new Date(e.createdAt).toLocaleDateString()}),(0,l.jsxs)("div",{className:"flex gap-2",children:[(0,l.jsx)("button",{onClick:t=>{t.stopPropagation(),r(e.prompt)},className:"text-xs text-blue-300 hover:text-blue-100",children:"Reuse"}),(0,l.jsx)("button",{onClick:e=>{e.stopPropagation(),s(t)},className:"text-xs text-red-300 hover:text-red-100",children:"Delete"})]})]})]})]},t))})]})}function i(e){let{generateImage:t}=e,[r,a]=(0,s.useState)(""),[i,c]=(0,s.useState)(!1),[n,d]=(0,s.useState)(null),[m,x]=(0,s.useState)(null),[u,p]=(0,s.useState)([]);(0,s.useEffect)(()=>{let e=localStorage.getItem("promptHistory");e&&p(JSON.parse(e))},[]);let g=async e=>{e.preventDefault(),c(!0),x(null);try{let e=await t(r);if(!e.success)throw Error(e.error||"Failed to generate image");if(e.imageUrl){let t=new Image,l=e.imageUrl;t.onload=()=>{d({url:l,prompt:r});let e=[{prompt:r,imageUrl:l,createdAt:new Date().toISOString()},...u].slice(0,9);p(e),localStorage.setItem("promptHistory",JSON.stringify(e))},t.src=l}else throw Error("No image URL received");a("")}catch(e){console.error("Error:",e),x(e instanceof Error?e.message:"Failed to generate image")}finally{c(!1)}};return(0,l.jsxs)("div",{className:"min-h-screen flex flex-col gap-8 p-8",children:[(0,l.jsx)("header",{className:"w-full max-w-3xl mx-auto",children:(0,l.jsx)("form",{onSubmit:g,className:"w-full",children:(0,l.jsxs)("div",{className:"flex gap-2",children:[(0,l.jsx)("input",{type:"text",value:r,onChange:e=>a(e.target.value),className:"flex-1 p-3 rounded-lg bg-black/[.05] dark:bg-white/[.06] border border-black/[.08] dark:border-white/[.145] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white",placeholder:"Describe the image you want to generate...",disabled:i}),(0,l.jsx)("button",{type:"submit",disabled:i||!r.trim(),className:"px-6 py-3 rounded-lg bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50",children:i?"Generating...":"Generate"})]})})}),(0,l.jsxs)("main",{className:"flex-1 flex flex-col items-center gap-8",children:[m&&(0,l.jsx)("div",{className:"w-full max-w-2xl p-4 bg-red-50 text-red-500 rounded-lg",children:m}),n&&(0,l.jsxs)("div",{className:"w-full max-w-2xl",children:[(0,l.jsxs)("p",{className:"text-sm mb-2 text-gray-600",children:["Current prompt: ",n.prompt]}),(0,l.jsx)("div",{className:"rounded-lg overflow-hidden shadow-lg",children:(0,l.jsx)("img",{src:n.url,alt:"Generated artwork",className:"w-full h-auto"})})]}),i&&(0,l.jsx)("div",{className:"w-full max-w-2xl flex items-center justify-center",children:(0,l.jsx)("div",{className:"w-12 h-12 border-4 border-gray-300 border-t-black dark:border-gray animate-spin"})}),(0,l.jsx)(o,{history:u,onSelectPrompt:e=>a(e),onDeleteItem:e=>{let t=u.filter((t,r)=>r!==e);p(t),localStorage.setItem("promptHistory",JSON.stringify(t))},onClearHistory:()=>{p([]),localStorage.removeItem("promptHistory")},onImageClick:e=>{d({url:e.imageUrl,prompt:e.prompt}),window.scrollTo({top:0,behavior:"smooth"})}})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[565,441,517,358],()=>t(4590)),_N_E=e.O()}]);