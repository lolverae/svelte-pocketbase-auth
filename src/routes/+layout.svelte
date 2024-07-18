<script>
	import '../app.postcss';

 	export let data;
</script>

<div class="h-full w-full min-h-screen bg-base-200">
	<div class="bg-base-100 border-b-2">
		<div class="navbar xl:container mx-auto bg-base-100 px-4">
			<div class="navbar-start">
			</div>
			<div class="navbar-end space-x-2">
        {#if data?.profile}
          <form action="/logout" method="POST">
            <button class="btn btn-primary">Logout</button>
          </form>
          {:else}
            <a href="/login" class="btn btn-outline">Login</a>
            <a href="/register" class="btn btn-primary btn-outline">Register</a>
        {/if}
			</div>
		</div>
	</div>
	<div class="h-full w-full xl:container mx-auto mt-8 px-4">
		<slot />
	</div>
</div>
