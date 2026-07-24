import { connectDB } from "./mongodb";

export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(fn: T): T {
    return (async function (...args: any[]) {
        try {
            await connectDB();
            return await fn(...args);
        } catch (error: any) {
            console.error("Server Error:", error.message);
            throw new Error("Internal Server Error");
        }
    }) as T;
}