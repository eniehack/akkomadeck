<p>redirecting</p>

<script lang="ts">
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
	import { UserStorageItemSerializer } from "$lib/localstorage";
    import { page } from "$app/stores";

    if (browser) {
        let user = UserStorageItemSerializer($page.data)
        localStorage.setItem("user", user)
        goto(import.meta.env.BASE_URL);
    }
</script>