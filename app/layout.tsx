import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-noto-sans-jp",
});

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="ja"
			suppressHydrationWarning
			className={`${inter.variable} ${notoSansJP.variable}`}
		>
			<body className="bg-background text-foreground font-sans">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen flex flex-col items-center w-full">
						<div className="flex-1 w-full flex flex-col items-center">
							<Header />
							<div className="flex flex-col gap-20 max-w-5xl p-5 w-full items-center">
								{children}
							</div>
							<Footer />
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
