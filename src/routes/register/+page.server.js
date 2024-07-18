import { fail, redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
  if (locals.pb.authStore.isValid) {
    throw redirect(303, "/");
  }
};
export const actions = {
  register: async ({ locals, request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);
    console.log(JSON.stringify(data.password).length);

    if (!data.email || !data.password) {
      return fail(400, {
        message: "Provide user data!",
        incorrect: true,
      });
    }

    if (JSON.stringify(data.password).length < 8) {
      return fail(400, {
        message: "Passwords should be longer than 8 characters",
        incorrect: true,
      });
    }

    try {
      await locals.pb.collection("users").create(data);

      await locals.pb.collection("users").authWithPassword(
        data.email,
        data.password,
      );
    } catch (err) {
      console.log("Error:", err);
      return {
        error: true,
        message: err,
      };
    }

    throw redirect(303, "/login");
  },
};
