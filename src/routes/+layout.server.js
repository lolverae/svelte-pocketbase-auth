import { serializeNonPOJOs } from "$lib/helpers";

export const load = ({ locals }) => {
  if (locals.user) {
    return {
      profile: serializeNonPOJOs(locals.user),
    };
  }
};
