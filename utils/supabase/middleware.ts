import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
	// This `try/catch` block is only here for the interactive tutorial.
	// Feel free to remove once you have Supabase connected.
	try {
		// Create an unmodified response
		let response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
		// Start of Selection
		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		if (!supabaseUrl || !supabaseAnonKey) {
			throw new Error("Supabase の環境変数が設定されていません。");
		}

		const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}
					response = NextResponse.next({
						request,
					});
					for (const { name, value, options } of cookiesToSet) {
						response.cookies.set(name, value, options);
					}
				},
			},
		});

		// This will refresh session if expired - required for Server Components
		// https://supabase.com/docs/guides/auth/server-side/nextjs
		const user = await supabase.auth.getUser();

		// protected routes
		const unProtectedRoutes = ["/sign-in", "/sign-up"];
		// 未認証ユーザーが保護されたルートにアクセスしようとした場合、サインインページにリダイレクト
		if (
			!unProtectedRoutes.some((route) =>
				request.nextUrl.pathname.startsWith(route),
			) &&
			user.error
		) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}

		// 認証ユーザーが未認証ページにアクセスしようとした場合、トップページにリダイレクト
		if (
			!user.error &&
			unProtectedRoutes.some((route) =>
				request.nextUrl.pathname.startsWith(route),
			)
		) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		return response;
	} catch (e) {
		// If you are here, a Supabase client could not be created!
		// This is likely because you have not set up environment variables.
		// Check out http://localhost:3000 for Next Steps.
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
};
