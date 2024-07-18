<script>
	export let form;
</script>
<div class="flex flex-col items-center h-full w-full pt-12">
	<div class="py-6 shadow-md rounded-lg w-full max-w-sm mt-6 bg-base-100">
    <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
      Sign in to your account
    </h2>
    <p class="text-center mt-1">
      Or <a href="/register" class="text-primary font-medium hover:cursor-pointer">register</a> if you don't
      already have an account.
    </p>
		<form method="POST" action="?/login" class="flex flex-col items-center space-y-2 w-full">
			<div class="form-control w-full max-w-xs">
				<label for="email" class="label font-medium pb-1">
					<span class="label-text">Email</span>
				</label>
				<input type="email" name="email" class="input input-bordered w-full max-w-xs" />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="password" class="label font-medium pb-1">
					<span class="label-text">Password</span>
				</label>
				<input type="password" name="password" class="input input-bordered w-full max-w-xs" />
			</div>
			<div class="w-full max-w-xs pt-3">
				<button class="btn btn-primary w-full max-w-xs">Login</button>
			</div>
      {#if form?.incorrect}
        <div class="toast toast-start toast-center">
          <div class="alert alert-error">
            <span class="error-content font-medium">{form.message}</span>
          </div>
        </div>
      {/if}
		</form>
	</div>
</div>
