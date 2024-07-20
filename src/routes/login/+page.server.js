import { fail, redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const load = async ({ locals, url }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }

  const authMethods = await locals.pb.collection("users").listAuthMethods();
  const fail = url.searchParams.get("fail") === "true";

  return { providers: authMethods.authProviders, fail };
};

export const actions = {
  login: async ({ locals, request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries([...formData]);

      if (!data.email || !data.password) {
        return fail(400, {
          message: "Please fill out the user fields",
          incorrect: true,
        });
      }
      await locals.pb.collection("users").authWithPassword(
        data.email,
        data.password,
      );
    } catch (err) {
      console.error("Login error:", err);
      return {
        error: true,
        email: data ? data.email : "",
      };
    }
    throw redirect(303, "/");
  },

  google: async ({ locals, request, cookies }) => {
    const provider = (
      await locals.pb.collection("users").listAuthMethods()
    ).authProviders.find((p) => p.name === "google");
    cookies.set("provider", JSON.stringify(provider), {
      httpOnly: true,
      path: `/auth/callback/google`,
    });

    throw redirect(303, provider.authUrl + env.REDIRECT_URL + provider.name);
  },
};
