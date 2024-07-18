import { serializeNonPOJOs } from "$lib/helpers";

export const load = ({ locals }) => {
  console.log(locals.user);
  if (locals.user) {
    return {
      profile: serializeNonPOJOs(locals.user),
    };
  }
};
