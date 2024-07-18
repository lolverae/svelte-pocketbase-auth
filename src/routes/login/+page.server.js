import { fail, redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};
export const actions = {
  login: async ({ locals, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);

    if (!data.email || !data.password) {
      return fail(400, {
        message: "Please fill out the user fields",
        incorrect: true,
      });
    }
    try {
      await locals.pb.collection("users").authWithPassword(
        data.email,
        data.password,
      );
    } catch (err) {
      console.log("Error:", err);
      return {
        error: true,
        email: data.email,
      };
    }
    throw redirect(303, "/");
  },
};
