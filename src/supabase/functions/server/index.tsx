import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase admin client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-01bd36f5/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-01bd36f5/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.error(`Signup error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: "Failed to create user" }, 500);
    }

    // Initialize default user data in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}:profile`, {
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    // Initialize default cognitive data
    await kv.set(`user:${userId}:stats`, {
      badgesEarned: 0,
      dayStreak: 0,
      networkRank: "New User",
    });

    console.log(`User created successfully: ${email} (${userId})`);

    return c.json({ 
      success: true, 
      message: "User created successfully",
      userId: data.user.id,
    });
  } catch (error: any) {
    console.error(`Signup error: ${error.message}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get user profile endpoint (requires auth)
app.get("/make-server-01bd36f5/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No authorization token provided" }, 401);
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (error || !user?.id) {
      console.error(`Authorization error while fetching profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Fetch user data from KV store
    const profile = await kv.get(`user:${user.id}:profile`);
    const stats = await kv.get(`user:${user.id}:stats`);

    return c.json({
      profile: profile || { name: user.user_metadata?.name, email: user.email },
      stats: stats || { badgesEarned: 0, dayStreak: 0, networkRank: "New User" },
    });
  } catch (error: any) {
    console.error(`Error fetching profile: ${error.message}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);