import { fail, redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};
export const actions = {
  register: async ({ locals, request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries([...formData]);

      if (!data.email || !data.password) {
        return fail(400, {
          message: "Provide user data!",
          incorrect: true,
        });
      }

      if (data.password.length < 8) {
        return fail(400, {
          message: "Passwords should be longer than 8 characters",
          incorrect: true,
        });
      }

      await locals.pb.collection("users").create(data);

      await locals.pb.collection("users").authWithPassword(
        data.email,
        data.password,
      );
    } catch (error) {
      console.log("Error:", error);
      return {
        status: error.status || 500, // Default to 500 if status is not provided
        message: error.message || "Internal Server Error",
      };
    }

    throw redirect(303, "/login");
  },
};
