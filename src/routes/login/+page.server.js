import { fail, redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
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
};
