declare module '*.svg' {
	const content: string;
	export default content;
}

// declare module '*.svg' {
// 	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
// 	export default content;
// }

declare module 'styles.module.css' {
	export const styles: { [className: string]: string };
}
