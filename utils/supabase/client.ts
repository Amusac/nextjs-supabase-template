import { createBrowserClient } from "@supabase/ssr";

// Start of Selection
export const createClient = () => {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Supabaseの環境変数が設定されていません。");
	}

	return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
