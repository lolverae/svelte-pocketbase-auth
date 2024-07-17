<script>
	import '../app.postcss';
</script>

<div class="h-full w-full min-h-screen bg-base-200">
	<div class="bg-base-100 border-b-2">
		<div class="navbar xl:container mx-auto bg-base-100 px-4">
			<div class="navbar-start">
				<div class="dropdown">
					<ul
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li><a href="/login">Login</a></li>
						<li><a href="/register">Register</a></li>
					</ul>
				</div>
			</div>
			<div class="navbar-end space-x-2">
				<a href="/login" class="btn btn-outline">Login</a>
				<a href="/register" class="btn btn-primary btn-outline">Register</a>
			</div>
		</div>
	</div>
	<div class="h-full w-full xl:container mx-auto mt-8 px-4">
		<slot />
	</div>
</div>
