"use client";

import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getBackgroundCodePatternText } from "./get-background-code-pattern-text";

export function BackgroundCodePattern() {
	const text = `(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[816],{2661:(e,t,n)=>{"use strict";n.d(t,{NavLink:()=>o});var r=n(51),a=n(3506),s=n(4981);function o(e){let{href:t,title:n,children:o}=e,l=(0,s.useSelectedLayoutSegment)(),i="/".concat(l)===t;return(0,r.jsx)("a",{href:t,title:n,className:(0,a.A)("text-base underline",i?"text-black font-bold dark:text-white":"text-gray-800 font-normal dark:text-gray-200"),children:o})}},4011:e=>{e.exports={style:{fontFamily:"'JetBrains Mono', 'JetBrains Mono Fallback'",fontStyle:"normal"},className:"__className_3c557b",variable:"__variable_3c557b"}},4635:(e,t,n)=>{"use strict";n.d(t,{CopyrightText:()=>a});var r=n(51);function a(){return(0,r.jsxs)(r.Fragment,{children:["© ",new Date().getFullYear()," Benjamin Johnson"]})}},5941:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,3268,23)),Promise.resolve().then(n.t.bind(n,4011,23)),Promise.resolve().then(n.bind(n,8944)),Promise.resolve().then(n.bind(n,4635)),Promise.resolve().then(n.bind(n,2661)),Promise.resolve().then(n.t.bind(n,9405,23))},6056:(e,t,n)=>{"use strict";n.d(t,{cn:()=>s});var r=n(3506),a=n(8793);function s(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,a.Q)((0,r.$)(t))}},8944:(e,t,n)=>{"use strict";n.d(t,{Body:()=>o});var r=n(51),a=n(6056),s=n(7667);function o(e){let{children:t}=e,n=function(){let[e,t]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{t(!0)},[]),e}();return(0,r.jsx)("body",{"data-js_enabled":n,className:(0,a.cn)("dark:bg-gray-800 dark:text-white min-h-screen flex flex-col font-mono"),children:t})}},9405:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[903,268,858,573,800,358],()=>t(5941)),_N_E=e.O()}]);`;

	const { height, width } = useBodyDimensions();

	const reps = useMemo(() => {
		return getBackgroundCodePatternText({ height, width }).length / text.length;
	}, [height, width]);

	return (
		<div
			className={cn(
				"absolute inset-0 overflow-hidden -z-10 break-all transition-colors duration-[500ms]",
				reps > 0 ? "text-fg/5" : "text-transparent",
			)}
		>
			{text.repeat(reps)}
		</div>
	);
}

function useBodyDimensions() {
	const pathname = usePathname();

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!pathname) return;

		const updateDimensions = () => {
			setDimensions({
				width: document.body.clientWidth,
				height: document.body.clientHeight,
			});
		};

		// Set initial dimensions
		updateDimensions();

		// Add resize event listener
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, [pathname]);

	return dimensions;
}
