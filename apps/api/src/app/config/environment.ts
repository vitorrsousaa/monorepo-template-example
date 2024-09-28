import dotenv from "dotenv";
import * as z from "zod";

export const envSchema = z.object({
	STAGE: z.literal("dev").or(z.literal("prod")),
	AUTH_GOOGLE_CLIENT_ID: z.string(),
	AUTH_GOOGLE_CLIENT_SECRET: z.string(),
	AUTH_GOOGLE_REDIRECT_URI: z.string(),
});

dotenv.config();

try {
	envSchema.parse(process.env);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error("Error on environment variables:", error.errors);
		process.exit(1);
	}
}

export interface IConfig {
	STAGE: string;
	AUTH_GOOGLE_CLIENT_ID: string;
	AUTH_GOOGLE_CLIENT_SECRET: string;
	AUTH_GOOGLE_REDIRECT_URI: string;
	ACCESS_TOKEN_EXPIRATION: number;
	AUTH_SECRET: string;
}

export class Config implements IConfig {
	public STAGE = process.env.STAGE as string;
	public AUTH_GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID as string;
	public AUTH_GOOGLE_CLIENT_SECRET = process.env
		.AUTH_GOOGLE_CLIENT_SECRET as string;
	public AUTH_GOOGLE_REDIRECT_URI = process.env
		.AUTH_GOOGLE_REDIRECT_URI as string;
	public ACCESS_TOKEN_EXPIRATION = 60 * 60 * 60 * 60 * 60; // 15hrs
	public AUTH_SECRET = process.env.AUTH_SECRET as string;
}
